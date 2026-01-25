import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Attorney } from '@/lib/types'
import { getAttorneyImages } from '@/lib/utils/attorney-images'

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
  const images = getAttorneyImages(attorney.name, attorney.imageThumb)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        to={`/attorneys/${attorney.id}`}
        className="block h-full bg-white rounded-2xl border border-neutral-200/70 shadow-soft hover:shadow-corporate transition-all duration-300 overflow-hidden group active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/30"
      >
        {/* Image/Fallback Container */}
        <div 
          className={`${compact ? 'aspect-[3/4] sm:aspect-[4/5]' : 'aspect-square'} bg-neutral-100 overflow-hidden relative`}
          style={{ viewTransitionName: 'attorney-portrait' }}
        >
          {!imageError ? (
            <picture>
              <source srcSet={images.avif} type="image/avif" />
              <source srcSet={images.webp} type="image/webp" />
              <img
                src={images.fallback}
                alt={attorney.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            </picture>
          ) : (
            /* Navy/Maroon Initials Fallback */
            <div className="w-full h-full flex items-center justify-center bg-[#0A2540]">
              <span className="text-[#74243C] text-5xl font-serif font-bold">
                {initials}
              </span>
            </div>
          )}
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className={`${compact ? 'p-3 sm:p-4' : 'p-6'}`}>
          <h3
            className={[
              compact ? 'text-sm sm:text-lg leading-snug' : 'text-xl',
              'font-serif font-bold text-[#0A2540] mb-1 group-hover:text-[#74243C] transition-colors line-clamp-2',
            ].join(' ')}
          >
            {attorney.name}
          </h3>
          
          <p className={`${compact ? 'mb-2 text-[11px]' : 'mb-3 text-sm'} text-[#74243C] font-semibold`}>
            {attorney.title || 'Attorney'}
          </p>

          {!compact && attorney.bio && attorney.bio[0] && (
            <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
              {attorney.bio[0]}
            </p>
          )}

          {showContact && (
            <div className={`${compact ? 'space-y-1.5 text-[11px]' : 'space-y-2 text-sm'}`}>
              {attorney.phone && (
                <div className="flex items-center gap-2 text-neutral-600 hover:text-[#74243C] transition-colors">
                  <Phone className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} flex-shrink-0`} />
                  <span className="truncate">{attorney.phone}</span>
                </div>
              )}
              {attorney.email && (
                <div className={`${compact ? 'hidden min-[420px]:flex' : 'flex'} items-center gap-2 text-neutral-600 hover:text-[#74243C] transition-colors`}>
                  <Mail className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} flex-shrink-0`} />
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
  )
}
