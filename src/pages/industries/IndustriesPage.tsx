import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Users } from 'lucide-react'
import { industriesManual } from '@/lib/data/industries-manual'
import { SEOMeta } from '@/components/seo/SEOMeta'

export function IndustriesPage() {
  return (
    <>
      <SEOMeta
        title="Industries We Serve | Riley Bennett Egloff LLP"
        description="Comprehensive legal services across diverse industries including construction, healthcare, finance, manufacturing, and more."
      />

      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Industries We Serve
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-100 leading-relaxed">
                Deep industry knowledge combined with legal expertise to deliver tailored solutions
                for your business challenges.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-16 lg:py-24 bg-neutral-50">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industriesManual.map((industry, index) => (
                <motion.div
                  key={industry.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="h-full bg-white rounded-xl shadow-soft hover:shadow-corporate transition-all duration-300 overflow-hidden border border-transparent hover:border-primary-burgundy">
                    {/* Header with Icon */}
                    <div className="bg-gradient-to-br from-primary-navy to-primary-burgundy p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                            {industry.name}
                          </h3>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Description */}
                      <p className="text-neutral-700 text-sm leading-relaxed mb-6 line-clamp-4">
                        {industry.intro}
                      </p>

                      {/* Services Preview */}
                      {industry.services && industry.services.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-primary-navy mb-3 flex items-center gap-2">
                            <div className="w-1 h-4 bg-accent-gold rounded-full" />
                            Key Services
                          </h4>
                          <ul className="space-y-2">
                            {industry.services.slice(0, 3).map((service, idx) => (
                              <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                                <span className="text-accent-gold mt-1">•</span>
                                <span className="line-clamp-2">{service}</span>
                              </li>
                            ))}
                            {industry.services.length > 3 && (
                              <li className="text-sm text-primary-burgundy font-medium">
                                +{industry.services.length - 3} more services
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Attorney Count */}
                      {industry.attorneys && industry.attorneys.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6 pb-6 border-b border-neutral-200">
                          <Users className="w-4 h-4 text-primary-navy" />
                          <span>
                            <strong className="text-primary-navy">{industry.attorneys.length}</strong> attorneys
                            {' '}specializing in this industry
                          </span>
                        </div>
                      )}

                      {/* View Details Link */}
                      <Link
                        to={`/industries/${industry.slug}`}
                        className="inline-flex items-center gap-2 text-primary-burgundy font-semibold hover:gap-3 transition-all group"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-6">
                  Don't See Your Industry?
                </h2>
                <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                  Our attorneys have experience across a wide range of industries beyond those listed here.
                  Contact us to discuss how we can help your specific business needs.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-accent-gold hover:bg-accent-bronze text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
