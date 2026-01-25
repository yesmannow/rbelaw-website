import { practiceAreas as allPracticeAreas } from '@/lib/data/practiceAreas'
import { attorneys as allAttorneys } from '@/lib/data/attorneys'
import { industriesManual } from '@/lib/data/industries-manual'

/**
 * Create Practice Area JSON-LD Schema
 */
export function createPracticeAreaSchema(practiceArea: typeof allPracticeAreas[0], slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Riley Bennett Egloff LLP - ${practiceArea.name}`,
    description: practiceArea.description || `Legal services for ${practiceArea.name}`,
    url: `https://rbelaw.com/practice-areas/${slug}`,
    provider: {
      '@type': 'Attorney',
      name: 'Riley Bennett Egloff LLP',
    },
  }
}

/**
 * Get active tab index from pathname
 */
export function getActiveTabIndex(path: string, navItems: Array<{ to: string }>): number {
  const currentIndex = navItems.findIndex(item => {
    if (item.to === '/') {
      return path === '/'
    }
    return path === item.to || path.startsWith(item.to + '/')
  })
  return currentIndex !== -1 ? currentIndex : 0
}

/**
 * Find attorneys who practice in a specific practice area
 */
export function findAttorneysForPracticeArea(practiceAreaSlug: string, practiceAreaName: string) {
  return allAttorneys.filter((attorney) =>
    attorney.practiceAreas.some((paName) => {
      const normalizedPaName = paName.toLowerCase().replace(/\s+/g, '-')
      return (
        paName.toLowerCase() === practiceAreaName.toLowerCase() ||
        normalizedPaName === practiceAreaSlug ||
        practiceAreaName.toLowerCase().includes(paName.toLowerCase()) ||
        paName.toLowerCase().includes(practiceAreaName.toLowerCase())
      )
    })
  )
}
