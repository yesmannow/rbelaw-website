import { SEOMeta } from '@/components/seo/SEOMeta'
import { BusinessEntityComparison } from '@/components/tools'

export function EntityComparisonPage() {
  return (
    <>
      <SEOMeta
        title="Business Entity Comparison Tool | Riley Bennett Egloff LLP"
        description="Compare LLC vs S-Corp vs C-Corp. Get personalized recommendations based on your business goals, revenue, and ownership structure."
      />
      
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="section-container">
          <BusinessEntityComparison />
        </div>
      </div>
    </>
  )
}
