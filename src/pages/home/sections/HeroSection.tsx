/**
 * Hero Section
 * Enhanced with decorative elements and better visual hierarchy
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { HeroParallax } from '../../../components/interactive/HeroParallax'

export function HeroSection() {
  return (
    <HeroParallax className="text-white py-32 lg:py-40">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent-gold" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Premier Legal Counsel
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            aria-label="Strategic Legal Partners. Relentless Advocates."
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Strategic Legal Partners.</span>
            <span className="text-[#74243C] relative inline-block">
              <span className="block">Relentless Advocates.</span>
              {/* Decorative underline */}
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-accent-gold/30 -translate-y-1" />
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-neutral-100 mb-10 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premier corporate defense and litigation counsel for businesses, insurers,
            and professionals across Indiana and the Midwest.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/practice-areas"
              className="inline-flex items-center justify-center bg-[#034081] hover:bg-[#023361] text-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Our Practice Areas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white/80 text-white hover:bg-white hover:text-primary-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </HeroParallax>
  )
}
