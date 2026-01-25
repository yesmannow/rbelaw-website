/**
 * Practice Areas Section
 * Enhanced with background images and visual interest
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Gavel,
  ShieldCheck,
  Users,
  HeartPulse,
  HardHat,
  Scale
} from 'lucide-react'
import { practiceAreas } from '../../../lib/data'
import { BentoGrid, BentoGridItem } from '../../../components/interactive/BentoGrid'
import { getPracticeAreaImages } from '@/lib/utils/practiceAreaImages'

// Icon mapping
const iconMap = {
  'Building2': Building2,
  'Gavel': Gavel,
  'ShieldCheck': ShieldCheck,
  'Users': Users,
  'HeartPulse': HeartPulse,
  'HardHat': HardHat,
  'Scale': Scale,
}

export function PracticeAreasSection() {
  // Show only first 4 practice areas (1 row)
  const displayedAreas = practiceAreas.slice(0, 4)
  const hasMore = practiceAreas.length > 4

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}/>
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-6">
            <span className="text-sm font-semibold text-accent-gold uppercase tracking-wide">
              Practice Areas
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-navy mb-6">
            What We Do
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Comprehensive legal expertise across key practice areas serving businesses throughout Indiana and the Midwest.
          </p>
        </motion.div>

        <BentoGrid>
          {displayedAreas.map((area, index) => {
            const IconComponent = iconMap[area.icon as keyof typeof iconMap] || Building2
            const areaImages = getPracticeAreaImages(area.slug)

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Link to={`/practice-areas/${area.slug}`} className="block h-full group">
                  <BentoGridItem featured={index === 0}>
                    {/* Background image for featured card */}
                    {index === 0 && areaImages && (
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-300">
                        <picture>
                          <source srcSet={areaImages.avif} type="image/avif" />
                          <source srcSet={areaImages.webp} type="image/webp" />
                          <img
                            src={areaImages.jpg}
                            alt=""
                            className="w-full h-full object-cover"
                            aria-hidden="true"
                          />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/20 to-transparent" />
                      </div>
                    )}

                    <div className="relative z-10">
                      <div className="mb-4 inline-block">
                        <div className="p-3 bg-primary-navy/5 rounded-lg group-hover:bg-accent-gold/10 transition-colors duration-300">
                          <IconComponent className="h-8 w-8 text-accent-gold" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-accent-gold transition-colors duration-300">
                        {area.name}
                      </h3>
                      <p className="text-neutral-600 mb-4 leading-relaxed flex-1">
                        {area.description}
                      </p>
                      <span className="text-accent-gold text-sm font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </BentoGridItem>
                </Link>
              </motion.div>
            )
          })}
        </BentoGrid>

        {/* See More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/practice-areas"
              className="inline-flex items-center justify-center bg-primary-navy hover:bg-primary-navy/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View All Practice Areas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
