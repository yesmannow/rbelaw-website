# Attorney Bio Engine & Conversion Tools - Implementation Guide

## Overview

This document describes the new "Crown Jewel" features added to the Riley Bennett Egloff website: The Attorney Bio Engine and High-Value Conversion Tools.

## Features Implemented

### 1. Attorney Bio Page (`/attorneys/:id`)

A sophisticated, modern attorney biography page that rivals Tier 1 global law firms.

#### Key Components:

**BioHero Component** (`src/components/team/BioHero.tsx`)
- Split-screen layout with parallax image effect
- Attorney headshot with smooth parallax scrolling
- Name, title, and contact information
- Social media links (LinkedIn, Twitter)
- vCard download option
- "Download Print Bio" button with PDF generation

**BioStickyNav Component** (`src/components/team/BioStickyNav.tsx`)
- Sticky navigation that anchors to sections
- Auto-highlights active section based on scroll position
- Smooth scroll to section on click
- Animated underline indicator using Framer Motion

**AttorneyBio Page** (`src/pages/team/AttorneyBio.tsx`)
- Section-based content with scroll animations
- Biography section
- Searchable/filterable Representative Matters
- Education section
- Professional Associations section
- Community Involvement section
- All sections fade in as user scrolls

#### Usage:

Navigate to `/attorneys/:id` where `:id` is the attorney's ID from the attorneys data file.

Example: `/attorneys/donald-smith`

### 2. Printable Bio / PDF Generator

**PrintableBioTemplate Component** (`src/components/team/PrintableBioTemplate.tsx`)

A professional, print-optimized bio template that generates clean PDFs matching the "DSS Print Bio" style.

#### Features:
- Header with firm logo and contact information
- Two-column layout for optimal readability
- Professional typography and spacing
- CSS `@media print` optimized
- Integration with `react-to-print` library

#### How it Works:
1. User clicks "Download Print Bio" button
2. `react-to-print` triggers browser's print dialog
3. The print template is rendered with specialized print CSS
4. User can save as PDF or print directly

### 3. Contextual CTA Component

**ContextualCTA Component** (`src/components/marketing/ContextualCTA.tsx`)

Smart, context-aware pop-ups that appear based on user behavior.

#### Features:
- Glass-morphism design matching modern UI trends
- Triggers based on:
  - Time delay (default: 10 seconds)
  - Scroll depth (default: 50%)
- Session-based dismissal (won't show again in same session)
- Spring physics animation
- Customizable per practice area

#### Example Usage:

```tsx
<ContextualCTA
  practiceAreaId="employment-law"
  title="2025 Employment Law Guide"
  description="Download our comprehensive guide to navigating employment law in Indiana."
  ctaText="Download Free Guide"
  ctaLink="/contact"
  delay={10}
  scrollDepth={50}
/>
```

See implementation in `src/pages/practice-areas/PracticeAreaPage.tsx` for employment law practice area.

### 4. Complete Attorney Roster

**Attorneys Data** (`src/lib/data/attorneys.ts`)

All 28 attorneys have been added to the system:

- Laura K. Binford
- Beau Browning
- Timothy H. Button
- K. Douglas Cook
- John L. Egloff
- Jeffrey B. Fecht
- Jaclyn M. Flint
- Kathleen Hart
- Eric M. Hylton
- Anthony R. Jost
- Ryan L. Leitch
- Lindsay A. Llewellyn
- Sarah MacGill Marr
- Anna K. Marvin
- Patrick S. McCarney
- Courtney David Mills
- Katie R. Osborne
- Laura S. Reed
- Katie S. Riles
- James W. Riley Jr.
- Raymond T. Seach
- Donald S. Smith
- Justin O. Sorrell
- Kevin N. Tharp
- Blair R. Vandivier
- Travis R. Watson
- J.T. Wynne
- Megan S. Young

### 5. Enhanced Type System

**Updated Types** (`src/lib/types/index.ts`)

New fields added to the Attorney interface:
- `representativeMatters?: RepresentativeMatter[]` - Searchable case list
- `associations?: string[]` - Professional associations
- `community?: string[]` - Community involvement
- `twitter?: string` - Twitter profile link

## File Structure

```
src/
├── components/
│   ├── team/
│   │   ├── BioHero.tsx                  # Hero section with parallax
│   │   ├── BioStickyNav.tsx             # Sticky navigation
│   │   ├── PrintableBioTemplate.tsx     # Print-optimized template
│   │   └── index.ts
│   └── marketing/
│       ├── ContextualCTA.tsx            # Smart pop-up component
│       └── index.ts
├── pages/
│   └── team/
│       ├── AttorneyBio.tsx              # Main bio page
│       └── index.ts
└── lib/
    ├── data/
    │   └── attorneys.ts                 # Complete attorney roster
    └── types/
        └── index.ts                     # Type definitions
```

## How to Add Attorney Data

To add representative matters, associations, or community involvement to an attorney:

```typescript
{
  id: 'attorney-id',
  name: 'Attorney Name',
  // ... other fields
  representativeMatters: [
    {
      title: 'Case Title',
      description: 'Brief description of the matter',
      year: '2024',
      practiceArea: 'Employment Law'
    }
  ],
  associations: [
    'Indiana State Bar Association',
    'American Bar Association'
  ],
  community: [
    'Board Member, Indianapolis Legal Aid',
    'Volunteer, Indiana Pro Bono Commission'
  ]
}
```

## Customizing the ContextualCTA

To add a contextual CTA to any page:

1. Import the component:
```tsx
import { ContextualCTA } from '@/components/marketing'
```

2. Add it to your page component:
```tsx
<ContextualCTA
  practiceAreaId="unique-id"
  title="Your Title"
  description="Your description"
  ctaText="Button Text"
  ctaLink="/your-link"
  delay={10}          // seconds before showing
  scrollDepth={50}    // percentage of page scroll
/>
```

## Animation Details

All components use Framer Motion for smooth, professional animations:

- **Fade-in on scroll**: Components animate as they enter viewport
- **Parallax effects**: Hero images move at different speeds
- **Spring physics**: CTAs slide in with natural motion
- **Layout animations**: Active nav indicators smoothly transition

## Print Styling

The print template uses these principles:
- Two-column layout for efficient use of space
- Georgia serif font for professional appearance
- Optimized for 8.5" x 11" paper
- 0.5" margins all around
- Firm branding in header
- Clear section hierarchy

## Browser Compatibility

All features are tested and work in:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Dependencies Added

- `react-to-print@3.2.0` - For PDF generation functionality

## Next Steps

To complete the attorney bio experience:

1. **Add Attorney Photos**: Place high-resolution headshots in `/public/images/team/`
2. **Populate Attorney Data**: Add detailed bios, matters, and associations
3. **Create vCards**: Generate .vcf files for contact downloads
4. **Set up Analytics**: Track CTA conversions and bio page views
5. **Add SEO Meta Tags**: Optimize each attorney page for search engines

## Performance Notes

- The bio page uses lazy loading for images
- Animations only run when elements are in viewport
- Print template is hidden until print is triggered
- CTAs use session storage to prevent repeated displays

## Accessibility

- All interactive elements are keyboard accessible
- ARIA labels on icon buttons
- Semantic HTML throughout
- Focus indicators on all focusable elements
- Skip links could be added for screen readers

## Support

For questions or issues with these features, refer to:
- Component source code with inline documentation
- Type definitions in `src/lib/types/index.ts`
- Framer Motion docs: https://www.framer.com/motion/
- react-to-print docs: https://github.com/gregnb/react-to-print
