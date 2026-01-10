/**
 * Shared slug normalization helper
 *
 * Normalizes strings to URL-friendly slugs:
 * - Lowercase
 * - Trim whitespace
 * - Remove punctuation (except hyphens)
 * - Replace spaces with hyphens
 * - Collapse multiple hyphens to single
 * - Remove leading/trailing hyphens
 */

/**
 * Normalize a string to a URL-friendly slug
 * @param {string} text - The text to normalize
 * @returns {string} - The normalized slug
 */
export function normalizeSlug(text) {
  if (!text || typeof text !== 'string') {
    return ''
  }

  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove all punctuation except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens to single
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}
