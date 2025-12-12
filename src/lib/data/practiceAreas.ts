import type { PracticeArea } from '../types'

/**
 * Sample practice areas data for Riley Bennett Egloff
 * This will be replaced with CMS or API data in production
 */
export const practiceAreas: PracticeArea[] = [
  {
    id: 'corporate-law',
    name: 'Corporate Law',
    slug: 'corporate-law',
    description: 'Comprehensive corporate legal services for businesses of all sizes',
    detailedDescription: 'Our corporate law practice provides strategic counsel to businesses navigating complex legal landscapes. From formation to dissolution, mergers to acquisitions, we deliver sophisticated legal solutions tailored to your business objectives.',
    icon: 'Building2',
    attorneys: [],
    subAreas: [
      'Mergers & Acquisitions',
      'Corporate Governance',
      'Securities Law',
      'Business Formation',
      'Contract Negotiations'
    ]
  },
  {
    id: 'insurance-defense',
    name: 'Insurance Defense',
    slug: 'insurance-defense',
    description: 'Strategic defense representation for insurance carriers and their insureds',
    detailedDescription: 'We provide aggressive, cost-effective defense representation across a wide range of insurance coverage matters. Our team has extensive trial experience and a proven track record of favorable outcomes.',
    icon: 'Shield',
    attorneys: [],
    subAreas: [
      'General Liability',
      'Professional Liability',
      'Product Liability',
      'Coverage Disputes',
      'Bad Faith Claims'
    ]
  },
  {
    id: 'construction',
    name: 'Construction Law',
    slug: 'construction',
    description: 'Full-service construction law from contracts to litigation',
    detailedDescription: 'Our construction law practice serves owners, contractors, subcontractors, and design professionals. We handle everything from contract drafting and negotiation to complex construction litigation and arbitration.',
    icon: 'HardHat',
    attorneys: [],
    subAreas: [
      'Construction Litigation',
      'Contract Drafting',
      'Mechanic\'s Liens',
      'Delay Claims',
      'Design-Build Agreements'
    ]
  },
  {
    id: 'litigation',
    name: 'Business Litigation',
    slug: 'litigation',
    description: 'Sophisticated trial advocacy and dispute resolution',
    detailedDescription: 'Our litigation team combines courtroom excellence with strategic business insight. We handle high-stakes commercial disputes, employment matters, and complex civil litigation with a focus on achieving your business objectives.',
    icon: 'Scale',
    attorneys: [],
    subAreas: [
      'Commercial Litigation',
      'Employment Disputes',
      'Contract Disputes',
      'Real Estate Litigation',
      'Alternative Dispute Resolution'
    ]
  }
]

/**
 * Get a practice area by slug
 */
export const getPracticeAreaBySlug = (slug: string): PracticeArea | undefined => {
  return practiceAreas.find(area => area.slug === slug)
}

/**
 * Get a practice area by ID
 */
export const getPracticeAreaById = (id: string): PracticeArea | undefined => {
  return practiceAreas.find(area => area.id === id)
}
