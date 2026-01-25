/**
 * Value Proposition Section
 * Split layout with image and compelling messaging
 */

import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const benefits = [
  'Tier-one firm expertise with boutique responsiveness',
  'Cost-effective solutions tailored to your business',
  'Strategic counsel from experienced practitioners',
  'Results-driven approach to complex legal challenges'
]

export function ValuePropositionSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-navy rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image with overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <picture>
                <source srcSet="/images/hero/hero-1.avif" type="image/avif" />
                <source srcSet="/images/hero/hero-1.webp" type="image/webp" />
                <img
                  src="/images/hero/hero-1.jpg"
                  alt="Riley Bennett Egloff - Professional Legal Services"
                  className="w-full h-full object-cover"
                />
              </picture>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/80 via-primary-navy/60 to-transparent" />

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-accent-gold/30 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-accent-gold/30 rounded-bl-2xl" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-6">
              <span className="text-sm font-semibold text-accent-gold uppercase tracking-wide">
                Our Approach
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-navy mb-6 leading-tight">
              Big Law Expertise.{' '}
              <span className="text-[#74243C]">Boutique Agility.</span>
            </h2>

            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8">
              Riley Bennett Egloff offers the depth of experience you expect from a large tier-one firm,
              combined with the responsive, personalized attention of a specialized practice.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-accent-gold" />
                  </div>
                  <p className="text-neutral-700 leading-relaxed">{benefit}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
