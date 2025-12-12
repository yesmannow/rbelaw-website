# Architecture Documentation
# Riley Bennett Egloff Website Rebuild

## Overview

This document explains the architectural decisions, folder structure, and development patterns for the Riley Bennett Egloff website rebuild. This is a transition from WordPress to a modern React-based static site deployed via Cloudflare Pages.

## Technology Choices

### Core Stack
1. **Vite + React 19** - Fast build tool with modern React features
2. **TypeScript (Strict Mode)** - Type safety and better developer experience
3. **Tailwind CSS v4** - Utility-first CSS for rapid, consistent styling
4. **React Router DOM v6** - Client-side routing with clean URL structure
5. **Framer Motion** - Subtle, professional animations

### Why This Stack?

- **Performance:** Vite provides incredibly fast HMR and optimized builds
- **Type Safety:** TypeScript catches errors before runtime
- **Maintainability:** Clear component structure and typed data
- **Scalability:** Easy to add new practice areas, attorneys, and pages
- **SEO-Ready:** Can be extended with SSR/SSG if needed

## Folder Structure Explained

```
src/
├── components/
│   ├── layout/              # Shared layout components
│   │   ├── Navbar.tsx       # Main navigation with mega-menu
│   │   ├── Footer.tsx       # Site footer
│   │   └── RootLayout.tsx   # Root layout wrapper with Outlet
│   ├── sections/            # Reusable page sections (future)
│   │   ├── Hero.tsx
│   │   ├── CallToAction.tsx
│   │   └── Testimonials.tsx
│   └── ui/                  # Generic UI components (future)
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
│
├── pages/                   # Page components (one per route)
│   ├── home/
│   │   ├── HomePage.tsx
│   │   └── index.ts
│   ├── practice-areas/
│   │   ├── PracticeAreaPage.tsx
│   │   └── index.ts
│   ├── attorneys/
│   │   ├── AttorneysPage.tsx
│   │   ├── AttorneyProfilePage.tsx (future)
│   │   └── index.ts
│   ├── about/
│   │   ├── AboutPage.tsx
│   │   └── index.ts
│   └── contact/
│       ├── ContactPage.tsx
│       └── index.ts
│
├── lib/                     # Core application logic
│   ├── data/               # Data layer (mock data, API clients)
│   │   ├── practiceAreas.ts # Practice area data and queries
│   │   ├── attorneys.ts     # Attorney data and queries
│   │   └── index.ts
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts        # All type definitions
│   └── utils/              # Utility functions
│       ├── cn.ts           # Tailwind class merger
│       └── index.ts
│
├── hooks/                  # Custom React hooks (future)
│   ├── useScroll.ts
│   └── useMediaQuery.ts
│
├── assets/                 # Static assets
│   ├── images/
│   └── fonts/
│
├── App.tsx                 # Main app component with routing
├── main.tsx                # Application entry point
└── index.css               # Global styles and Tailwind directives
```

## Key Architectural Patterns

### 1. Data Layer Abstraction

The `lib/data/` folder provides a clean abstraction for data access:

```typescript
// Current: Static data
import { practiceAreas } from '@/lib/data'

// Future: API integration
import { usePracticeAreas } from '@/lib/api'
```

This pattern allows easy migration to:
- Headless CMS (Contentful, Sanity)
- REST API
- GraphQL
- Headless WordPress

### 2. Type-First Development

All data structures are defined in `lib/types/index.ts`:

```typescript
export interface Attorney {
  id: string
  name: string
  title: string
  // ... full type definition
}
```

Benefits:
- Autocomplete in IDEs
- Compile-time error checking
- Self-documenting code
- Easier refactoring

### 3. Component Hierarchy

**Layout Components** (used once, wrap entire app)
- Navbar
- Footer
- RootLayout

**Page Components** (one per route)
- HomePage
- PracticeAreaPage
- AttorneysPage
- etc.

**Section Components** (reusable sections)
- Hero
- CallToAction
- PracticeAreaGrid

**UI Components** (primitive building blocks)
- Button
- Card
- Input

### 4. Routing Strategy

Using React Router DOM v6 with nested routes:

```typescript
<Route path="/" element={<RootLayout />}>
  <Route index element={<HomePage />} />
  <Route path="practice-areas/:slug" element={<PracticeAreaPage />} />
  // ...
</Route>
```

Benefits:
- Shared layout across pages
- Clean URL structure
- Easy to add new routes
- Supports future authenticated routes

## Styling Architecture

### Tailwind CSS Custom Configuration

Custom theme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    navy: '#0A2540',
    slate: '#334155',
  },
  accent: {
    gold: '#B8860B',
    bronze: '#CD7F32',
  }
}
```

### Custom CSS Classes

Defined in `index.css` using Tailwind's `@layer`:

```css
@layer components {
  .btn-primary { /* ... */ }
  .section-container { /* ... */ }
  .heading-primary { /* ... */ }
}
```

### Why This Approach?

1. **Consistency:** Reusable utility classes
2. **Performance:** Only includes used classes in production
3. **Maintainability:** Easy to update brand colors
4. **Flexibility:** Can override with inline Tailwind classes

## Data Flow

### Current (Static Data)
```
Component → lib/data → Static Array → Render
```

### Future (API Integration)
```
Component → Custom Hook → API Client → State → Render
```

Example migration path:

```typescript
// Before
import { practiceAreas } from '@/lib/data'

// After
import { usePracticeAreas } from '@/lib/hooks'
const { data: practiceAreas, loading } = usePracticeAreas()
```

## Scalability Considerations

### Adding New Practice Areas
1. Add to `practiceAreas` array in `lib/data/practiceAreas.ts`
2. Automatically appears in navigation and homepage
3. Detail page generated via route parameter

### Adding Attorneys
1. Add to `attorneys` array in `lib/data/attorneys.ts`
2. Add profile photo to `assets/images/attorneys/`
3. Automatically appears in attorneys list

### Adding New Pages
1. Create component in `pages/[name]/`
2. Add route in `App.tsx`
3. Update navigation in `Navbar.tsx`

### CMS Integration (Future)

To integrate a CMS:

1. Replace `lib/data/*.ts` exports with API calls
2. Add loading states to components
3. Add error handling
4. Consider adding React Query for caching

Example:

```typescript
// lib/api/practiceAreas.ts
export async function getPracticeAreas() {
  const response = await fetch('https://cms.rbelaw.com/api/practice-areas')
  return response.json()
}

// Custom hook
export function usePracticeAreas() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getPracticeAreas().then(setData).finally(() => setLoading(false))
  }, [])
  
  return { data, loading }
}
```

## Performance Optimizations

1. **Code Splitting:** React Router automatically splits by route
2. **Lazy Loading:** Can add `React.lazy()` for large components
3. **Image Optimization:** Use modern formats (WebP, AVIF)
4. **Tree Shaking:** Vite removes unused code
5. **Minification:** Production builds are minified

## Deployment Strategy

### Cloudflare Pages

1. **Build Command:** `npm run build`
2. **Output Directory:** `dist`
3. **Deploy Preview:** Every PR gets a preview URL
4. **Production:** Merges to main deploy automatically

### Environment-Specific Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion'],
        }
      }
    }
  }
})
```

## Future Enhancements

### Phase 2: Advanced Features
- [ ] Attorney profile pages with individual routes
- [ ] Blog/news section
- [ ] Case studies and success stories
- [ ] Search functionality
- [ ] Contact form backend integration

### Phase 3: CMS Integration
- [ ] Choose and integrate CMS (Contentful/Sanity recommended)
- [ ] Migrate static data to CMS
- [ ] Add preview mode for content editors
- [ ] Implement webhooks for auto-deploy on content changes

### Phase 4: SEO & Performance
- [ ] Add meta tags and structured data
- [ ] Implement SSR with Vite SSR or Next.js migration
- [ ] Add sitemap generation
- [ ] Implement analytics

## Development Workflow

1. **Local Development:** `npm run dev`
2. **Type Checking:** TypeScript in strict mode catches errors
3. **Linting:** ESLint for code quality
4. **Building:** `npm run build` for production build
5. **Preview:** `npm run preview` to test production build locally

## Best Practices

1. **Keep components small and focused**
2. **Use TypeScript types for all props and data**
3. **Follow existing naming conventions**
4. **Keep data layer separate from UI**
5. **Use semantic HTML for accessibility**
6. **Test responsive design at multiple breakpoints**
7. **Optimize images before adding to assets**
8. **Document complex logic with comments**

## Questions or Issues?

Refer to the main README.md for setup instructions and common tasks.
