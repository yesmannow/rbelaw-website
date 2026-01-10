# Integration Example: Using LienRightsWizard in Practice Area Pages

## Method 1: Direct Import in a Next.js Page

Create a new page at `src/app/construction/lien-wizard/page.tsx`:

```tsx
import { LienRightsWizard } from '@/components/lead-magnets'

export default function LienWizardPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <section className="bg-primary-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Indiana Lien Rights Wizard
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Navigate the complex world of construction lien rights in Indiana. 
            This interactive tool helps you understand critical deadlines and requirements.
          </p>
        </div>
      </section>

      {/* Wizard Section */}
      <section className="py-12 px-4">
        <LienRightsWizard />
      </section>

      {/* Additional Information */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
            Need Legal Assistance?
          </h2>
          <p className="text-neutral-600 mb-6">
            While this tool provides educational information about Indiana lien rights, 
            every construction project is unique. Our experienced construction law attorneys 
            can help protect your rights and ensure compliance.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-primary-navy text-white px-8 py-3 rounded-sm font-semibold hover:bg-primary-slate transition-colors"
          >
            Contact Our Construction Law Team
          </a>
        </div>
      </section>
    </div>
  )
}
```

## Method 2: Conditional Rendering Based on CMS Field

If you want to dynamically show the wizard based on the `leadMagnetType` field in the CMS, 
you can use this pattern in your practice area detail page:

```tsx
import { LienRightsWizard } from '@/components/lead-magnets'

interface PracticeAreaPageProps {
  practiceArea: {
    title: string
    content: string
    leadMagnetType?: 'lien-wizard' | 'litigation-roadmap' | 'entity-comparator' | 'none'
  }
}

export default function PracticeAreaPage({ practiceArea }: PracticeAreaPageProps) {
  return (
    <div>
      {/* Practice area content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-primary-navy mb-6">
            {practiceArea.title}
          </h1>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: practiceArea.content }} 
          />
        </div>
      </section>

      {/* Conditional Lead Magnet Rendering */}
      {practiceArea.leadMagnetType === 'lien-wizard' && (
        <section className="py-12 px-4 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-primary-navy mb-4">
                Interactive Lien Rights Tool
              </h2>
              <p className="text-lg text-neutral-600">
                Use our wizard to understand your specific lien rights timeline
              </p>
            </div>
            <LienRightsWizard />
          </div>
        </section>
      )}
    </div>
  )
}
```

## Method 3: Standalone Tool Page with Navigation

Create a dedicated tools section with the wizard:

```tsx
import { LienRightsWizard } from '@/components/lead-magnets'
import Link from 'next/link'

export default function ConstructionToolsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-neutral-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary-navy hover:underline">
              Home
            </Link>
            <span className="text-neutral-400">/</span>
            <Link href="/practice-areas/construction" className="text-primary-navy hover:underline">
              Construction Law
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-600">Lien Rights Wizard</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-navy to-primary-slate text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">
            Indiana Lien Rights Wizard
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Understand your construction lien deadlines in just 3 steps
          </p>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-12 px-4">
        <LienRightsWizard />
      </section>

      {/* Related Resources */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary-navy text-center mb-8">
            Related Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-navy mb-2">
                Construction Law Guide
              </h3>
              <p className="text-neutral-600 mb-4">
                Comprehensive overview of Indiana construction law
              </p>
              <Link href="/resources/construction-law-guide" className="text-accent-gold hover:underline">
                Read More →
              </Link>
            </div>
            
            <div className="border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-navy mb-2">
                Contact Our Team
              </h3>
              <p className="text-neutral-600 mb-4">
                Speak with our construction law attorneys
              </p>
              <Link href="/contact" className="text-accent-gold hover:underline">
                Get in Touch →
              </Link>
            </div>
            
            <div className="border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-navy mb-2">
                Construction Blog
              </h3>
              <p className="text-neutral-600 mb-4">
                Latest updates and insights on construction law
              </p>
              <Link href="/blog/construction" className="text-accent-gold hover:underline">
                View Articles →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
```

## SEO Metadata

Don't forget to add proper SEO metadata to your page:

```tsx
export const metadata = {
  title: 'Indiana Lien Rights Wizard | Riley Bennett Egloff LLP',
  description: 'Interactive tool to help construction professionals understand Indiana lien rights timelines and requirements. Get customized deadline information in 3 simple steps.',
  keywords: 'Indiana lien rights, construction lien, mechanic\'s lien, contractor rights, subcontractor rights, lien deadlines',
}
```

## Analytics Tracking

Consider adding analytics tracking for wizard interactions:

```tsx
import { useEffect } from 'react'

// Track wizard step completion
useEffect(() => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'lien_wizard_step', {
      event_category: 'engagement',
      event_label: `Step ${currentStep}`,
    })
  }
}, [currentStep])

// Track lead submission
const onSubmit = async (data: FormData) => {
  // ... existing submission logic
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'lien_wizard_lead', {
      event_category: 'conversion',
      event_label: `${projectType}-${role}`,
    })
  }
}
```
