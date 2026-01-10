import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Riley Bennett Egloff LLP',
    short_name: 'RBE Law',
    description: 'Premier Indiana Defense Litigation & Corporate Law',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#213469', // RBE Navy
    icons: [
      { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
