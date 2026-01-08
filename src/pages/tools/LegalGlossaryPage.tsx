import { SEOMeta } from '@/components/seo/SEOMeta'
import { LegalGlossary } from '@/components/tools/LegalGlossary'

export function LegalGlossaryPage() {
  return (
    <>
      <SEOMeta
        title="Legal Glossary | Riley Bennett Egloff LLP"
        description="Comprehensive legal glossary with 50+ terms covering employment law, construction law, business law, and more. Search and understand legal terminology."
      />
      
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="section-container">
          <LegalGlossary />
        </div>
      </div>
    </>
  )
}
