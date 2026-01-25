/**
 * Interactive Tools Section Component
 * Displays interactive tools in a creative, standout layout
 * For practice area pages - positioned above attorney cards
 */

import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronDown, Sparkles, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FeaturedTool } from './FeaturedTool'
import type { ToolMapping } from '@/lib/data/toolMappings'
import { cn } from '@/lib/utils'

interface InteractiveToolsSectionProps {
  tools: ToolMapping[]
  practiceAreaName: string
}

export function InteractiveToolsSection({ tools, practiceAreaName }: InteractiveToolsSectionProps) {
  const [expandedTool, setExpandedTool] = useState<string | null>(null)

  if (tools.length === 0) return null

  // Single tool: Display prominently
  if (tools.length === 1) {
    return (
      <section className="py-16 lg:py-20 bg-gradient-to-br from-neutral-50 via-white to-accent-gold/5">
        <div className="section-container">
          <FeaturedTool mapping={tools[0]} />
        </div>
      </section>
    )
  }

  // Multiple tools: Use accordion with creative layout
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-navy via-primary-navy/95 to-primary-navy/90 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                          bg-accent-gold/20 border border-accent-gold/40 mb-6">
            <Sparkles className="w-5 h-5 text-accent-gold" />
            <span className="text-sm font-semibold text-accent-gold uppercase tracking-wide">
              Interactive Tools
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Explore Our {practiceAreaName} Tools
          </h2>
          <p className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto">
            Use our interactive tools to better understand your legal situation and make informed decisions.
          </p>
        </motion.div>

        {/* Tools Accordion */}
        <div className="max-w-5xl mx-auto space-y-4">
          {tools.map((tool, index) => {
            const isExpanded = expandedTool === tool.toolId
            
            return (
              <motion.div
                key={tool.toolId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* Accordion Header */}
                <motion.button
                  onClick={() => setExpandedTool(isExpanded ? null : tool.toolId)}
                  className={cn(
                    'w-full flex items-center justify-between p-6 rounded-xl transition-all duration-300',
                    'bg-white/10 backdrop-blur-sm border-2 border-white/20',
                    'hover:bg-white/15 hover:border-accent-gold/50',
                    isExpanded && 'bg-white/20 border-accent-gold shadow-lg shadow-accent-gold/20'
                  )}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-4 flex-1 text-left">
                    <div className={cn(
                      'p-3 rounded-lg transition-all duration-300',
                      isExpanded 
                        ? 'bg-accent-gold text-primary-navy' 
                        : 'bg-white/10 text-accent-gold'
                    )}>
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white mb-1">
                        {tool.toolName}
                      </h3>
                      <p className="text-sm text-neutral-300">
                        {tool.toolDescription}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-6 h-6 text-white transition-transform duration-300 flex-shrink-0 ml-4',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </motion.button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-8 bg-white/95 backdrop-blur-sm rounded-xl border-2 border-accent-gold/30 shadow-2xl">
                        <FeaturedTool mapping={tool} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* View All Tools CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/resources/tools"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent-gold hover:bg-accent-gold/90 text-primary-navy rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>View All Interactive Tools</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
