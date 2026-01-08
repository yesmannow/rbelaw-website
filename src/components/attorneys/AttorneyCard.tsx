import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { Attorney } from '@/lib/types'
import { getAttorneyImages } from '@/lib/utils/attorney-images'

interface AttorneyCardProps {
  attorney: Attorney
  index?: number
  compact?: boolean
  showContact?: boolean
  hoverVideoUrl?: string
}

/**
 * Reusable Attorney Card Component
 * Used across /attorneys page and practice area pages
 * Now with cinematic video hover functionality
 */
export function AttorneyCard({ attorney, index = 0, compact = false, showContact = true, hoverVideoUrl }: AttorneyCardProps) {
  const images = getAttorneyImages(attorney.name, attorney.imageUrl)
  const [isHovering, setIsHovering] = useState(false)
  
  // Check if video is available (from prop or attorney data)
  const videoUrl = hoverVideoUrl || (attorney as { hoverVideoUrl?: string }).hoverVideoUrl

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        to={`/attorneys/${attorney.id}`}
        className="block h-full bg-white rounded-xl shadow-soft hover:shadow-corporate transition-all duration-300 overflow-hidden group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Image/Video Container */}
        <div className={`${compact ? 'aspect-[4/5]' : 'aspect-square'} bg-neutral-100 overflow-hidden relative`}>
          {/* Static Image */}
          <AnimatePresence mode="wait">
            {!isHovering || !videoUrl ? (
              <motion.div
                key="image"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <picture>
                  <source srcSet={images.avif} type="image/avif" />
                  <source srcSet={images.webp} type="image/webp" />
                  <img
                    src={images.fallback}
                    alt={attorney.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-avatar.jpg'
                    }}
                  />
                </picture>
              </motion.div>
            ) : (
              /* Video on Hover - Cinematic B-roll */
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <video
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className={`${compact ? 'p-4' : 'p-6'}`}>
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-serif font-bold text-primary-navy mb-1 group-hover:text-primary-burgundy transition-colors`}>
            {attorney.name}
          </h3>
          
          <p className="text-accent-gold font-semibold mb-3 text-sm">
            {attorney.title || 'Attorney'}
          </p>

          {!compact && attorney.bio && (
            <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
              {attorney.bio}
            </p>
          )}

          {showContact && (
            <div className="space-y-2 text-sm">
              {attorney.phone && (
                <div className="flex items-center gap-2 text-neutral-600 hover:text-primary-burgundy transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{attorney.phone}</span>
                </div>
              )}
              {attorney.email && (
                <div className="flex items-center gap-2 text-neutral-600 hover:text-primary-burgundy transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{attorney.email}</span>
                </div>
              )}
            </div>
          )}

          {/* Practice Areas Tags (if not compact) */}
          {!compact && attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {attorney.practiceAreas.slice(0, 2).map((area, idx) => (
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
  )
}
