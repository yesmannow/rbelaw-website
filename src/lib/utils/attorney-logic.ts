/**
 * Attorney Logic Utilities
 * Reusable functions for attorney data filtering and counting
 */

import { attorneys } from '@/lib/data/attorneys'

/**
 * Get the count of attorneys specializing in a specific practice area or industry
 * @param areaName - The name of the practice area or industry to search for
 * @param type - Whether to search in 'practice' areas or 'industry' lists
 * @returns The number of attorneys specializing in the specified area
 */
export function getSpecialistCount(areaName: string, type: 'practice' | 'industry'): number {
  return attorneys.filter(attorney => {
    const list = type === 'practice' ? attorney.practiceAreas : attorney.industries
    return list.some(item => item.toLowerCase().includes(areaName.toLowerCase()))
  }).length
}

/**
 * Get attorneys who specialize in a specific practice area
 * @param practiceArea - The practice area to filter by
 * @returns Array of attorneys who specialize in the practice area
 */
export function getAttorneysByPracticeArea(practiceArea: string) {
  return attorneys.filter(attorney =>
    attorney.practiceAreas.some(pa =>
      pa.toLowerCase().includes(practiceArea.toLowerCase())
    )
  )
}

/**
 * Get attorneys who work in a specific industry
 * @param industry - The industry to filter by
 * @returns Array of attorneys who work in the industry
 */
export function getAttorneysByIndustry(industry: string) {
  return attorneys.filter(attorney =>
    attorney.industries.some(ind =>
      ind.toLowerCase().includes(industry.toLowerCase())
    )
  )
}

/**
 * Get an attorney by their slug or ID
 * @param slugOrId - The slug or ID of the attorney
 * @returns The attorney if found, undefined otherwise
 */
export function getAttorneyBySlug(slugOrId: string) {
  return attorneys.find(a => a.slug === slugOrId || a.id === slugOrId)
}

/**
 * Get all attorneys
 * @returns All attorneys in the database
 */
export function getAllAttorneys() {
  return attorneys
}
