/**
 * InteractiveResource Component
 * Dynamically renders the appropriate tool based on toolId
 * Applies prestige styling with Navy #0A2540, Gold #B8860B, and glassmorphism
 */

import { motion } from 'framer-motion'
import { LienCalculator } from '../tools/LienCalculator'
import { FLSAWizard } from '../tools/FLSAWizard'
import { BusinessEntityComparison } from '../tools/BusinessEntityComparison'
import { SuccessionQuiz } from '../tools/SuccessionQuiz'
import { LitigationTimeline } from '../tools/LitigationTimeline'
import { KnowYourRightsQuiz } from '../tools/KnowYourRightsQuiz'
import { OSHACalculator } from '../tools/OSHACalculator'
import { CompCalculator } from '../tools/CompCalculator'
import { ContractRiskAnalyzer } from '../tools/ContractRiskAnalyzer'
import type { ToolMapping } from '@/lib/data/toolMappings'

interface InteractiveResourceProps {
  mapping: ToolMapping
}

/**
 * Tool component mapping
 * Maps toolId to the actual React component
 */
const toolComponents: Record<string, React.ComponentType> = {
  'lien-calculator': LienCalculator,
  'flsa-wizard': FLSAWizard,
  'entity-comparison': BusinessEntityComparison,
  'succession-quiz': SuccessionQuiz,
  'litigation-timeline': LitigationTimeline,
  'rights-quiz': KnowYourRightsQuiz,
  'osha-calculator': OSHACalculator,
  'comp-calculator': CompCalculator,
  'contract-analyzer': ContractRiskAnalyzer,
}

export function InteractiveResource({ mapping }: InteractiveResourceProps) {
  const ToolComponent = toolComponents[mapping.toolId]

  // Don't render if tool component doesn't exist (fail gracefully)
  if (!ToolComponent) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-16 lg:py-20"
      style={{ backgroundColor: '#0A2540' }}
    >
      <div className="section-container">
        {/* Header with Prestige Styling */}
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#B8860B'
            }}
          >
            RBE Insight Center
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            {mapping.primaryBenefit}
          </motion.p>
        </div>

        {/* Tool Container with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <ToolComponent />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-white/80 mb-6 text-lg">
            Need personalized guidance? Our experts are ready to help.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#B8860B',
              color: '#0A2540',
              boxShadow: '0 4px 16px rgba(184, 134, 11, 0.4)'
            }}
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
