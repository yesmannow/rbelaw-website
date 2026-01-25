# RBE Law Website — UI/UX Implementation Guide (2026)

This is the step-by-step guide to implement the audit recommendations in `DESIGN_UI_UX_AUDIT_2026.md` with minimal churn and maximum “premium” impact.

## 0) How to Regenerate Audit Artifacts

The repo includes a Playwright-based audit/screenshot tool:
- Script: `scripts/ui-audit.ts`
- NPM: `npm run ui-audit`

Recommended (PowerShell):
1. `npm run build`
2. `$env:AUDIT_PORT='4180'; npm run ui-audit`

Artifacts output to `audit-artifacts/` (ignored by git).

## 1) Lock the Design System (Tokens First)

### 1.1 Define role-based color tokens
Replace “named colors” (gold/burgundy) with role tokens:
- `brand.primary` (navy)
- `brand.accent` (maroon or gold — pick one and be consistent)
- `surface.{0..3}` (page backgrounds, cards)
- `text.{primary,secondary,inverse}`
- `border.{default,subtle}`
- `focus` (outline ring)

Implementation targets:
- `tailwind.config.js`
- `src/index.css` (CSS variables for future theming)

Deliverable:
- A one-page “token map” table in `src/styles/tokens.md` (optional).

### 1.2 Typography system
Choose and commit to one pairing:
- **Option A (modern editorial):** `Source Serif 4` (headings) + `Inter` (UI/body)
- **Option B (brand-friendly):** keep `Playfair Display` for hero only; use a readable serif for headings and a neutral sans for body.

Implement:
- `src/index.css`: base font sizes/line heights and heading scale
- Ensure consistent max line length (`max-w-prose` / ~65–80 chars)

### 1.3 Spacing, radii, shadows
Standardize:
- Section vertical rhythm (e.g., `py-16 md:py-24`)
- Card radius (e.g., `rounded-xl`) and elevation (1–3 shadow levels)

## 2) Normalize Core Components (Consistency = Premium)

Create/standardize these primitives and use everywhere:
- `Button` (variants: primary, secondary, ghost, outline, link)
- `Card` (surface + border + hover)
- `Badge/Tag`
- `SectionHeader` (eyebrow + H2 + supporting copy)
- Form controls (`Input`, `Textarea`, `Select`) with consistent focus, errors, help text

Targets:
- `src/components/ui/` (preferred location for primitives)
- Replace one-off Tailwind chains in page components with these primitives.

Acceptance checks:
- Buttons look identical across pages.
- Hover + focus states are consistent and accessible.

## 3) Navigation + Global Conversion Pattern

### 3.1 Desktop header
Make the header “feel expensive”:
- Reduce visual noise in the top bar (tighter type, fewer competing links).
- Ensure primary CTA is consistent (e.g., **Call** + **Contact**).
- Add optional “Search” affordance (icon + Cmd-K hint).

Implementation:
- `src/components/layout/Navbar.tsx`

### 3.2 Mobile navigation
Current mobile approach is strong; harden:
- Ensure route naming matches desktop (`/newsroom` vs `/news` alias already exists).
- Avoid duplicate fixed UI elements competing for attention.

Implementation:
- `src/components/layout/mobile/MobileNavBar.tsx`
- `src/components/layout/mobile/MobileLogoHeader.tsx`

## 4) Page Template Upgrades (Make Each Page Convert)

### 4.1 Homepage
Goal: “Credibility in 5 seconds”.

Add/adjust sections:
- Trust proof above the fold (awards, courts, insurers served, industries).
- Impact metrics (already present in docs; ensure it’s visible and consistent).
- Strong “how we help” with outcomes language.
- Primary conversion module near bottom (intake/contact + phone + location).

Targets:
- `src/pages/home/HomePage.tsx`
- `src/pages/home/sections/*`

### 4.2 Practice area detail template
Add a consistent structure:
- Hero: problem framing + who you represent + primary CTA
- “Services / Capabilities”
- “Representative matters / outcomes” (as permitted)
- “Team spotlight” (attorneys for the area)
- FAQ (schema-ready)
- Related resources (newsroom posts tagged)

Targets:
- `src/components/practice-areas/PracticeAreaTemplate.tsx`
- `src/pages/practice-areas/PracticeAreaDetail.tsx`

### 4.3 Attorneys listing + profiles
Listing upgrades:
- Clear filters + sort (practice area, industry, location, keyword)
- Card actions: “View bio”, “Call”, “Email”, “vCard”

Profile upgrades:
- Summary + credentials above the fold
- Bar admissions, courts, representative matters (if allowed), publications
- Sticky “Contact” rail on desktop

Targets:
- `src/pages/attorneys/*`
- `src/components/attorneys/*`

### 4.4 Newsroom
Fix reliability and “authority”:
- Prefer locally hosted images (remote image URLs are currently timing out in audit).
- Add category hubs and author pages.
- Add article schema and canonical URLs.

Targets:
- `src/pages/NewsroomPrestige.tsx`
- `src/components/blog/BlogCard.tsx`
- `src/lib/data/blog-posts` and/or image pipeline scripts

### 4.5 About + Contact
About:
- Move from narrative to proof: history, values, community impact, differentiators.
Contact:
- Ensure a single clear primary action (consultation / intake) and real payment link.

Targets:
- `src/pages/about/*`
- `src/pages/contact/ContactPage.tsx`

## 5) SEO + Structured Data (Non-Negotiable for 2026)

### 5.1 One SEO component everywhere
You already have `src/components/seo/SEO.tsx`. Use it on every route:
- Home, About, Attorneys index, Attorney bio, Practice areas index/detail, Newsroom index/article, Contact, Legal pages.

Acceptance checks:
- Unique `<title>` and `<meta name="description">` per page.
- Canonical URLs always present (prod domain).

### 5.2 Add schema in phases
- Organization/LocalBusiness (site-wide)
- Person (attorneys)
- BreadcrumbList (all interior pages)
- FAQPage (practice area FAQs)

## 6) Accessibility (WCAG 2.2 AA)

Checklist:
- Keyboard: every interactive element reachable + visible focus.
- Color contrast: verify accent text against white and navy.
- Landmarks: `nav` labels, `main`, `footer`.
- Forms: labels, errors, aria-described-by, success confirmation.
- Reduced motion: avoid content being permanently invisible when animations are disabled.

## 7) Performance / Core Web Vitals

Practical upgrades:
- Ensure newsroom images use `loading="lazy"` and have fallbacks.
- Split heavy bundles (newsroom posts chunk is currently large).
- Consider route-level lazy loading for newsroom/article pages.

Acceptance checks:
- LCP < 2.5s on key pages.
- No large layout shifts from fonts/images.

## 8) Rollout Plan (Minimal Risk)

1. **Foundation PR:** tokens + typography + primitives (no page rewrites yet).
2. **Template PRs:** home, practice area template, attorneys, newsroom.
3. **Content PRs:** outcomes, awards, industry proof, FAQs.
4. **Hardening PR:** accessibility, SEO, performance, analytics.

## Done-Definition

You’re “top-tier 2026” when:
- Design looks consistent on every page (no one-off styles).
- Every page answers: *Who are you? Why trust you? What next?*
- Accessibility passes WCAG 2.2 AA checks for the main flows.
- SEO metadata + schema is complete and consistent.

