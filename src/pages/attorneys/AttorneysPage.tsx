import { useState } from 'react'
import { attorneys as allAttorneys } from '@/lib/utils/attorney-logic'
import type { Attorney } from '@/lib/types'
import { AttorneysListSEO } from '@/components/seo/SEO'
import { AttorneyCard } from '@/components/attorneys/AttorneyCardNew'
import { AttorneySearch } from '@/components/attorneys/AttorneySearch'
import { PageHeader } from '@/components/layout/PageHeader'

export function AttorneysPage() {
  const [filteredAttorneys, setFilteredAttorneys] = useState<Attorney[]>(allAttorneys)

  return (
    <>
      <AttorneysListSEO />

      <div>
        <PageHeader
          title="Our Attorneys"
          subtitle="Meet our team of experienced legal professionals committed to delivering exceptional results."
          backgroundImage="/images/stock%20images/justice-2060093_1280.jpg"
        />

        {/* Attorney Search & Grid */}
        <section className="py-10 sm:py-14 lg:py-24 bg-neutral-50">
          <div className="section-container">
            {/* Search Component */}
            <AttorneySearch onFilterChange={setFilteredAttorneys} />

            {/* Attorneys Grid - 4 Column Layout */}
            {filteredAttorneys.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-neutral-600 mb-2">No attorneys found</p>
                <p className="text-neutral-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="pb-[calc(env(safe-area-inset-bottom,0px)+7.5rem)] grid grid-cols-2 min-[520px]:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {filteredAttorneys.map((attorney, index) => (
                  <AttorneyCard
                    key={attorney.id}
                    attorney={attorney}
                    index={index}
                    showContact={true}
                    compact={true}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
