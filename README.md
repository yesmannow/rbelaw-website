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

docs/
├── archive/            # Historical implementation docs and guides
└── scraped/            # Scraped content from legacy website
```

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and technical decisions
- **[docs/archive/](./docs/archive/)** - Historical implementation guides and progress logs
  - Migration guides, implementation summaries, feature documentation
- **[docs/scraped/](./docs/scraped/)** - Scraped content from the legacy website
  - Practice area content extracted for migration

For development guides and implementation history, see the [docs/archive](./docs/archive/) directory.

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

### Required Environment Variables

```env
# Database Configuration (Required for Payload CMS)
# Use DIRECT_DATABASE_URL (preferred) or DATABASE_URL
DATABASE_URL=postgresql://user:password@host:5432/database
DIRECT_DATABASE_URL=postgresql://user:password@host:5432/database

# Payload Secret (Required - also protects /api/seed endpoint)
PAYLOAD_SECRET=your-secret-key-here-change-in-production

# Next.js Configuration
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Optional API Keys

The following API keys are optional but enable legal intelligence features:

- **COURTLISTENER_API_KEY** - For Indiana court opinions
- **REGULATIONS_GOV_API_KEY** - For healthcare compliance alerts

**📖 Full setup instructions**: See [`docs/API_KEYS.md`](docs/API_KEYS.md) for detailed registration and configuration steps.

**Quick setup:**
1. **CourtListener**: Sign up at [courtlistener.com](https://www.courtlistener.com/), go to your profile, generate API token
2. **Regulations.gov**: Register at [open.gsa.gov/api/regulationsgov/](https://open.gsa.gov/api/regulationsgov/), check email for API key

### Database Migrations

**📖 Full migration guide**: See [`docs/MIGRATIONS.md`](docs/MIGRATIONS.md) for detailed instructions on:
- Setting up Neon database connection strings
- Running migrations locally
- Production migration workflow
- Troubleshooting common issues

**Quick start:**
1. Set `DIRECT_DATABASE_URL` in `.env.local` (use Neon's direct connection string)
2. Run: `npx payload migrate`
3. Verify: `npm run health:ci`

### Cloud Database Seeding

To populate the production database (bypasses Windows local environment issues):

1. Deploy the application to Vercel/production
2. Visit: `https://your-domain.vercel.app/api/seed?secret=YOUR_PAYLOAD_SECRET`
3. The endpoint will:
   - Validate the secret against `PAYLOAD_SECRET`
   - Run the seed migration to populate Attorneys, Practices, and Industries
   - Return: `{ message: 'Database seeded successfully' }`

**Security:** The `/api/seed` endpoint is protected by your `PAYLOAD_SECRET` environment variable.

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
