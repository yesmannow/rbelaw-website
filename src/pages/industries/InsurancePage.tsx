import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Shield,  Users } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { ProfessionalCard } from '@/components/professionals/ProfessionalCard'
import { attorneys } from '@/lib/data/attorney-helpers'

export function InsurancePage() {
  const insuranceAttorneyNames = [
    'Jeffrey S. Fecht',
    'Ryan L. Leitch',
    'Sarah Macgill Marr',
    'Katie R. Osborne',
    'Raymond T. Seach',
    'Donald S. Smith',
    'Timothy H. Button',
    'James W. Riley Jr.'
  ]

  const insuranceAttorneys = attorneys.filter(a => 
    insuranceAttorneyNames.includes(a.name)
  )

  const regulatoryServices = [
    'Regulatory compliance advice and approvals',
    'Guidance through Market Conduct Examinations',
    'Regulatory inquiries',
    'Reinsurance issues',
    'Captive insurers',
    'Available self-insurance options',
    'Risk pools',
    'Formation and capital structuring',
    'Strategic transactions',
  ]

  const litigationServices = [
    'Defense of first-party claims',
    'Defense of third-party claims',
    'Bad faith claims defense',
    'Coverage dispute evaluation and resolution',
    'Examinations under oath (EUO)',
    'Complex declaratory judgment actions',
  ]

  const clientTypes = [
    'Insurers',
    'Reinsurers',
    'Agents',
    'Brokers',
    'Third Party Administrators',
    'Administrative Service Organizations',
  ]

  return (
    <>
      <SEOMeta
        title="Insurance Law | Riley Bennett Egloff LLP"
        description="Decades of experience in all segments of the insurance industry. Regulatory compliance, litigation services, and strategic counsel."
      />

      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero/hero 1.jpg"
              alt="Insurance Law"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/90 via-primary-navy/85 to-primary-burgundy/90" />
          </div>
          <div className="section-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">Industry Focus</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Insurance Law
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-100 leading-relaxed">
                Decades of experience in all segments of the insurance industry, providing cost-effective and creative legal services across Indiana and around the country.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-6">
                  Comprehensive Insurance Counsel
                </h2>
                <div className="prose prose-lg text-neutral-700">
                  <p className="mb-4">
                    Our attorneys have decades of experience in all segments of the insurance industry.
                  </p>
                  <p className="mb-4">
                    The clients of Riley Bennett Egloff rely on us for regulatory compliance advice and approvals, guidance through Market Conduct Examinations and other regulatory inquiries, issues involving reinsurance, captive insurers, available self-insurance options, risk pools, formation and capital structuring, and other strategic transactions.
                  </p>
                  <p className="mb-4">
                    Insurers, reinsurers, agents, brokers, third party administrators and administrative service organizations depend on us for cost-effective and creative legal services across Indiana and around the country.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-8 border border-neutral-200"
              >
                <h3 className="text-xl font-bold text-primary-navy mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-accent-gold" />
                  Who We Represent
                </h3>
                <ul className="space-y-3">
                  {clientTypes.map((client, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 font-medium">{client}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Sections */}
        <section className="py-16 lg:py-20 bg-neutral-50">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-4">
                Our Insurance Law Services
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Comprehensive regulatory and litigation services for the insurance industry
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Regulatory Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-primary-navy to-primary-burgundy rounded-2xl p-8 text-white"
              >
                <h3 className="text-2xl font-serif font-bold mb-6">
                  Regulatory Services
                </h3>
                <ul className="space-y-3">
                  {regulatoryServices.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                      <span className="text-white/95">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Litigation Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-accent-gold to-accent-bronze rounded-2xl p-8 text-white"
              >
                <h3 className="text-2xl font-serif font-bold mb-6">
                  Litigation Services
                </h3>
                <ul className="space-y-3">
                  {litigationServices.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-white/95">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Attorneys Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-4">
                Our Insurance Law Team
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Experienced attorneys dedicated to serving the insurance industry
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {insuranceAttorneys.map((attorney, index) => (
                <ProfessionalCard
                  key={attorney.id}
                  attorney={attorney}
                  index={index}
                  compact={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-neutral-50">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-6">
                Partner with Experienced Insurance Counsel
              </h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Whether you need regulatory guidance, litigation defense, or strategic counsel, our insurance law team is ready to provide cost-effective solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 bg-accent-gold hover:bg-accent-bronze text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/industries"
                  className="inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 text-primary-navy border-2 border-primary-navy px-8 py-4 rounded-lg font-semibold transition-all"
                >
                  <span>View All Industries</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

