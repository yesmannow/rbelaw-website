/**
 * Attorney Image Mapping
 * Maps attorney names to their image file slugs in /images/team/optimized/
 * Updated to match actual optimized image file names
 */

export const attorneyImageMap: Record<string, string> = {
  // Partners
  'James W. Riley Jr.': 'james-riley-jr-attorney-indianapolis-riley-bennett-egloff-member-american-arbitration-association-business-litigation',
  'Katie R. Osborne': 'katie-osborne-indiana-med-mal-defense-attorney-partner-riley-bennett-egloff-thumbnail',
  'Courtney David Mills': 'courtney-d-mills-indianapolis-attorney-riley-bennett-egloff-partner-medical-malpractice-defense-health-care-litigation',
  'Donald S. Smith': 'donald-s-smith-attorney-indianapolis-partner-riley-bennett-egloff-employment-law-',
  'Jeffrey S. Fecht': 'jeffrey-fecht-attorney-indianapolis-commercial-litigation-construction-law-product-liability-toxic-tort',
  'Jeffrey B. Fecht': 'jeffrey-fecht-attorney-indianapolis-commercial-litigation-construction-law-product-liability-toxic-tort',
  'Kevin N. Tharp': 'kevin-tharp-indiana-attorney-partner-riley-bennett-egloff-business-law-construction-law-thumbnail',
  'Laura A. Binford': 'laura-binford-indianapolis-med-mal-attorney-partner-riley-bennett-egloff-thumbnail-png',
  'Laura K. Binford': 'laura-binford-indianapolis-med-mal-attorney-partner-riley-bennett-egloff-thumbnail-png',
  'Raymond T. Seach': 'raymond-t-seach-attorney-indianapolis-partner-riley-bennett-egloff',
  'Kathleen Hart': 'kathleen-hart-indianapolis-attorney-riley-bennett-egloff-business-law-xbe-commercial-law-employment-law-',
  'Katie S. Riles': 'katie-riles-attorney-riley-bennett-egloff-with-bkgrnd-png',
  'Anthony R. Jost': 'tony-jost-2l9a4882',
  'Eric M. Hylton': 'eric-hylton-indiana-attorney-education-law-thumbnail-1',
  'Ryan L. Leitch': 'ryan-leitch-indiana-attorney-trust-and-estate-law-thumbnail-1',
  'Jaclyn M. Flint': 'jaclyn-m-flint-attorney-indiana-ip-law-construction-sports-entertainment-commercial-litigation-thumbnail',
  'Laura S. Reed': 'laura-reed-bio',
  
  // Of Counsel
  'John L. Egloff': 'john-egloff-attorney-headshot-thumbnail-jpg',
  'Blair R. Vandivier': 'blair-vandivier-attorney-indianapolis-riley-bennett-egloff-business-law-mergers-and-acquisitions-contracts-formation',
  'Douglas A. Cook': 'doug-cook-indianapolis-attorney-business-law',
  'K. Douglas Cook': 'doug-cook-indianapolis-attorney-business-law',
  
  // Associates
  'Anna Marvin': 'anna-marvin-attorney-thmb-jpg',
  'Anna K. Marvin': 'anna-marvin-attorney-thmb-jpg',
  'Beau Browning': 'beau-browning-headshot-with-background-s13-0338-a-jpg',
  'J.T. Wynne': 'jt-wynne-headshot-indianapolis-attorney',
  'Justin O. Sorrell': 'justin-sorrell-indiana-business-litigation-attorney',
  'Lindsay A. Llewellyn': 'lindsay-a-llewellyn-thumbnail',
  'Megan Young': 'megan-young-photo-for-thumbnails-jpg',
  'Megan S. Young': 'megan-young-photo-for-thumbnails-jpg',
  'Patrick S. McCarney': 'patrick-mccarney-indiana-attorney-business-law-insurance-law-thumbnail',
  'Sarah Macgill Marr': 'sarah-macgill-marr',
  'Sarah MacGill Marr': 'sarah-macgill-marr',
  'Timothy H. Button': 'timothy-h-button-attorney-indianapolis-thumbnail-image',
  'Travis Watson': 'travis-watson-indiana-attorney-construction-law-insurance-law-business-corporate-law-thumbnail',
  'Travis R. Watson': 'travis-watson-indiana-attorney-construction-law-insurance-law-business-corporate-law-thumbnail',
}

/**
 * Get the image slug for an attorney by name
 */
export function getAttorneyImageSlug(name: string): string | null {
  return attorneyImageMap[name] || null
}

/**
 * Get full image paths for an attorney (webp, avif, fallback)
 */
export function getAttorneyImages(name: string, fallbackUrl?: string) {
  const slug = getAttorneyImageSlug(name)
  
  if (!slug) {
    return {
      webp: fallbackUrl || '/placeholder-avatar.jpg',
      avif: fallbackUrl || '/placeholder-avatar.jpg',
      fallback: fallbackUrl || '/placeholder-avatar.jpg'
    }
  }

  const basePath = `/images/team/optimized/${slug}`
  
  return {
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`,
    fallback: fallbackUrl || `${basePath}.jpg`
  }
}
