import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Attorney } from '@/lib/types'
import { getAttorneyThumbnailImage } from '@/lib/utils/attorney-images'

interface ProfessionalCardProps {
  attorney: Attorney
  index?: number
  compact?: boolean
}

/**
 * Reusable Professional Card Component
 * Used across industry pages, practice area pages, and team sections
 * Displays attorney with optimized images and contact info
 */
export function ProfessionalCard({ attorney, index = 0, compact = false }: ProfessionalCardProps) {
  const thumbnailImage = getAttorneyThumbnailImage(attorney.id, attorney.imageThumb)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        href={`/attorneys/${attorney.id}`}
        className="block h-full bg-white rounded-xl shadow-soft hover:shadow-corporate transition-all duration-300 overflow-hidden group"
      >
        {/* Image Container */}
        <div className={`${compact ? 'aspect-[4/5]' : 'aspect-[3/4]'} bg-neutral-100 overflow-hidden relative`}>
          <img
            src={thumbnailImage}
            alt={attorney.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-avatar.jpg'
            }}
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-serif font-bold text-primary-navy mb-1 group-hover:text-primary-burgundy transition-colors">
            {attorney.name}
          </h3>

          <p className="text-accent-gold font-semibold mb-3 text-sm">
            {attorney.title || 'Attorney'}
          </p>

          {/* Contact Info */}
          <div className="space-y-2 text-xs">
            {attorney.phone && (
              <div className="flex items-center gap-2 text-neutral-600 hover:text-primary-burgundy transition-colors">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{attorney.phone}</span>
              </div>
            )}
            {attorney.email && (
              <div className="flex items-center gap-2 text-neutral-600 hover:text-primary-burgundy transition-colors">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate text-xs">{attorney.email}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
