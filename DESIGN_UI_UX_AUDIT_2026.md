# RBE Law Website — Design / UI / UX Audit (2026)

**Scope:** visual design, layout, UI patterns, interaction design, accessibility baseline, and content presentation (React/Vite/Tailwind build).  
**Artifacts:** `audit-artifacts/ui-audit-1769375771600.json` and screenshots in `audit-artifacts/screenshots/ui-audit-1769375771600/` (regenerate anytime; see implementation guide).

## Executive Summary

The site has a strong technical foundation (fast static build, Tailwind system, modern interactions), but the current experience reads as “in-progress” rather than “top-tier 2026 law firm” because the brand system is inconsistent, the layout rhythm is uneven, and several trust + clarity elements are missing or under-emphasized.

The fastest path to a premium, competitive look is:
1) lock a cohesive design system (tokens + type scale + spacing),  
2) standardize core components (header, buttons, cards, forms),  
3) rebuild page templates around “credibility + conversion” (trust signals, outcomes, proof),  
4) tighten accessibility/SEO fundamentals.

## What’s Working (Keep + Build On)
- **Brand direction:** navy + warm accent is credible for legal; the site already leans “corporate / professional”.
- **Component architecture:** sections and templates are modular and easier to iterate on than WordPress.
- **Mobile approach:** dedicated mobile nav and fixed CTA patterns are directionally strong.
- **Content breadth:** practice areas, attorney index, and newsroom structure exist (good for SEO scale).

## Key Issues (Why It Doesn’t Feel “Top-Level” Yet)

### 1) Brand Token Drift (Colors + Naming + Usage)
- Color naming is inconsistent (e.g., “gold” tokens used as maroon), which leads to inconsistent UI decisions and accidental mismatches over time.
- Too many “one-off” hex values in components reduce cohesion.

**Impact:** inconsistent polish; difficult to maintain; harder to ensure contrast/accessibility.

### 2) Typography + Hierarchy Needs a 2026 “Editorial” Upgrade
- Current typography reads “generic corporate” more than “modern editorial authority”.
- Heading scale and spacing are inconsistent across pages/sections.
- Some pages have multiple `h1`s (semantic + SEO issue).

**Impact:** content feels flatter; harder scanning; weaker perceived credibility.

### 3) Layout Rhythm: Oversized Vertical Gaps + Soft Contrast Background Washes
- Several sections use very large vertical padding and light background washes; the page can feel airy to the point of “empty”.
- Background imagery is often too subtle to add premium depth, but still complicates readability/contrast decisions.

**Impact:** less “dense authority”; weaker information scent and conversion.

### 4) Conversion UX: Primary Actions Aren’t Consistently Reinforced
- “Contact / Call / Consultation / Payment / Intake” CTAs vary by page and are not consistently placed as a pattern.
- Attorney listing is informative but can do more to convert (clear “next step” per attorney/practice).

**Impact:** lost leads; reduced clarity on what to do next.

### 5) Content Credibility Signals Are Underused
Needed (even for mid-sized firms):
- representative matters / case outcomes (where allowed), results framing,
- awards + rankings with context,
- testimonials (if permissible),
- industry-specific proof points,
- “why choose us” differentiators that read like evidence.

**Impact:** visitors can’t quickly validate “top-tier”.

### 6) SEO / Metadata Consistency Gaps
From `audit-artifacts/ui-audit-1769375771600.json`:
- Many pages share the same meta description and/or lack canonical URLs.
- Titles are inconsistent across pages (some are custom, others default).

**Impact:** weaker rankings, worse snippet control, less brand consistency.

### 7) Accessibility Baseline Improvements
- Main nav lacked an `aria-label` (fixed).
- Continue tightening: consistent focus states, contrast checks for accent text, forms, and interactive controls.

**Impact:** WCAG risk; lower quality signals to enterprise clients.

## High-Impact Recommendations (Prioritized)

### Phase 1 (1–2 weeks): “Premium Foundation”
- **Design tokens:** define role-based colors (background/surface/border/text/brand/accent) and remove ambiguous names.
- **Type system:** implement a clear scale (H1–H4 + body sizes) with consistent line heights and max line length.
- **Core components:** unify `Button`, `Card`, `Tag/Badge`, `Input/Textarea`, `SectionHeader`, `Container`, `Link` styles.
- **Navigation:** standardize header + global CTA pattern; add “Search” affordance.
- **SEO basics:** apply page-specific title/description/canonical via one SEO component used on every route.

### Phase 2 (2–6 weeks): “Credibility + Conversion”
- **Homepage reframing:** add trust proof above the fold (rankings/metrics/industries), and bring outcomes forward.
- **Practice area templates:** add “Why this matters”, “How we help”, “Representative matters” (where allowed), FAQ, and attorney highlights per area.
- **Attorney index upgrades:** add clearer filters + sorting, richer cards (practice tags, bar admissions, contact action), and “Book a consult” flows.
- **Newsroom hardening:** ensure images are local/fast with fallbacks; add category hubs and author pages.

### Phase 3 (6–12 weeks): “Best-in-Class Differentiators”
- **Client-first tools:** intake wizard, calculators (where appropriate), downloadable checklists.
- **Industry landing pages:** tailored proof points + resources per industry.
- **Structured data:** Organization/LocalBusiness, Attorney (Person), BreadcrumbList, FAQPage for relevant pages.

## Page-Specific Notes (Observed From Screenshots)

### Home
- Hero is directionally strong, but the page needs more **above-the-fold proof** (awards, key metrics, industry focus) and **tighter section density**.

### Practice Areas
- Grid is a good base; improve: more consistent card heights, clearer “what you get” outcomes, and stronger visual hierarchy for sub-services.

### Attorneys
- Great start with filtering; next upgrade is “conversion-ready cards” and a richer “meet the team” narrative.

### Contact
- Strong split layout; align CTA wording (“Partner with Us”, “Make a Payment”) with clear next steps and ensure payment link is real.

## Definition of “Top-Level 2026 Law Firm Site”
When finished, the site should:
- read like **editorial authority** (typography, hierarchy, tone),
- demonstrate **proof quickly** (trust signals + outcomes),
- offer **frictionless conversion** (call/contact/intake on every page),
- be **fast + accessible** (Core Web Vitals, WCAG 2.2 AA),
- scale content with **SEO structure** (hubs, schema, internal linking).

