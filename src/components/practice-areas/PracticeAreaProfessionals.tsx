import { AttorneyCard } from '@/components/attorneys'
import { attorneys } from '@/lib/utils/attorney-logic'
import type { Attorney } from '@/lib/types'

interface PracticeAreaProfessionalsProps {
  title?: string
  attorneyNames: string[]
  compact?: boolean
}

/**
 * Reusable component to display attorneys for a practice area
 * Used on practice area detail pages
 */
export function PracticeAreaProfessionals({ 
  title = 'Our Professionals', 
  attorneyNames,
  compact = false 
}: PracticeAreaProfessionalsProps) {
  // Find attorneys by name
  const practiceAttorneys: Attorney[] = attorneyNames
    .map(name => attorneys.find(a => a.name === name))
    .filter((a): a is Attorney => a !== undefined)

  if (practiceAttorneys.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-20 bg-neutral-50">
      <div className="section-container">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-8">
          {title}
        </h2>
        
        <div className={`grid gap-6 ${compact ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {practiceAttorneys.map((attorney, index) => (
            <AttorneyCard
              key={attorney.id}
              attorney={attorney}
              index={index}
              compact={compact}
              showContact={!compact}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
