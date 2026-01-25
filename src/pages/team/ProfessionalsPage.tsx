import { motion } from 'framer-motion'
import { Mail, Phone, Building2 } from 'lucide-react'
import { professionals } from '@/lib/data/professionals'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/layout/PageHeader'

export function ProfessionalsPage() {
  // Group professionals by department
  const professionalsByDepartment = professionals.reduce((acc, professional) => {
    const dept = professional.department || 'Other'
    if (!acc[dept]) {
      acc[dept] = []
    }
    acc[dept].push(professional)
    return acc
  }, {} as Record<string, typeof professionals>)

  return (
    <>
      <SEOMeta
        title="Other Professionals | Riley Bennett Egloff LLP"
        description="Meet our dedicated support staff and specialists who help deliver exceptional legal services."
      />

      <div>
        <PageHeader
          title="Legal Support & Other Professionals"
          subtitle="The attorneys of RBE depend on the support of numerous legal professionals including legal assistants, paralegals, and nurse consultants."
          backgroundImage="/images/stock%20images/indy-669133_1280.jpg"
        />

        {/* Professionals by Department - Improved Layout */}
        <section className="py-16 lg:py-20">
          <div className="section-container">
            {Object.entries(professionalsByDepartment).map(([department, deptProfessionals], deptIndex) => {
              const totalProfessionals = deptProfessionals.length
              
              return (
                <motion.div
                  key={department}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: deptIndex * 0.1 }}
                  className="mb-20 last:mb-0"
                >
                  <div className="flex items-center gap-3 mb-10">
                    <Building2 className="w-6 h-6 text-primary-navy" />
                    <h2 className="text-3xl font-serif font-bold text-primary-navy">
                      {department}
                    </h2>
                    <span className="text-neutral-500 text-sm">({totalProfessionals})</span>
                  </div>

                  {/* Dynamic Grid Layout - Avoids single cards in a row */}
                  <div className={cn(
                    'grid gap-6',
                    totalProfessionals === 1 
                      ? 'grid-cols-1 max-w-md mx-auto'
                      : totalProfessionals === 2
                      ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                      : totalProfessionals === 3
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      : totalProfessionals === 4
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                      : totalProfessionals === 5
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  )}>
                    {deptProfessionals.map((professional, index) => {
                      // Create staggered heights for visual interest
                      const isTall = index % 3 === 0
                      const isWide = index % 4 === 2 && totalProfessionals > 3
                      
                      return (
                        <motion.div
                          key={professional.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: (deptIndex * 0.1) + (index * 0.05) }}
                          className={cn(
                            'bg-white rounded-xl shadow-soft hover:shadow-corporate transition-all duration-300 overflow-hidden group',
                            isWide && totalProfessionals > 3 ? 'md:col-span-2' : '',
                            isTall && totalProfessionals > 3 ? 'lg:row-span-1' : ''
                          )}
                        >
                          {professional.imageUrl && (
                            <div className={cn(
                              'bg-neutral-200 overflow-hidden relative',
                              isTall && totalProfessionals > 3 ? 'aspect-[3/4]' : 'aspect-square'
                            )}>
                              <img
                                src={professional.imageUrl}
                                alt={professional.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder-avatar.jpg'
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          )}

                          <div className="p-6">
                            <h3 className="text-xl font-serif font-bold text-primary-navy mb-1 group-hover:text-accent-gold transition-colors">
                              {professional.name}
                            </h3>
                            <p className="text-accent-gold font-semibold mb-3">{professional.title}</p>

                            {professional.bio && (
                              <p className="text-neutral-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                {professional.bio}
                              </p>
                            )}

                            {professional.specialties && professional.specialties.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {professional.specialties.slice(0, 3).map((specialty, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 bg-accent-gold/10 text-accent-gold text-xs font-medium rounded-full border border-accent-gold/20"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="space-y-2 text-sm pt-4 border-t border-neutral-100">
                              {professional.phone && (
                                <a 
                                  href={`tel:${professional.phone.replace(/\D/g, '')}`}
                                  className="flex items-center gap-2 text-neutral-600 hover:text-accent-gold transition-colors group/link"
                                >
                                  <Phone className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate">{professional.phone}</span>
                                </a>
                              )}
                              <a 
                                href={`mailto:${professional.email}`}
                                className="flex items-center gap-2 text-neutral-600 hover:text-accent-gold transition-colors group/link"
                              >
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate break-all">{professional.email}</span>
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-neutral-50 py-16">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-semibold text-primary-navy mb-6">
                Interested in Joining Our Team?
              </h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                We're always looking for talented professionals to join our growing team.
                Explore career opportunities and see how you can contribute to our mission.
              </p>
              <a
                href="/about/careers"
                className="inline-block bg-accent-gold text-white px-8 py-3 rounded-sm font-semibold hover:bg-accent-bronze transition-colors"
              >
                View Career Opportunities
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

