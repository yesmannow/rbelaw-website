import { motion } from 'framer-motion'
import { useState } from 'react'

interface Award {
  name: string
  description: string
  logoUrl: string
}

const awards: Award[] = [
  {
    name: 'Best Lawyers',
    description: 'Best Lawyers in America',
    logoUrl: '/images/logo/Best-Law-Firms-2025.jpg',
  },
  {
    name: 'Super Lawyers',
    description: 'Super Lawyers Recognition',
    logoUrl: '/images/logo/super lawyers logo.png',
  },
  {
    name: 'Martindale-Hubbell',
    description: 'AV Preeminent Rated',
    logoUrl: '/images/logo/MartindaleHubbell.jpg',
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
                  {/* Award Logo with Grayscale-to-Color Effect */}
                  <div className="w-40 h-40 mb-4 flex items-center justify-center">
                    <img
                      src={award.logoUrl}
                      alt={award.name}
                      className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                        hoveredIndex === index ? 'grayscale-0 scale-110' : 'grayscale opacity-70'
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <p className={`text-sm font-medium text-center transition-colors duration-500 ${
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
