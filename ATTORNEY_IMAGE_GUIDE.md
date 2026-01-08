# Attorney Image Management Guide

## Quick Reference

All attorney images are stored in: `public/images/team/Attorneys/`

Each attorney should have **3 image formats**:
- `.avif` - Best quality, smallest size (preferred)
- `.webp` - Good quality, good compression
- `.jpg` or `.png` - Fallback for older browsers

## Current Attorney Image Mapping

| Attorney Name | Image Slug |
|--------------|------------|
| James W. Riley Jr. | `james-riley-jr.-attorney-indianapolis-riley-bennett-egloff-member-american-arbitration-association-business-litigation` |
| Katie R. Osborne | `katie-osborne-indiana-med-mal-defense-attorney-partner-riley-bennett-egloff-thumbnail` |
| Courtney David Mills | `courtney-d.-mills-indianapolis-attorney-riley-bennett-egloff-partner-medical-malpractice-defense-health-care-litigation` |
| Donald S. Smith | `donald-s.-smith-attorney-indianapolis-partner-riley-bennett-egloff-employment-law` |
| Jeffrey S. Fecht | `jeffrey-fecht-attorney-indianapolis-commercial-litigation-construction-law-product-liability-toxic-tort` |
| Kevin N. Tharp | `kevin-tharp-indiana-attorney-partner-riley-bennett-egloff-business-law-construction-law-thumbnail` |
| Laura A. Binford | `laura-binford-indianapolis-med-mal-attorney-partner-riley-bennett-egloff-thumbnail-png` |
| Raymond T. Seach | `raymond-t.-seach-attorney-indianapolis-partner-riley-bennett-egloff` |
| Kathleen Hart | `kathleen-hart-indianapolis-attorney-riley-bennett-egloff-business-law-xbe-commercial-law-employment-law` |
| Katie S. Riles | `katie-riles-attorney-riley-bennett-egloff-with-bkgrnd-png` |
| Anthony R. Jost | `tony-jost-2l9a4882` |
| Eric M. Hylton | `eric-hylton-indiana-attorney-education-law-thumbnail-1` |
| Ryan L. Leitch | `ryan-leitch-indiana-attorney-trust-and-estate-law-thumbnail-1` |
| Jaclyn M. Flint | `jaclyn-m-flint-attorney-indiana-ip-law-construction-sports-entertainment-commercial-litigation-thumbnail` |
| John L. Egloff | `john-egloff-attorney-headshot-thumbnail-jpg` |
| Blair R. Vandivier | `blair-vandivier-attorney-indianapolis-riley-bennett-egloff-business-law-mergers-and-acquisitions-contracts-formation` |
| Douglas A. Cook | `doug-cook-indianapolis-attorney-business-law` |
| Anna Marvin | `anna-marvin-attorney-thmb-jpg` |
| Beau Browning | `beau-browning-headshot-with-background-s13_0338-a-jpg` |
| J.T. Wynne | `jt-wynne-headshot-indianapolis-attorney` |
| Justin O. Sorrell | `justin-sorrell-indiana-business-litigation-attorney` |
| Lindsay A. Llewellyn | `lindsay-a-llewellyn-thumbnail` |
| Megan Young | `megan-young-photo-for-thumbnails-jpg` |
| Patrick S. McCarney | `patrick-mccarney-indiana-attorney-business-law-insurance-law-thumbnail` |
| Sarah Macgill Marr | `sarah-macgill-marr` |
| Timothy H. Button | `timothy-h.-button-attorney-indianapolis-thumbnail-image` |
| Travis Watson | `travis-watson-indiana-attorney-construction-law-insurance-law-business-corporate-law-thumbnail` |

## Adding a New Attorney

### Step 1: Prepare Images

1. Get a professional headshot (minimum 800x800px)
2. Convert to three formats:
   ```bash
   # Using Sharp or online tools
   - attorney-name.avif (recommended: 600x600px, quality 80)
   - attorney-name.webp (recommended: 600x600px, quality 85)
   - attorney-name.jpg (recommended: 600x600px, quality 90)
   ```

### Step 2: Name the Files

Use lowercase with hyphens, following this pattern:
```
firstname-lastname-descriptor.avif
firstname-lastname-descriptor.webp
firstname-lastname-descriptor.jpg
```

Example:
```
john-doe-attorney-indianapolis.avif
john-doe-attorney-indianapolis.webp
john-doe-attorney-indianapolis.jpg
```

### Step 3: Add to Image Map

Edit `src/lib/utils/attorney-images.ts`:

```typescript
export const attorneyImageMap: Record<string, string> = {
  // ... existing mappings
  'John Doe': 'john-doe-attorney-indianapolis',
}
```

### Step 4: Upload Files

Place all three image files in:
```
public/images/team/Attorneys/
```

## Image Optimization Tips

### Recommended Sizes
- **List View**: 400x400px (displayed in cards)
- **Bio Page**: 600x600px (larger display)
- **Thumbnail**: 200x200px (if needed for compact views)

### Quality Settings
- **AVIF**: 75-80 quality (best compression)
- **WebP**: 80-85 quality (good balance)
- **JPG**: 85-90 quality (fallback)

### File Size Targets
- AVIF: < 15KB
- WebP: < 20KB
- JPG: < 40KB

## Converting Images

### Using Sharp (Node.js)

```javascript
const sharp = require('sharp');

// Convert to AVIF
sharp('input.jpg')
  .resize(600, 600)
  .avif({ quality: 80 })
  .toFile('output.avif');

// Convert to WebP
sharp('input.jpg')
  .resize(600, 600)
  .webp({ quality: 85 })
  .toFile('output.webp');

// Optimize JPG
sharp('input.jpg')
  .resize(600, 600)
  .jpeg({ quality: 90 })
  .toFile('output.jpg');
```

### Online Tools
- **Squoosh.app** - Google's image optimizer
- **TinyPNG** - PNG/JPG compression
- **CloudConvert** - Format conversion

## Troubleshooting

### Image Not Displaying

1. **Check file exists**:
   ```
   public/images/team/Attorneys/attorney-name.avif
   public/images/team/Attorneys/attorney-name.webp
   public/images/team/Attorneys/attorney-name.jpg
   ```

2. **Check image map**:
   - Open `src/lib/utils/attorney-images.ts`
   - Verify attorney name matches exactly
   - Verify slug matches filename (without extension)

3. **Check browser console**:
   - Look for 404 errors
   - Verify image path is correct

### Wrong Image Displaying

- Clear browser cache
- Check that attorney name in data matches image map key exactly
- Verify no duplicate entries in image map

### Image Quality Issues

- Increase quality setting in conversion
- Use larger source image
- Check original image resolution

## Best Practices

1. **Consistent Background**: Use same background color/style for all attorneys
2. **Professional Attire**: Business professional dress code
3. **Good Lighting**: Well-lit, no harsh shadows
4. **Centered Framing**: Face centered, shoulders visible
5. **High Resolution**: Start with at least 1200x1200px source
6. **Aspect Ratio**: Square (1:1) for consistency

## Maintenance

### Regular Tasks

- [ ] Audit missing images monthly
- [ ] Update images when attorneys join/leave
- [ ] Optimize new images before upload
- [ ] Test image loading on deployment
- [ ] Monitor file sizes and performance

### Performance Monitoring

Check these metrics:
- Average image load time
- Total page weight
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

---

**Last Updated**: January 8, 2026
**Maintained By**: Development Team
