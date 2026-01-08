import { motion } from 'framer-motion'
import { PageHeader } from '@/components/layout/PageHeader'
import { enhancedPracticeAreas } from '@/lib/data/practiceAreasEnhanced'
import { PracticeAreaCard } from '@/components/practice-areas/PracticeAreaCard'

export function PracticeAreasIndex() {
  const areas = enhancedPracticeAreas

  return (
    <div className="min-h-screen bg-neutral-50">
      <PageHeader
        title="Practice Areas"
        subtitle="Explore our full range of services, each tailored to help you achieve your goals."
      />

      <div className="section-container py-16 lg:py-24">
        {/* Practice Areas Grid - 3 columns matching Industries page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <PracticeAreaCard key={area.id} area={area} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PracticeAreasIndex
