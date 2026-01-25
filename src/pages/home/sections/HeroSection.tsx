import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Strategic Legal Partners.
            <br />
            <span className="text-accent-gold">Relentless Advocates.</span>
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
              className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-bronze text-white px-8 py-4 rounded-sm font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Our Practice Areas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-navy px-8 py-4 rounded-sm font-semibold text-lg transition-all duration-300"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </HeroParallax>
  )
}
