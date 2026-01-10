# Vercel Blob Storage Setup Guide

This guide explains how to configure Vercel Blob Storage for media uploads in the RBE Law website.

## Overview

The website uses Payload CMS for content management, including file uploads (attorney headshots, practice area images, blog featured images). When deploying to Vercel, file uploads require a cloud storage adapter since Vercel's filesystem is ephemeral.

## Changes Made

### 1. Installed Vercel Blob Storage Adapter

```bash
npm install @payloadcms/storage-vercel-blob
```

### 2. Updated `src/payload.config.ts`

Added the Vercel Blob storage plugin:

```typescript
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

// ... in buildConfig plugins array:
plugins: [
  seoPlugin({ /* ... */ }),
  vercelBlobStorage({
    enabled: true,
    collections: {
      media: true,  // Enable for the media collection
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || '',
  }),
]
```

### 3. Updated `next.config.mjs`

Added remote patterns to allow Next.js Image component to load images from Vercel Blob Storage:

```javascript
const nextConfig = {
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
```

### 4. Updated `.env.example`

Added the required environment variable:

```env
# Vercel Blob Storage Configuration
# Get your token from Vercel dashboard: Settings > Storage > Your Blob Store
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_token_here
```

## Deployment Steps

### Step 1: Create Vercel Blob Store

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Blob**
4. Name your store (e.g., "rbe-media")
5. Click **Create**

### Step 2: Get the Storage Token

1. In your Blob store settings, go to **Settings** tab
2. Find the **BLOB_READ_WRITE_TOKEN** in the **Connection** section
3. Copy the token value (starts with `vercel_blob_rw_...`)

### Step 3: Add Environment Variable to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: Your token from Step 2
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**

### Step 4: Redeploy

1. Trigger a new deployment (or wait for next git push)
2. The storage adapter will now be active

## Verifying the Setup

### Check Build Logs

After deployment, you should **NOT** see this warning anymore:

```
WARN: Collections with uploads enabled require a storage adapter when deploying to Vercel.
Collection(s) without storage adapters: media.
```

### Test File Uploads

1. Visit `/admin` on your deployed site
2. Log in to Payload CMS
3. Navigate to **Media** collection
4. Try uploading an image
5. The file should upload successfully to Vercel Blob Storage

### Check Admin Panel

1. After uploading, the image URL should start with:
   ```
   https://[random-id].public.blob.vercel-storage.com/...
   ```
2. The image should display correctly in the admin panel and on the frontend

## How It Works

### Upload Flow

1. **User uploads file** in Payload CMS admin panel
2. **Payload processes** the upload (resizing, optimization if configured)
3. **Storage adapter** sends the file to Vercel Blob Storage
4. **Blob Storage returns** a permanent URL
5. **Payload stores** the URL in the database
6. **Next.js renders** images using the `next/image` component with remote patterns

### Image Rendering

When rendering images on the frontend:

```tsx
<Image
  src={attorney.headshot.url}  // https://xyz.public.blob.vercel-storage.com/...
  alt={attorney.name}
  fill
  className="object-cover"
/>
```

Next.js automatically optimizes images from Vercel Blob Storage.

## Benefits

✅ **Permanent Storage** - Files persist across deployments  
✅ **CDN Distribution** - Global edge caching for fast delivery  
✅ **Automatic Optimization** - Next.js Image optimization works seamlessly  
✅ **Scalable** - No storage limits (pay as you go)  
✅ **Secure** - Built-in access controls and encryption  

## Troubleshooting

### 500 Error on /admin

**Symptom**: Admin panel shows 500 error  
**Cause**: Missing `BLOB_READ_WRITE_TOKEN` environment variable  
**Solution**: Add the token to Vercel environment variables and redeploy

### Images Not Loading

**Symptom**: Images show broken/not loading on frontend  
**Cause**: Missing remote patterns in `next.config.mjs`  
**Solution**: Verify the remote patterns are configured correctly (already done in this PR)

### Upload Fails

**Symptom**: File upload returns an error  
**Cause**: Invalid or expired token  
**Solution**: Regenerate the token in Vercel Blob store settings

## Alternative Storage Options

If you prefer a different storage provider, Payload supports:

- **AWS S3**: `@payloadcms/storage-s3`
- **Google Cloud Storage**: `@payloadcms/storage-gcs`
- **Azure Blob Storage**: `@payloadcms/storage-azure`

Simply replace the `vercelBlobStorage` plugin with your preferred adapter.

## Cost Considerations

Vercel Blob Storage pricing (as of 2024):
- **Free tier**: 500GB storage, 5GB egress/month
- **Pro**: $0.15/GB stored, $0.10/GB egress

For the RBE Law website with ~50 attorney headshots and occasional blog images, costs should remain in the free tier.

## Security Notes

- ✅ `BLOB_READ_WRITE_TOKEN` is kept in environment variables (not committed to git)
- ✅ Token is only used server-side (Payload CMS)
- ✅ Public URLs are read-only
- ✅ Files are served over HTTPS with CDN caching

## Summary

The Vercel Blob Storage adapter is now configured and will:
- ✅ Eliminate the storage adapter warning during builds
- ✅ Fix the 500 error on `/admin` route
- ✅ Enable file uploads in production
- ✅ Serve images efficiently via Vercel's CDN

Once you add the `BLOB_READ_WRITE_TOKEN` to Vercel environment variables, file uploads will work seamlessly!
