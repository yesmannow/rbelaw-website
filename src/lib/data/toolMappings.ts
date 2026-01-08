/**
 * Tool Mapping System
 * Associates interactive tools with practice areas and industries
 */

export interface ToolMapping {
  slug: string // practice area or industry slug
  toolId: string
  toolName: string
  toolDescription: string
}

export const practiceAreaToolMappings: ToolMapping[] = [
  {
    slug: 'labor-employment-law',
    toolId: 'flsa-wizard',
    toolName: 'FLSA Compliance Wizard',
    toolDescription: 'Determine if your employees are properly classified under Fair Labor Standards Act regulations.'
  },
  {
    slug: 'labor-employment-law',
    toolId: 'comp-calculator',
    toolName: 'Workers\' Compensation Calculator',
    toolDescription: 'Estimate potential workers\' compensation benefits for workplace injuries.'
  },
  {
    slug: 'labor-employment-law',
    toolId: 'osha-calculator',
    toolName: 'OSHA Compliance Calculator',
    toolDescription: 'Assess your workplace safety compliance requirements under OSHA regulations.'
  },
  {
    slug: 'construction',
    toolId: 'lien-calculator',
    toolName: 'Construction Lien Calculator',
    toolDescription: 'Calculate mechanics lien rights and deadlines for construction projects.'
  },
  {
    slug: 'business-law',
    toolId: 'entity-comparison',
    toolName: 'Business Entity Comparison',
    toolDescription: 'Compare different business entity structures to find the right fit for your company.'
  },
  {
    slug: 'business-law',
    toolId: 'contract-analyzer',
    toolName: 'Contract Risk Analyzer',
    toolDescription: 'Analyze contracts for potential risks and unfavorable terms.'
  },
  {
    slug: 'wills-trusts-estates',
    toolId: 'succession-quiz',
    toolName: 'Succession Planning Quiz',
    toolDescription: 'Assess your estate planning needs and succession readiness.'
  },
  {
    slug: 'family-law',
    toolId: 'rights-quiz',
    toolName: 'Know Your Rights Quiz',
    toolDescription: 'Understand your legal rights in family law matters.'
  }
]

export const industryToolMappings: ToolMapping[] = [
  {
    slug: 'construction',
    toolId: 'lien-calculator',
    toolName: 'Construction Lien Calculator',
    toolDescription: 'Calculate mechanics lien rights and deadlines for construction projects.'
  }
]

export function getToolForPracticeArea(slug: string): ToolMapping | undefined {
  return practiceAreaToolMappings.find(mapping => mapping.slug === slug)
}

export function getToolForIndustry(slug: string): ToolMapping | undefined {
  return industryToolMappings.find(mapping => mapping.slug === slug)
}
