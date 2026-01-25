/**
 * Practice Area Image Mapping
 * Maps practice area slugs to their corresponding hero images
 */

export interface PracticeAreaImageSet {
  avif: string
  webp: string
  jpg: string
  fallback: string
}

const imageMap: Record<string, PracticeAreaImageSet> = {
  'bankruptcy-reorganization': {
    avif: '/images/practice-areas/bankruptcy-1024x284.avif',
    webp: '/images/practice-areas/bankruptcy-1024x284.webp',
    jpg: '/images/practice-areas/Bankruptcy-1024x284.jpg',
    fallback: '/images/practice-areas/Bankruptcy-1024x284.jpg'
  },
  'business-law': {
    avif: '/images/practice-areas/bus-corp-law-1024x284.avif',
    webp: '/images/practice-areas/bus-corp-law-1024x284.webp',
    jpg: '/images/practice-areas/bus-corp-law-1024x284-1.jpg',
    fallback: '/images/practice-areas/Bus-corp-law-1024x284.jpg'
  },
  'business-litigation': {
    avif: '/images/practice-areas/bus-lit-1024x284.avif',
    webp: '/images/practice-areas/bus-lit-1024x284.webp',
    jpg: '/images/practice-areas/Bus-Lit-1024x284.jpg',
    fallback: '/images/practice-areas/Bus-Lit-1024x284.jpg'
  },
  'commercial-litigation': {
    avif: '/images/practice-areas/commercail-lit-1024x284.avif',
    webp: '/images/practice-areas/commercail-lit-1024x284.webp',
    jpg: '/images/practice-areas/Commercail-lit-1024x284.jpg',
    fallback: '/images/practice-areas/Commercail-lit-1024x284.jpg'
  },
  'construction': {
    avif: '/images/practice-areas/construction.avif',
    webp: '/images/practice-areas/construction.webp',
    jpg: '/images/practice-areas/Construction.jpg',
    fallback: '/images/practice-areas/Construction.jpg'
  },
  'employment-law': {
    avif: '/images/practice-areas/employment-law-1024x284.avif',
    webp: '/images/practice-areas/employment-law-1024x284.webp',
    jpg: '/images/practice-areas/Employment-Law-1024x284.jpg',
    fallback: '/images/practice-areas/Employment-Law-1024x284.jpg'
  },
  'family-law': {
    avif: '/images/practice-areas/famil-law-1024x284.avif',
    webp: '/images/practice-areas/famil-law-1024x284.webp',
    jpg: '/images/practice-areas/Famil-Law-1024x284.jpg',
    fallback: '/images/practice-areas/Famil-Law-1024x284.jpg'
  },
  'government-law': {
    avif: '/images/practice-areas/government-law-1024x284.avif',
    webp: '/images/practice-areas/government-law-1024x284.webp',
    jpg: '/images/practice-areas/Government-Law-1024x284.jpg',
    fallback: '/images/practice-areas/Government-Law-1024x284.jpg'
  },
  'health-care': {
    avif: '/images/practice-areas/health-care-1024x284.avif',
    webp: '/images/practice-areas/health-care-1024x284.webp',
    jpg: '/images/practice-areas/Health-Care-1024x284.jpg',
    fallback: '/images/practice-areas/Health-Care-1024x284.jpg'
  },
  'insurance': {
    avif: '/images/practice-areas/insurance-1024x284.avif',
    webp: '/images/practice-areas/insurance-1024x284.webp',
    jpg: '/images/practice-areas/Insurance-1024x284.jpg',
    fallback: '/images/practice-areas/Insurance-1024x284.jpg'
  },
  'labor-employment': {
    avif: '/images/practice-areas/employment-law-1024x284.avif',
    webp: '/images/practice-areas/employment-law-1024x284.webp',
    jpg: '/images/practice-areas/Employment-Law-1024x284.jpg',
    fallback: '/images/practice-areas/Employment-Law-1024x284.jpg'
  }
}

/**
 * Get the image set for a practice area by slug
 */
export function getPracticeAreaImages(slug: string): PracticeAreaImageSet | null {
  return imageMap[slug] || null
}

/**
 * Get the best available image URL for a practice area
 * Returns AVIF if supported, then WebP, then JPG fallback
 */
export function getPracticeAreaHeroImage(slug: string): string {
  const images = getPracticeAreaImages(slug)
  if (!images) return '/images/practice-areas/practice-areas-1.jpg'
  
  // Return WebP as default (good balance of quality and support)
  return images.webp || images.jpg || images.fallback
}
