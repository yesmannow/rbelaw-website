# Folder Structure Rationale
## Riley Bennett Egloff Website

This document explains **why** we chose this specific folder and file structure for the Riley Bennett Egloff website rebuild.

## Core Principles

1. **Scalability** - Easy to add new attorneys, practice areas, and pages
2. **Maintainability** - Clear separation of concerns, easy to find and modify code
3. **Type Safety** - TypeScript interfaces ensure data integrity
4. **Developer Experience** - Logical organization that developers can understand quickly

## Structure Breakdown

### `/src/components/`

**Purpose:** Reusable React components organized by type/purpose

#### `/components/layout/`
- **What:** Components used on every page (Navbar, Footer, RootLayout)
- **Why separated:** These are structural components that wrap the entire app
- **Pattern:** One component per file, index.ts for clean imports

```typescript
// Clean imports from outside
import { Navbar, Footer, RootLayout } from '@/components/layout'
```

#### `/components/sections/` (Future)
- **What:** Reusable page sections (Hero, CallToAction, Testimonials)
- **Why:** Practice areas and pages often share similar sections
- **Example:** A "CallToAction" section can be reused on multiple pages

#### `/components/ui/` (Future)
- **What:** Generic, primitive UI components (Button, Card, Input)
- **Why:** Consistent UI elements across the entire site
- **Inspiration:** This follows the shadcn/ui pattern for maximum reusability

### `/src/pages/`

**Purpose:** Top-level page components, organized by route

**Why this pattern:**
- One folder per major route section
- Keeps related pages together
- Easy to find the component for any URL
- Supports code-splitting by route

**Structure:**
```
pages/
├── home/
│   ├── HomePage.tsx      # Main component
│   └── index.ts          # Re-export for clean imports
├── practice-areas/
│   └── PracticeAreaPage.tsx
├── attorneys/
│   └── AttorneysPage.tsx
```

**Rationale:**
- Each page folder can grow to include page-specific components
- index.ts files enable: `import { HomePage } from '@/pages/home'`
- Mirrors the URL structure of the site

### `/src/lib/`

**Purpose:** Core application logic, utilities, and shared code

#### `/lib/data/`
- **What:** Data structures and data access functions
- **Why here:** Centralizes all data management
- **Current:** Static data arrays
- **Future:** Will become API client functions

**Example:**
```typescript
// Today: Static data
export const practiceAreas = [...]

// Future: API calls
export async function getPracticeAreas() {
  return fetch('/api/practice-areas')
}
```

This abstraction means pages don't need to change when we add a CMS!

#### `/lib/types/`
- **What:** TypeScript interface definitions
- **Why:** Single source of truth for data shapes
- **Benefit:** Change an interface once, TypeScript validates everywhere

**Example:**
```typescript
export interface Attorney {
  id: string
  name: string
  // ... rest of fields
}
```

Now every component that uses Attorney data is type-safe.

#### `/lib/utils/`
- **What:** Helper functions used across the app
- **Why:** DRY (Don't Repeat Yourself) principle
- **Example:** `cn()` function for merging Tailwind classes

### `/src/hooks/` (Future)

**Purpose:** Custom React hooks for shared logic

**Why separate:**
- React hooks are reusable logic, not components
- Easy to find all custom hooks in one place
- Naming convention: use[HookName].ts

**Examples:**
```typescript
useScroll()         // Scroll position tracking
useMediaQuery()     // Responsive breakpoint detection
usePracticeAreas()  // Data fetching hook (future)
```

### `/src/assets/`

**Purpose:** Static files (images, fonts, PDFs, etc.)

**Why organized by type:**
```
assets/
├── images/
│   ├── attorneys/    # Attorney headshots
│   ├── practice/     # Practice area images
│   └── general/      # Hero images, backgrounds
└── fonts/            # Custom fonts if needed
```

**Rationale:**
- Easy to find and manage media files
- Vite optimizes images during build
- Can add new asset types easily

## Why This Structure is Scalable

### Adding a New Attorney
1. Add data to `lib/data/attorneys.ts`
2. Add photo to `assets/images/attorneys/`
3. Done! They appear automatically

### Adding a New Practice Area
1. Add to `lib/data/practiceAreas.ts`
2. Automatically appears in navigation and homepage
3. Detail page works via dynamic routing

### Adding a New Page Type
1. Create folder in `pages/[type]/`
2. Add route in `App.tsx`
3. Update navigation if needed

### Migrating to a CMS
1. Replace `lib/data/*.ts` exports with API calls
2. Add loading states to components
3. Data types stay the same (TypeScript validates)

## Alternative Structures Considered

### ❌ Feature-Based Structure
```
src/
├── attorneys/
│   ├── components/
│   ├── pages/
│   └── data/
```

**Why we didn't use it:**
- Harder to share components between features
- Becomes complex with cross-cutting concerns
- Less intuitive for law firm website structure

### ❌ Flat Structure
```
src/
├── HomePage.tsx
├── AboutPage.tsx
├── Navbar.tsx
...
```

**Why we didn't use it:**
- Doesn't scale beyond 10-15 files
- No logical grouping
- Hard to find related files

### ✅ Layer-Based Structure (What We Chose)
```
src/
├── components/    # UI Layer
├── pages/        # Page Layer
├── lib/          # Logic Layer
```

**Why this works:**
- Clear separation of concerns
- Intuitive for developers
- Scales to hundreds of files
- Industry standard for React apps

## File Naming Conventions

### Components
- **PascalCase:** `Navbar.tsx`, `HomePage.tsx`
- **Why:** Matches React component names

### Utilities & Data
- **camelCase:** `practiceAreas.ts`, `attorneys.ts`
- **Why:** Matches JavaScript variable naming

### Types
- **PascalCase interfaces:** `Attorney`, `PracticeArea`
- **Why:** TypeScript convention

### Index Files
- **Always lowercase:** `index.ts`
- **Purpose:** Re-export for clean imports

## Import Patterns

We use path aliases for clean imports:

```typescript
// ✅ Good (with @ alias)
import { cn } from '@/lib/utils'
import { HomePage } from '@/pages/home'

// ❌ Avoid (relative paths)
import { cn } from '../../../lib/utils'
import { HomePage } from '../../pages/home'
```

**Configuration:** `tsconfig.json` and `vite.config.ts`

## Data Flow Architecture

```
User Action
    ↓
Component (React)
    ↓
Data Layer (lib/data)
    ↓
Static Data (today) OR API Call (future)
    ↓
TypeScript Types Validate
    ↓
Component Renders
```

**Why this pattern:**
- Components don't know where data comes from
- Easy to swap data sources
- Type safety at every step

## Future Growth

This structure supports:

### ✅ Blog Section
```
pages/blog/
├── BlogListPage.tsx
├── BlogPostPage.tsx
lib/data/
├── blogPosts.ts
```

### ✅ CMS Integration
```
lib/api/
├── client.ts
├── practiceAreas.ts
├── attorneys.ts
```

### ✅ Authentication (if needed)
```
lib/auth/
hooks/useAuth.ts
```

### ✅ Testing
```
components/layout/__tests__/
pages/home/__tests__/
```

## Summary

This folder structure is designed specifically for a law firm website that:
- Has multiple practice areas
- Has multiple attorneys
- Needs to scale over time
- May integrate with a CMS
- Requires type safety
- Should be easy for developers to understand

Every folder and file has a clear purpose, making the codebase maintainable and developer-friendly.

---

**Questions?** See README.md and ARCHITECTURE.md for more details.
