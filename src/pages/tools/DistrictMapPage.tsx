import { InteractiveMap } from '@/components/tools/InteractiveMap'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { PageHeader } from '@/components/layout/PageHeader'

export function DistrictMapPage() {
  return (
    <>
      <SEOMeta
        title="Indiana Worker's Comp District Locator | Riley Bennett Egloff LLP"
        description="Find your Board Member, Court Reporter, and contact information by county or district."
      />
      <div className="min-h-screen bg-neutral-50">
        <PageHeader
          title="Indiana Worker's Compensation District Locator"
          subtitle="Find your Board Member, Court Reporter, and contact information by county or district."
          backgroundImage="/images/stock%20images/indy-669133_1280.jpg"
        />
        <div className="section-container py-12">
          <InteractiveMap />
        </div>
      </div>
    </>
  )
}
