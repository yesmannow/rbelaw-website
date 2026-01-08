import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Scale, FileText, Users } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { ProfessionalCard } from '@/components/professionals/ProfessionalCard'
import { attorneys } from '@/lib/data/attorney-helpers'

export function ConstructionPage() {
  // Get construction attorneys
  const constructionAttorneyNames = [
    'Jeffrey S. Fecht',
    'Anthony R. Jost',
    'Ryan L. Leitch',
    'Sarah Macgill Marr',
    'Katie R. Osborne',
    'Katie S. Riles',
    'Raymond T. Seach',
    'Donald S. Smith',
    'Justin O. Sorrell'
  ]

  const constructionAttorneys = attorneys.filter(a => 
    constructionAttorneyNames.includes(a.name)
  )

  const services = [
    'Real estate, land use and zoning',
    'Financing',
    'Insurance',
    'Preparation and evaluation of bid documents',
    'Bidding disputes',
    'Contract negotiations and preparation of contracts between and among owners (public and private), general contractors, prime contractors, subcontractors, architects, engineers, construction managers and suppliers for varied project delivery methods',
    'OSHA compliance',
    'Payment claims, including mechanic\'s liens and claims',
    'Mediation services, as mediator or counsel for a party',
    'Arbitration before AAA and independent arbitration panels',
    'Litigation in state and federal courts involving jury and non-jury cases',
  ]

  const claimsExpertise = [
    'Design errors',
    'Contract disputes concerning contract requirements, warranties, and similar claims',
    'Change orders',
    'Delay claims',
    'Acceleration claims',
  ]

  return (
    <>
      <SEOMeta
        title="Construction Law | Riley Bennett Egloff LLP"
        description="Comprehensive construction law services from project inception to completion. Representing owners, contractors, designers, and suppliers on projects of all sizes."
      />

      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero/hero 1.jpg"
              alt="Construction Law"
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
                <Scale className="w-4 h-4" />
                <span className="text-sm font-semibold">Industry Focus</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Construction Law
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-100 leading-relaxed">
                From conception to completion, we provide comprehensive legal counsel for construction projects of all sizes—from single-family residences to multimillion-dollar commercial developments.
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
                  Comprehensive Construction Counsel
                </h2>
                <div className="prose prose-lg text-neutral-700">
                  <p className="mb-4">
                    We have represented private owners, general contractors, construction managers, design professionals, subcontractors, and suppliers in construction projects that range from single family residences to commercial buildings with project costs of hundreds of millions of dollars.
                  </p>
                  <p className="mb-4">
                    We work with owners and contractors to clearly document the parties' rights and responsibilities and to anticipate issues before they arise. Once the contracts are executed, we counsel our clients to eliminate disputes during and after construction, and help our clients identify cost-effective solutions to those disputes that are unavoidable.
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
                  {[
                    'Private Owners',
                    'General Contractors',
                    'Construction Managers',
                    'Design Professionals',
                    'Subcontractors',
                    'Suppliers',
                  ].map((client, idx) => (
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
                Our Construction Law Services
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                We actively assist our clients in the following areas as they relate to construction projects
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <p className="text-neutral-700 leading-relaxed">{service}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Claims Expertise Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-primary-navy to-primary-burgundy rounded-2xl p-8 lg:p-12 text-white">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                  Claims Analysis, Defense & Prosecution
                </h2>
                <p className="text-lg text-white/90 mb-8">
                  We provide comprehensive claims analysis, defense, and prosecution in arbitration and litigation, including:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {claimsExpertise.map((claim, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-1" />
                      <span className="text-white/95">{claim}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
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
                Our Construction Law Team
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Experienced attorneys dedicated to protecting your construction project interests
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {constructionAttorneys.map((attorney, index) => (
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
                Ready to Discuss Your Construction Project?
              </h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Whether you're planning a new project or facing a construction dispute, our experienced team is here to help you navigate the complexities of construction law.
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
