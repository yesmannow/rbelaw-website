import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
// NOTE: Legacy Vite plugins removed - migrated to Next.js
// PWA features will be reimplemented using Next-native tools in a later phase
// import { VitePWA } from 'vite-plugin-pwa'
// import Sitemap from 'vite-plugin-sitemap'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// NOTE: This config is retained only for legacy Vite scripts (dev:vite, build:vite)
// Production builds use Next.js (npm run build)
export default defineConfig({
  plugins: [
    react(),
    // NOTE: VitePWA removed - will reimplement using Next.js native tools
    // NOTE: Sitemap removed - using @payloadcms/plugin-seo instead
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // FIX: Consolidated chunking to prevent circular dependencies
        // All React-related modules (react, react-dom, react-router, scheduler) must be 
        // in a single chunk to ensure proper initialization order and prevent runtime errors
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Critical: All React-related must be in ONE chunk
            if (
              id.includes('/react/') || 
              id.includes('/react-dom/') || 
              id.includes('react-router-dom') ||
              id.includes('react-router') ||
              id.includes('scheduler')
            ) {
              return 'framework';
            }
            // Motion library separate (doesn't depend on vendor)
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            // Everything else
            return 'vendor';
          }
          // Blog posts data - large static chunk
          if (id.includes('blog-posts.ts')) {
            return 'blog-posts';
          }
        }
      }
    }
  },
  server: {
    port: 5174,
    host: 'localhost',
    strictPort: false,
    open: true,
  },
})
