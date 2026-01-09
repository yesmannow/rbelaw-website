import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Next.js options here
  images: {
    domains: [],
  },
}

export default withPayload(nextConfig)
