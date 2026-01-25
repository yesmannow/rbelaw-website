/**
 * FeaturedTool Component
 * Embeds interactive tools within practice area and industry pages
 * Uses the Prestige theme with Navy backgrounds and Gold accents
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Calculator, ExternalLink } from 'lucide-react'
import type { ToolMapping } from '@/lib/data/toolMappings'
import { 
  FLSAWizard, 
  CompCalculator, 
  LienCalculator,
  BusinessEntityComparison,
  ContractRiskAnalyzer,
  SuccessionQuiz,
  KnowYourRightsQuiz,
  OSHACalculator
} from '@/components/tools'

interface FeaturedToolProps {
  mapping: ToolMapping
}

// Map tool IDs to their components
const toolComponents: Record<string, React.ComponentType> = {
  'flsa-wizard': FLSAWizard,
  'comp-calculator': CompCalculator,
  'lien-calculator': LienCalculator,
  'entity-comparison': BusinessEntityComparison,
  'contract-analyzer': ContractRiskAnalyzer,
  'succession-quiz': SuccessionQuiz,
  'rights-quiz': KnowYourRightsQuiz,
  'osha-calculator': OSHACalculator
}

export function FeaturedTool({ mapping }: FeaturedToolProps) {
  const ToolComponent = toolComponents[mapping.toolId]

  // If tool component doesn't exist, don't render anything (zero placeholders)
  if (!ToolComponent) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="my-16"
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                        bg-accent-gold/10 border border-accent-gold/20 mb-4">
          <Calculator className="w-5 h-5 text-accent-gold" />
          <span className="text-sm font-semibold text-accent-gold uppercase tracking-wide">
            Interactive Tool
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-navy mb-3">
          {mapping.toolName}
        </h2>
        
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {mapping.toolDescription}
        </p>
      </div>

      {/* Tool Container with Prestige Styling */}
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-br from-accent-gold/5 to-primary-navy/5 
                        rounded-3xl blur-2xl" />
        
        {/* Main container with glassmorphism */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl 
                        border-2 border-accent-gold/20 
                        shadow-corporate overflow-hidden">
          {/* Decorative top border */}
          <div className="h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
          
          {/* Tool content */}
          <div className="p-6 md:p-8">
            <ToolComponent />
          </div>

          {/* Decorative bottom accent */}
          <div className="px-6 pb-6 flex items-center justify-center gap-2 text-sm text-neutral-500">
            <ExternalLink className="w-4 h-4" />
            <span>Solve a micro-problem before speaking to an attorney</span>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 
                        border-accent-gold/30 rounded-tl-2xl -translate-x-2 -translate-y-2" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 
                        border-accent-gold/30 rounded-br-2xl translate-x-2 translate-y-2" />
      </div>
    </motion.section>
  )
}
