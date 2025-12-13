import type { LegalAssistant } from '../types'

/**
 * Legal Assistants - Support staff for attorneys
 * This will be replaced with CMS or API data in production
 */
export const legalAssistants: LegalAssistant[] = [
  // Note: The old site didn't provide specific names for legal assistants
  // This is a placeholder structure that can be populated with actual data
  // You may want to scrape or manually add the data from the old site
  {
    id: 'legal-assistant-1',
    name: 'Legal Assistant',
    title: 'Legal Assistant',
    email: 'legal@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Dedicated legal assistant providing comprehensive support to our attorneys.',
    imageUrl: '/images/team/legal-assistant-placeholder.jpg',
    supportingAttorneys: [],
    specialties: ['Document Preparation', 'Case Management', 'Client Communication']
  }
  // Add more legal assistants as data becomes available
]

/**
 * Get a legal assistant by ID
 */
export function getLegalAssistantById(id: string): LegalAssistant | undefined {
  return legalAssistants.find(la => la.id === id)
}

/**
 * Get legal assistants supporting a specific attorney
 */
export function getLegalAssistantsByAttorney(attorneyId: string): LegalAssistant[] {
  return legalAssistants.filter(la =>
    la.supportingAttorneys?.includes(attorneyId)
  )
}

