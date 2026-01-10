/**
 * Shared relation helper utilities
 *
 * Provides common functions for handling Payload CMS relations
 * in seeding scripts to prevent duplicate relation rows.
 */

import { normalizeSlug } from './slug.js'
import { normalizePracticeAreaName, normalizeIndustryName } from './normalize.js'

/**
 * Find practice area by name or slug
 */
export async function findPracticeAreaByName(payload, name) {
  // Normalize the name BEFORE searching
  const canonicalName = normalizePracticeAreaName(name)
  const slug = normalizeSlug(canonicalName)

  const result = await payload.find({
    collection: 'practice-areas',
    where: {
      or: [
        { title: { equals: canonicalName } },
        { slug: { equals: slug } },
      ],
    },
    limit: 1,
  })

  return result.docs.length > 0 ? result.docs[0] : null
}

/**
 * Find industry by name or slug
 */
export async function findIndustryByName(payload, name) {
  // Normalize the name BEFORE searching
  const canonicalName = normalizeIndustryName(name)
  const slug = normalizeSlug(canonicalName)

  const result = await payload.find({
    collection: 'industries',
    where: {
      or: [
        { title: { equals: canonicalName } },
        { slug: { equals: slug } },
      ],
    },
    limit: 1,
  })

  return result.docs.length > 0 ? result.docs[0] : null
}

/**
 * Resolve relation IDs without duplicates
 *
 * @param {object} payload - Payload instance
 * @param {string[]} names - Array of entity names to resolve
 * @param {function} findByName - Function to find entity by name
 * @returns {Promise<string[]>} - Array of unique relation IDs
 */
export async function resolveRelationIds(payload, names, findByName) {
  if (!names || !Array.isArray(names) || names.length === 0) {
    return []
  }

  const ids = []
  const seen = new Set()

  for (const name of names) {
    if (!name || typeof name !== 'string') continue

    const item = await findByName(payload, name.trim())
    if (item && !seen.has(item.id)) {
      ids.push(item.id)
      seen.add(item.id)
    }
  }

  return ids
}

/**
 * Merge relation IDs without duplicates
 *
 * Takes existing relations and new IDs, merges them,
 * and returns a deduplicated array of IDs.
 *
 * @param {Array} existing - Existing relations (may be IDs or objects with id property)
 * @param {string[]} newIds - New relation IDs to merge
 * @returns {string[]} - Deduplicated array of relation IDs
 */
export function mergeRelationIds(existing, newIds) {
  const existingIds = Array.isArray(existing)
    ? existing.map((item) => (typeof item === 'object' ? item.id : item))
    : []

  const allIds = [...existingIds, ...newIds]
  return [...new Set(allIds)]
}
