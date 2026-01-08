import { motion } from 'framer-motion'

interface PracticeAreaHeroProps {
  title: string
  description: string
  slug: string
}

/**
 * Reusable Hero Component for Practice Area Pages
 * Features improved spacing and gradient overlays
 */
export function PracticeAreaHero({ title, description, slug }: PracticeAreaHeroProps) {

  return (
    <section className="relative bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <img
        src="/images/hero/hero 1.jpg"
        alt={`${title} hero - ${slug}`}
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/90 via-primary-navy/85 to-primary-burgundy/80" />

      {/* Content */}
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-100 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50 to-transparent" />
    </section>
  )
}
