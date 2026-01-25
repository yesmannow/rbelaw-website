import { LitigationTimeline } from '../../components/tools'
import { InteractiveMap } from '@/components/tools/InteractiveMap'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { PageHeader } from '@/components/layout/PageHeader'

export function LitigationTimelinePage() {
  return (
    <>
      <SEOMeta
        title="Litigation Timeline Generator | Riley Bennett Egloff LLP"
        description="Visualize your case schedule with key Indiana Trial Rule deadlines and download calendar files."
      />
      <div className="min-h-screen bg-neutral-50">
        <PageHeader
          title="Litigation Timeline Generator"
          subtitle="Visualize your case schedule with key Indiana Trial Rule deadlines and download calendar files."
          backgroundImage="/images/stock%20images/capitol-820611_1280.jpg"
        />
        <div className="section-container py-12">
          <div className="mb-12">
            <LitigationTimeline />
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-serif font-bold text-primary-navy mb-6">
              Worker's Compensation Districts
            </h2>
            <p className="text-lg text-neutral-700 mb-8">
              Reference the interactive map below to find district information for worker's compensation cases.
            </p>
            <InteractiveMap />
          </div>
        </div>
      </div>
    </>
  )
}
