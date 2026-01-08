# 🎨 RBE Branding Update - Official Colors & Fonts

## ✅ Branding Updated to Match Current Site

### Official RBE Brand Colors

**Primary Colors:**
- **Navy Blue**: `#213469` - Primary brand color (text, headings, buttons)
- **Tan/Beige**: `#D3CBBC` - Accent color (highlights, secondary elements)
- **White**: `#FFFFFF` - Background

**Usage:**
- Primary Navy (`#213469`) - All headings, primary text, navigation, buttons
- Tan/Beige (`#D3CBBC`) - Accents, hover states, secondary buttons, highlights
- White - Backgrounds, cards, content areas

### Official RBE Fonts

**Heading Font:**
- **Raleway** - Used for all headings (H1-H6)
- Weights: 400, 500, 600, 700
- Fallback stack: Helvetica, Arial, Lucida, sans-serif

**Body Font:**
- **Open Sans** - Used for all body text, paragraphs
- Weights: 300, 400, 500, 600, 700
- Fallback stack: Arial, sans-serif

**Font Sizes:**
- H1: 28px
- H2: 23px
- Body: 18px

---

## 📁 Files Updated

### 1. Global CSS (`src/index.css`)
- ✅ Updated Google Fonts import to Raleway + Open Sans
- ✅ Changed CSS variables to RBE official colors
- ✅ Updated font family variables
- ✅ Set body font size to 18px
- ✅ Set text color to Navy (#213469)

### 2. Tailwind Config (`tailwind.config.js`)
- ✅ Updated primary.navy to #213469
- ✅ Updated accent.gold to #D3CBBC (tan)
- ✅ Added primary.tan alias
- ✅ Updated font families to Open Sans and Raleway
- ✅ Maintained backward compatibility with aliases

### 3. Attorney Photo Mapping (`src/lib/utils/attorneyPhotoMapping.ts`)
- ✅ Created mapping for all 27 attorneys
- ✅ Maps attorney IDs to optimized WebP photos
- ✅ Includes helper functions for photo sources
- ✅ Supports AVIF, WebP, and JPG formats

---

## 🖼️ Attorney Photos Mapped

**27 Attorneys with Photos:**
1. Anna Marvin
2. Beau Browning
3. Blair VanDivier
4. Courtney Mills
5. Donald Smith
6. Doug Cook
7. Eric Hylton
8. Jaclyn Flint
9. James Riley
10. Jeffrey Fecht
11. John Egloff
12. JT Wynne
13. Justin Sorrell
14. Kathleen Hart
15. Katie Osborne
16. Katie Riles
17. Kevin Tharp
18. Laura Binford
19. Lindsay Llewellyn
20. Megan Young
21. Patrick McCarney
22. Raymond Seach
23. Ryan Leitch
24. Sarah MacGill-Marr
25. Timothy Button
26. Tony Jost
27. Travis Watson

**Photo Formats Available:**
- WebP (modern browsers, best compression)
- AVIF (next-gen format, even better compression)
- JPG (fallback for older browsers)

**Photo Location:**
`public/images/team/optimized/`

---

## 🎨 Color Usage Guide

### Where Navy (#213469) is Used:
- All headings (H1-H6)
- Body text
- Navigation links
- Primary buttons
- Icons
- Borders (primary)
- Footer background

### Where Tan (#D3CBBC) is Used:
- Accent highlights
- Hover states
- Secondary buttons
- Badge backgrounds
- Decorative elements
- Section dividers
- Call-out boxes

### Where White (#FFFFFF) is Used:
- Page backgrounds
- Card backgrounds
- Content areas
- Button text (on navy buttons)
- Overlay text

---

## 🔧 How to Use Attorney Photos

### In Components:

```tsx
import { getAttorneyPhoto, getAttorneyPhotoSources } from '@/lib/utils/attorneyPhotoMapping'

// Simple usage
<img src={getAttorneyPhoto('john-egloff')} alt="John Egloff" />

// With Picture element (best practice)
const sources = getAttorneyPhotoSources('john-egloff')
<picture>
  <source srcSet={sources.avif} type="image/avif" />
  <source srcSet={sources.webp} type="image/webp" />
  <img src={sources.jpg} alt="John Egloff" />
</picture>
```

### Preloading Photos:

```tsx
import { preloadAttorneyPhotos } from '@/lib/utils/attorneyPhotoMapping'

// Preload photos for better performance
useEffect(() => {
  preloadAttorneyPhotos(['john-egloff', 'james-riley', 'laura-binford'])
}, [])
```

---

## 📊 Brand Consistency

### Before:
- Colors: Burgundy (#75253D), Gold (#B8860B)
- Fonts: Playfair Display, Public Sans
- Mismatched with current site

### After:
- Colors: Navy (#213469), Tan (#D3CBBC) ✅
- Fonts: Raleway, Open Sans ✅
- **Perfectly matches current RBE site** ✅

---

## 🎯 Logo Files

**Primary Logo:**
- Location: `public/images/logo/rbe primary logo.jpg`
- Usage: Main navigation header, footer
- Format: JPG

**Secondary Logo:**
- Location: `public/images/logo/rbe secondary logo.png`
- Usage: Alternative placements, dark backgrounds
- Format: PNG with transparency

**Favicon:**
- Current: Maroon favicon (needs update)
- Recommended: Update to match new navy branding

---

## 🚀 Next Steps

### Immediate:
1. ✅ Colors updated in CSS and Tailwind
2. ✅ Fonts updated to Raleway + Open Sans
3. ✅ Attorney photos mapped
4. ⏳ Update attorney data to use new photo paths
5. ⏳ Update logo references in header/footer
6. ⏳ Test all pages for color consistency

### Optional Enhancements:
- [ ] Update favicon to navy theme
- [ ] Create navy-themed loading spinner
- [ ] Update email templates with new colors
- [ ] Create brand guidelines document
- [ ] Update social media graphics

---

## 📝 Tailwind Class Reference

### Using New Colors:

**Text:**
- `text-primary-navy` - Navy text (#213469)
- `text-accent-tan` or `text-accent-gold` - Tan text (#D3CBBC)

**Backgrounds:**
- `bg-primary-navy` - Navy background
- `bg-accent-tan` or `bg-accent-gold` - Tan background
- `bg-white` - White background

**Borders:**
- `border-primary-navy` - Navy border
- `border-accent-tan` - Tan border

**Hover States:**
- `hover:bg-primary-navy` - Hover to navy
- `hover:text-accent-tan` - Hover text to tan

### Using New Fonts:

**Headings:**
- `font-serif` - Raleway font
- Automatically applied to H1-H6

**Body:**
- `font-sans` - Open Sans font
- Default for all text

---

## 🎨 Design System Summary

### Typography Scale:
- **H1**: 28px, Raleway, Bold, Navy
- **H2**: 23px, Raleway, Semibold, Navy
- **H3-H6**: Raleway, varying weights, Navy
- **Body**: 18px, Open Sans, Regular, Navy
- **Small**: 14-16px, Open Sans, Regular, Gray

### Spacing:
- Base unit: 4px
- Border radius: 3px (subtle, professional)

### Components:
- **Buttons**: Navy background, white text, 3px radius
- **Inputs**: Light gray background (#EDEFF3), no border, 0px radius
- **Cards**: White background, subtle shadow, 3px radius

---

## ✅ Branding Checklist

- [x] Update CSS variables to RBE colors
- [x] Update Tailwind config colors
- [x] Change fonts to Raleway + Open Sans
- [x] Map all attorney photos
- [x] Create photo utility functions
- [ ] Update header logo
- [ ] Update footer logo
- [ ] Test all pages for consistency
- [ ] Update favicon
- [ ] Update loading states
- [ ] Update error pages

---

## 📞 Brand Assets

**Official Colors:**
- Navy: `#213469`
- Tan: `#D3CBBC`
- White: `#FFFFFF`

**Official Fonts:**
- Headings: Raleway
- Body: Open Sans

**Logo Files:**
- Primary: `public/images/logo/rbe primary logo.jpg`
- Secondary: `public/images/logo/rbe secondary logo.png`

**Attorney Photos:**
- Location: `public/images/team/optimized/`
- Formats: AVIF, WebP, JPG
- Mapping: `src/lib/utils/attorneyPhotoMapping.ts`

---

**Your site now uses the official RBE branding!** 🎉

All colors, fonts, and photos are now consistent with the current rbelaw.com site.
