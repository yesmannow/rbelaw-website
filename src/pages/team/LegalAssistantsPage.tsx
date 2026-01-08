import { motion } from 'framer-motion'
import { Mail, Phone, Briefcase, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { legalAssistants } from '@/lib/data/legal-assistants'
import { attorneys } from '@/lib/data/attorney-helpers'
import { SEOMeta } from '@/components/seo/SEOMeta'

export function LegalAssistantsPage() {
  return (
    <>
      <SEOMeta
        title="Legal Assistants | Riley Bennett Egloff LLP"
        description="Meet our dedicated legal assistants who provide essential support to our attorneys and clients."
      />

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
                Legal Assistants
              </h1>
              <p className="text-xl text-neutral-200 max-w-3xl">
                Meet our dedicated legal assistants who provide essential support to our attorneys and clients.
                Our legal assistants are integral to delivering efficient, high-quality legal services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Legal Assistants List */}
        <section className="py-16 lg:py-20">
          <div className="section-container">
            {legalAssistants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {legalAssistants.map((assistant, index) => (
                  <motion.div
                    key={assistant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-soft hover:shadow-corporate transition-shadow overflow-hidden"
                  >
                    {assistant.imageUrl && (
                      <div className="aspect-square bg-neutral-200 overflow-hidden">
                        <img
                          src={assistant.imageUrl}
                          alt={assistant.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-avatar.jpg'
                          }}
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-primary-navy mb-1">
                        {assistant.name}
                      </h3>
                      <p className="text-accent-gold font-medium mb-3">{assistant.title}</p>

                      {assistant.bio && (
                        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                          {assistant.bio}
                        </p>
                      )}

                      {assistant.specialties && assistant.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {assistant.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary-navy/10 text-primary-navy text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="space-y-2 text-sm mb-4">
                        {assistant.phone && (
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${assistant.phone.replace(/\D/g, '')}`} className="hover:text-primary-navy">
                              {assistant.phone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${assistant.email}`} className="hover:text-primary-navy break-all">
                            {assistant.email}
                          </a>
                        </div>
                      </div>

                      {assistant.supportingAttorneys && assistant.supportingAttorneys.length > 0 && (
                        <div className="border-t border-neutral-200 pt-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-primary-navy mb-2">
                            <Users className="w-4 h-4" />
                            <span>Admin Support For:</span>
                          </div>
                          <ul className="space-y-1 text-sm">
                            {assistant.supportingAttorneys.map((attorneyId) => {
                              const attorney = attorneys.find(a => a.id === attorneyId)
                              return attorney ? (
                                <li key={attorneyId}>
                                  <Link
                                    to={`/attorneys/${attorneyId}`}
                                    className="text-primary-burgundy hover:underline"
                                  >
                                    {attorney.name}
                                  </Link>
                                </li>
                              ) : null
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <Briefcase className="w-16 h-16 mx-auto text-neutral-400 mb-4" />
                <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                  Legal Assistants Information Coming Soon
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  We're currently updating our legal assistants directory.
                  Please check back soon or contact us directly for assistance.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Information Section */}
        <section className="bg-neutral-50 py-16">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-semibold text-primary-navy mb-6 text-center">
                The Role of Legal Assistants
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Our legal assistants play a crucial role in supporting our attorneys and ensuring efficient case management.
                  They handle a wide range of responsibilities including:
                </p>
                <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-6">
                  <li>Document preparation and filing</li>
                  <li>Client communication and coordination</li>
                  <li>Case file organization and management</li>
                  <li>Legal research support</li>
                  <li>Calendar and deadline management</li>
                  <li>Court filing and procedural support</li>
                </ul>
                <p className="text-neutral-700 leading-relaxed">
                  Our legal assistants are highly trained professionals who work closely with our attorneys
                  to ensure that every client receives the attention and service they deserve.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

