import { 
  Calculator, 
  Calendar, 
  Shield, 
  Clock, 
  FileText, 
  Building2, 
  AlertTriangle, 
  Brain,
  TrendingUp
} from 'lucide-react'

export interface PracticeAreaTool {
  icon: typeof Calculator
  title: string
  description: string
  to: string
  badge?: string
}

// Map practice area slugs to relevant tools
export const practiceAreaToolsMap: Record<string, PracticeAreaTool[]> = {
  'employment-law': [
    {
      icon: AlertTriangle,
      title: 'OSHA Incident Rate Calculator',
      description: 'Calculate your TRIR, DART, and LTIR rates. Compare workplace safety metrics against industry benchmarks.',
      to: '/resources/tools/osha-calculator',
      badge: 'NEW'
    },
    {
      icon: Shield,
      title: 'FLSA Exempt Status Wizard',
      description: 'Determine if your employee meets federal overtime exemption requirements and avoid costly misclassification.',
      to: '/resources/tools/flsa-wizard'
    },
    {
      icon: Brain,
      title: 'Employment Law Quiz',
      description: 'Test your knowledge of employment law compliance with our interactive quiz covering FLSA, FMLA, ADA, and more.',
      to: '/resources/tools/rights-quiz'
    }
  ],
  
  'construction-law': [
    {
      icon: Calendar,
      title: 'Construction Lien Deadline Calculator',
      description: 'Never miss a Notice to Owner or Mechanic\'s Lien filing deadline with our automated timeline generator.',
      to: '/resources/tools/lien-calculator'
    },
    {
      icon: FileText,
      title: 'Contract Risk Analyzer',
      description: 'Identify risky contract clauses like indemnification, liability caps, and payment terms in your construction agreements.',
      to: '/resources/tools/contract-analyzer',
      badge: 'NEW'
    },
    {
      icon: Brain,
      title: 'Construction Law Quiz',
      description: 'Test your knowledge of mechanic\'s liens, pay-if-paid clauses, and construction contract law.',
      to: '/resources/tools/rights-quiz'
    }
  ],
  
  'business-corporate-law': [
    {
      icon: Building2,
      title: 'Business Entity Comparison Tool',
      description: 'Not sure whether to form an LLC, S-Corp, or C-Corp? Get personalized recommendations based on your goals.',
      to: '/resources/tools/entity-comparison',
      badge: 'NEW'
    },
    {
      icon: TrendingUp,
      title: 'Business Succession Readiness Assessment',
      description: 'Discover how prepared your business is for leadership transitions with our comprehensive quiz.',
      to: '/resources/tools/succession-quiz'
    },
    {
      icon: FileText,
      title: 'Contract Risk Analyzer',
      description: 'Review your business agreements for risky clauses that could expose your company to liability.',
      to: '/resources/tools/contract-analyzer',
      badge: 'NEW'
    }
  ],
  
  'workers-compensation': [
    {
      icon: Calculator,
      title: 'Workers\' Comp Benefit Calculator',
      description: 'Calculate your potential TTD and PPI benefits under Indiana law with official statutory limits.',
      to: '/resources/tools/comp-calculator'
    },
    {
      icon: AlertTriangle,
      title: 'OSHA Incident Rate Calculator',
      description: 'Track your workplace safety performance and compare against industry benchmarks.',
      to: '/resources/tools/osha-calculator',
      badge: 'NEW'
    }
  ],
  
  'litigation': [
    {
      icon: Clock,
      title: 'Litigation Timeline Generator',
      description: 'Visualize your case schedule with key Indiana Trial Rule deadlines and download calendar files.',
      to: '/resources/tools/litigation-timeline'
    }
  ],
  
  'insurance-defense': [
    {
      icon: Brain,
      title: 'Insurance Defense Quiz',
      description: 'Test your knowledge of duty to defend, bad faith claims, and insurance coverage issues.',
      to: '/resources/tools/rights-quiz'
    },
    {
      icon: FileText,
      title: 'Contract Risk Analyzer',
      description: 'Analyze insurance policies and defense agreements for problematic clauses.',
      to: '/resources/tools/contract-analyzer',
      badge: 'NEW'
    }
  ],
  
  'health-care-law': [
    {
      icon: AlertTriangle,
      title: 'OSHA Incident Rate Calculator',
      description: 'Calculate workplace safety metrics for healthcare facilities and compare against industry standards.',
      to: '/resources/tools/osha-calculator',
      badge: 'NEW'
    },
    {
      icon: Shield,
      title: 'FLSA Exempt Status Wizard',
      description: 'Determine proper employee classification for healthcare workers under federal overtime rules.',
      to: '/resources/tools/flsa-wizard'
    }
  ],
  
  'real-estate-law': [
    {
      icon: FileText,
      title: 'Contract Risk Analyzer',
      description: 'Review real estate contracts, leases, and purchase agreements for risky provisions.',
      to: '/resources/tools/contract-analyzer',
      badge: 'NEW'
    },
    {
      icon: Building2,
      title: 'Business Entity Comparison Tool',
      description: 'Choose the right entity structure for your real estate investment or development company.',
      to: '/resources/tools/entity-comparison',
      badge: 'NEW'
    }
  ]
}

/**
 * Get tools relevant to a specific practice area
 */
export function getToolsForPracticeArea(slug: string): PracticeAreaTool[] {
  return practiceAreaToolsMap[slug] || []
}

/**
 * Get all unique tools across all practice areas
 */
export function getAllTools(): PracticeAreaTool[] {
  const allTools = Object.values(practiceAreaToolsMap).flat()
  const uniqueTools = allTools.filter((tool, index, self) =>
    index === self.findIndex(t => t.to === tool.to)
  )
  return uniqueTools
}

/**
 * Check if a practice area has related tools
 */
export function hasTools(slug: string): boolean {
  return (practiceAreaToolsMap[slug]?.length || 0) > 0
}
