/**
 * Attorney Photo Mapping
 * Maps attorney IDs to their normalized photo files in /images/team/Attorneys/
 * Updated to use ID-based filenames for better maintainability
 */

// Mapping from various ID formats to normalized IDs
const idMapping: Record<string, string> = {
  'anna-marvin': 'anna-marvin',
  'beau-browning': 'beau-browning',
  'blair-vandivier': 'blair-r-vandivier',
  'courtney-mills': 'courtney-david-mills',
  'donald-smith': 'donald-s-smith',
  'doug-cook': 'k-douglas-cook',
  'eric-hylton': 'eric-m-hylton',
  'jaclyn-flint': 'jaclyn-m-flint',
  'james-riley': 'james-w-riley-jr',
  'jeffrey-fecht': 'jeffrey-b-fecht',
  'john-egloff': 'john-l-egloff',
  'jt-wynne': 'j-t-wynne',
  'justin-sorrell': 'justin-o-sorrell',
  'kathleen-hart': 'kathleen-hart',
  'katie-osborne': 'katie-r-osborne',
  'katie-riles': 'katie-s-riles',
  'kevin-tharp': 'kevin-n-tharp',
  'laura-binford': 'laura-k-binford',
  'lindsay-llewellyn': 'lindsay-a-llewellyn',
  'megan-young': 'megan-s-young',
  'patrick-mccarney': 'patrick-s-mccarney',
  'raymond-seach': 'raymond-t-seach',
  'ryan-leitch': 'ryan-l-leitch',
  'sarah-macgill-marr': 'sarah-macgill-marr',
  'timothy-button': 'timothy-h-button',
  'tony-jost': 'anthony-r-jost',
  'travis-watson': 'travis-r-watson',
}

/**
 * Get normalized attorney ID
 */
function getNormalizedId(attorneyId: string): string {
  return idMapping[attorneyId] || attorneyId
}

/**
 * Get attorney photo path
 * Returns WebP version from normalized Attorneys/ directory
 */
export function getAttorneyPhoto(attorneyId: string): string {
  const normalizedId = getNormalizedId(attorneyId)
  return `/images/team/Attorneys/${normalizedId}.webp`
}

/**
 * Get all photo formats for Picture element
 * Note: Now using WebP only in normalized structure
 */
export function getAttorneyPhotoSources(attorneyId: string) {
  const normalizedId = getNormalizedId(attorneyId)
  const basePath = `/images/team/Attorneys/${normalizedId}`

  return {
    webp: `${basePath}.webp`,
    fallback: `${basePath}.webp`, // WebP is the standard format now
  }
}

/**
 * Preload attorney photos for better performance
 */
export function preloadAttorneyPhotos(attorneyIds: string[]) {
  attorneyIds.forEach(id => {
    const photo = getAttorneyPhoto(id)
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = photo
    document.head.appendChild(link)
  })
}
