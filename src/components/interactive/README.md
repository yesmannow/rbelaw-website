# Interactive Conversion Components

This directory contains high-conversion interactive components designed to engage visitors and capture leads on the RBE Law website.

## Components

### 1. CaseTimeline

An interactive, animated timeline that demystifies the litigation process for corporate clients.

**Features:**
- Horizontal scrollable timeline with 6 stages
- Smooth Framer Motion animations
- Click to expand stage details
- Shows "What to Expect" and "Estimated Duration" for each stage

**Usage:**
```tsx
import { CaseTimeline } from '@/components/interactive/CaseTimeline'

function PracticeAreaPage() {
  return (
    <div>
      <CaseTimeline />
    </div>
  )
}
```

**Stages:**
1. Investigation (2-4 weeks)
2. Filing (1-2 weeks)
3. Discovery (6-12 months)
4. Mediation (1-2 months)
5. Trial (1-3 weeks)
6. Resolution (Varies)

---

### 2. CaseAssessmentQuiz

A multi-step "Do I Have a Case?" wizard that qualifies leads and captures contact information.

**Features:**
- 4-step progressive form with progress indicator
- Smooth step transitions using Framer Motion
- Email/phone capture gate on final step
- Integrates with marketing service layer
- Success screen with next steps

**Usage:**
```tsx
import { CaseAssessmentQuiz } from '@/components/interactive/CaseAssessmentQuiz'

function AssessmentPage() {
  return (
    <div>
      <CaseAssessmentQuiz />
    </div>
  )
}
```

**Steps:**
1. Type of Incident (Personal Injury, Insurance Dispute, etc.)
2. Date of Incident
3. Contract Status (Yes/No/Not Sure)
4. Contact Information Capture

**Marketing Integration:**
- Automatically submits lead data to `marketingService`
- Captures incident type, date, and contract status
- Stores answers in metadata for CRM

---

## Marketing Service Layer

All interactive components integrate with the centralized marketing service at `src/services/marketingService.ts`.

### Current Implementation

The service currently uses a **mock implementation** that logs to the console. This allows you to:

- Test components without API keys
- See what data would be sent to external services
- Develop and iterate quickly

### Environment Variables

Configure these in your `.env` file:

```env
VITE_MAILCHIMP_ENDPOINT=https://your-mailchimp-api.com/v3/lists/YOUR_LIST_ID/members
VITE_MAILCHIMP_API_KEY=your-mailchimp-api-key
VITE_CRM_ENDPOINT=https://your-crm-api.com/leads
VITE_CRM_API_KEY=your-crm-api-key
```

### Integrating Real APIs

To connect to your actual Mailchimp and CRM:

1. **Add API keys to `.env`**
   
2. **Uncomment API code in `marketingService.ts`:**

```typescript
// In submitLead function, uncomment these blocks:

if (MAILCHIMP_ENDPOINT) {
  await fetch(MAILCHIMP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_MAILCHIMP_API_KEY}`
    },
    body: JSON.stringify(data)
  })
}

if (CRM_ENDPOINT) {
  await fetch(CRM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_CRM_API_KEY}`
    },
    body: JSON.stringify(data)
  })
}
```

3. **Test with real endpoints**

4. **All forms automatically work** - no component changes needed!

### API Functions

```typescript
// Submit any lead data
await submitLead({
  email: 'user@example.com',
  name: 'John Doe',
  phone: '555-1234',
  source: 'quiz', // or 'contact_form', 'newsletter', 'blog_cta'
  metadata: { /* custom data */ }
})

// Newsletter subscription
await subscribeNewsletter('user@example.com')

// Contact form
await submitContactForm({
  email: 'user@example.com',
  name: 'John Doe',
  phone: '555-1234',
  company: 'Acme Corp',
  practiceArea: 'insurance-defense',
  message: 'I need help with...'
})
```

---

## TypeScript Types

All components use strict TypeScript types defined in `src/lib/types/index.ts`:

```typescript
interface LeadData {
  email: string
  name?: string
  phone?: string
  source: 'contact_form' | 'quiz' | 'newsletter' | 'blog_cta'
  metadata?: Record<string, unknown>
}

interface CaseAssessmentData extends LeadData {
  incidentType?: string
  incidentDate?: string
  hasContract?: string
  answers?: QuizAnswer[]
}
```

---

## Demo Page

Visit `/demo` to see all components in action. This page includes:

- Interactive CaseTimeline
- Full CaseAssessmentQuiz flow
- StickyAuthorCTA demonstration
- Marketing service documentation

---

## Best Practices

### Performance

- Scroll events are throttled (100ms) for optimal performance
- Framer Motion animations use GPU-accelerated transforms
- Components are tree-shakeable

### Accessibility

- All interactive elements are keyboard navigable
- Semantic HTML structure
- ARIA labels where appropriate
- Focus states visible

### Mobile Responsive

- Timeline scrollable on mobile
- Quiz optimized for small screens
- Sticky CTA positioned for mobile UX

---

## Future Enhancements

Potential improvements:

- [ ] A/B testing integration
- [ ] Analytics event tracking
- [ ] Multi-language support
- [ ] Custom stage data for different practice areas
- [ ] Quiz results scoring system
- [ ] Email template customization
