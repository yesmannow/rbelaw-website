# Interactive Legal Tools

This directory contains 6 interactive "app-like" tools that transform the RBE Law website from a static brochure into a utility.

## Tools Overview

### 1. Workers' Comp Benefit Calculator
**Route:** `/resources/tools/comp-calculator`  
**Component:** `CompCalculator.tsx`

Calculates Temporary Total Disability (TTD) and Permanent Partial Impairment (PPI) benefits under Indiana law.

**Features:**
- Uses official Indiana statutory limits for 2023-2026
- Automatic selection of correct period based on injury date
- Calculates weekly TTD benefits (2/3 of average wage, capped)
- Calculates PPI awards for 1-10 degree impairments
- Lead capture for full report

**Data Source:** Indiana Workers' Compensation Handbook (Pages 46-49)

### 2. Construction Lien Deadline Calculator
**Route:** `/resources/tools/lien-calculator`  
**Component:** `LienCalculator.tsx`

Generates visual timelines for Notice to Owner (NTO) and Mechanic's Lien filing deadlines.

**Features:**
- Supports Commercial (90-day) and Residential (60-day) projects
- Visual timeline with color-coded deadline warnings
- Tracks General Contractor vs Subcontractor requirements
- Calculates enforcement deadlines (1 year from recording)
- Email timeline functionality

**Legal Basis:** Indiana Construction Lien Law

### 3. Business Succession Readiness Assessment
**Route:** `/resources/tools/succession-quiz`  
**Component:** `SuccessionQuiz.tsx`

Interactive 8-question wizard assessing business succession planning preparedness.

**Features:**
- 8 key questions covering buy-sell, valuation, successors, estate planning
- Scoring system (0-100%) with risk level assessment
- Visual progress tracking
- Detailed findings breakdown
- Gated full checklist download

**Risk Levels:**
- Green (70%+): Low Risk
- Yellow (40-69%): Moderate Risk
- Red (<40%): High Risk

### 4. Indiana Workers' Comp District Locator
**Route:** `/resources/tools/district-map`  
**Component:** `DistrictMap.tsx`

Searchable directory of Indiana's 8 Workers' Compensation Board districts.

**Features:**
- Search by county name
- Select by district number
- Complete contact information for each district:
  - Board Member name
  - Court Reporter name
  - Phone and email
- Lists all counties per district
- Quick reference sidebar

**Data Source:** Indiana Workers' Compensation Handbook (Pages 64-65)

**Districts:**
1. District 1: Lake, Porter, LaPorte, etc. (7 counties)
2. District 2: St. Joseph, Elkhart, etc. (10 counties)
3. District 3: Allen, Huntington, etc. (9 counties)
4. District 4: Tippecanoe, White, etc. (11 counties)
5. District 5: Marion, Hamilton, etc. (11 counties)
6. District 6: Johnson, Shelby, etc. (11 counties)
7. District 7: Bartholomew, Brown, etc. (13 counties)
8. District 8: Vanderburgh, Posey, etc. (18 counties)

### 5. FLSA Exempt Status Wizard
**Route:** `/resources/tools/flsa-wizard`  
**Component:** `FLSAWizard.tsx`

Decision-tree wizard determining employee exempt status under federal FLSA regulations.

**Features:**
- Multi-step wizard with conditional logic
- Tests salary basis requirement
- Tests minimum salary threshold ($684/week as of 2024)
- Tests duties (Executive, Administrative, Professional)
- Color-coded results (Green/Yellow/Red)
- Specific recommendations for each outcome
- Compliance guidance

**Exemption Categories:**
- Executive: Manages 2+ employees, hiring/firing authority
- Administrative: Independent judgment on significant matters
- Professional: Advanced knowledge/specialized education

### 6. Litigation Timeline Generator
**Route:** `/resources/tools/litigation-timeline`  
**Component:** `LitigationTimeline.tsx`

Generates case timelines with key Indiana Trial Rule deadlines.

**Features:**
- Visual vertical timeline
- Supports Standard and Commercial litigation types
- Calculates 11 key milestones:
  - Appearance Due (Day 20)
  - Answer Due (Day 23)
  - Initial Disclosures (Day 60)
  - Case Management Conference (Day 90)
  - Fact Discovery Cutoff (Day 150/180)
  - Expert Disclosure (Day 170/200)
  - Expert Discovery Cutoff (Day 210/240)
  - Dispositive Motions (Day 240/270)
  - Pretrial Conference (Day 300/330)
  - Trial Date (Day 330/365)
- Download .ics calendar file
- Email timeline functionality
- Shows completed vs upcoming milestones

**Legal Basis:** Indiana Trial Rules

## Common Components

### LeadCaptureModal
**Component:** `marketing/LeadCaptureModal.tsx`

Reusable modal for capturing leads from all tools.

**Fields:**
- Name (required)
- Email (required)
- Company (optional)
- Role dropdown (required): Employer, Insurer, Individual, Contractor, HR Manager, Business Owner, Other

**Features:**
- Tracks tool source for analytics
- Success animation
- Integrates with `marketingService.submitLead()`
- Stores calculation metadata

### UI Components
- **Select:** `ui/Select.tsx` - Styled dropdown component
- **Progress:** `ui/Progress.tsx` - Progress bar for wizards

## Routes

All tools are accessible under `/resources/tools/`:

```
/resources/tools                    → ToolsPage (landing page with all tools)
/resources/tools/comp-calculator    → CompCalculatorPage
/resources/tools/lien-calculator    → LienCalculatorPage
/resources/tools/succession-quiz    → SuccessionQuizPage
/resources/tools/district-map       → DistrictMapPage
/resources/tools/flsa-wizard        → FLSAWizardPage
/resources/tools/litigation-timeline → LitigationTimelinePage
```

## Lead Data Type

Updated `LeadData` type in `lib/types/index.ts` to include:

```typescript
source: 
  | 'contact_form' 
  | 'quiz' 
  | 'newsletter' 
  | 'blog_cta' 
  | 'comp_calculator'           // New
  | 'lien_calculator'           // New
  | 'succession_quiz'           // New
  | 'district_map'              // New
  | 'flsa_wizard'               // New
  | 'litigation_timeline'       // New
```

This allows tracking which tool generated each lead for targeted follow-up.

## Design Principles

1. **Mobile-First:** All tools are fully responsive
2. **Progressive Disclosure:** Step-by-step interfaces for complex calculations
3. **Visual Feedback:** Color-coded results, animations, progress bars
4. **Lead Generation:** Strategic gating of "full reports" to capture contact info
5. **Legal Accuracy:** Based on official Indiana law and handbook data
6. **Disclaimers:** Every tool includes appropriate legal disclaimers
7. **Accessibility:** Proper semantic HTML, ARIA labels, keyboard navigation

## Value Proposition

These tools transform the website from a "brochure" into a "utility" by:

1. **Daily Use:** Insurance adjusters will bookmark the District Locator
2. **Problem Solving:** Construction clients use the Lien Calculator weekly
3. **Lead Quality:** Leads include context (which tool used, what they calculated)
4. **Authority Building:** Demonstrates expertise through useful software
5. **SEO:** Tool-specific landing pages for long-tail keywords
6. **Shareability:** Clients share calculators with colleagues

## Technical Stack

- **React:** Component framework
- **React Router:** Routing
- **React Hook Form:** Form validation and state management
- **Framer Motion:** Animations and transitions
- **Lucide React:** Icon library
- **Tailwind CSS:** Styling (via existing design system)
- **TypeScript:** Type safety

## Future Enhancements

Potential additions:
1. "Save My Results" - Local storage persistence
2. Print-friendly versions
3. Share via social media
4. Embed calculators on practice area pages
5. Mobile app versions (PWA)
6. Multi-language support
7. PDF report generation
8. Integration with CRM for automatic lead assignment
