import type { Industry } from '../types'

/**
 * Industries served by Riley Bennett Egloff
 */
export const industries: Industry[] = [
  {
    id: 'construction',
    name: 'Construction',
    slug: 'construction',
    description: 'Legal services for construction companies, contractors, and developers.',
    icon: 'HardHat'
  },
  {
    id: 'finance',
    name: 'Finance',
    slug: 'finance',
    description: 'Comprehensive legal counsel for financial institutions and services.',
    icon: 'Landmark'
  },
  {
    id: 'government',
    name: 'Government',
    slug: 'government',
    description: 'Serving governmental entities and public agencies.',
    icon: 'Building2'
  },
  {
    id: 'health-care',
    name: 'Health Care',
    slug: 'health-care',
    description: 'Legal solutions for healthcare providers and medical practices.',
    icon: 'Stethoscope'
  },
  {
    id: 'insurance',
    name: 'Insurance',
    slug: 'insurance',
    description: 'Representing insurance companies and adjusters.',
    icon: 'Shield'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Legal support for manufacturers and industrial operations.',
    icon: 'Factory'
  },
  {
    id: 'media',
    name: 'Media',
    slug: 'media',
    description: 'Counsel for media companies and content creators.',
    icon: 'Radio'
  },
  {
    id: 'non-profits',
    name: 'Non-Profits',
    slug: 'non-profits',
    description: 'Legal guidance for charitable and non-profit organizations.',
    icon: 'Heart'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Comprehensive real estate legal services.',
    icon: 'Home'
  },
  {
    id: 'restaurant-hospitality',
    name: 'Restaurant & Hospitality',
    slug: 'restaurant-hospitality',
    description: 'Serving restaurants, hotels, and hospitality businesses.',
    icon: 'UtensilsCrossed'
  },
  {
    id: 'sports-entertainment',
    name: 'Sports & Entertainment',
    slug: 'sports-entertainment',
    description: 'Legal representation in sports and entertainment matters.',
    icon: 'Trophy'
  },
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    description: 'Legal services for technology companies and startups.',
    icon: 'Laptop'
  },
  {
    id: 'telecommunications',
    name: 'Telecommunications',
    slug: 'telecommunications',
    description: 'Counsel for telecommunications and communications companies.',
    icon: 'Radio'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    slug: 'transportation',
    description: 'Legal support for transportation and logistics companies.',
    icon: 'Truck'
  },
  {
    id: 'wholesale-retail',
    name: 'Wholesale & Retail Sales',
    slug: 'wholesale-retail',
    description: 'Representing wholesale distributors and retail businesses.',
    icon: 'ShoppingCart'
  }
]

/**
 * Get an industry by slug
 */
export const getIndustryBySlug = (slug: string): Industry | undefined => {
  return industries.find(industry => industry.slug === slug)
}

/**
 * Get an industry by ID
 */
export const getIndustryById = (id: string): Industry | undefined => {
  return industries.find(industry => industry.id === id)
}
