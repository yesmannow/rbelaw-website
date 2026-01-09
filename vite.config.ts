import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { VitePWA } from 'vite-plugin-pwa'
// NOTE: vite-plugin-sitemap removed - using Next.js metadata and @payloadcms/plugin-seo instead
// import Sitemap from 'vite-plugin-sitemap'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import data for dynamic sitemap generation
// import { attorneys } from './src/lib/utils/attorney-logic'
// import { enhancedPracticeAreas } from './src/lib/data/practiceAreasEnhanced'
// import { industriesManual } from './src/lib/data/industries-manual'

// Map all dynamic prestige IDs into a flat array of paths
const dynamicRoutes: string[] = [
  // Attorney bio pages - will be generated post-build
  // ...attorneys.map(a => `/attorneys/${a.id}`),
  // Practice area detail pages
  // ...enhancedPracticeAreas.map(pa => `/practice-areas/${pa.slug}`),
  // Industry detail pages
  // ...industriesManual.map(ind => `/industries/${ind.slug}`)
]

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      useCredentials: true, // FIX: Allows Vercel to fetch manifest behind Auth
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Riley Bennett Egloff',
        short_name: 'RBE Law',
        description: 'Riley Bennett Egloff LLP - Corporate Law Excellence',
        theme_color: '#5D1F34',
        background_color: '#0A2540',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
      }
    }),
    // NOTE: Sitemap plugin removed - using Next.js metadata and @payloadcms/plugin-seo instead
    // Sitemap({
    //   hostname: 'https://www.rbelaw.com',
    //   dynamicRoutes,
    //   changefreq: 'weekly',
    //   priority: 0.7,
    //   lastmod: new Date(),
    //   exclude: ['/404', '/demo', '/archive/**'],
    //   outDir: 'dist',
    //   robots: [
    //     {
    //       userAgent: '*',
    //       allow: '/',
    //       disallow: ['/archive/', '/private/']
    //     }
    //   ]
    // })
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
