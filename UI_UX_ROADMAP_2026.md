# RBE Law Website — UI/UX Roadmap (2026)

This roadmap turns `DESIGN_UI_UX_AUDIT_2026.md` into a sequence of shippable work with clear acceptance criteria.

## Already Done (Quick Wins)
- `src/components/layout/Navbar.tsx`: added `aria-label="Primary"`.
- `src/pages/home/sections/HeroSection.tsx`: fixed `h1` line breaks so assistive tech reads it correctly.
- `src/pages/contact/ContactPage.tsx`: removed duplicate `h1` (now `h2`).
- `.gitignore`: ignore `audit-artifacts/` output.
- `scripts/ui-audit.ts` + `package.json`: added `npm run ui-audit` to capture page screenshots + metadata.

## Phase 1 (Week 1–2): Premium Foundation

### 1. Design tokens (colors, type, spacing)
- **Work:** Convert Tailwind config to role-based tokens; remove ambiguous token names.
- **Acceptance:** No new raw hex colors in components; UI uses token classes consistently.
- **Files:** `tailwind.config.js`, `src/index.css`, `src/styles/*` (if added).

### 2. Typography + hierarchy
- **Work:** Implement a consistent type scale and vertical rhythm.
- **Acceptance:** H1/H2/H3 sizes and margins are consistent across pages; body line length is controlled.
- **Files:** `src/index.css`, shared components consuming headings.

### 3. UI primitives
- **Work:** Standardize `Button`, `Card`, `Badge`, `SectionHeader`, `Input/Textarea/Select`.
- **Acceptance:** Buttons/forms/cards match across Home, Practice Areas, Attorneys, Contact.
- **Files:** `src/components/ui/*` (and refactors where used).

### 4. Global conversion pattern
- **Work:** One consistent “primary action” pattern on all pages (Call + Contact / Intake).
- **Acceptance:** Every page has a visible CTA above the fold and at the end of the main content.
- **Files:** `src/components/layout/*`, `src/pages/*`.

## Phase 2 (Week 3–6): Credibility + Conversion Templates

### 5. Homepage reframing (credibility in 5 seconds)
- **Work:** Add trust proof above the fold; tighten density; ensure metrics + trust bar are prominent.
- **Acceptance:** Hero + immediate next section communicates (1) who you help, (2) why trust, (3) what to do next.
- **Files:** `src/pages/home/HomePage.tsx`, `src/pages/home/sections/*`.

### 6. Practice area template rebuild
- **Work:** Implement a uniform template that includes outcomes/proof, FAQs, team spotlight, related resources.
- **Acceptance:** Every practice area page has the same sections in the same order; internal linking is consistent.
- **Files:** `src/components/practice-areas/PracticeAreaTemplate.tsx`, `src/pages/practice-areas/PracticeAreaDetail.tsx`, data sources.

### 7. Attorney listing and bio conversion upgrades
- **Work:** Richer cards, better filters, and clear actions (call/email/vCard).
- **Acceptance:** From attorneys list, user can reach contact action in ≤2 clicks.
- **Files:** `src/pages/attorneys/*`, `src/components/attorneys/*`.

### 8. Newsroom reliability + authority
- **Work:** Ensure blog card images are fast and resilient; add taxonomy hubs (category/author).
- **Acceptance:** No console timeouts from remote images; article pages have canonical + schema.
- **Files:** `src/pages/NewsroomPrestige.tsx`, `src/components/blog/BlogCard.tsx`, content/image pipeline.

## Phase 3 (Week 7–12): Best-in-Class Differentiation

### 9. Industry landing pages
- **Work:** Tailored pages per industry with proof points, representative matters, and resources.
- **Acceptance:** Each industry page links to relevant practice areas, attorneys, and newsroom posts.

### 10. Client-first tools
- **Work:** Guided intake / assessment tools and downloadable checklists.
- **Acceptance:** Tools have analytics hooks and clear conversion CTAs.

### 11. Structured data rollout
- **Work:** Organization + Person + FAQPage + BreadcrumbList schema.
- **Acceptance:** Schema validates cleanly and is present on all relevant page types.

## QA Gate for Every Phase
- **Accessibility:** keyboard nav, focus visibility, contrast checks, reduced motion.
- **SEO:** unique title/description; canonical URLs; correct heading structure.
- **Performance:** images lazy load; avoid layout shift; key routes code-split where beneficial.

