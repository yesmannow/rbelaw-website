import React from 'react'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { Attorney } from '@/lib/types'
import { GoldBorderAnimation } from '@/components/ui/GoldBorderAnimation'
import { getAttorneyThumbnailImage } from '@/lib/utils/attorney-images'

interface AttorneyCardProps {
  attorney: Attorney
  index?: number
  compact?: boolean
  showContact?: boolean
}

/**
 * Get initials from attorney name for fallback placeholder
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/**
 * Reusable Attorney Card Component
 * Performance-optimized with lazy loading and Navy/Gold fallback
 */
export function AttorneyCard({ attorney, index = 0, compact = false, showContact = true }: AttorneyCardProps) {
  const [imageError, setImageError] = useState(false)
  const initials = getInitials(attorney.name)

  // 3D Tilt Effect
  const [reducedMotion, setReducedMotion] = useState(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false
  )
  const [isHovering, setIsHovering] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2, -2]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-2, 2]), { stiffness: 300, damping: 30 })
  const scale = useSpring(isHovering ? 1.02 : 1, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
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
      className="h-full"
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
          href={`/attorneys/${attorney.id}`}
          className="block h-full bg-white rounded-xl shadow-soft hover:shadow-corporate transition-all duration-200 overflow-hidden group relative"
        >
          {/* Gold Border Animation with SVG pathLength */}
          <GoldBorderAnimation isHovering={isHovering} borderRadius="0.75rem" />
        {/* Image/Fallback Container */}
        <div
          className={`${compact ? 'aspect-[4/5]' : 'aspect-square'} bg-neutral-100 overflow-hidden relative`}
          style={{ viewTransitionName: 'attorney-portrait' }}
        >
          {!imageError ? (
            <motion.img
              src={getAttorneyThumbnailImage(attorney.id, attorney.imageThumb)}
              alt={attorney.name}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              onError={() => setImageError(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          ) : (
            /* Navy/Gold Initials Fallback */
            <div className="w-full h-full flex items-center justify-center bg-[#0A2540]">
              <span className="text-[#B8860B] text-5xl font-serif font-bold">
                {initials}
              </span>
            </div>
          )}

          {/* Overlay gradient on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Content */}
        <div className={`${compact ? 'p-4' : 'p-6'} relative z-10`}>
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-playfair font-bold text-[#0A2540] mb-1 group-hover:text-[#B8860B] transition-colors duration-200`}>
            {attorney.name}
          </h3>

          <p className="text-[#B8860B] font-semibold mb-3 text-sm">
            {attorney.title || 'Attorney'}
          </p>

          {!compact && attorney.bio && attorney.bio[0] && (
            <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
              {attorney.bio[0]}
            </p>
          )}

          {showContact && (
            <div className="space-y-2 text-sm">
              {attorney.phone && (
                <div className="flex items-center gap-2 text-neutral-600 hover:text-[#B8860B] transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{attorney.phone}</span>
                </div>
              )}
              {attorney.email && (
                <div className="flex items-center gap-2 text-neutral-600 hover:text-[#B8860B] transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{attorney.email}</span>
                </div>
              )}
            </div>
          )}

          {/* Practice Areas Tags (if not compact) */}
          {!compact && attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {attorney.practiceAreas.slice(0, 2).map((area: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
      </motion.div>
    </motion.div>
  )
}
