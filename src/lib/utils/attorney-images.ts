/**
 * Attorney Image Mapping
 * Maps attorney names to their normalized image file IDs in /images/team/Attorneys/
 * Updated to use ID-based filenames for better maintainability
 */

export const attorneyImageMap: Record<string, string> = {
  // Partners
  'James W. Riley Jr.': 'james-w-riley-jr',
  'Katie R. Osborne': 'katie-r-osborne',
  'Courtney David Mills': 'courtney-david-mills',
  'Donald S. Smith': 'donald-s-smith',
  'Jeffrey S. Fecht': 'jeffrey-b-fecht',
  'Kevin N. Tharp': 'kevin-n-tharp',
  'Laura A. Binford': 'laura-k-binford',
  'Raymond T. Seach': 'raymond-t-seach',
  'Kathleen Hart': 'kathleen-hart',
  'Katie S. Riles': 'katie-s-riles',
  'Anthony R. Jost': 'anthony-r-jost',
  'Eric M. Hylton': 'eric-m-hylton',
  'Ryan L. Leitch': 'ryan-l-leitch',
  'Jaclyn M. Flint': 'jaclyn-m-flint',

  // Of Counsel
  'John L. Egloff': 'john-l-egloff',
  'Blair R. Vandivier': 'blair-r-vandivier',
  'Douglas A. Cook': 'k-douglas-cook',

  // Associates
  'Anna Marvin': 'anna-marvin',
  'Beau Browning': 'beau-browning',
  'J.T. Wynne': 'j-t-wynne',
  'Justin O. Sorrell': 'justin-o-sorrell',
  'Lindsay A. Llewellyn': 'lindsay-a-llewellyn',
  'Megan Young': 'megan-s-young',
  'Patrick S. McCarney': 'patrick-s-mccarney',
  'Sarah Macgill Marr': 'sarah-macgill-marr',
  'Timothy H. Button': 'timothy-h-button',
  'Travis Watson': 'travis-r-watson',
}

/**
 * Get the image slug (ID) for an attorney by name
 */
export function getAttorneyImageSlug(name: string): string | null {
  return attorneyImageMap[name] || null
}

/**
 * Get thumbnail image path for attorney bio cards
 * Uses images from: /images/team/Attorneys/card thumbnail bio photo/
 */
export function getAttorneyThumbnailImage(attorneyId: string, fallbackUrl?: string): string {
  // The attorney ID should match the filename (e.g., "anna-marvin" -> "anna-marvin.webp")
  const thumbnailPath = `/images/team/Attorneys/card thumbnail bio photo/${attorneyId}.webp`
  return fallbackUrl || thumbnailPath
}

/**
 * Get bio page hero image path for full attorney bio pages
 * Uses transparent headshot images from: /images/team/Attorneys/main bio page transparent/
 * Falls back to regular image if transparent version doesn't exist
 */
export function getAttorneyBioImage(attorneyId: string, fallbackUrl?: string): string {
  // List of attorneys that have transparent bio page images
  const attorneysWithTransparentBio = [
    'anthony-r-jost',
    'courtney-david-mills',
    'donald-s-smith',
    'eric-m-hylton',
    'j-t-wynne',
    'jaclyn-m-flint',
    'james-w-riley-jr',
    'katie-r-osborne',
    'katie-s-riles',
    'lindsay-a-llewellyn',
    'megan-s-young',
    'sarah-macgill-marr',
  ]

  if (attorneysWithTransparentBio.includes(attorneyId)) {
    return `/images/team/Attorneys/main bio page transparent/${attorneyId}.webp`
  }

  // Fallback to regular image or provided fallback
  return fallbackUrl || `/images/team/Attorneys/${attorneyId}.webp`
}

/**
 * Get full image paths for an attorney (webp format only - normalized structure)
 * @deprecated Use getAttorneyThumbnailImage or getAttorneyBioImage instead
 */
export function getAttorneyImages(name: string, fallbackUrl?: string) {
  const slug = getAttorneyImageSlug(name)

  if (!slug) {
    return {
      webp: fallbackUrl || '/placeholder-avatar.jpg',
      fallback: fallbackUrl || '/placeholder-avatar.jpg'
    }
  }

  const basePath = `/images/team/Attorneys/${slug}`

  return {
    webp: `${basePath}.webp`,
    fallback: fallbackUrl || `${basePath}.webp`
  }
}
