import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Heart, FileText, Users } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { ProfessionalCard } from '@/components/professionals/ProfessionalCard'
import { attorneys } from '@/lib/data/attorney-helpers'

export function HealthCarePage() {
  const healthCareAttorneyNames = [
    'Laura A. Binford',
    'Jeffrey S. Fecht',
    'Anthony R. Jost',
    'Courtney David Mills',
    'Katie R. Osborne',
    'Katie S. Riles',
    'Donald S. Smith',
    'Timothy H. Button'
  ]

  const healthCareAttorneys = attorneys.filter(a => 
    healthCareAttorneyNames.includes(a.name)
  )

  const clientTypes = [
    'Hospitals',
    'Physicians',
    'Physician Extenders',
    'Paramedics',
    'Chiropractors',
    'Orthodontists',
    'Immediate Care Facilities',
    'Nursing Homes',
    'Assisted Living Facilities',
  ]

  const services = [
    'Defense of medical malpractice claims',
    'Labor and employee relations',
    'Real estate and land use',
    'Contract negotiation and drafting',
    'Corporate governance',
    'Mergers and acquisitions',
    'General business litigation',
  ]

  return (
    <>
      <SEOMeta
        title="Health Care Law | Riley Bennett Egloff LLP"
        description="Leading health care litigation law firm in Indiana. Representing hospitals, physicians, and health care providers across the state."
      />

      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero/hero 1.jpg"
              alt="Health Care Law"
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
                <Heart className="w-4 h-4" />
                <span className="text-sm font-semibold">Industry Focus</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Health Care Law
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-100 leading-relaxed">
                Among the leading health care litigation law firms in Indiana, providing comprehensive legal services to health care providers across the state.
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
                  Leading Health Care Litigation Practice
                </h2>
                <div className="prose prose-lg text-neutral-700">
                  <p className="mb-4">
                    Riley Bennett Egloff is among the leading health care litigation law firms in Indiana. Among others in the health care industry, we represent hospitals, physicians, physician extenders, paramedics, chiropractors, orthodontists, immediate care facilities, and nursing homes and assisted living facilities.
                  </p>
                  <p className="mb-4">
                    In addition to the defense of medical malpractice claims, our attorneys counsel our health care clients. We also counsel health care providers in matters involving labor and employee relations, real estate and land use, contract negotiation and drafting, corporate governance, mergers and acquisitions, and general business litigation.
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
                  Health Care Providers We Represent
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

        {/* Services Section */}
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
                Our Health Care Law Services
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Comprehensive legal support for health care providers across Indiana
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 shadow-soft hover:shadow-corporate transition-all duration-300 border border-transparent hover:border-primary-burgundy group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-navy to-primary-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-neutral-700 leading-relaxed font-medium">{service}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                Our Health Care Law Team
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Experienced attorneys dedicated to serving health care providers
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {healthCareAttorneys.map((attorney, index) => (
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
                Partner with Leading Health Care Counsel
              </h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                From medical malpractice defense to corporate governance, our health care law team is ready to serve your practice or facility's legal needs.
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

