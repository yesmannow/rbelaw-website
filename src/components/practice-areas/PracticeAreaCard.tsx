/**
 * PracticeAreaCard Component - Construction Blueprint
 * Precision-built using Construction card as the exact template
 * Navy #0A2540 header, Gold #B8860B accents, background image with 0.10 opacity
 */

import { Link } from 'react-router-dom'
import { ArrowRight, Users } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { iconMap } from '@/lib/data/navigation'
import { getSpecialistCount } from '@/lib/utils/attorney-logic'
import { useState, useEffect } from 'react'
import { GoldBorderAnimation } from '@/components/ui/GoldBorderAnimation'

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

  // Calculate attorneys specializing in this practice area using the specialist counter utility
  const attorneyCount = getSpecialistCount(area.name, 'practice')

  // Display first 3 key services
  const displayedServices = area.keyServices.slice(0, 3)
  const remainingCount = area.keyServices.length - 3

  // 3D Tilt Effect
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2, -2]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-2, 2]), { stiffness: 300, damping: 30 })
  const scale = useSpring(isHovering ? 1.02 : 1, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / (rect.width / 2))
    y.set((e.clientY - centerY) / (rect.height / 2))
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (!reducedMotion) {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group h-full"
      style={{
        perspective: '1000px'
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          scale,
          transformStyle: 'preserve-3d'
        }}
        className="h-full"
      >
        <Link
          to={`/practice-areas/${area.slug}`}
          className="block h-full bg-white rounded-xl shadow-soft hover:shadow-corporate transition-all duration-200 overflow-hidden relative"
        >
          {/* Gold Border Animation with SVG pathLength */}
          <GoldBorderAnimation isHovering={isHovering} borderRadius="0.75rem" />
        {/* Background Image with 0.10 opacity */}
        {area.backgroundImage && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
            style={{ backgroundImage: `url(${area.backgroundImage})` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Card Content - relative to sit above background */}
        <div className="relative h-full flex flex-col z-10">
          {/* Navy Header with Icon */}
          <div className="bg-[#0A2540] p-6 relative min-h-[120px] flex items-center">
            <div className="flex-1 pr-16">
              <h3 className="text-2xl font-playfair font-bold text-white group-hover:scale-105 transition-transform origin-left duration-200">
                {area.name}
              </h3>
            </div>
            {/* Top-right Icon */}
            {Icon && (
              <div className="absolute top-6 right-6 flex-shrink-0">
                <motion.div
                  className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
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
              <span className="transition-transform inline-block duration-200">
                Learn More
              </span>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
      </motion.div>
    </motion.div>
  )
}
