import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, ChevronDown, ChevronUp, Building2, Calendar } from 'lucide-react'
import type { RepresentativeMatter } from '@/lib/types'

interface RepresentativeMattersProps {
  matters?: RepresentativeMatter[]
}

export function RepresentativeMatters({ matters = [] }: RepresentativeMattersProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (matters.length === 0) {
    return (
      <div className="text-center py-12 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-200">
        <Briefcase className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
        <p className="text-neutral-600">Representative matters information will be available soon.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {matters.map((matter, index) => {
        const isExpanded = expandedId === matter.title
        
        return (
          <motion.div
            key={matter.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-lg border-2 border-neutral-200 overflow-hidden hover:border-accent-gold transition-colors"
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : matter.title)}
              className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-accent-gold/10 rounded-lg text-accent-gold flex-shrink-0">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-primary-navy mb-2">
                    {matter.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                    {matter.practiceArea && (
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{matter.practiceArea}</span>
                      </div>
                    )}
                    {matter.year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{matter.year}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                {isExpanded ? (
                  <ChevronUp className="h-6 w-6 text-neutral-400" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-neutral-400" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 pl-20">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-neutral-700 leading-relaxed">
                        {matter.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
