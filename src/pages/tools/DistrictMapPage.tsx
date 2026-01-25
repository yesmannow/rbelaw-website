import { InteractiveMap } from '@/components/tools/InteractiveMap'
import { SEOMeta } from '@/components/seo/SEOMeta'

export function DistrictMapPage() {
  return (
    <>
      <SEOMeta
        title="Indiana Worker's Comp District Locator | Riley Bennett Egloff LLP"
        description="Find your Board Member, Court Reporter, and contact information by county or district."
      />
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="section-container">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-primary-navy mb-4">
              Indiana Worker's Compensation District Locator
            </h1>
            <p className="text-lg text-neutral-700">
              Find your Board Member, Court Reporter, and contact information by county or district.
            </p>
          </div>
          <InteractiveMap />
        </div>
      </div>
    </>
  )
}
