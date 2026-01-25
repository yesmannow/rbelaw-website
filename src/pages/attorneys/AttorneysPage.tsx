import { useState } from 'react'
import { motion } from 'framer-motion'
import { attorneys as allAttorneys } from '@/lib/utils/attorney-logic'
import type { Attorney } from '@/lib/types'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { AttorneyCard } from '@/components/attorneys/AttorneyCardNew'
import { AttorneySearch } from '@/components/attorneys/AttorneySearch'

export function AttorneysPage() {
  const [filteredAttorneys, setFilteredAttorneys] = useState<Attorney[]>(allAttorneys)

  return (
    <>
      <SEOMeta
        title="Our Attorneys"
        description="Meet our team of experienced legal professionals committed to delivering exceptional results."
      />

      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Our Attorneys
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-100 mb-8 leading-relaxed">
                Meet our team of experienced legal professionals committed to delivering exceptional results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Attorney Search & Grid */}
        <section className="py-16 lg:py-24 bg-neutral-50">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
