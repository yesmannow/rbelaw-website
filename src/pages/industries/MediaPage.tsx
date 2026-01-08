import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Radio, FileText, Users } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { ProfessionalCard } from '@/components/professionals/ProfessionalCard'
import { attorneys } from '@/lib/data/attorney-helpers'

export function MediaPage() {
  const mediaAttorneyNames = [
    'Jaclyn M. Flint',
    'Kevin N. Tharp',
    'Timothy H. Button'
  ]

  const mediaAttorneys = attorneys.filter(a => 
    mediaAttorneyNames.includes(a.name)
  )

  const clientTypes = [
    'Newspapers',
    'Magazines',
    'Book publishers',
    'Film producers and distributors',
    'Theaters',
    'Telecommunications companies',
    'Software developers',
    'E-commerce technology service providers',
  ]

  const services = [
    'Protection of copyrights and trademarks through registration and infringement litigation',
    'Defense of defamation claims',
    'Defense of misappropriation of publicity rights claims',
    'Defense of invasion of privacy claims',
    'Domain name disputes',
    'Litigation with competitors in federal and state courts',
    'Proceedings before the U.S. Patent and Trademark Office',
    'Negotiating and drafting procurement and licensing agreements for software and technology development',
    'Mergers and acquisitions',
  ]

  return (
    <>
      <SEOMeta
        title="Media Law | Riley Bennett Egloff LLP"
        description="Experienced counsel in communications, media, information technology and intellectual property for clients across the media spectrum."
      />

      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero/hero 1.jpg"
              alt="Media Law"
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
                <Radio className="w-4 h-4" />
                <span className="text-sm font-semibold">Industry Focus</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Media Law
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-100 leading-relaxed">
                Experienced counsel in communications, media, information technology and intellectual property for clients across the media spectrum.
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
                  Comprehensive Media Counsel
                </h2>
                <div className="prose prose-lg text-neutral-700">
                  <p className="mb-4">
                    Our attorneys are experienced in the areas of communications, media, information technology and intellectual property.
                  </p>
                  <p className="mb-4">
                    Riley Bennett Egloff represents clients across the media spectrum, including newspapers, magazines, book publishers, film producers and distributors, theaters, telecommunications companies, software developers, and e-commerce technology service providers.
                  </p>
                  <p className="mb-4">
                    Our lawyers are experienced in established areas of media law, including the protection of copyrights and trademarks through registration and infringement litigation; the defense of claims of defamation, misappropriation of publicity rights, and invasion of privacy claims; domain name disputes; litigation with competitors in federal and state courts and before the U.S. Patent and Trademark Office; negotiating and drafting procurement and licensing agreements for software and technology development; and mergers and acquisitions.
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
                  Media Clients We Represent
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
                Our Media Law Services
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Comprehensive legal support for media and technology companies
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
                Our Media Law Team
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Experienced attorneys serving media and technology clients
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {mediaAttorneys.map((attorney, index) => (
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
                Partner with Experienced Media Counsel
              </h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                From IP protection to defamation defense and technology agreements, our media law team is ready to serve your unique needs.
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
