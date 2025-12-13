# Image Automation Scripts

This directory contains tools to help populate the website with professional imagery.

## Prerequisites

For the Pixabay stock photo fetcher, you'll need a free API key:

1. Visit [Pixabay API Docs](https://pixabay.com/api/docs/)
2. Sign up or log in to see your API key
3. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
4. Add your key to `.env`:
   ```
   PIXABAY_KEY=your_actual_key_here
   ```

## Scripts

### 1. Stock Photo Fetcher (`fetch-stock.js`)

Downloads high-resolution stock photos from Pixabay.

**Usage:**
```bash
npm run get-photos <query> <count>
```

**Examples:**
```bash
# Download 5 courthouse images
npm run get-photos "courthouse" 5

# Download a modern office building for the hero section
npm run get-photos "modern office building glass" 1

# Download construction site images
npm run get-photos "construction site" 4

# Download legal/business images
npm run get-photos "business meeting corporate" 3
```

**Output:**
- Images are saved to `src/assets/stock/`
- Filenames are auto-generated from the query (e.g., `courthouse-1.jpg`)
- All images are high-resolution (minimum 1920x1080)

### 2. Legacy Asset Rescue (`rescue-assets.js`)

Scrapes and downloads images from old WordPress blog posts to preserve them before migrating away from the old hosting.

**Usage:**
```bash
npm run rescue-assets
```

**How it works:**
1. Reads the news archive data from `src/lib/data/news-archive.json`
2. Fetches each article URL
3. Extracts images from Divi theme containers (`et_pb_image_container`)
4. Downloads images to `public/images/legacy/`
5. Filenames match the article slugs

**Output:**
- Images saved to `public/images/legacy/`
- Console logs show progress for each article
- Errors are logged but don't stop the entire process

## Notes

- Both scripts include rate limiting to avoid overwhelming servers
- Downloaded images are added to `.gitignore` and won't be committed
- `.gitkeep` files preserve the directory structure in git
- Stock images are free to use under Pixabay's license

## Troubleshooting

**"PIXABAY_KEY not found":**
- Make sure you've created a `.env` file (not `.env.example`)
- Verify your API key is correct

**"No images found":**
- Try different search terms
- Check that your Pixabay key is valid

**Download timeouts:**
- Large images may take time to download
- The scripts have generous timeouts (10-30 seconds)
- Check your internet connection
