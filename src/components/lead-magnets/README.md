# Indiana Lien Rights Wizard Component

## Overview

The `LienRightsWizard` is an interactive, multi-step React component that helps construction professionals understand Indiana lien rights timelines and requirements. This educational tool guides users through a series of questions to provide customized timeline information without dispensing legal advice.

## Features

- **Multi-Step Form**: 3-step wizard interface with smooth animations
- **Conditional Logic**: Displays different timelines based on project type and role
- **Progress Indicator**: Visual progress bar showing current step
- **Lead Capture**: Email capture modal for downloading compliance checklist
- **Framer Motion Animations**: Smooth transitions between steps
- **Mobile Responsive**: Fully responsive design using Tailwind CSS
- **RBE Branding**: Uses official Riley Bennett Egloff color scheme (#213469)

## Installation & Usage

### Basic Usage

```tsx
import { LienRightsWizard } from '@/components/lead-magnets/LienRightsWizard'

export default function ConstructionPage() {
  return (
    <div className="py-12">
      <LienRightsWizard />
    </div>
  )
}
```

### Integration with Practice Area Pages

The wizard can be integrated into practice area pages using the `leadMagnetType` field in the CMS:

1. In PayloadCMS, edit a practice area
2. Set `leadMagnetType` to `'lien-wizard'`
3. The wizard will automatically render on that practice area page

## Component Structure

### Steps

1. **Step 1: Project Type Selection**
   - Residential
   - Commercial

2. **Step 2: Role Selection**
   - General Contractor
   - Subcontractor

3. **Step 3: Results Display**
   - Customized timeline information
   - Key requirements list
   - Legal disclaimer
   - Download button for compliance checklist

### State Machine Logic

The component uses a simple state machine with the following combinations:

- `residential + general-contractor` → Residential GC timeline
- `residential + subcontractor` → Residential Subcontractor timeline
- `commercial + general-contractor` → Commercial GC timeline
- `commercial + subcontractor` → Commercial Subcontractor timeline

Each combination displays specific timeline requirements and deadlines.

## Timeline Information

### Residential General Contractor
- No Pre-Lien Notice required
- Mechanic's Lien: 60 days after last furnishing
- File with county recorder
- Send Notice of Intent before filing

### Residential Subcontractor
- Pre-Lien Notice: Within 60 days of first furnishing
- Send via certified mail to owner and GC
- Mechanic's Lien: 60 days after last furnishing
- Foreclosure lawsuit: Within one year

### Commercial General Contractor
- Notice requirements vary by tier
- Mechanic's Lien: 60 days after last furnishing
- Payment Bond claims for public projects
- Notice to Owner may be required

### Commercial Subcontractor
- Pre-Lien Notice: Within 60 days of first furnishing
- Requirements vary by tier (first-tier vs. lower-tier)
- Mechanic's Lien: 60 days after last furnishing
- Public projects: Payment Bond claims (90 days)

## Lead Capture

When users click "Download Compliance Checklist", a modal appears requesting:
- Full Name (required)
- Email Address (required)

### Lead Data

The component submits lead data to the marketing service with:
```typescript
{
  email: string
  name: string
  source: 'lien_wizard'
  metadata: {
    projectType: 'residential' | 'commercial'
    role: 'general-contractor' | 'subcontractor'
    timestamp: ISO date string
  }
}
```

## Styling

### Colors
- Primary Navy: `#213469` - Used for headers, buttons, accents
- Accent Tan: `#D3CBBC` - Used for background highlights
- Neutral colors for text and borders

### Animations
- Slide transitions between steps using Framer Motion
- Fade-in effects for modal
- Smooth progress bar transitions

## Dependencies

- `framer-motion` - For animations
- `react-hook-form` - For form validation
- `lucide-react` - For icons
- UI components from `@/components/ui`:
  - Card, CardHeader, CardTitle, CardDescription, CardContent
  - Button
  - Progress

## Legal Disclaimer

The component includes built-in disclaimers stating:
> "This is general educational information and does not constitute legal advice. Consult with an attorney for your specific situation."

This is displayed on every results screen to ensure users understand the educational nature of the tool.

## Customization

### Adding New Project Types or Roles

To add new options, update the `timelineData` object in the component:

```typescript
const timelineData: Record<string, TimelineInfo> = {
  'new-type-new-role': {
    title: 'Your Title',
    description: 'Your description',
    details: ['Detail 1', 'Detail 2'],
    disclaimer: 'Your disclaimer'
  }
}
```

### Modifying Timeline Content

Edit the `timelineData` object to update requirements, deadlines, or disclaimers for any combination.

## Accessibility

- Keyboard navigation support
- Proper ARIA labels
- Focus management
- Screen reader friendly

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## Notes

- This is a client component (uses `'use client'` directive for Next.js)
- Form validation ensures valid email format
- Lead submission uses mock service (configure with actual endpoints)
- Progress is automatically saved in component state
- Users can navigate back and restart at any time
