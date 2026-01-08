/**
 * PracticeAreaCard Component - Construction Blueprint
 * Precision-built using Construction card as the exact template
 * Navy #0A2540 header, Gold #B8860B accents, background image with 0.10 opacity
 */

import { Link } from 'react-router-dom'
import { ArrowRight, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { iconMap } from '@/lib/data/navigation'
import { attorneys } from '@/lib/data/attorney-helpers'

interface EnhancedPracticeArea {
  id: string
  name: string
  slug: string
  description: string
  detailedDescription: string
  icon?: string
  keyServices: string[]
  backgroundImage?: string
  attorneys?: string[]
}

interface PracticeAreaCardProps {
  area: EnhancedPracticeArea
  index?: number
}

export function PracticeAreaCard({ area, index = 0 }: PracticeAreaCardProps) {
  const Icon = area.icon ? iconMap[area.icon] : null
  
  // Calculate attorneys specializing in this practice area
  const specializingAttorneys = attorneys.filter(attorney => 
    attorney.practiceAreas?.some(pa => 
      pa.toLowerCase().includes(area.id.toLowerCase()) || 
      pa.toLowerCase().includes(area.name.toLowerCase())
    )
  )
  const attorneyCount = specializingAttorneys.length

  // Display first 3 key services
  const displayedServices = area.keyServices.slice(0, 3)
  const remainingCount = area.keyServices.length - 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group h-full"
    >
      <Link
        to={`/practice-areas/${area.slug}`}
        className="block h-full bg-white rounded-xl shadow-soft hover:shadow-corporate transition-all duration-300 overflow-hidden border border-transparent hover:border-[#B8860B] hover:-translate-y-2 relative"
      >
        {/* Background Image with 0.10 opacity */}
        {area.backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
            style={{ backgroundImage: `url(${area.backgroundImage})` }}
          />
        )}

        {/* Card Content - relative to sit above background */}
        <div className="relative h-full flex flex-col">
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

          {/* White Body Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Description (~250 chars) */}
            <p className="text-neutral-700 text-sm leading-relaxed mb-6">
              {area.detailedDescription}
            </p>

            {/* Key Services Section */}
            {area.keyServices && area.keyServices.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#0A2540] mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#B8860B] rounded-full" />
                  Key Services
                </h4>
                <ul className="space-y-2">
                  {displayedServices.map((service, idx) => (
                    <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                      <span className="text-[#B8860B] mt-1">•</span>
                      <span className="line-clamp-2">{service}</span>
                    </li>
                  ))}
                  {remainingCount > 0 && (
                    <li className="text-sm text-[#B8860B] font-medium">
                      +{remainingCount} more service{remainingCount !== 1 ? 's' : ''}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Attorney Count */}
            {attorneyCount > 0 && (
              <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6 pb-6 border-b border-neutral-200">
                <Users className="w-4 h-4 text-[#0A2540]" />
                <span>
                  <strong className="text-[#0A2540]">{attorneyCount}</strong> attorney{attorneyCount !== 1 ? 's' : ''}
                  {' '}specializing in this area
                </span>
              </div>
            )}

            {/* Gold Footer Link */}
            <div className="inline-flex items-center gap-2 text-[#B8860B] font-semibold mt-auto group/link">
              <span className="transition-transform inline-block">
                Learn More
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
