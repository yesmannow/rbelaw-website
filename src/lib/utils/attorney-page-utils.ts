import { attorneys as allAttorneys } from '@/lib/data/attorneys'
import { practiceAreas as allPracticeAreas } from '@/lib/data/practiceAreas'
import { caseResults as allCaseResults } from '@/lib/data/caseResults'
import { industriesManual } from '@/lib/data/industries-manual'

/**
 * Create Attorney JSON-LD Schema
 */
export function createAttorneySchema(attorney: typeof allAttorneys[0], slug: string, practiceAreas: typeof allPracticeAreas, headshotUrl: string | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `https://rbelaw.com/attorneys/${slug}#attorney`,
    name: attorney.name,
    jobTitle: attorney.title || 'Attorney',
    email: attorney.email || '',
    telephone: attorney.phone || '+1-317-636-8000',
    url: `https://rbelaw.com/attorneys/${slug}`,
    ...(headshotUrl && { image: headshotUrl }),
    worksFor: {
      '@type': 'LegalService',
      name: 'Riley Bennett Egloff LLP',
      url: 'https://rbelaw.com',
    },
    ...(attorney.education &&
      attorney.education.length > 0 && {
        alumniOf: attorney.education.map((edu) => ({
          '@type': 'EducationalOrganization',
          name: edu.institution,
        })),
      }),
    ...(practiceAreas.length > 0 && {
      knowsAbout: practiceAreas.map((area) => area.name),
    }),
  }
}

/**
 * Map practice area names to practice area objects
 */
export function mapPracticeAreas(practiceAreaNames: string[]) {
  return practiceAreaNames
    .map((practiceName) => {
      return allPracticeAreas.find(
        (pa) => pa.name.toLowerCase() === practiceName.toLowerCase() || 
                pa.slug.toLowerCase() === practiceName.toLowerCase().replace(/\s+/g, '-')
      )
    })
    .filter((pa): pa is typeof allPracticeAreas[0] => pa !== undefined)
}

/**
 * Map industry names to industry objects
 */
export function mapIndustries(industryNames: string[]) {
  return industryNames
    .map((industryName) => {
      return industriesManual.find(
        (ind) => ind.name.toLowerCase() === industryName.toLowerCase() ||
                 ind.slug.toLowerCase() === industryName.toLowerCase().replace(/\s+/g, '-')
      )
    })
    .filter((ind): ind is typeof industriesManual[0] => ind !== undefined)
}

/**
 * Find case results for an attorney
 */
export function findCaseResultsForAttorney(attorneyId: string, attorneyName: string) {
  return allCaseResults
    .filter((result) => {
      return result.attorneys.some((attId) => {
        if (attId === attorneyId || attId === attorneyName) return true
        const resultAttName = allAttorneys.find(a => a.id === attId || a.slug === attId)?.name.toLowerCase()
        return resultAttName === attorneyName.toLowerCase()
      })
    })
    .slice(0, 10)
    .map((result) => ({
      id: result.id,
      title: result.title,
      settlementAmount: result.amount ? parseFloat(result.amount.replace(/[^0-9.]/g, '')) : null,
      description: result.summary,
    }))
}
