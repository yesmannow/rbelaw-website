import { motion } from 'framer-motion'
import { Mail, Phone, Building2 } from 'lucide-react'
import { professionals } from '@/lib/data/professionals'
import { SEOMeta } from '@/components/seo/SEOMeta'

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
        {/* Hero Section */}
        <section className="bg-primary-navy text-white py-16 lg:py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-primary text-white mb-4">
                Other Professionals
              </h1>
              <p className="text-xl text-neutral-200 max-w-3xl">
                Meet our dedicated support staff and specialists who help deliver exceptional legal services.
                Our team of professionals works behind the scenes to ensure our attorneys can focus on what they do best.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Professionals by Department */}
        <section className="py-16 lg:py-20">
          <div className="section-container">
            {Object.entries(professionalsByDepartment).map(([department, deptProfessionals], deptIndex) => (
              <motion.div
                key={department}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: deptIndex * 0.1 }}
                className="mb-16 last:mb-0"
              >
                <div className="flex items-center gap-3 mb-8">
                  <Building2 className="w-6 h-6 text-primary-navy" />
                  <h2 className="text-3xl font-serif font-bold text-primary-navy">
                    {department}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {deptProfessionals.map((professional, index) => (
                    <motion.div
                      key={professional.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (deptIndex * 0.1) + (index * 0.05) }}
                      className="bg-white rounded-lg shadow-soft hover:shadow-corporate transition-shadow overflow-hidden"
                    >
                      {professional.imageUrl && (
                        <div className="aspect-square bg-neutral-200 overflow-hidden">
                          <img
                            src={professional.imageUrl}
                            alt={professional.name}
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
                          {professional.name}
                        </h3>
                        <p className="text-accent-gold font-medium mb-3">{professional.title}</p>

                        {professional.bio && (
                          <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                            {professional.bio}
                          </p>
                        )}

                        {professional.specialties && professional.specialties.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {professional.specialties.map((specialty, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-primary-navy/10 text-primary-navy text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="space-y-2 text-sm">
                          {professional.phone && (
                            <div className="flex items-center gap-2 text-neutral-600">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${professional.phone.replace(/\D/g, '')}`} className="hover:text-primary-navy">
                                {professional.phone}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${professional.email}`} className="hover:text-primary-navy break-all">
                              {professional.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
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

