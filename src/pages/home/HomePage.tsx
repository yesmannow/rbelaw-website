import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Scale, Shield, Building2 } from 'lucide-react'
import { practiceAreas } from '../../lib/data'

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary-navy text-white py-24 lg:py-32">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="heading-primary text-white mb-6">
              Excellence in Corporate Legal Services
            </h1>
            <p className="text-xl text-neutral-200 mb-8 max-w-2xl">
              Riley Bennett Egloff delivers sophisticated legal solutions to businesses navigating complex challenges. 
              Our commitment to excellence and client success sets us apart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary bg-accent-gold hover:bg-accent-bronze text-white">
                Schedule a Consultation
                <ArrowRight className="inline ml-2 h-5 w-5" />
              </Link>
              <Link to="/practice-areas" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary-navy">
                Our Practice Areas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary mb-4">
              Our Practice Areas
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Comprehensive legal expertise across key practice areas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/practice-areas/${area.slug}`}
                  className="block p-6 bg-white border border-neutral-200 rounded-sm hover:shadow-corporate transition-all duration-300 group h-full"
                >
                  <div className="mb-4">
                    {area.icon === 'Building2' && <Building2 className="h-10 w-10 text-accent-gold" />}
                    {area.icon === 'Shield' && <Shield className="h-10 w-10 text-accent-gold" />}
                    {area.icon === 'HardHat' && <Building2 className="h-10 w-10 text-accent-gold" />}
                    {area.icon === 'Scale' && <Scale className="h-10 w-10 text-accent-gold" />}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-primary-navy mb-3 group-hover:text-accent-gold transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {area.description}
                  </p>
                  <span className="text-accent-gold text-sm font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-neutral-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary mb-4">
              Why Choose Riley Bennett Egloff
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              A trusted partner for businesses seeking exceptional legal counsel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-gold rounded-full mb-6">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary-navy mb-3">
                Proven Experience
              </h3>
              <p className="text-neutral-600">
                Decades of combined experience handling complex legal matters with successful outcomes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-gold rounded-full mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary-navy mb-3">
                Client-Focused
              </h3>
              <p className="text-neutral-600">
                Tailored strategies that align with your business objectives and long-term goals
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-gold rounded-full mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary-navy mb-3">
                Strategic Advocacy
              </h3>
              <p className="text-neutral-600">
                Aggressive representation combined with sound business judgment and practical solutions
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-navy text-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-neutral-200 mb-8">
              Contact us today to discuss how we can help your business succeed.
            </p>
            <Link to="/contact" className="btn-primary bg-accent-gold hover:bg-accent-bronze text-white">
              Get in Touch
              <ArrowRight className="inline ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
