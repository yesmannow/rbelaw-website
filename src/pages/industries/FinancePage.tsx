import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, TrendingUp, FileText, Users, Shield } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { ProfessionalCard } from '@/components/professionals/ProfessionalCard'
import { attorneys } from '@/lib/data/attorney-helpers'

export function FinancePage() {
  // Get finance attorneys
  const financeAttorneyNames = [
    'John L. Egloff',
    'Jeffrey S. Fecht',
    'Kathleen Hart',
    'Anthony R. Jost',
    'Ryan L. Leitch',
    'Katie S. Riles',
    'Raymond T. Seach',
    'Donald S. Smith',
    'Kevin N. Tharp',
    'Timothy H. Button',
    'Blair R. Vandivier'
  ]

  const financeAttorneys = attorneys.filter(a => 
    financeAttorneyNames.includes(a.name)
  )

  const services = [
    'Preparation and review of private placement memoranda',
    'Labor and employment matters',
    'Review and negotiation of loan documents',
    'General litigation matters',
    'Complex creditor\'s rights litigation',
    'Fair Credit Reporting Act (FCRA) defense',
    'Fair Debt Collection Practices Act (FDCPA) defense',
  ]

  const clientTypes = [
    'Banks',
    'Credit Unions',
    'Credit Reporting Agencies',
    'Hedge Funds',
    'Private Equity Firms',
    'Financial Institutions',
  ]

  return (
    <>
      <SEOMeta
        title="Finance Law | Riley Bennett Egloff LLP"
        description="Comprehensive legal services for banks, credit unions, private equity firms, and financial institutions. Expert counsel in today's complex economic climate."
      />

      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero/hero 1.jpg"
              alt="Finance Law"
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
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">Industry Focus</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Finance Law
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-100 leading-relaxed">
                Comprehensive legal counsel for financial institutions navigating today's complex economic landscape.
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
                  Expert Financial Services Counsel
                </h2>
                <div className="prose prose-lg text-neutral-700">
                  <p className="mb-4">
                    Through our representation of banks, credit unions, credit reporting agencies, hedge funds and other private equity firms, we understand the challenges facing financial institutions in today's economic climate.
                  </p>
                  <p className="mb-4">
                    The attorneys of Riley Bennett Egloff provide a wide range of services to our clients in the finance industry, including the preparation and review of private placement memoranda; labor and employment matters; review and negotiation of loan documents; and general litigation matters, including the full gamut of complex creditor's rights litigation, as well as the defense of Fair Credit Reporting Act and Fair Debt Collection Practices Act claims.
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
                Our Finance Law Services
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Comprehensive legal support for financial institutions and investment firms
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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

        {/* Expertise Highlights */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-primary-navy to-primary-burgundy rounded-2xl p-8 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-accent-gold" />
                  <h3 className="text-2xl font-serif font-bold">Litigation Defense</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Comprehensive defense services for financial institutions, including:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <span>Complex creditor's rights litigation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <span>FCRA defense</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <span>FDCPA defense</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-accent-gold to-accent-bronze rounded-2xl p-8 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-serif font-bold">Transactional Services</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Expert guidance on financial transactions and documentation:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>Private placement memoranda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>Loan document review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>Contract negotiation</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Attorneys Section */}
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
                Our Finance Law Team
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Experienced attorneys dedicated to serving financial institutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {financeAttorneys.map((attorney, index) => (
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
        <section className="py-16 bg-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-6">
                Partner with Experienced Finance Counsel
              </h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Whether you need transactional support, litigation defense, or regulatory guidance, our finance law team is ready to help your institution navigate today's complex financial landscape.
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
