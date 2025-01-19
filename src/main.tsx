import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import store from './store/store';
import './index.css';
import App from './App';

// Lazy load pages
const Home = lazy(() => import('./pages/Home/Home'));
const Product = lazy(() => import('./pages/Product/Product'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Shop = lazy(() => import('./pages/Shop/Shop'));

// Import spinner
import FullPageSpinner from './components/common/Spinner';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/Product/:id"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <Product />
          </Suspense>
        }
      />
      <Route
        path="/Cart"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="/Profile"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/Shop"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <Shop />
          </Suspense>
        }
      />
      <Route
        path="/Shop/:gender"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <Shop />
          </Suspense>
        }
      />
      <Route
        path="/Shop/:gender/:category"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <Shop />
          </Suspense>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
