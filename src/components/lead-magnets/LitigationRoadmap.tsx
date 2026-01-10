'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Search, Users, Gavel } from 'lucide-react'

interface TimelineNode {
  id: string
  title: string
  icon: React.ElementType
  content: string
}

const timelineNodes: TimelineNode[] = [
  {
    id: 'complaint',
    title: 'Complaint',
    icon: FileText,
    content: 'The lawsuit is filed and served. The defense has 20-30 days to respond.'
  },
  {
    id: 'discovery',
    title: 'Discovery',
    icon: Search,
    content: 'We exchange documents and conduct depositions. This is the longest phase.'
  },
  {
    id: 'mediation',
    title: 'Mediation',
    icon: Users,
    content: 'A neutral third party helps negotiate a settlement to avoid trial.'
  },
  {
    id: 'trial',
    title: 'Trial',
    icon: Gavel,
    content: 'Arguments are presented to a judge or jury for a final verdict.'
  }
]

export function LitigationRoadmap() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const toggleNode = (nodeId: string) => {
    setActiveNode(activeNode === nodeId ? null : nodeId)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-semibold text-primary-navy mb-3">
          The Litigation Journey
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Understand the key stages of a lawsuit from filing to resolution
        </p>
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-primary-navy/20" />
          
          {/* Timeline Nodes */}
          <div className="grid grid-cols-4 gap-4 relative">
            {timelineNodes.map((node, index) => {
              const Icon = node.icon
              const isActive = activeNode === node.id
              
              return (
                <div key={node.id} className="flex flex-col items-center">
                  {/* Node Button */}
                  <button
                    onClick={() => toggleNode(node.id)}
                    className={`
                      w-32 h-32 rounded-full transition-all duration-300
                      flex flex-col items-center justify-center gap-2
                      ${isActive 
                        ? 'bg-primary-navy text-white shadow-corporate scale-110' 
                        : 'bg-white border-4 border-primary-navy/20 text-primary-navy hover:border-primary-navy/40 hover:shadow-soft'
                      }
                    `}
                    aria-expanded={isActive}
                    aria-label={`${node.title} - Click to ${isActive ? 'collapse' : 'expand'}`}
                  >
                    <Icon className={`${isActive ? 'w-10 h-10' : 'w-8 h-8'} transition-all duration-300`} />
                    <span className="text-sm font-semibold">{node.title}</span>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="bg-accent-tan/10 border-l-4 border-primary-navy p-6 rounded-r-lg shadow-soft max-w-xs">
                          <h3 className="font-semibold text-primary-navy mb-2 text-lg">
                            {node.title}
                          </h3>
                          <p className="text-sm text-neutral-700 leading-relaxed">
                            {node.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden space-y-6">
        {timelineNodes.map((node, index) => {
          const Icon = node.icon
          const isActive = activeNode === node.id
          
          return (
            <div key={node.id} className="relative">
              {/* Vertical Line (except for last item) */}
              {index < timelineNodes.length - 1 && (
                <div className="absolute left-12 top-24 bottom-0 w-1 bg-primary-navy/20 -mb-6" />
              )}

              <div className="flex gap-4 items-start">
                {/* Node Button */}
                <button
                  onClick={() => toggleNode(node.id)}
                  className={`
                    w-24 h-24 rounded-full transition-all duration-300 flex-shrink-0
                    flex flex-col items-center justify-center gap-1
                    ${isActive 
                      ? 'bg-primary-navy text-white shadow-corporate scale-105' 
                      : 'bg-white border-4 border-primary-navy/20 text-primary-navy hover:border-primary-navy/40 hover:shadow-soft'
                    }
                  `}
                  aria-expanded={isActive}
                  aria-label={`${node.title} - Click to ${isActive ? 'collapse' : 'expand'}`}
                >
                  <Icon className={`${isActive ? 'w-8 h-8' : 'w-6 h-6'} transition-all duration-300`} />
                  <span className="text-xs font-semibold text-center px-1">{node.title}</span>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden flex-1"
                    >
                      <div className="bg-accent-tan/10 border-l-4 border-primary-navy p-4 rounded-r-lg shadow-soft">
                        <h3 className="font-semibold text-primary-navy mb-2">
                          {node.title}
                        </h3>
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          {node.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Placeholder for collapsed state on mobile */}
              {!isActive && (
                <div className="ml-28 text-sm text-neutral-500 italic mt-2">
                  Click to learn more
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
