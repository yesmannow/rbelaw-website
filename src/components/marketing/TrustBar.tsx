import { motion } from 'framer-motion'
import { useState } from 'react'

interface Award {
  name: string
  description: string
  logoUrl?: string
}

const awards: Award[] = [
  {
    name: 'Best Lawyers',
    description: 'Best Lawyers in America',
  },
  {
    name: 'Super Lawyers',
    description: 'Super Lawyers Recognition',
  },
  {
    name: 'Martindale-Hubbell',
    description: 'AV Preeminent Rated',
  },
]

export function TrustBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-12 bg-white border-y border-neutral-200">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-8">
            Recognized for Excellence
          </h3>

          {/* Grayscale-to-Color Logo Strip */}
          <div className="flex items-center justify-center gap-12 max-w-4xl mx-auto flex-wrap">
            {awards.map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className="flex flex-col items-center justify-center p-6 transition-all duration-500">
                  {/* Logo Badge with Grayscale-to-Color Effect */}
                  <div className="w-32 h-32 mb-4 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center transition-all duration-500 group-hover:from-primary-navy/20 group-hover:to-primary-burgundy/20">
                    <div className={`text-center transition-all duration-500 ${
                      hoveredIndex === index ? 'grayscale-0' : 'grayscale'
                    }`}>
                      <div className={`text-2xl font-serif font-bold transition-colors duration-500 ${
                        hoveredIndex === index
                          ? 'text-primary-burgundy'
                          : 'text-neutral-600'
                      }`}>
                        {award.name.split(' ')[0]}
                      </div>
                      {award.name.split(' ').length > 1 && (
                        <div className={`text-xs font-semibold transition-colors duration-500 ${
                          hoveredIndex === index
                            ? 'text-accent-gold'
                            : 'text-neutral-500'
                        }`}>
                          {award.name.split(' ').slice(1).join(' ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm font-medium transition-colors duration-500 ${
                    hoveredIndex === index
                      ? 'text-primary-navy font-semibold'
                      : 'text-neutral-600'
                  }`}>
                    {award.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm text-neutral-500 mt-8"
          >
            Trusted by Fortune 500 companies and leading organizations across Indiana
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
