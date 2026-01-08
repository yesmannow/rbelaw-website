/**
 * Practice Area Image Mappings
 * Maps practice area slugs to their hero images
 */

export const practiceAreaImages: Record<string, string> = {
  'bankruptcy': '/images/practice-areas/bankruptcy-1024x284',
  'business-law': '/images/practice-areas/bus-corp-law-1024x284',
  'business-corporate-law': '/images/practice-areas/bus-corp-law-1024x284',
  'business-litigation': '/images/practice-areas/bus-lit-1024x284',
  'commercial-litigation': '/images/practice-areas/commercail-lit-1024x284',
  'construction-law': '/images/practice-areas/construction',
  'employment-law': '/images/practice-areas/employment-law-1024x284',
  'family-law': '/images/practice-areas/famil-law-1024x284',
  'government-law': '/images/practice-areas/government-law-1024x284',
  'healthcare-law': '/images/practice-areas/health-care-1024x284',
  'health-care-law': '/images/practice-areas/health-care-1024x284',
  'insurance-defense': '/images/practice-areas/insurance-1024x284',
  'insurance-law': '/images/practice-areas/insurance-1024x284',
};

/**
 * Get practice area image path
 */
export const getPracticeAreaImage = (slug: string): string => {
  return practiceAreaImages[slug] || '/images/practice-areas/practice-areas-1';
};

/**
 * Get all practice area image paths for preloading
 */
export const getAllPracticeAreaImages = (): string[] => {
  return Object.values(practiceAreaImages);
};
