import type { PracticeArea } from '../types'

/**
 * Sample practice areas data for Riley Bennett Egloff
 * This will be replaced with CMS or API data in production
 */
export const practiceAreas: PracticeArea[] = [
  {
    id: 'business-corporate',
    name: 'Business & Corporate',
    slug: 'business-corporate',
    description: 'Strategic counsel for complex transactions, governance, and regulatory compliance',
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
    id: 'litigation-defense',
    name: 'Litigation & Defense',
    slug: 'litigation-defense',
    description: 'Trial-tested advocacy across commercial disputes and civil litigation',
    detailedDescription: 'Our litigation team combines courtroom excellence with strategic business insight. We handle high-stakes commercial disputes, employment matters, and complex civil litigation with a focus on achieving your business objectives.',
    icon: 'Gavel',
    attorneys: [],
    subAreas: [
      'Commercial Litigation',
      'Employment Disputes',
      'Contract Disputes',
      'Real Estate Litigation',
      'Alternative Dispute Resolution'
    ]
  },
  {
    id: 'insurance-coverage',
    name: 'Insurance Coverage',
    slug: 'insurance-coverage',
    description: 'Comprehensive defense for carriers, insureds, and coverage disputes',
    detailedDescription: 'We provide aggressive, cost-effective defense representation across a wide range of insurance coverage matters. Our team has extensive trial experience and a proven track record of favorable outcomes.',
    icon: 'ShieldCheck',
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
    id: 'labor-employment',
    name: 'Labor & Employment',
    slug: 'labor-employment',
    description: 'Proactive guidance and defense for workplace legal challenges',
    detailedDescription: 'Our employment law team provides comprehensive counsel on all aspects of the employer-employee relationship, from hiring to termination, including discrimination claims, wage and hour disputes, and workplace safety.',
    icon: 'Users',
    attorneys: [],
    subAreas: [
      'Employment Discrimination',
      'Wage & Hour Compliance',
      'Workplace Safety',
      'Employee Benefits',
      'Employment Contracts'
    ]
  },
  {
    id: 'health-care',
    name: 'Health Care Law',
    slug: 'health-care',
    description: 'Regulatory compliance, transactions, and litigation for healthcare providers',
    detailedDescription: 'We counsel hospitals, physicians, and healthcare organizations on regulatory compliance, Medicare/Medicaid issues, fraud and abuse, licensing, and medical malpractice defense.',
    icon: 'HeartPulse',
    attorneys: [],
    subAreas: [
      'Medical Malpractice Defense',
      'HIPAA Compliance',
      'Medicare/Medicaid',
      'Healthcare Transactions',
      'Licensing & Credentialing'
    ]
  },
  {
    id: 'construction',
    name: 'Construction',
    slug: 'construction',
    description: 'Full-service representation for owners, contractors, and design professionals',
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
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Commercial transactions, development, and real property disputes',
    detailedDescription: 'Our real estate practice handles acquisitions, dispositions, financing, leasing, development, and property disputes for commercial clients across Indiana and the Midwest.',
    icon: 'Building2',
    attorneys: [],
    subAreas: [
      'Commercial Transactions',
      'Development & Zoning',
      'Financing & Leasing',
      'Title & Survey Issues',
      'Property Litigation'
    ]
  },
  {
    id: 'government-law',
    name: 'Government Law',
    slug: 'government-law',
    description: 'Municipal counsel, public finance, and government entity representation',
    detailedDescription: 'We serve as counsel to municipalities, school corporations, and other governmental entities, providing advice on public finance, procurement, open meetings, public records, and administrative law.',
    icon: 'Scale',
    attorneys: [],
    subAreas: [
      'Municipal Counsel',
      'Public Finance',
      'Procurement',
      'Open Meetings & Records',
      'Administrative Law'
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
