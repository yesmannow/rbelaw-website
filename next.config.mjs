/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Next.js options here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
