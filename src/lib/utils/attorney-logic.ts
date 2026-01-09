/**
 * Attorney Logic Utilities
 * Reusable functions for attorney data filtering and counting
 */

import { attorneys as masterAttorneys, type MasterAttorney } from '@/lib/data/attorneys'
import type { Attorney, Education, Publication, RepresentativeMatter } from '@/lib/types'

/**
 * Adapt MasterAttorney to Attorney interface
 * Ensures all fields are properly mapped without data loss
 */
function adaptMasterToAttorney(master: MasterAttorney): Attorney {
  const education: Education[] = master.education.map(edu => ({
    degree: edu.degree,
    institution: edu.institution,
    year: edu.year
  }))

  const publications: Publication[] = master.publications?.map(p => ({
    title: p.title,
    publication: '', // MasterAttorney doesn't have separate publication field
    date: p.date || '',
    url: p.url
  })) || []

  const representativeMatters: RepresentativeMatter[] = master.representativeMatters.map(matter => ({
    title: matter,
    description: matter
  }))

  return {
    id: master.id,
    name: master.name,
    title: master.title,
    email: master.email,
    phone: master.phone,
    bio: master.bio.length === 1 ? master.bio[0] : master.bio.join('\n\n'), // Convert array to string
    image: master.image, // Primary image field
    imageThumb: master.imageThumb,
    imageUrl: master.image, // Legacy compatibility - map to same value
    slug: master.slug, // Maintain same ID for view transitions
    practiceAreas: master.practiceAreas,
    education,
    barAdmissions: master.barAdmissions,
    awards: master.awards.length > 0 ? master.awards : undefined,
    publications: publications.length > 0 ? publications : undefined,
    representativeMatters: representativeMatters.length > 0 ? representativeMatters : undefined,
    associations: [], // Not in MasterAttorney - components should check barAdmissions instead
    community: [], // Not in MasterAttorney - can be added to master data if needed
    linkedIn: master.linkedIn,
    twitter: undefined,
    vCard: master.vCard,
    beyondOffice: master.beyondOffice,
    videos: master.videos,
    industries: master.industries
  }
}

// Convert all attorneys to the Attorney interface
export const attorneys: Attorney[] = masterAttorneys.map(adaptMasterToAttorney)

/**
 * Get the count of attorneys specializing in a specific practice area or industry
 * @param areaName - The name of the practice area or industry to search for
 * @param type - Whether to search in 'practice' areas or 'industry' lists
 * @returns The number of attorneys specializing in the specified area
 */
export function getSpecialistCount(areaName: string, type: 'practice' | 'industry'): number {
  return masterAttorneys.filter(attorney => {
    const list = type === 'practice' ? attorney.practiceAreas : attorney.industries
    return list.some(item => item.toLowerCase().includes(areaName.toLowerCase()))
  }).length
}

/**
 * Get attorneys who specialize in a specific practice area
 * @param practiceArea - The practice area to filter by
 * @returns Array of attorneys who specialize in the practice area
 */
export function getAttorneysByPracticeArea(practiceArea: string): Attorney[] {
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
export function getAttorneysByIndustry(industry: string): Attorney[] {
  return attorneys.filter(attorney =>
    attorney.industries && attorney.industries.some(ind =>
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
