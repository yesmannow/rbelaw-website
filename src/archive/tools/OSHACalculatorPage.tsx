import { SEOMeta } from '@/components/seo/SEOMeta'
import { OSHACalculator } from '@/components/tools'

export function OSHACalculatorPage() {
  return (
    <>
      <SEOMeta
        title="OSHA Incident Rate Calculator | Riley Bennett Egloff LLP"
        description="Calculate your TRIR, DART, and LTIR rates. Compare workplace safety metrics against industry benchmarks and ensure OSHA compliance."
      />
      
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="section-container">
          <OSHACalculator />
        </div>
      </div>
    </>
  )
}
