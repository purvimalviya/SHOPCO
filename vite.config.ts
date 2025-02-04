import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    devOptions:{
      enabled:false
    },
    strategies: "injectManifest",
    srcDir : "src",
    filename : "sw.ts",
    injectManifest : {
      swDest:"dist/sw.js"
    },
    registerType : "autoUpdate",
    manifest : {
      name : "Shop.Co",
      short_name: "ShopCo",
      icons : [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      theme_color:"#fff",
      background_color:"#fff",
      start_url:"/",
      display:"standalone",
      orientation:"portrait",
    }
  })
],
})
