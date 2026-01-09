import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone, Linkedin, Download } from 'lucide-react'
import { useRef } from 'react'
import type { Attorney } from '@/lib/types'
import { getAttorneyBioImage } from '@/lib/utils/attorney-images'

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
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  const bioImage = getAttorneyBioImage(attorney.id, attorney.image)

  return (
    <div ref={containerRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-navy via-primary-navy to-primary-slate" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="section-container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Transparent Headshot - Large & Prominent */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Glow Effect Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/20 via-accent-gold/10 to-transparent blur-3xl -z-10" />

            <motion.div
              style={{ y: imageY, opacity }}
              className="relative"
            >
              {/* Main Transparent Headshot */}
              <div className="relative">
                <img
                  src={bioImage}
                  alt={attorney.name}
                  loading="eager"
                  className="w-full h-auto max-h-[700px] object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
                  }}
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(attorney.name)}&size=600&background=1e3a5f&color=fff`
                  }}
                />

                {/* Decorative Accent Lines */}
                <div className="absolute -left-8 top-1/4 w-1 h-32 bg-gradient-to-b from-accent-gold to-transparent opacity-50" />
                <div className="absolute -right-8 bottom-1/4 w-1 h-32 bg-gradient-to-t from-accent-gold to-transparent opacity-50" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 text-white space-y-8"
          >
            {/* Name & Title */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl lg:text-7xl font-serif font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {attorney.name}
              </motion.h1>
              <motion.p
                className="text-2xl lg:text-3xl text-accent-gold font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {attorney.title}
              </motion.p>
            </div>

            {/* Divider */}
            <motion.div
              className="h-px w-24 bg-gradient-to-r from-accent-gold to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            {/* Contact Info */}
            <motion.div
              className="space-y-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a
                href={`mailto:${attorney.email}`}
                className="flex items-center gap-4 text-neutral-200 hover:text-accent-gold transition-all duration-300 group"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-accent-gold/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg">{attorney.email}</span>
              </a>
              <a
                href={`tel:${attorney.phone}`}
                className="flex items-center gap-4 text-neutral-200 hover:text-accent-gold transition-all duration-300 group"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-accent-gold/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg">{attorney.phone}</span>
              </a>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {attorney.linkedIn && (
                <a
                  href={attorney.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {attorney.vCard && (
                <a
                  href={attorney.vCard}
                  download
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
                  aria-label="Download vCard"
                >
                  <Download className="w-6 h-6" />
                </a>
              )}
              {onPrint && (
                <button
                  onClick={onPrint}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent-gold text-primary-navy font-semibold rounded-xl hover:bg-accent-gold/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-accent-gold/30"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Print Bio</span>
                </button>
              )}
            </motion.div>

            {/* Practice Areas Tags */}
            {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
              <motion.div
                className="pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="flex flex-wrap gap-3">
                  {attorney.practiceAreas.slice(0, 4).map((area: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-neutral-200 hover:bg-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-accent-gold rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
