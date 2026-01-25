/**
 * Enhanced Practice Areas Data
 * Includes detailed descriptions, key services, and image mappings
 */

import type { PracticeArea } from '../types'

export interface EnhancedPracticeArea extends PracticeArea {
  detailedDescription: string
  keyServices: string[]
  backgroundImage?: string
  attorneyCount?: number
}

export const enhancedPracticeAreas: EnhancedPracticeArea[] = [
  {
    id: 'business-law',
    name: 'Business & Corporate Law',
    slug: 'business-law',
    description: 'Entity formation, contracts, governance, M&A, employment, and day-to-day counsel for companies of all sizes.',
    detailedDescription: 'Our corporate attorneys provide comprehensive legal counsel for businesses at every stage of growth. From entity formation and governance to mergers, acquisitions, and day-to-day operational matters, we deliver strategic advice that protects your interests and drives success.',
    icon: 'Building2',
    keyServices: [
      'Mergers & Acquisitions',
      'Entity Formation',
      'Contract Negotiation',
      'Corporate Governance',
      'Securities Compliance',
      'Employment Matters',
      'Intellectual Property Protection'
    ],
    backgroundImage: '/images/practice-areas/bus-corp-law-1024x284.webp',
    attorneys: [],
    imageUrl: '/assets/practice-areas/business-law.webp'
  },
  {
    id: 'bankruptcy-reorganization',
    name: 'Bankruptcy & Reorganization',
    slug: 'bankruptcy-reorganization',
    description: "Creditor's rights, receiverships, workouts, and business reorganizations in federal and state courts.",
    detailedDescription: 'Our bankruptcy team represents creditors and debtors in complex restructuring matters. We handle receiverships, workouts, and reorganizations in federal and state courts, providing strategic counsel to protect your financial interests.',
    icon: 'Scale',
    keyServices: [
      "Creditor's Rights",
      'Receiverships',
      'Business Workouts',
      'Chapter 11 Reorganizations',
      'Asset Recovery',
      'Bankruptcy Litigation'
    ],
    backgroundImage: '/images/practice-areas/bankruptcy-1024x284.webp',
    attorneys: [],
    imageUrl: '/assets/practice-areas/bankruptcy-reorganization.webp'
  },
  {
    id: 'business-litigation',
    name: 'Business Litigation',
    slug: 'business-litigation',
    description: 'Disputes involving contracts, ownership, competition, trade secrets, and complex commercial issues.',
    detailedDescription: 'Our litigators handle high-stakes business disputes involving contracts, ownership conflicts, competition, and trade secrets. We provide aggressive representation in state and federal courts to protect your business interests.',
    icon: 'Gavel',
    keyServices: [
      'Contract Disputes',
      'Shareholder Litigation',
      'Trade Secret Protection',
      'Non-Compete Enforcement',
      'Business Torts',
      'Class Action Defense'
    ],
    backgroundImage: '/images/practice-areas/bus-lit-1024x284.webp',
    attorneys: [],
  },
  {
    id: 'commercial-litigation',
    name: 'Commercial Litigation',
    slug: 'commercial-litigation',
    description: 'High-stakes commercial disputes, injunctions, and trial practice in state and federal courts.',
    detailedDescription: 'We represent businesses in complex commercial litigation across diverse industries. Our trial lawyers handle everything from injunctive relief to multi-million dollar disputes in state and federal courts.',
    icon: 'Scale',
    keyServices: [
      'Complex Commercial Disputes',
      'Injunctive Relief',
      'Trial Practice',
      'Appellate Advocacy',
      'Alternative Dispute Resolution',
      'Emergency Litigation'
    ],
    backgroundImage: '/images/practice-areas/Commercail-lit-1024x284.jpg',
    attorneys: [],
  },
  {
    id: 'construction',
    name: 'Construction',
    slug: 'construction',
    description: 'Contracts, risk management, claims, lien rights, and dispute resolution for owners and contractors.',
    detailedDescription: 'Our construction attorneys assist clients from conception to completion, handling contract negotiation, risk management, mechanic\'s liens, and dispute resolution. We serve owners, contractors, and subcontractors across all project types.',
    icon: 'HardHat',
    keyServices: [
      'Real Estate & Zoning',
      'Financing & Insurance',
      'Bid Disputes',
      'Mechanic\'s Liens',
      'Contract Drafting',
      'Change Orders',
      'Construction Litigation'
    ],
    backgroundImage: '/images/practice-areas/construction.webp',
    attorneys: [],
  },
  {
    id: 'family-law',
    name: 'Family Law',
    slug: 'family-law',
    description: 'Guidance through complex family matters including divorce, custody, and support.',
    detailedDescription: 'Our family law attorneys provide compassionate yet strategic counsel through divorce, custody disputes, support modifications, and other sensitive family matters. We protect your interests while minimizing conflict.',
    icon: 'Users',
    keyServices: [
      'Divorce Proceedings',
      'Child Custody',
      'Support Modifications',
      'Property Division',
      'Prenuptial Agreements',
      'Adoption Services'
    ],
    backgroundImage: '/images/practice-areas/famil-law-1024x284.webp',
    attorneys: [],
  },
  {
    id: 'government-law',
    name: 'Government Law',
    slug: 'government-law',
    description: 'Representation for governmental entities and regulated businesses on compliance and public matters.',
    detailedDescription: 'We represent governmental entities and regulated businesses on compliance, public policy, and administrative matters. Our attorneys navigate complex regulatory frameworks to achieve your objectives.',
    icon: 'Building2',
    keyServices: [
      'Regulatory Compliance',
      'Public Entity Representation',
      'Administrative Law',
      'Municipal Finance',
      'Public Records',
      'Zoning & Land Use'
    ],
    backgroundImage: '/images/practice-areas/Government-Law-1024x284.jpg',
    attorneys: [],
  },
  {
    id: 'health-care',
    name: 'Health Care',
    slug: 'health-care',
    description: 'Regulatory counsel, compliance, payer relations, and dispute resolution for health providers.',
    detailedDescription: 'Regulatory counsel, compliance, and dispute resolution for health providers. Our healthcare attorneys handle HIPAA compliance, medical malpractice defense, and provider contract negotiations across the healthcare spectrum.',
    icon: 'HeartPulse',
    keyServices: [
      'HIPAA Compliance',
      'Medical Malpractice Defense',
      'Provider Contracts',
      'Regulatory Matters',
      'Medicare/Medicaid Issues',
      'Healthcare Transactions'
    ],
    backgroundImage: '/images/practice-areas/health-care-1024x284.webp',
    attorneys: [],
  },
  {
    id: 'insurance',
    name: 'Insurance',
    slug: 'insurance',
    description: 'Coverage opinions, extra-contractual claims, and defense of insureds across a range of risks.',
    detailedDescription: 'We provide coverage opinions, handle extra-contractual claims, and defend insureds across diverse risk categories. Our insurance practice serves carriers, insureds, and third-party administrators.',
    icon: 'ShieldCheck',
    keyServices: [
      'Coverage Analysis',
      'Bad Faith Defense',
      'Subrogation',
      'Claims Management',
      'Policy Drafting',
      'Insured Defense'
    ],
    backgroundImage: '/images/practice-areas/insurance-1024x284.webp',
    attorneys: [],
  },
  {
    id: 'intellectual-property',
    name: 'Intellectual Property',
    slug: 'intellectual-property',
    description: 'Brand protection, licensing, and enforcement of trade secrets, trademarks, and copyrights.',
    detailedDescription: 'Our IP attorneys protect your innovations through trademark registration, copyright enforcement, trade secret litigation, and strategic licensing. We safeguard your competitive advantages in the marketplace.',
    icon: 'Gavel',
    keyServices: [
      'Trademark Registration',
      'Copyright Protection',
      'Trade Secret Litigation',
      'IP Licensing',
      'Brand Enforcement',
      'Technology Transactions'
    ],
    attorneys: [],
  },
  {
    id: 'labor-employment',
    name: 'Labor & Employment',
    slug: 'labor-employment',
    description: 'Employment counseling, policy development, investigations, and defense of claims and agency charges.',
    detailedDescription: 'We counsel employers on workplace matters, from policy development to defending discrimination claims and agency charges. Our proactive approach minimizes risk while maintaining productive work environments.',
    icon: 'Users',
    keyServices: [
      'Employment Counseling',
      'Policy Development',
      'Discrimination Defense',
      'Wage & Hour Compliance',
      'EEOC Charges',
      'Workplace Investigations'
    ],
    backgroundImage: '/images/practice-areas/employment-law-1024x284.webp',
    attorneys: [],
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Acquisitions, leasing, finance, development, and dispute resolution for real property matters.',
    detailedDescription: 'Our real estate practice handles acquisitions, financing, development, and leasing for commercial and residential properties. We navigate complex transactions and resolve disputes efficiently.',
    icon: 'Building2',
    keyServices: [
      'Property Acquisitions',
      'Commercial Leasing',
      'Real Estate Finance',
      'Land Use & Zoning',
      'Title Issues',
      'Property Disputes'
    ],
    attorneys: [],
  },
  {
    id: 'wills-trusts-estates',
    name: 'Wills, Trusts & Estates',
    slug: 'wills-trusts-estates',
    description: 'Estate planning, trust administration, and wealth transfer strategies for individuals and families.',
    detailedDescription: 'We provide comprehensive estate planning, trust administration, and wealth transfer strategies. Our attorneys help families preserve assets, minimize taxes, and ensure smooth generational transitions.',
    icon: 'Scale',
    keyServices: [
      'Estate Planning',
      'Trust Administration',
      'Wealth Transfer',
      'Tax Planning',
      'Probate Administration',
      'Guardianships'
    ],
    attorneys: [],
  },
]
