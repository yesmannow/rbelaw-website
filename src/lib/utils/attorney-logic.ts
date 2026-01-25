/**
 * Attorney Logic Utilities
 * Reusable functions for attorney data filtering and counting
 */

import { attorneys as attorneyData } from '@/lib/data/attorneys'
import { attorneyExtrasById } from '@/lib/data/attorney-extras'
import type { Attorney } from '@/lib/types'

function mergeAttorney(base: Attorney): Attorney {
  const extras = attorneyExtrasById[base.id]
  if (!extras) return base

  return {
    ...base,
    representativeMatters:
      base.representativeMatters && base.representativeMatters.length > 0
        ? base.representativeMatters
        : (extras.representativeMatters ?? base.representativeMatters),
    awards: base.awards && base.awards.length > 0 ? base.awards : (extras.awards ?? base.awards),
    barAdmissions:
      base.barAdmissions && base.barAdmissions.length > 0
        ? base.barAdmissions
        : (extras.barAdmissions ?? base.barAdmissions),
    education:
      base.education && base.education.length > 0
        ? base.education
        : (extras.education ?? base.education),
    beyondOffice: base.beyondOffice && base.beyondOffice.trim().length > 0 ? base.beyondOffice : extras.beyondOffice,
    assistant: base.assistant ?? extras.assistant,
    fax: base.fax ?? extras.fax,
    bioPdfUrl: base.bioPdfUrl ?? extras.bioPdfUrl,
    associations: base.associations && base.associations.length > 0 ? base.associations : extras.associations,
  }
}

// Export attorneys merged with scraped extras
export const attorneys: Attorney[] = attorneyData.map(mergeAttorney)

/**
 * Get the count of attorneys specializing in a specific practice area or industry
 * @param areaName - The name of the practice area or industry to search for
 * @param type - Whether to search in 'practice' areas or 'industry' lists
 * @returns The number of attorneys specializing in the specified area
 */
export function getSpecialistCount(areaName: string, type: 'practice' | 'industry'): number {
  return attorneys.filter((attorney: Attorney) => {
    const list = type === 'practice' ? attorney.practiceAreas : attorney.industries
    return list.some((item: string) => item.toLowerCase().includes(areaName.toLowerCase()))
  }).length
}

/**
 * Get attorneys who specialize in a specific practice area
 * @param practiceArea - The practice area to filter by
 * @returns Array of attorneys who specialize in the practice area
 */
export function getAttorneysByPracticeArea(practiceArea: string): Attorney[] {
  return attorneys.filter((attorney: Attorney) =>
    attorney.practiceAreas.some((pa: string) =>
      pa.toLowerCase().includes(practiceArea.toLowerCase())
    )
  )
}

/**
 * Get attorneys who work in a specific industry
 * @param industry - The industry to filter by
 * @returns Array of attorneys who work in the industry
 */
export function getAttorneysByIndustry(industry: string): Attorney[] {
  return attorneys.filter((attorney: Attorney) =>
    attorney.industries && attorney.industries.some((ind: string) =>
      ind.toLowerCase().includes(industry.toLowerCase())
    )
  )
}

/**
 * Get an attorney by their slug or ID
 * @param slugOrId - The slug or ID of the attorney
 * @returns The attorney if found, undefined otherwise
 */
export function getAttorneyBySlug(slugOrId: string): Attorney | undefined {
  return attorneys.find(a => a.slug === slugOrId || a.id === slugOrId)
}

/**
 * Get an attorney by their ID (also supports name-based slugs)
 * Maintains same ID for view transitions
 * @param id - The ID of the attorney or name-based slug
 * @returns The attorney if found, undefined otherwise
 */
export function getAttorneyById(id: string): Attorney | undefined {
  const norm = String(id)
  return attorneys.find((a) => a.id === norm || a.slug === norm || a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === norm)
}

/**
 * Get attorneys by an array of names
 * @param names - Array of attorney names to match
 * @returns Array of attorneys matching the names
 */
export function getAttorneysByName(names: string[]): Attorney[] {
  return attorneys.filter((a) => names.some(name => a.name === name))
}

/**
 * Get all attorneys
 * @returns All attorneys in the database
 */
export function getAllAttorneys(): Attorney[] {
  return attorneys
}
