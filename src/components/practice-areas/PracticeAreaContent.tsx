'use client'

import { EditorialWrapper } from '@/components/layout/EditorialWrapper'
import { LienCalculator } from '@/components/tools/LienCalculator'
import { EstateTaxSimulator } from '@/components/tools/EstateTaxSimulator'
import { LitigationTracker } from '@/components/widgets/LitigationTracker'

interface PracticeAreaContentProps {
  content: any
  leadMagnetType?: string
  subAreas?: any[]
  caseStudies?: any[]
}

/**
 * Client component wrapper for practice area content
 * Conditionally renders Legal Engineering tools in sidebar based on leadMagnetType
 */
export function PracticeAreaContent({
  content,
  leadMagnetType = 'none',
  subAreas = [],
  caseStudies = [],
}: PracticeAreaContentProps) {
  
  // Determine which widget to render based on leadMagnetType
  const renderSidebarWidget = () => {
    switch (leadMagnetType) {
      case 'lien-wizard':
        return <LienCalculator />
      case 'estate-tax':
        return <EstateTaxSimulator />
      case 'litigation-tracker':
        return <LitigationTracker />
      default:
        return null
    }
  }

  const sidebarWidget = renderSidebarWidget()

  return (
    <EditorialWrapper 
      sidebar={sidebarWidget}
      className="bg-white"
    >
      {/* Main Content */}
      <div className="prose prose-lg max-w-none text-gray-700">
        {typeof content === 'string' ? (
          <p>{content}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>

      {/* Sub Areas */}
      {subAreas && subAreas.length > 0 && (
        <div className="mt-12">
          <h2 className="editorial-heading text-3xl mb-6">
            Our Services Include
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subAreas.map((subArea: any, index: number) => (
              <li
                key={index}
                className="flex items-start bg-gray-50 p-4 rounded-lg"
              >
                <span className="text-[--color-accent-gold] mr-3 text-xl">✓</span>
                <span className="text-gray-700">{subArea.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Case Studies */}
      {caseStudies && caseStudies.length > 0 && (
        <div className="mt-12">
          <h2 className="editorial-heading text-3xl mb-6">
            Representative Matters
          </h2>
          <div className="space-y-6">
            {caseStudies.map((caseStudy: any, index: number) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-[--color-primary-navy] mb-2">
                  {caseStudy.title}
                </h3>
                {caseStudy.year && (
                  <p className="text-sm text-gray-500 mb-3">{caseStudy.year}</p>
                )}
                {caseStudy.description && (
                  <p className="text-gray-700 mb-3">{caseStudy.description}</p>
                )}
                {caseStudy.outcome && (
                  <p className="text-[--color-accent-gold] font-semibold">
                    Outcome: {caseStudy.outcome}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </EditorialWrapper>
  )
}
