import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Signal, FileText, Users } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { ProfessionalCard } from '@/components/professionals/ProfessionalCard'
import { attorneys } from '@/lib/data/attorney-helpers'

export function TelecommunicationsPage() {
  const attorneyNames = [
    'Jaclyn M. Flint',
    'Anthony R. Jost',
    'Ryan L. Leitch',
    'Katie S. Riles',
    'Timothy H. Button',
    'John L. Egloff',
    'James W. Riley Jr.',
  ]
  const team = attorneys.filter(a => attorneyNames.includes(a.name))

  const clientTypes = [
    'Multi-national telecommunications carriers',
    'Local, closely-held companies',
  ]

  const services = [
    'Regulatory matters, including assisting with local exchange competition',
    'Real estate and land use issues, including leasing, easements, and encroachments',
    'Intellectual property registration and infringement litigation',
    'Negotiating and documenting dark fiber rights, including leases and IRUs',
  ]

  return (
    <>
      <SEOMeta
        title="Telecommunications | Riley Bennett Egloff LLP"
        description="Serving clients in the telecommunications industry with regulatory, real estate, IP, and dark fiber rights counsel."
      />

      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/hero/hero 1.jpg" alt="Telecommunications" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/90 via-primary-navy/85 to-primary-burgundy/90" />
          </div>
          <div className="section-container relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Signal className="w-4 h-4" />
                <span className="text-sm font-semibold">Industry Focus</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">Telecommunications</h1>
              <p className="text-xl lg:text-2xl text-neutral-100 leading-relaxed">
                Comprehensive counsel for telecommunications providers, from regulatory matters and real estate to IP and dark fiber rights.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-6">Industry Experience</h2>
                <div className="prose prose-lg text-neutral-700">
                  <p className="mb-4">
                    Our attorneys serve clients in the telecommunications industry, ranging from well-established, multi-national telecommunications carriers to local, closely-held companies.
                  </p>
                  <p className="mb-4">
                    We provide regulatory counsel, address real estate and land use issues, manage IP matters, and negotiate dark fiber rights, including leases and IRUs.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-8 border border-neutral-200">
                <h3 className="text-xl font-bold text-primary-navy mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-accent-gold" />
                  Who We Serve
                </h3>
                <ul className="space-y-3">
                  {clientTypes.map((v, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 font-medium">{v}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 lg:py-20 bg-neutral-50">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-4">Key Services</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Regulatory, real estate, IP, and dark fiber counsel for telecommunications providers</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {services.map((service, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="bg-white rounded-xl p-6 shadow-soft hover:shadow-corporate transition-all duration-300 border border-transparent hover:border-primary-burgundy group">
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

        {/* Team */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-4">Our Telecommunications Team</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Experienced counsel for carriers and communications providers</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {team.map((attorney, index) => (
                <ProfessionalCard key={attorney.id} attorney={attorney} index={index} compact={true} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-neutral-50">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-6">Partner with Experienced Telecom Counsel</h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">We help providers navigate regulation, protect IP, and secure dark fiber rights.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-accent-gold hover:bg-accent-bronze text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/industries" className="inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 text-primary-navy border-2 border-primary-navy px-8 py-4 rounded-lg font-semibold transition-all">
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
