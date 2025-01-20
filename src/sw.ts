import { cleanupOutdatedCaches, precacheAndRoute, matchPrecache } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing"; // Use registerRoute from workbox-routing
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/offline.html', // Precache offline.html
      ]);
    })
  );
  self.skipWaiting();
});


self.addEventListener('activate', () => {
  self.clients.claim();
});

registerRoute(
  ({ url }) => 
    url.origin === 'https://reduxcart-cygbit-default-rtdb.firebaseio.com', // Match Firebase origin
  new StaleWhileRevalidate({
    cacheName: 'firebase-api-calls', 
  })
);


registerRoute(
  ({ request, sameOrigin }) =>
    sameOrigin && request.destination === 'image', 
  new CacheFirst({
    cacheName: 'images',
  })
);


registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'navigation',
    networkTimeoutSeconds: 3, 
    plugins: [
      {
        fetchDidFail: async ({ request }) => {
          console.error(`Fetch failed for: ${request.url}`); 
          return Promise.resolve(); 
        },
      },
    ],
  }),
  'GET'
);

setCatchHandler(async ({ request }) => {
  switch (request.destination) {
    case 'document': {
      const fallback = await matchPrecache('/offline.html');
      return fallback || new Response('Offline fallback not found', { status: 404 });
    }
    default: {
      return new Response('Resource not available offline', { status: 404 });
    }
  }
});