import type { IndustryPage, FAQ } from '../types'

/**
 * Industry-Specific Landing Pages
 * Comprehensive pages showcasing expertise in key industries
 */

// Healthcare Industry FAQs
const healthcareFAQs: FAQ[] = [
  {
    id: 'healthcare-faq-1',
    question: 'What is HIPAA compliance and why is it important?',
    answer: 'HIPAA (Health Insurance Portability and Accountability Act) compliance requires healthcare providers to protect patient health information. Non-compliance can result in significant penalties, ranging from $100 to $50,000 per violation. Our attorneys help healthcare providers implement compliant policies and defend against investigations.',
    category: 'compliance',
    industry: 'health-care'
  },
  {
    id: 'healthcare-faq-2',
    question: 'How can I protect my medical practice from employment lawsuits?',
    answer: 'Medical practices should maintain clear employment policies, provide regular training, document performance issues, and ensure compliance with wage and hour laws. Our employment law attorneys work with healthcare providers to create compliant policies and defend against claims.',
    category: 'employment',
    industry: 'health-care'
  },
  {
    id: 'healthcare-faq-3',
    question: 'What should I do if I receive a medical licensing board complaint?',
    answer: 'Contact an attorney immediately. Do not respond to the board without legal counsel. Our healthcare attorneys have extensive experience defending physicians and healthcare professionals in licensing board investigations and disciplinary proceedings.',
    category: 'licensing',
    industry: 'health-care'
  }
]

// Construction Industry FAQs
const constructionFAQs: FAQ[] = [
  {
    id: 'construction-faq-1',
    question: 'What is a mechanics lien and how does it work?',
    answer: 'A mechanics lien is a legal claim against property for unpaid construction work or materials. Contractors and suppliers can file liens to secure payment. Strict deadlines apply, and our construction attorneys can help you file or defend against mechanics liens.',
    category: 'payment',
    industry: 'construction'
  },
  {
    id: 'construction-faq-2',
    question: 'How can I recover costs for construction delays?',
    answer: 'Construction delay claims require detailed documentation of the delay, its cause, and resulting damages. Our attorneys help contractors and owners pursue or defend delay claims, including analyzing contracts and calculating damages.',
    category: 'disputes',
    industry: 'construction'
  },
  {
    id: 'construction-faq-3',
    question: 'What should be included in a construction contract?',
    answer: 'Construction contracts should clearly define scope of work, payment terms, change order procedures, delay provisions, warranty terms, and dispute resolution methods. Our attorneys draft and review construction contracts to protect your interests.',
    category: 'contracts',
    industry: 'construction'
  }
]

// Insurance Industry FAQs
const insuranceFAQs: FAQ[] = [
  {
    id: 'insurance-faq-1',
    question: 'What is bad faith insurance and how do you defend against it?',
    answer: 'Bad faith insurance claims allege that an insurer failed to properly investigate, evaluate, or pay a claim. We defend insurance companies by demonstrating reasonable claims handling, thorough investigation, and good faith decision-making.',
    category: 'defense',
    industry: 'insurance'
  },
  {
    id: 'insurance-faq-2',
    question: 'How do you handle coverage disputes?',
    answer: 'Coverage disputes involve interpreting policy language and determining whether a claim is covered. Our attorneys analyze policies, research case law, and provide coverage opinions to help insurers make informed decisions.',
    category: 'coverage',
    industry: 'insurance'
  },
  {
    id: 'insurance-faq-3',
    question: 'What is the duty to defend vs. duty to indemnify?',
    answer: 'The duty to defend requires insurers to provide legal defense when a claim potentially falls within coverage. The duty to indemnify requires payment of covered damages. The duty to defend is broader and triggered by allegations in the complaint.',
    category: 'coverage',
    industry: 'insurance'
  }
]

// Employment/Business FAQs
const employmentFAQs: FAQ[] = [
  {
    id: 'employment-faq-1',
    question: 'How can I prevent wage and hour lawsuits?',
    answer: 'Properly classify employees as exempt or non-exempt, track hours accurately, pay overtime correctly, provide required meal and rest breaks, and maintain detailed records. Our attorneys conduct wage and hour audits and help implement compliant policies.',
    category: 'compliance',
    industry: 'business'
  },
  {
    id: 'employment-faq-2',
    question: 'What should I do if an employee files a discrimination complaint?',
    answer: 'Take the complaint seriously, conduct a prompt and thorough investigation, document everything, and avoid retaliation. Contact our employment law attorneys immediately to guide you through the investigation and response process.',
    category: 'disputes',
    industry: 'business'
  },
  {
    id: 'employment-faq-3',
    question: 'Do I need an employee handbook?',
    answer: 'Yes. An employee handbook communicates policies, sets expectations, and provides legal protection. It should cover anti-discrimination policies, leave policies, code of conduct, and at-will employment. Our attorneys draft comprehensive, compliant handbooks.',
    category: 'policies',
    industry: 'business'
  }
]

export const industryPages: IndustryPage[] = [
  {
    id: 'healthcare-industry',
    name: 'Healthcare',
    slug: 'healthcare',
    title: 'Healthcare Law Attorneys',
    description: 'Comprehensive legal services for healthcare providers, medical practices, hospitals, and healthcare organizations.',
    detailedDescription: `Riley Bennett Egloff provides comprehensive legal counsel to healthcare providers across Indiana and Kentucky. Our healthcare attorneys understand the unique regulatory environment, compliance requirements, and business challenges facing medical practices, hospitals, and healthcare organizations.

We represent physicians, dentists, nurses, hospitals, medical practices, long-term care facilities, and other healthcare providers in a wide range of legal matters. Our team stays current with evolving healthcare regulations, including HIPAA, Stark Law, Anti-Kickback Statute, and state licensing requirements.`,
    icon: 'Stethoscope',
    heroImage: '/images/industries/healthcare-hero.jpg',
    services: [
      'HIPAA Compliance and Privacy',
      'Medical Licensing Board Defense',
      'Healthcare Employment Law',
      'Medical Staff Credentialing',
      'Healthcare Contracts and Transactions',
      'Regulatory Compliance',
      'Medicare and Medicaid Issues',
      'Healthcare Litigation',
      'Medical Malpractice Defense',
      'Practice Formation and Dissolution'
    ],
    relatedPracticeAreas: ['healthcare-law', 'employment-law', 'business-litigation'],
    relatedAttorneys: ['laura-binford'],
    caseResults: ['healthcare-law-001', 'healthcare-law-002'],
    faqs: healthcareFAQs
  },
  {
    id: 'construction-industry',
    name: 'Construction',
    slug: 'construction',
    title: 'Construction Law Attorneys',
    description: 'Legal representation for construction companies, contractors, developers, and property owners.',
    detailedDescription: `Riley Bennett Egloff represents all participants in the construction industry, including general contractors, subcontractors, suppliers, developers, and property owners. Our construction attorneys handle the full spectrum of construction-related legal matters, from contract drafting to complex litigation.

We understand the unique challenges of the construction industry, including tight deadlines, complex payment structures, and the potential for disputes. Our proactive approach helps clients avoid problems, and when disputes arise, we provide aggressive and effective representation.`,
    icon: 'HardHat',
    heroImage: '/images/industries/construction-hero.jpg',
    services: [
      'Construction Contract Drafting and Review',
      'Mechanics Lien Rights and Enforcement',
      'Construction Defect Claims',
      'Delay and Disruption Claims',
      'Payment Disputes',
      'Bid Protests',
      'Construction Litigation',
      'Surety Bond Claims',
      'OSHA Compliance',
      'Project Counseling'
    ],
    relatedPracticeAreas: ['construction-law', 'business-litigation'],
    relatedAttorneys: ['douglas-cook'],
    caseResults: ['construction-law-001', 'construction-law-002'],
    faqs: constructionFAQs
  },
  {
    id: 'insurance-industry',
    name: 'Insurance',
    slug: 'insurance',
    title: 'Insurance Defense Attorneys',
    description: 'Experienced insurance defense counsel for carriers, adjusters, and insurance professionals.',
    detailedDescription: `Riley Bennett Egloff has a long-standing reputation as trusted insurance defense counsel. We represent insurance carriers, third-party administrators, and self-insured entities in all types of insurance defense matters. Our attorneys understand the insurance industry and work efficiently to achieve favorable outcomes.

We handle first-party and third-party claims, coverage disputes, bad faith allegations, and complex insurance litigation. Our team provides prompt case evaluation, strategic defense planning, and cost-effective representation that aligns with our clients' business objectives.`,
    icon: 'Shield',
    heroImage: '/images/industries/insurance-hero.jpg',
    services: [
      'Insurance Coverage Analysis',
      'Bad Faith Defense',
      'General Liability Defense',
      'Professional Liability Defense',
      'Products Liability Defense',
      'Premises Liability Defense',
      'Auto Liability Defense',
      'Workers Compensation Defense',
      'Subrogation',
      'Declaratory Judgment Actions'
    ],
    relatedPracticeAreas: ['insurance-defense', 'business-litigation'],
    relatedAttorneys: ['laura-binford', 'jeffrey-fecht', 'douglas-cook'],
    caseResults: ['insurance-defense-001', 'insurance-defense-002'],
    faqs: insuranceFAQs
  },
  {
    id: 'business-industry',
    name: 'Business & Employment',
    slug: 'business',
    title: 'Business and Employment Law Attorneys',
    description: 'Strategic legal counsel for businesses, employers, and entrepreneurs.',
    detailedDescription: `Riley Bennett Egloff serves as trusted legal advisors to businesses of all sizes, from startups to Fortune 100 companies. Our business and employment attorneys provide practical, cost-effective counsel that helps clients achieve their business objectives while managing legal risk.

We handle the full range of business legal needs, including entity formation, contracts, employment matters, business disputes, and transactions. Our employment law practice focuses on representing employers in all aspects of the employment relationship, from hiring to termination.`,
    icon: 'Briefcase',
    heroImage: '/images/industries/business-hero.jpg',
    services: [
      'Business Formation and Governance',
      'Contract Drafting and Negotiation',
      'Employment Law Compliance',
      'Wage and Hour Defense',
      'Discrimination and Harassment Defense',
      'Employee Handbook Development',
      'Non-Compete and Trade Secrets',
      'Business Litigation',
      'Mergers and Acquisitions',
      'Commercial Real Estate'
    ],
    relatedPracticeAreas: ['business-litigation', 'employment-law'],
    relatedAttorneys: ['john-egloff', 'timothy-button', 'jaclyn-flint'],
    caseResults: ['employment-law-001', 'employment-law-002', 'business-litigation-001', 'business-litigation-002'],
    faqs: employmentFAQs
  }
]

/**
 * Get industry page by slug
 */
export const getIndustryPageBySlug = (slug: string): IndustryPage | undefined => {
  return industryPages.find(page => page.slug === slug)
}

/**
 * Get industry page by ID
 */
export const getIndustryPageById = (id: string): IndustryPage | undefined => {
  return industryPages.find(page => page.id === id)
}

/**
 * Get all industry page slugs (for routing)
 */
export const getIndustryPageSlugs = (): string[] => {
  return industryPages.map(page => page.slug)
}
