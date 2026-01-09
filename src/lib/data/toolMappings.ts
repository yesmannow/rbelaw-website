/**
 * Tool Mapping System
 * Associates interactive tools with practice areas and industries
 * Maps slugs to specific tool components for dynamic injection
 */

export interface ToolMapping {
  slug: string // practice area or industry slug
  toolId: string
  toolName: string
  toolDescription: string
  primaryBenefit: string
}

/**
 * Practice Area Tool Mappings
 * Based on RBE Insight Center specifications
 */
export const practiceAreaToolMappings: ToolMapping[] = [
  {
    slug: 'construction',
    toolId: 'lien-calculator',
    toolName: 'Construction Lien Calculator',
    toolDescription: 'Calculate mechanics lien rights and deadlines for construction projects.',
    primaryBenefit: 'Instantly calculate statutory deadlines for mechanic\'s liens.'
  },
  {
    slug: 'labor-employment',
    toolId: 'flsa-wizard',
    toolName: 'FLSA Compliance Wizard',
    toolDescription: 'Determine if your employees are properly classified under Fair Labor Standards Act regulations.',
    primaryBenefit: 'Determine overtime eligibility and classification risks.'
  },
  {
    slug: 'business-law',
    toolId: 'entity-comparison',
    toolName: 'Business Entity Comparison',
    toolDescription: 'Compare different business entity structures to find the right fit for your company.',
    primaryBenefit: 'Compare LLC vs. C-Corp structures for startup ventures.'
  },
  {
    slug: 'real-estate',
    toolId: 'lien-calculator',
    toolName: 'Construction Lien Calculator',
    toolDescription: 'Identify potential encumbrances and filing requirements.',
    primaryBenefit: 'Identify potential encumbrances and filing requirements.'
  },
  {
    slug: 'wills-trusts-estates',
    toolId: 'succession-quiz',
    toolName: 'Succession Planning Quiz',
    toolDescription: 'Assess your estate planning needs and succession readiness.',
    primaryBenefit: 'Gauge readiness for family wealth and business transfers.'
  },
  {
    slug: 'business-litigation',
    toolId: 'litigation-timeline',
    toolName: 'Litigation Timeline',
    toolDescription: 'Visualize the standard lifecycle of a commercial dispute.',
    primaryBenefit: 'Visualize the standard lifecycle of a commercial dispute.'
  },
  {
    slug: 'family-law',
    toolId: 'rights-quiz',
    toolName: 'Know Your Rights Quiz',
    toolDescription: 'Understand your legal rights in family law matters.',
    primaryBenefit: 'Access an initial overview of legal standing in domestic cases.'
  },
  {
    slug: 'health-care',
    toolId: 'osha-calculator',
    toolName: 'OSHA Compliance Calculator',
    toolDescription: 'Estimate potential compliance penalties for healthcare facilities.',
    primaryBenefit: 'Estimate potential compliance penalties for healthcare facilities.'
  },
  // Additional mappings for comprehensive coverage
  {
    slug: 'labor-employment',
    toolId: 'comp-calculator',
    toolName: 'Workers\' Compensation Calculator',
    toolDescription: 'Estimate potential workers\' compensation benefits for workplace injuries.',
    primaryBenefit: 'Calculate potential workers\' compensation benefits.'
  },
  {
    slug: 'business-law',
    toolId: 'contract-analyzer',
    toolName: 'Contract Risk Analyzer',
    toolDescription: 'Analyze contracts for potential risks and unfavorable terms.',
    primaryBenefit: 'Identify contract risks before signing.'
  }
]

/**
 * Industry Tool Mappings
 */
export const industryToolMappings: ToolMapping[] = [
  {
    slug: 'construction',
    toolId: 'lien-calculator',
    toolName: 'Construction Lien Calculator',
    toolDescription: 'Calculate mechanics lien rights and deadlines for construction projects.',
    primaryBenefit: 'Instantly calculate statutory deadlines for mechanic\'s liens.'
  },
  {
    slug: 'healthcare',
    toolId: 'osha-calculator',
    toolName: 'OSHA Compliance Calculator',
    toolDescription: 'Assess your workplace safety compliance requirements under OSHA regulations.',
    primaryBenefit: 'Estimate potential compliance penalties for healthcare facilities.'
  }
]

/**
 * Get the primary tool for a practice area
 * Returns the first matching tool if multiple exist
 */
export function getToolForPracticeArea(slug: string): ToolMapping | undefined {
  return practiceAreaToolMappings.find(mapping => mapping.slug === slug)
}

/**
 * Get all tools for a practice area
 * Returns array of all matching tools
 */
export function getAllToolsForPracticeArea(slug: string): ToolMapping[] {
  return practiceAreaToolMappings.filter(mapping => mapping.slug === slug)
}

/**
 * Get the primary tool for an industry
 */
export function getToolForIndustry(slug: string): ToolMapping | undefined {
  return industryToolMappings.find(mapping => mapping.slug === slug)
}

/**
 * Get all tools for an industry
 */
export function getAllToolsForIndustry(slug: string): ToolMapping[] {
  return industryToolMappings.filter(mapping => mapping.slug === slug)
}
