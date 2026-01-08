/**
 * Industries Data
 * Auto-generated from scraped content
 */

import type { Industry } from '../types/content';

export const industries: Industry[] = [
  {
    "id": "ind-1",
    "name": "Construction",
    "slug": "construction",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-2",
    "name": "Finance",
    "slug": "finance",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-3",
    "name": "Food Beverage Service",
    "slug": "food-beverage-service",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-4",
    "name": "Government",
    "slug": "government",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-5",
    "name": "Health Care",
    "slug": "health-care",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-6",
    "name": "Insurance",
    "slug": "insurance",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-7",
    "name": "Manufacturing",
    "slug": "manufacturing",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-8",
    "name": "Media",
    "slug": "media",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-9",
    "name": "Non Profit Organizations",
    "slug": "non-profit-organizations",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-10",
    "name": "Real Estate",
    "slug": "real-estate",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-11",
    "name": "Sports Entertainment",
    "slug": "sports-entertainment",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-12",
    "name": "Technology",
    "slug": "technology",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-13",
    "name": "Telecommunications",
    "slug": "telecommunications",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-14",
    "name": "Transportation",
    "slug": "transportation",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  },
  {
    "id": "ind-15",
    "name": "Wholesale Retail Service",
    "slug": "wholesale-retail-service",
    "description": "",
    "icon": "building",
    "color": "#74243C",
    "image": "",
    "content": [],
    "relatedPracticeAreas": [],
    "relatedAttorneys": [],
    "featured": false
  }
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug);
}

export function getFeaturedIndustries(): Industry[] {
  return industries.filter(i => i.featured);
}
