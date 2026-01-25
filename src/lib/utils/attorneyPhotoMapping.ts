/**
 * Attorney Photo Mapping
 * Maps attorney names/IDs to their optimized photo files
 */

export const attorneyPhotoMap: Record<string, string> = {
  // Map attorney IDs or names to their photo filenames
  'anna-marvin': '/images/team/optimized/anna-marvin-attorney-thmb-jpg.webp',
  'beau-browning': '/images/team/optimized/beau-browning-headshot-with-background-s13-0338-a-jpg.webp',
  'blair-vandivier': '/images/team/optimized/blair-vandivier-attorney-indianapolis-riley-bennett-egloff-business-law-mergers-and-acquisitions-contracts-formation.webp',
  'courtney-mills': '/images/team/optimized/courtney-d-mills-indianapolis-attorney-riley-bennett-egloff-partner-medical-malpractice-defense-health-care-litigation.webp',
  'donald-smith': '/images/team/optimized/donald-s-smith-attorney-indianapolis-partner-riley-bennett-egloff-employment-law-.webp',
  'doug-cook': '/images/team/optimized/doug-cook-indianapolis-attorney-business-law.webp',
  'eric-hylton': '/images/team/optimized/eric-hylton-indiana-attorney-education-law-thumbnail-1.webp',
  'jaclyn-flint': '/images/team/optimized/jaclyn-m-flint-attorney-indiana-ip-law-construction-sports-entertainment-commercial-litigation-thumbnail.webp',
  'james-riley': '/images/team/optimized/james-riley-jr-attorney-indianapolis-riley-bennett-egloff-member-american-arbitration-association-business-litigation.webp',
  'jeffrey-fecht': '/images/team/optimized/jeffrey-fecht-attorney-indianapolis-commercial-litigation-construction-law-product-liability-toxic-tort.webp',
  'john-egloff': '/images/team/optimized/john-egloff-attorney-headshot-thumbnail-jpg.webp',
  'jt-wynne': '/images/team/optimized/jt-wynne-headshot-indianapolis-attorney.webp',
  'justin-sorrell': '/images/team/optimized/justin-sorrell-indiana-business-litigation-attorney.webp',
  'kathleen-hart': '/images/team/optimized/kathleen-hart-indianapolis-attorney-riley-bennett-egloff-business-law-xbe-commercial-law-employment-law-.webp',
  'katie-osborne': '/images/team/optimized/katie-osborne-indiana-med-mal-defense-attorney-partner-riley-bennett-egloff-thumbnail.webp',
  'katie-riles': '/images/team/optimized/katie-riles-attorney-riley-bennett-egloff-with-bkgrnd-png.webp',
  'kevin-tharp': '/images/team/optimized/kevin-tharp-indiana-attorney-partner-riley-bennett-egloff-business-law-construction-law-thumbnail.webp',
  'laura-binford': '/images/team/optimized/laura-binford-indianapolis-med-mal-attorney-partner-riley-bennett-egloff-thumbnail-png.webp',
  'lindsay-llewellyn': '/images/team/optimized/lindsay-a-llewellyn-thumbnail.webp',
  'megan-young': '/images/team/optimized/megan-young-photo-for-thumbnails-jpg.webp',
  'patrick-mccarney': '/images/team/optimized/patrick-mccarney-indiana-attorney-business-law-insurance-law-thumbnail.webp',
  'raymond-seach': '/images/team/optimized/raymond-t-seach-attorney-indianapolis-partner-riley-bennett-egloff.webp',
  'ryan-leitch': '/images/team/optimized/ryan-leitch-indiana-attorney-trust-and-estate-law-thumbnail-1.webp',
  'sarah-macgill-marr': '/images/team/optimized/sarah-macgill-marr.webp',
  'timothy-button': '/images/team/optimized/timothy-h-button-attorney-indianapolis-thumbnail-image.webp',
  'tony-jost': '/images/team/optimized/tony-jost-2l9a4882.webp',
  'travis-watson': '/images/team/optimized/travis-watson-indiana-attorney-construction-law-insurance-law-business-corporate-law-thumbnail.webp',
}

/**
 * Get attorney photo path
 * Returns WebP version for modern browsers, with fallback to JPG
 */
export function getAttorneyPhoto(attorneyId: string): string {
  return attorneyPhotoMap[attorneyId] || '/placeholder-avatar.jpg'
}

/**
 * Get all photo formats for Picture element
 */
export function getAttorneyPhotoSources(attorneyId: string) {
  const basePath = attorneyPhotoMap[attorneyId]?.replace('.webp', '') || '/placeholder-avatar'
  
  return {
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`,
    jpg: `${basePath}.jpg`,
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
