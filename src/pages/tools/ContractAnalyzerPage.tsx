import { SEOMeta } from '@/components/seo/SEOMeta'
import { ContractRiskAnalyzer } from '@/components/tools'

export function ContractAnalyzerPage() {
  return (
    <>
      <SEOMeta
        title="Contract Risk Analyzer | Riley Bennett Egloff LLP"
        description="Identify risky contract clauses including indemnification, liability caps, payment terms, and warranties. Get expert recommendations from our business attorneys."
      />
      
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="section-container">
          <ContractRiskAnalyzer />
        </div>
      </div>
    </>
  )
}
