# Image Migration Guide for rbelaw.com

## Overview
This guide outlines options for migrating images from the old WordPress site (https://rbelaw.com) to the new React/Vite site.

## Image Sources from Old Site

Based on the HTML source provided, images are typically located at:
- `https://rbelaw.com/wp-content/uploads/YYYY/MM/image-name.ext`
- Example: `https://rbelaw.com/wp-content/uploads/2023/10/Riley-Bennett-Egloff-Attorneys-at-Law-Indianapolis-Reception-Area-DSC_1228.gif`

## Migration Options

### Option 1: Manual Download & Organize (Recommended for Small Sets)
1. **Identify Images Needed:**
   - Team photos (attorneys, professionals, legal assistants)
   - Office photos
   - Practice area images
   - Blog/news images

2. **Download Process:**
   ```bash
   # Using wget (if available on Windows via Git Bash or WSL)
   wget -r -np -nH --cut-dirs=2 -A jpg,jpeg,png,gif,webp https://rbelaw.com/wp-content/uploads/

   # Or use browser extensions like "Image Downloader" to bulk download
   ```

3. **Organize in Project:**
   ```
   public/
   ├── images/
   │   ├── team/
   │   │   ├── attorneys/
   │   │   ├── professionals/
   │   │   └── legal-assistants/
   │   ├── offices/
   │   ├── practice-areas/
   │   └── news/
   ```

### Option 2: Automated Script (For Large Sets)
Create a Node.js script to:
1. Scrape image URLs from the old site
2. Download images
3. Optimize and rename them
4. Place them in the correct directories

**Example Script Structure:**
```javascript
// scripts/migrate-images.js
const fs = require('fs');
const https = require('https');
const path = require('path');

// List of image URLs from old site
const imageUrls = [
  'https://rbelaw.com/wp-content/uploads/2023/10/image1.jpg',
  // ... more URLs
];

async function downloadImage(url, outputPath) {
  // Implementation here
}

// Run migration
```

### Option 3: Use MCP Browser Tools (Current Session)
I can help you:
1. Navigate to specific pages on the old site
2. Extract image URLs from the HTML
3. Create a manifest file with all image URLs
4. Provide download instructions

### Option 4: Direct URL References (Temporary)
For quick migration, you can temporarily reference images directly from the old site:
```tsx
// Temporary - replace with local images later
imageUrl: 'https://rbelaw.com/wp-content/uploads/2023/10/attorney-photo.jpg'
```

**⚠️ Warning:** This is not recommended for production as:
- Images may be removed from old site
- Performance issues (external requests)
- No control over image availability

## Recommended Approach

1. **Phase 1: Identify Critical Images**
   - Team photos (attorneys, professionals, legal assistants)
   - Logo and branding assets
   - Key office/reception photos

2. **Phase 2: Download & Optimize**
   - Download images manually or via script
   - Optimize for web (compress, resize if needed)
   - Convert to modern formats (WebP where possible)

3. **Phase 3: Organize & Reference**
   - Place in `public/images/` directory
   - Update data files to reference local paths
   - Test all image references

## Image Optimization Tools

- **Online:** TinyPNG, Squoosh
- **CLI:** sharp-cli, imagemin
- **Build-time:** vite-imagetools (for Vite projects)

## Next Steps

1. **Provide Image List:** Share a list of specific images you need
2. **Automated Extraction:** I can create a script to extract all image URLs from the old site
3. **Manual Process:** I can guide you through downloading specific images

Would you like me to:
- Create a script to extract all image URLs from the old site?
- Help download specific images using browser automation?
- Set up an image optimization pipeline?

