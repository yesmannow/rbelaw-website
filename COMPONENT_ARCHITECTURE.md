# Attorney Bio Engine - Component Architecture

## Component Hierarchy

```
AttorneyBio Page (/attorneys/:id)
├── BioHero
│   ├── Parallax Image
│   ├── Attorney Info (Name, Title)
│   ├── Contact Info (Email, Phone)
│   ├── Social Links (LinkedIn, Twitter, vCard)
│   └── Print Bio Button
│
├── BioStickyNav
│   ├── Biography Link
│   ├── Representative Matters Link
│   ├── Education Link
│   ├── Associations Link
│   └── Community Link
│
├── Biography Section
│   └── Rich Text Content
│
├── Representative Matters Section
│   ├── Search/Filter Input
│   └── Matter Cards (filterable)
│       ├── Title
│       ├── Description
│       ├── Year
│       └── Practice Area Tag
│
├── Education Section
│   └── Education Cards
│       ├── Degree
│       ├── Institution
│       └── Year
│
├── Associations Section
│   └── Association List Items
│
├── Community Section
│   └── Community Involvement Items
│
└── PrintableBioTemplate (hidden, print-only)
    ├── Firm Header & Logo
    ├── Attorney Name & Title
    └── Two-Column Layout
        ├── Left Column
        │   ├── Contact
        │   ├── Education
        │   ├── Bar Admissions
        │   ├── Associations
        │   └── Awards
        └── Right Column
            ├── Biography
            ├── Representative Matters
            ├── Publications
            └── Community
```

## ContextualCTA Integration

```
Practice Area Page
├── Hero Section
├── Main Content
├── Sidebar
└── ContextualCTA (conditional)
    ├── Glass-morphism Card
    ├── Icon & Title
    ├── Description
    ├── CTA Button
    └── Dismiss Button

Triggers:
- Time-based: Shows after 10 seconds
- Scroll-based: Shows at 50% page scroll
- Session-aware: Dismissed status persists
```

## Data Flow

```
attorneys.ts (Data Source)
    ↓
Attorney Type (TypeScript Interface)
    ↓
getAttorneyById(id) (Data Access Function)
    ↓
AttorneyBio Component (Page)
    ↓
├── BioHero (receives attorney data)
├── BioStickyNav (receives sections)
├── Content Sections (receive attorney data)
└── PrintableBioTemplate (receives attorney data)
```

## Animation Flow

```
Page Load
    ↓
BioHero: Fade in + Slide up (0.8s)
    ↓
Image: Parallax effect (continuous on scroll)
    ↓
BioStickyNav: Sticky positioning
    ↓
Sections: Fade in when entering viewport
    ↓
    ├── Biography: Fade + Slide (0.6s)
    ├── Matters: Fade + Slide (0.6s)
    ├── Education: Fade + Slide (0.6s)
    ├── Associations: Fade + Slide (0.6s)
    └── Community: Fade + Slide (0.6s)

Search Interaction
    ↓
Filter matters → useMemo (optimized)
    ↓
AnimatePresence: Smooth exit/enter animations
```

## Print Flow

```
User clicks "Download Print Bio"
    ↓
useReactToPrint hook triggered
    ↓
PrintableBioTemplate rendered (hidden div)
    ↓
Browser print dialog opens
    ↓
CSS @media print applies
    ↓
    ├── Hide navigation, footer, buttons
    ├── Apply print-specific layout
    ├── Optimize typography for paper
    └── Add firm branding header
    ↓
User saves as PDF or prints
```

## Performance Optimizations

### Throttling
```javascript
Scroll Event → throttle(100ms) → Update Active Section
Scroll Event → throttle(100ms) → Check CTA Trigger
```

### Memoization
```javascript
Filter Input Change → useMemo → Filtered Matters
(Only recalculates when matterFilter or matters change)
```

### Lazy Loading
```javascript
Viewport Intersection → whileInView → Trigger Animation
(Animations only run for visible sections)
```

## Styling Architecture

### Tailwind Classes
- `section-container` - Consistent max-width container
- `heading-primary` - Primary heading style
- `btn-primary` - Primary button style
- Custom colors: `primary-navy`, `accent-gold`

### Framer Motion Variants
- `initial={{ opacity: 0, y: 20 }}`
- `animate={{ opacity: 1, y: 0 }}`
- `transition={{ duration: 0.6 }}`

### Print Styles
- Two-column grid: `2.5in | 1fr`
- Font size: `11pt` base
- Serif font for print readability
- Page breaks avoided on sections

## Routes

```
/attorneys                  → Attorneys listing page (existing)
/attorneys/:id             → Individual attorney bio page (new)
/practice-areas/:slug      → Practice area page with ContextualCTA
```

## State Management

### Local State (useState)
- `matterFilter` - Search input value
- `isVisible` - CTA visibility state
- `isDismissed` - CTA dismissal state
- `activeSection` - Active nav section

### Session Storage
- `cta-dismissed-{practiceAreaId}` - CTA dismissal persistence

### Derived State (useMemo)
- `filteredMatters` - Computed from matterFilter

## Browser APIs Used

- `window.scrollY` - Scroll position tracking
- `window.innerHeight` - Viewport height
- `document.documentElement.scrollHeight` - Page height
- `sessionStorage` - CTA state persistence
- `window.print()` - Via react-to-print

## Accessibility Features

- Semantic HTML throughout
- ARIA labels on icon buttons
- Keyboard navigation support
- Focus indicators on interactive elements
- Smooth scroll with reduced motion support
- Screen reader friendly structure

## Future Enhancements (Not Required)

- Server-side rendering for SEO
- Image optimization with next/image equivalent
- Analytics event tracking
- A/B testing for CTA designs
- Multi-language support
- Dark mode support
