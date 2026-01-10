# PWA Icon Generation Instructions

To generate the required PWA icons for the Riley Bennett Egloff website:

## Required Icon Sizes
- `pwa-192x192.png` - Small icon for mobile devices
- `pwa-512x512.png` - Large icon for splash screens and app installation

## Generation Methods

### Option 1: Using PWA Asset Generator (Recommended)
```bash
npx @vite-pwa/assets-generator --preset minimal public/RBE-Logo-with-®-RGB-jpg.jpg
```

### Option 2: Using Online Tools
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload the logo file from `/public/RBE-Logo-with-®-RGB-jpg.jpg`
3. Download the generated icons
4. Place them in the `/public` directory with the following names:
   - `pwa-192x192.png`
   - `pwa-512x512.png`

### Option 3: Manual Generation with ImageMagick
```bash
# Install ImageMagick if not already installed
# brew install imagemagick (macOS)
# sudo apt-get install imagemagick (Ubuntu/Debian)

# Convert the logo to 192x192
convert public/RBE-Logo-with-®-RGB-jpg.jpg -resize 192x192 -background white -gravity center -extent 192x192 public/pwa-192x192.png

# Convert the logo to 512x512
convert public/RBE-Logo-with-®-RGB-jpg.jpg -resize 512x512 -background white -gravity center -extent 512x512 public/pwa-512x512.png
```

## Additional Files (Optional)
- `favicon.ico` - Browser favicon (16x16, 32x32, 48x48)
- `apple-touch-icon.png` - iOS home screen icon (180x180)
- `mask-icon.svg` - Safari pinned tab icon (SVG format)

## Testing the PWA
After generating the icons:
1. Build the project: `npm run build`
2. Preview the build: `npm run preview`
3. Open Chrome DevTools → Application → Manifest
4. Verify all icons are loaded correctly
5. Test "Add to Home Screen" on mobile device

## Brand Colors Used
- **Theme Color:** `#5D1F34` (Burgundy)
- **Background Color:** `#0A2540` (Navy)
