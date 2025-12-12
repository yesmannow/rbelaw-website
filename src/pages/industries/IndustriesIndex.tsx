import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import * as LucideIcons from 'lucide-react'
import { industries } from '../../lib/data'

// Map icon names to actual Lucide components
const getIcon = (iconName: string) => {
  const Icon = (LucideIcons as any)[iconName]
  return Icon || LucideIcons.Briefcase
}

export function IndustriesIndex() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-navy text-white py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-primary text-white mb-4">
              Industries We Serve
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl">
              Riley Bennett Egloff provides specialized legal services across a diverse range of industries. 
              Our attorneys understand the unique challenges and opportunities in each sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {industries.map((industry, index) => {
              const Icon = getIcon(industry.icon)
              
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/industries/${industry.slug}`}>
                    <div className="group relative overflow-hidden bg-white border border-neutral-200 rounded-sm h-64 transition-all duration-300 hover:shadow-corporate">
                      {/* Main Content */}
                      <div className="p-8 h-full flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:-translate-y-4">
                        <div className="mb-6 text-accent-gold">
                          <Icon className="h-16 w-16" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif font-semibold text-primary-navy mb-3">
                          {industry.name}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                          {industry.description}
                        </p>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-navy to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 py-6 px-8 flex items-end">
                        <span className="text-white font-semibold flex items-center">
                          View Practice
                          <LucideIcons.ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-neutral-50 py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-semibold text-primary-navy mb-6">
              Need Legal Guidance for Your Industry?
            </h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              Our experienced attorneys understand the specific legal challenges your industry faces. 
              Contact us to discuss how we can help your business succeed.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-accent-gold text-white px-8 py-3 rounded-sm font-semibold hover:bg-accent-bronze transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
