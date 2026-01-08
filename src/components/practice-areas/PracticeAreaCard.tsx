/**
 * PracticeAreaCard Component
 * Industry-mirrored design with Navy header, white icon, Playfair Display title, and Gold footer link
 */

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { iconMap } from '@/lib/data/navigation'
import type { PracticeArea } from '@/lib/types'

interface PracticeAreaCardProps {
  area: PracticeArea
  index?: number
}

export function PracticeAreaCard({ area, index = 0 }: PracticeAreaCardProps) {
  const Icon = area.icon ? iconMap[area.icon] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group h-full"
    >
      <div className="h-full bg-white rounded-xl shadow-soft hover:shadow-corporate transition-all duration-300 overflow-hidden border border-transparent hover:border-primary-navy flex flex-col">
        {/* Navy Header with Icon */}
        <div className="bg-[#0A2540] p-6 relative min-h-[120px] flex items-center">
          <div className="flex-1 pr-16">
            <h3 className="text-2xl font-display font-bold text-white group-hover:scale-105 transition-transform origin-left">
              {area.name}
            </h3>
          </div>
          {/* Top-right Icon */}
          {Icon && (
            <div className="absolute top-6 right-6 flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Description */}
          {area.description && (
            <p className="text-neutral-700 text-sm leading-relaxed mb-6 line-clamp-4 flex-1">
              {area.description}
            </p>
          )}

          {/* Gold Footer Link */}
          <Link
            to={`/practice-areas/${area.slug}`}
            className="inline-flex items-center gap-2 text-[#B8860B] font-semibold hover:gap-3 transition-all group/link mt-auto"
          >
            <span className="group-hover/link:scale-105 transition-transform inline-block">
              Learn More
            </span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
