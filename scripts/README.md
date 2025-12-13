# Image Migration Scripts

This directory contains scripts to help migrate images from the old WordPress site (rbelaw.com) to the new React site.

## Scripts Overview

### 1. `extract-images.js` - Extract Image URLs
Extracts image URLs from HTML pages on the old site.

**Usage:**
```bash
npm run extract-images <url1> [url2] [url3] ...

# Examples:
npm run extract-images https://rbelaw.com/
npm run extract-images https://rbelaw.com/our-team/ https://rbelaw.com/our-team/legal-assistants/
```

**Output:** Creates `image-urls.json` with all extracted image URLs, categorized by type.

### 2. `download-images.js` - Download Images
Downloads images from URLs and organizes them in the project structure.

**Usage:**
```bash
# Download from JSON file
npm run download-images -- --list image-urls.json

# Download a single image
npm run download-images -- --url "https://rbelaw.com/wp-content/uploads/2023/10/image.jpg"

# Specify output directory
npm run download-images -- --list image-urls.json --output public/images
```

**Options:**
- `--url <url>` - Download a specific image URL
- `--list <file>` - JSON file with list of image URLs
- `--output <dir>` - Output directory (default: `public/images`)
- `--optimize` - Optimize images after download (requires `sharp` package)

## Quick Start Workflow

### Step 1: Extract Image URLs
```bash
# Extract from key pages
npm run extract-images \
  https://rbelaw.com/ \
  https://rbelaw.com/our-team/ \
  https://rbelaw.com/our-team/legal-assistants/ \
  https://rbelaw.com/our-team/other-professionals/ \
  https://rbelaw.com/practice-areas/
```

This creates `image-urls.json` with all found image URLs.

### Step 2: Review and Edit
Open `image-urls.json` and review the extracted URLs. You can:
- Remove unwanted images
- Add additional URLs manually
- Organize by category

### Step 3: Download Images
```bash
# Download all images from the JSON file
npm run download-images -- --list image-urls.json
```

Images will be organized in:
```
public/images/
├── team/          # Team photos (attorneys, professionals, assistants)
├── offices/       # Office and building photos
├── practice/      # Practice area images
├── news/          # News/blog images
└── general/       # Other images (logos, icons, etc.)
```

## Manual Image URLs

If you have specific image URLs, you can create a simple JSON file:

```json
{
  "urls": [
    "https://rbelaw.com/wp-content/uploads/2023/10/attorney-photo.jpg",
    "https://rbelaw.com/wp-content/uploads/2023/10/office-reception.jpg"
  ]
}
```

Then download with:
```bash
npm run download-images -- --list your-file.json
```

## Image Organization

Images are automatically categorized based on URL patterns:

- **Team**: URLs containing "team", "attorney", "professional", "assistant", "staff"
- **Offices**: URLs containing "office", "reception", "building", "location"
- **Practice**: URLs containing "practice", "area", "service"
- **News**: URLs containing "news", "blog", "article", "post"
- **General**: All other images (logos, icons, etc.)

## Updating Data Files

After downloading images, update your data files to reference local paths:

```typescript
// src/lib/data/attorneys.ts
{
  id: 'john-doe',
  name: 'John Doe',
  imageUrl: '/images/team/john-doe.jpg', // Updated path
  // ...
}
```

## Troubleshooting

### Images Not Downloading
- Check that URLs are accessible
- Some images may require authentication
- Check network connectivity

### Wrong Categories
- Manually move images after download
- Edit the categorization logic in `download-images.js`

### Large Files
- Consider image optimization
- Use `--optimize` flag (requires `sharp` package)
- Or use external tools like TinyPNG

## Next Steps

1. **Extract URLs** from old site pages
2. **Review** the extracted URLs
3. **Download** images to local project
4. **Update** data files with new image paths
5. **Test** that all images load correctly

## Example: Complete Migration

```bash
# 1. Extract URLs
npm run extract-images https://rbelaw.com/our-team/

# 2. Review image-urls.json
cat image-urls.json

# 3. Download images
npm run download-images -- --list image-urls.json

# 4. Check results
ls -la public/images/team/
cat public/images/download-results.json
```

## Notes

- Images are downloaded with their original filenames (sanitized)
- Existing images are skipped (won't re-download)
- Failed downloads are logged in `download-results.json`
- All scripts work with both HTTP and HTTPS URLs
