import { SEOMeta } from '@/components/seo/SEOMeta'
import { LegalGlossary } from '@/components/tools/LegalGlossary'
import { PageHeader } from '@/components/layout/PageHeader'

export function LegalGlossaryPage() {
  return (
    <>
      <SEOMeta
        title="Legal Glossary | Riley Bennett Egloff LLP"
        description="Comprehensive legal glossary with 50+ terms covering employment law, construction law, business law, and more. Search and understand legal terminology."
      />
      
      <div className="min-h-screen bg-neutral-50">
        <PageHeader
          title="Legal Glossary"
          subtitle="Search plain-language definitions for common legal terms and concepts."
          backgroundImage="/images/stock%20images/justice-6778953_1280.jpg"
        />
        <div className="section-container py-12">
          <LegalGlossary />
        </div>
      </div>
    </>
  )
}
