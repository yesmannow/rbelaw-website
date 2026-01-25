# Riley Bennett Egloff Website

A modern, high-performance website for Riley Bennett Egloff LLP - a premier mid-sized law firm specializing in Corporate Law, Insurance Defense, Construction, and Litigation.

## 🏗️ Tech Stack

- **Framework:** React 19 with Vite
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with custom corporate branding
- **UI Components:** Custom components with Lucide React icons
- **Routing:** React Router DOM v6
- **Animation:** Framer Motion
- **Deployment:** Cloudflare Pages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── layout/          # Layout components (Navbar, Footer, RootLayout)
│   ├── sections/        # Page-specific sections
│   └── ui/              # Generic UI components
├── pages/               # Page components organized by route
│   ├── home/           # Homepage
│   ├── practice-areas/ # Practice area detail pages
│   ├── attorneys/      # Attorney listing and profiles
│   ├── about/          # About page
│   └── contact/        # Contact page
├── lib/                # Utility functions and shared logic
│   ├── data/           # Data structures and mock data
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
├── hooks/              # Custom React hooks
├── assets/             # Static assets (images, fonts)
└── index.css           # Global styles and Tailwind directives
```

## 🎨 Design System

### Colors
- **Primary Navy:** `#0A2540` - Main brand color
- **Slate Grey:** `#334155` - Secondary
- **Gold Accent:** `#B8860B` - Subtle accent
- **Bronze Accent:** `#CD7F32` - Secondary accent

### Typography
- **Sans-serif (UI):** Inter
- **Serif (Headings):** Playfair Display

### Key Principles
- Professional, authoritative, "Big Law" aesthetic
- Clean, modern design with subtle animations
- Mobile-first responsive approach
- Accessibility-focused components

## 🏛️ Architecture Decisions

### Data Management
Currently using static data structures in `src/lib/data/`. This is designed to be easily replaced with:
- CMS integration (e.g., Contentful, Sanity)
- API endpoints
- Headless WordPress

### Routing Structure
```
/                           → Homepage
/practice-areas/:slug       → Practice area detail
/attorneys                  → Attorney listing
/attorneys/:id              → Attorney profile (future)
/about                      → About page
/contact                    → Contact page
```

### Component Organization
- **Layout Components:** Shared across all pages (Navbar, Footer)
- **Page Components:** Route-specific top-level components
- **Section Components:** Reusable page sections
- **UI Components:** Generic, reusable building blocks

### Type Safety
All data structures are fully typed using TypeScript interfaces in `src/lib/types/`:
- Attorney profiles
- Practice areas
- Navigation items
- Form data
- News/blog posts
- Office locations

## 🔧 Customization

### Adding a New Practice Area
1. Add the practice area to `src/lib/data/practiceAreas.ts`
2. The navigation and pages will automatically update

### Adding an Attorney
1. Add attorney data to `src/lib/data/attorneys.ts`
2. Add attorney profile images to `src/assets/images/attorneys/`

### Customizing Colors
Edit `tailwind.config.js` to modify the color palette

## 📦 Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
3. Environment variables: None required for static build

## 🔒 Environment Variables

Currently no environment variables needed. Add `.env` for future API integrations:

```
VITE_API_URL=your_api_url
VITE_CONTACT_FORM_ENDPOINT=your_endpoint
```

## 📝 License

Proprietary - Riley Bennett Egloff LLP

## 👨‍💻 Development

### Code Style
- Follow existing TypeScript patterns
- Use functional components with hooks
- Maintain consistent file naming (PascalCase for components)
- Keep components focused and single-purpose

### Adding New Pages
1. Create page component in `src/pages/[page-name]/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/layout/Navbar.tsx`
