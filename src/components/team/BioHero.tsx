import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone, Linkedin, Download } from 'lucide-react'
import { useRef } from 'react'
import type { Attorney } from '@/lib/types'

interface BioHeroProps {
  attorney: Attorney
  onPrint?: () => void
}

export function BioHero({ attorney, onPrint }: BioHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Parallax effect for the image
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-primary-navy text-white">
      <div className="section-container py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image with Parallax */}
          <motion.div 
            className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              style={{ y: imageY }}
              className="w-full h-full"
            >
              <img
                src={attorney.image}
                alt={attorney.name}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(attorney.name)}&size=600&background=1e3a5f&color=fff`
                }}
              />
            </motion.div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                {attorney.name}
              </h1>
              <p className="text-xl text-neutral-300">
                {attorney.title}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 border-t border-neutral-700 pt-6">
              <a
                href={`mailto:${attorney.email}`}
                className="flex items-center gap-3 text-neutral-200 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{attorney.email}</span>
              </a>
              <a
                href={`tel:${attorney.phone}`}
                className="flex items-center gap-3 text-neutral-200 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{attorney.phone}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {attorney.linkedIn && (
                <a
                  href={attorney.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {attorney.vCard && (
                <a
                  href={attorney.vCard}
                  download
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Download vCard"
                >
                  <Download className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Print Bio Button */}
            <div className="pt-4">
              <button
                onClick={onPrint}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gold text-primary-navy font-semibold rounded-lg hover:bg-accent-gold/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Print Bio
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
