# Riley Bennett Egloff Website - Quick Start Guide

## What We Built

A modern, high-performance website for Riley Bennett Egloff law firm built with:
- **React 19** + **Vite** for blazing-fast development and builds
- **TypeScript** in strict mode for type safety
- **Tailwind CSS v3** with custom corporate branding
- **React Router v6** for clean, SEO-friendly URLs
- **Framer Motion** for subtle professional animations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:5173 to see the site.

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure at a Glance

```
src/
├── components/layout/    # Navbar, Footer, RootLayout
├── pages/               # Homepage, Practice Areas, Contact, etc.
├── lib/
│   ├── data/           # Practice areas & attorney data
│   ├── types/          # TypeScript interfaces
│   └── utils/          # Helper functions
└── assets/             # Images, fonts
```

## Key Files to Know

- **`src/App.tsx`** - Main routing configuration
- **`src/lib/data/practiceAreas.ts`** - Practice area content
- **`src/lib/data/attorneys.ts`** - Attorney profiles (ready to populate)
- **`tailwind.config.js`** - Brand colors and design tokens
- **`src/index.css`** - Global styles and custom CSS classes

## Design System

### Colors

```js
primary-navy: #0A2540  // Main brand color
primary-slate: #334155 // Secondary
accent-gold: #B8860B   // Accent/CTA buttons
accent-bronze: #CD7F32 // Secondary accent
```

### Typography

- **Headings:** Playfair Display (serif) - for authority
- **Body:** Inter (sans-serif) - for clarity

### Custom CSS Classes

```css
.btn-primary         // Primary button style
.btn-secondary       // Secondary button style
.section-container   // Page section wrapper
.heading-primary     // Large serif heading
.heading-secondary   // Medium serif heading
```

## Adding Content

### Add a New Practice Area

Edit `src/lib/data/practiceAreas.ts`:

```typescript
{
  id: 'new-area',
  name: 'Practice Area Name',
  slug: 'practice-area-name',
  description: 'Short description',
  detailedDescription: 'Longer description',
  icon: 'Scale', // Lucide icon name
  attorneys: [],
  subAreas: ['Sub Area 1', 'Sub Area 2']
}
```

It will automatically appear in:
- Navigation menu
- Homepage grid
- Footer links

### Add an Attorney

Edit `src/lib/data/attorneys.ts`:

```typescript
{
  id: 'john-doe',
  name: 'John Doe',
  title: 'Partner',
  email: 'jdoe@rbelaw.com',
  phone: '(123) 456-7890',
  bio: 'Attorney biography...',
  imageUrl: '/images/attorneys/john-doe.jpg',
  practiceAreas: ['corporate-law', 'litigation'],
  education: [
    {
      degree: 'J.D.',
      institution: 'Harvard Law School',
      year: '2010'
    }
  ],
  barAdmissions: ['Missouri', 'Kansas']
}
```

## Customization

### Change Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    navy: '#YourColor',
    // ...
  }
}
```

### Modify Navigation

Edit `src/components/layout/Navbar.tsx`

### Update Footer

Edit `src/components/layout/Footer.tsx`

## Deployment to Cloudflare Pages

1. Connect your GitHub repo to Cloudflare Pages
2. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18 or higher

3. Deploy! Your site will be live on Cloudflare's edge network.

## File Organization Philosophy

We organized the code to be:
- **Scalable** - Easy to add pages, components, attorneys
- **Maintainable** - Clear separation of concerns
- **Type-safe** - TypeScript catches errors early
- **Documented** - README and ARCHITECTURE.md explain everything

## Common Tasks

### Add a New Page

1. Create component in `src/pages/[name]/`
2. Add route in `src/App.tsx`
3. Add link in `src/components/layout/Navbar.tsx`

### Update Site Copy

- Homepage: `src/pages/home/HomePage.tsx`
- About: `src/pages/about/AboutPage.tsx`
- Contact: `src/pages/contact/ContactPage.tsx`

### Change Fonts

Edit Google Fonts import in `src/index.css` and update `tailwind.config.js`

## Performance

Current build size:
- CSS: ~18 KB (gzipped: 4 KB)
- JS: ~369 KB (gzipped: 117 KB)

These are excellent sizes for a modern React app.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Need Help?

See the detailed documentation:
- **README.md** - Complete project overview
- **ARCHITECTURE.md** - Deep dive into architecture decisions
- **This file** - Quick reference for common tasks

## Next Steps

1. **Add real attorney profiles** to `src/lib/data/attorneys.ts`
2. **Add attorney photos** to `src/assets/images/attorneys/`
3. **Customize copy** on each page for your firm
4. **Deploy to Cloudflare Pages** and test
5. **Point rbelaw.com DNS** to Cloudflare Pages

---

Built with ❤️ for Riley Bennett Egloff
