import type { CaseResult } from '../types'

/**
 * Case Results Showcase
 * Anonymized successful case outcomes demonstrating firm expertise
 */
export const caseResults: CaseResult[] = [
  {
    id: 'insurance-defense-001',
    title: 'Complex Commercial Insurance Coverage Dispute',
    practiceArea: ['insurance-defense'],
    industry: ['insurance', 'construction'],
    summary: 'Successfully defended insurance carrier in multi-million dollar coverage dispute involving construction defect claims.',
    outcome: 'Obtained summary judgment for client, eliminating all coverage obligations',
    complexity: 'Highly Complex',
    attorneys: ['laura-binford', 'jeffrey-fecht'],
    date: '2024-09-15',
    tags: ['insurance coverage', 'construction defect', 'summary judgment'],
    isConfidential: false
  },
  {
    id: 'employment-law-001',
    title: 'Wage and Hour Class Action Defense',
    practiceArea: ['employment-law'],
    industry: ['healthcare', 'business'],
    summary: 'Defended healthcare provider against class action wage and hour claims involving overtime calculations.',
    outcome: 'Achieved favorable settlement at 15% of claimed damages',
    amount: 'Confidential',
    complexity: 'Highly Complex',
    attorneys: ['jaclyn-flint'],
    date: '2024-11-20',
    tags: ['wage and hour', 'class action', 'FLSA', 'settlement'],
    isConfidential: false
  },
  {
    id: 'business-litigation-001',
    title: 'Breach of Contract and Trade Secrets',
    practiceArea: ['business-litigation'],
    industry: ['business', 'technology'],
    summary: 'Represented technology company in breach of contract and misappropriation of trade secrets case.',
    outcome: 'Secured injunctive relief and damages award of $2.3 million',
    amount: '$2.3M',
    complexity: 'Complex',
    attorneys: ['john-egloff', 'timothy-button'],
    date: '2024-08-10',
    tags: ['breach of contract', 'trade secrets', 'injunction', 'damages'],
    isConfidential: false
  },
  {
    id: 'healthcare-law-001',
    title: 'HIPAA Compliance and Regulatory Defense',
    practiceArea: ['healthcare-law'],
    industry: ['healthcare'],
    summary: 'Defended medical practice in HHS investigation regarding alleged HIPAA violations.',
    outcome: 'Investigation closed with no penalties or corrective action required',
    complexity: 'Complex',
    attorneys: ['laura-binford'],
    date: '2024-10-05',
    tags: ['HIPAA', 'regulatory', 'HHS', 'compliance'],
    isConfidential: false
  },
  {
    id: 'construction-law-001',
    title: 'Construction Defect and Delay Claims',
    practiceArea: ['construction-law'],
    industry: ['construction', 'real-estate'],
    summary: 'Represented general contractor in construction defect and delay claims on commercial development project.',
    outcome: 'Obtained dismissal of defect claims; negotiated favorable resolution of delay claims',
    complexity: 'Highly Complex',
    attorneys: ['douglas-cook'],
    date: '2024-07-22',
    tags: ['construction defect', 'delay claims', 'commercial construction'],
    isConfidential: false
  },
  {
    id: 'insurance-defense-002',
    title: 'Bad Faith Insurance Claim Defense',
    practiceArea: ['insurance-defense'],
    industry: ['insurance'],
    summary: 'Defended insurance company against bad faith claims in personal injury matter.',
    outcome: 'Jury verdict in favor of insurance carrier on all counts',
    complexity: 'Complex',
    attorneys: ['jeffrey-fecht', 'douglas-cook'],
    date: '2024-06-18',
    tags: ['bad faith', 'jury trial', 'personal injury', 'verdict'],
    isConfidential: false
  },
  {
    id: 'employment-law-002',
    title: 'Discrimination and Retaliation Claims',
    practiceArea: ['employment-law'],
    industry: ['business', 'manufacturing'],
    summary: 'Defended manufacturer against claims of discrimination and retaliation by former employee.',
    outcome: 'Summary judgment granted on all claims',
    complexity: 'Standard',
    attorneys: ['jaclyn-flint'],
    date: '2024-09-30',
    tags: ['discrimination', 'retaliation', 'summary judgment', 'Title VII'],
    isConfidential: false
  },
  {
    id: 'business-litigation-002',
    title: 'Partnership Dissolution and Buyout',
    practiceArea: ['business-litigation'],
    industry: ['business'],
    summary: 'Represented business owner in complex partnership dissolution and valuation dispute.',
    outcome: 'Negotiated favorable buyout terms and business valuation',
    complexity: 'Complex',
    attorneys: ['john-egloff'],
    date: '2024-05-14',
    tags: ['partnership', 'dissolution', 'valuation', 'buyout'],
    isConfidential: false
  },
  {
    id: 'healthcare-law-002',
    title: 'Medical Licensing Board Defense',
    practiceArea: ['healthcare-law'],
    industry: ['healthcare'],
    summary: 'Defended physician in medical licensing board investigation and disciplinary proceedings.',
    outcome: 'All charges dismissed; license fully reinstated',
    complexity: 'Complex',
    attorneys: ['laura-binford'],
    date: '2024-04-20',
    tags: ['medical licensing', 'board defense', 'disciplinary', 'physician'],
    isConfidential: false
  },
  {
    id: 'construction-law-002',
    title: 'Mechanics Lien and Payment Dispute',
    practiceArea: ['construction-law'],
    industry: ['construction'],
    summary: 'Represented property owner in mechanics lien foreclosure and payment dispute.',
    outcome: 'Lien released; negotiated settlement at 40% of claimed amount',
    complexity: 'Standard',
    attorneys: ['douglas-cook'],
    date: '2024-12-01',
    tags: ['mechanics lien', 'payment dispute', 'settlement'],
    isConfidential: false
  }
]

/**
 * Get case results by practice area
 */
export const getCaseResultsByPracticeArea = (practiceAreaId: string): CaseResult[] => {
  return caseResults.filter(result => 
    result.practiceArea.includes(practiceAreaId)
  )
}

/**
 * Get case results by industry
 */
export const getCaseResultsByIndustry = (industryId: string): CaseResult[] => {
  return caseResults.filter(result => 
    result.industry.includes(industryId)
  )
}

/**
 * Get case results by attorney
 */
export const getCaseResultsByAttorney = (attorneyId: string): CaseResult[] => {
  return caseResults.filter(result => 
    result.attorneys.includes(attorneyId)
  )
}

/**
 * Get featured case results (most recent or complex)
 */
export const getFeaturedCaseResults = (limit: number = 6): CaseResult[] => {
  return caseResults
    .sort((a, b) => {
      // Sort by complexity first, then date
      const complexityOrder = { 'Highly Complex': 3, 'Complex': 2, 'Standard': 1 }
      const complexityDiff = complexityOrder[b.complexity] - complexityOrder[a.complexity]
      if (complexityDiff !== 0) return complexityDiff
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, limit)
}
