import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { industries } from '../../lib/data'
import { SEOMeta } from '@/components/seo/SEOMeta'

// Helper to get icon component from string name
const getIcon = (iconName: string) => {
  type IconsType = typeof LucideIcons
  const Icon = LucideIcons[iconName as keyof IconsType] as typeof LucideIcons.Briefcase
  return Icon || LucideIcons.Briefcase
}

// Bento Grid Layout - Different sizes for visual interest
const bentoLayout = [
  { cols: 'md:col-span-2', rows: 'md:row-span-2' }, // Large
  { cols: 'md:col-span-1', rows: 'md:row-span-1' }, // Small
  { cols: 'md:col-span-1', rows: 'md:row-span-1' }, // Small
  { cols: 'md:col-span-1', rows: 'md:row-span-1' }, // Small
  { cols: 'md:col-span-1', rows: 'md:row-span-1' }, // Small
  { cols: 'md:col-span-2', rows: 'md:row-span-1' }, // Wide
]

export function IndustriesIndex() {
  return (
    <>
      <SEOMeta
        title="Industries We Serve | Riley Bennett Egloff LLP"
        description="Riley Bennett Egloff provides specialized legal services across a diverse range of industries."
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-navy to-primary-slate text-white py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Riley Bennett Egloff provides specialized legal services across a diverse range of industries.
              Our attorneys understand the unique challenges and opportunities in each sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {industries.map((industry, index) => {
              const layout = bentoLayout[index % bentoLayout.length]
              const Icon = getIcon(industry.icon)

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className={`${layout.cols} ${layout.rows}`}
                >
                  <Link to={`/industries/${industry.slug}`} className="block h-full">
                    <div className="group relative h-full overflow-hidden bg-white border border-neutral-200 rounded-lg transition-all duration-500 hover:shadow-2xl hover:border-accent-gold">
                      {/* Background Image Effect */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-primary-navy/5 to-primary-burgundy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(117, 37, 61, 0.1) 0%, transparent 70%)`
                        }}
                      />

                      {/* Content */}
                      <div className="relative h-full p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <div className="mb-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-primary-navy to-primary-burgundy flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                              <Icon className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
                            </div>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary-navy mb-3 group-hover:text-primary-burgundy transition-colors duration-300">
                            {industry.name}
                          </h3>

                          <p className="text-neutral-600 text-sm md:text-base leading-relaxed line-clamp-3">
                            {industry.description}
                          </p>
                        </div>

                        {/* Hover Button */}
                        <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <div className="inline-flex items-center gap-2 text-primary-burgundy font-semibold">
                            <span>View Practice</span>
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Decorative Corner Accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-navy mb-6">
              Need Legal Guidance for Your Industry?
            </h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              Our experienced attorneys understand the specific legal challenges your industry faces.
              Contact us to discuss how we can help your business succeed.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary-burgundy hover:bg-primary-burgundy/90 text-white px-8 py-4 rounded-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
