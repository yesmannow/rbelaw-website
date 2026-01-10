# Quick Start Guide: 2026 Wow-Factor Features

## 🎯 Quick Reference

### Interactive Tools in Practice Areas

**File**: `src/lib/data/toolMappings.ts`

Add a new tool mapping:
```typescript
{
  slug: 'practice-area-slug',
  toolId: 'component-id',
  toolName: 'Display Name',
  toolDescription: 'User-facing description'
}
```

Tool automatically appears on matching practice area pages.

---

### Attorney Video Hover

**File**: `src/lib/types/prestige.ts`

Add to attorney data:
```typescript
{
  // ... existing fields
  hoverVideoUrl: '/videos/attorney-name.mp4'
}
```

Requirements:
- Video must be muted
- MP4 format recommended
- Optimal: 500-800px width
- Keep file size under 5MB

---

### Success Counters

**File**: `src/lib/data/impactMetrics.ts`

Add/update metrics:
```typescript
{
  id: 'metric-id',
  value: 1500,
  label: 'Metric Label',
  suffix: '+',  // or prefix: '$'
}
```

Displays in "Success in Motion" section on homepage.

---

### Swooping Path Animations

**Component**: `PrestigePath`

```tsx
import { PrestigePath } from '@/components/ui/PrestigePath'

<div className="relative">
  <PrestigePath 
    direction="left-to-right"  // or "right-to-left", "top-to-bottom"
    offsetY={-50}               // vertical positioning
    show={true}                 // conditional rendering
  />
  <YourSection />
</div>
```

---

## 🚀 Component Locations

| Component | Path |
|-----------|------|
| ImpactCounter | `src/components/home/ImpactCounter.tsx` |
| FeaturedTool | `src/components/practice-areas/FeaturedTool.tsx` |
| PrestigePath | `src/components/ui/PrestigePath.tsx` |
| AttorneyCard (enhanced) | `src/components/attorneys/AttorneyCard.tsx` |

---

## 🎨 Design Tokens

```typescript
// Colors
Navy: #0A2540
Gold: #B8860B

// Glassmorphism
bg-primary-navy/90 backdrop-blur-sm

// Gold Glow
border-accent-gold/20 hover:shadow-accent-gold/20

// Typography
font-display (Playfair Display)
font-serif (Raleway)
font-sans (Open Sans)
```

---

## 📱 Responsive Breakpoints

```tsx
// Mobile-first approach
text-4xl md:text-5xl           // Text
grid-cols-1 md:grid-cols-2     // Grid
py-16 md:py-24                 // Spacing
```

Breakpoints:
- `md`: 768px (tablets)
- `lg`: 1024px (desktop)

---

## ✅ Testing Commands

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint
```

---

## 🔧 Common Tasks

### Add Tool to Construction Page
1. Open `src/lib/data/toolMappings.ts`
2. Add mapping with `slug: 'construction'`
3. Tool appears automatically

### Update Success Metrics
1. Edit `src/lib/data/impactMetrics.ts`
2. Change `value` property
3. Rebuild - counters update automatically

### Add Video to Attorney
1. Place video in `public/videos/`
2. Update attorney data with `hoverVideoUrl: '/videos/name.mp4'`
3. Video appears on hover

---

## 🎭 Animation Settings

```typescript
// Spring Physics (smooth counting)
{
  stiffness: 50,
  damping: 30,
  restDelta: 0.001
}

// Fade Duration (image to video)
duration: 0.5s

// Path Drawing (swooping lines)
useScroll + useSpring
```

---

## 📋 Zero Placeholders Policy

Components only render when data exists:

```tsx
{featuredTool && <FeaturedTool mapping={featuredTool} />}
{team.length > 0 && <TeamSection />}
```

No empty states, loading spinners, or placeholder content.

---

## 🐛 Troubleshooting

**Tool not showing?**
- Check slug matches in `toolMappings.ts`
- Verify tool component exported in `src/components/tools/index.ts`

**Video not playing?**
- Check file path is correct
- Ensure video is muted (required for autoplay)
- Test in browser console: `document.querySelector('video')`

**Animation not smooth?**
- Check `useInView` configuration
- Verify `AnimatePresence` wrapper exists
- Test on physical device for mobile

**Build failing?**
- Run `npm install`
- Check TypeScript errors: `npm run build`
- Verify all imports are correct

---

## 📚 Documentation

Full details: `WOW_FACTOR_2026_IMPLEMENTATION.md`

Component examples in source files.
