import type { Attorney } from '../types'

/**
 * Sample attorneys data for Riley Bennett Egloff
 * This will be replaced with CMS or API data in production
 */
export const attorneys: Attorney[] = [
  // Sample data - to be populated with actual attorney information
]

/**
 * Get an attorney by ID
 */
export const getAttorneyById = (id: string): Attorney | undefined => {
  return attorneys.find(attorney => attorney.id === id)
}

/**
 * Get attorneys by practice area
 */
export const getAttorneysByPracticeArea = (practiceAreaId: string): Attorney[] => {
  return attorneys.filter(attorney => 
    attorney.practiceAreas.includes(practiceAreaId)
  )
}

/**
 * Sort attorneys alphabetically by last name
 */
export const sortAttorneysByName = (attorneyList: Attorney[]): Attorney[] => {
  return [...attorneyList].sort((a, b) => {
    const lastNameA = a.name.split(' ').pop() || ''
    const lastNameB = b.name.split(' ').pop() || ''
    return lastNameA.localeCompare(lastNameB)
  })
}
