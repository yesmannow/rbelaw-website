# "Wow Factor" Implementation Guide

This document outlines the visual and interactive enhancements implemented for the RBE Law website.

## Overview

The following enhancements have been added to create a modern, engaging user experience:

1. **Interactive Newsroom Mega Menu** - Dynamic navigation with featured content
2. **Lenis Smooth Scrolling** - Luxury weighted scroll effect
3. **Hero Parallax** - Depth effect on the hero section
4. **Bento Grid Practice Areas** - Modern grid layout with glowing hover effects
5. **Image Automation Tools** - Scripts to fetch and manage imagery

## Features

### 1. Interactive Newsroom Mega Menu

**Location:** `src/components/layout/NewsMegaMenu.tsx`

**Features:**
- Slide-open animation with stagger effect
- Left sidebar with quick links (Firm News, Legal Updates, Videos)
- Right feature area displaying the latest article from `news-archive.json`
- Hover card effect with subtle zoom on article image
- Integrated into the main navigation bar

**Usage:**
The menu automatically displays when hovering over the "Newsroom" link in the navigation.

**Data Source:**
Updates from `src/lib/data/news-archive.json`

### 2. Lenis Smooth Scrolling

**Location:** `src/hooks/useLenis.ts`

**Features:**
- Luxury weighted scroll feel across the entire site
- Custom easing function for natural deceleration
- Automatically initialized in the main App component

**Implementation:**
```tsx
import { useLenis } from './hooks/useLenis'

function App() {
  useLenis() // Initialize smooth scrolling
  // ...
}
```

### 3. Hero Parallax Effect

**Location:** `src/components/interactive/HeroParallax.tsx`

**Features:**
- Background moves at a different speed than foreground text
- Creates depth and visual interest
- Opacity fade as user scrolls down
- Reusable component for any section

**Usage:**
```tsx
import { HeroParallax } from '@/components/interactive/HeroParallax'

<HeroParallax className="text-white py-32">
  {/* Your hero content */}
</HeroParallax>
```

### 4. Bento Grid Layout

**Location:** `src/components/interactive/BentoGrid.tsx`

**Features:**
- Modern, asymmetric grid layout
- Glowing border effect on hover using CSS gradients
- Featured items can span multiple rows/columns
- Smooth scale animation on hover

**Usage:**
```tsx
import { BentoGrid, BentoGridItem } from '@/components/interactive/BentoGrid'

<BentoGrid>
  <BentoGridItem featured={true}>
    {/* Featured content spans 2 columns */}
  </BentoGridItem>
  <BentoGridItem>
    {/* Regular item */}
  </BentoGridItem>
</BentoGrid>
```

### 5. Image Automation Tools

**Location:** `scripts/`

Two Node.js scripts for managing website imagery:

#### a. Stock Photo Fetcher (`fetch-stock.js`)

Fetches high-resolution photos from Pixabay API.

**Setup:**
1. Get free API key from [Pixabay](https://pixabay.com/api/docs/)
2. Add to `.env`: `PIXABAY_KEY=your_key`

**Usage:**
```bash
npm run get-photos "courthouse" 5
npm run get-photos "modern office building" 1
```

#### b. Legacy Asset Rescue (`rescue-assets.js`)

Scrapes images from old WordPress site before migration.

**Usage:**
```bash
npm run rescue-assets
```

## Technical Details

### Dependencies Added

- `lenis` - Smooth scrolling library
- `axios` - HTTP client for image fetching scripts
- `dotenv` - Environment variable management

### New Type Definitions

Added to `src/lib/types/index.ts`:
- `NewsArchiveItem` - Type for news archive data

### Directory Structure

```
src/
├── components/
│   ├── interactive/
│   │   ├── BentoGrid.tsx
│   │   ├── HeroParallax.tsx
│   │   └── index.ts
│   └── layout/
│       └── NewsMegaMenu.tsx
├── hooks/
│   └── useLenis.ts
└── lib/
    └── data/
        └── news-archive.json

scripts/
├── fetch-stock.js
├── rescue-assets.js
└── README.md

public/
└── images/
    └── legacy/        # Legacy WordPress images

src/assets/
└── stock/            # Pixabay stock photos
```

## Animation Details

### Newsroom Menu
- **Initial:** `opacity: 0, y: -10`
- **Animate:** `opacity: 1, y: 0`
- **Duration:** 300ms with easeOut
- **Stagger:** 50ms delay between quick link items

### Hero Parallax
- **Scroll range:** From start to end of section
- **Y translation:** 0% to 50% (background moves slower)
- **Opacity:** 1 to 0.3 (fades on scroll)

### Bento Grid Hover
- **Scale:** 1.02 on hover
- **Border glow:** Gradient from accent-gold to accent-bronze
- **Duration:** 300ms

## Styling Techniques

### Glowing Border Effect

Uses pseudo-elements and gradients:
```css
.before:absolute .before:inset-0
.before:p-[2px]
.before:bg-gradient-to-br
.before:from-accent-gold
.before:to-accent-bronze
.before:opacity-0
.hover:before:opacity-100
```

### Smooth Scrolling

Lenis configuration:
```ts
duration: 1.2,
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
```

## Browser Support

- Modern browsers supporting:
  - CSS Grid
  - CSS Gradients
  - Framer Motion animations
  - ES6+ JavaScript

## Performance Notes

- Parallax effects use `transform` and `opacity` for GPU acceleration
- Smooth scrolling uses requestAnimationFrame for 60fps
- Image assets are lazy-loaded
- Animation durations optimized for smooth 60fps performance

## Maintenance

### Updating News Archive

Edit `src/lib/data/news-archive.json`:
```json
{
  "id": "unique-id",
  "title": "Article Title",
  "slug": "article-slug",
  "date": "2024-12-12",
  "category": "Firm News",
  "excerpt": "Brief description...",
  "image": "/images/legacy/article-slug.jpg",
  "url": "https://example.com/blog/article-slug"
}
```

The mega menu automatically displays the first (most recent) article.

### Adding New Stock Photos

```bash
# Search and download
npm run get-photos "your search term" 5

# Photos saved to src/assets/stock/
# Import in components as needed
```

## Future Enhancements

Potential additions:
- Video backgrounds in hero section
- 3D card flip effects for practice areas
- Animated statistics counters
- Interactive case study timeline
- Blog category filtering in mega menu
