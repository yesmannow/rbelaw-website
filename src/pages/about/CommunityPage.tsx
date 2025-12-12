import { motion } from 'framer-motion'
import { PageHeader } from '../../components/layout'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui'
import { Heart, Scale, Users, Building } from 'lucide-react'

export function CommunityPage() {
  const organizations = [
    {
      icon: Scale,
      title: 'ABA House of Delegates',
      description: 'Representing Indiana at the national level in shaping legal policy and standards.'
    },
    {
      icon: Building,
      title: 'DTCI President',
      description: 'Leadership in Defense Trial Counsel of Indiana, advancing excellence in civil litigation defense.'
    },
    {
      icon: Users,
      title: 'Indy Bar Foundation President',
      description: 'Guiding initiatives that promote access to justice and legal education in our community.'
    }
  ]

  const nonprofits = [
    'ACE Mentor Program',
    'Arts Council of Indianapolis',
    'Boy Scouts of America',
    'Indiana Health Care Foundation',
    'Indianapolis Symphony Orchestra'
  ]

  return (
    <div>
      <PageHeader 
        title="Deeply Rooted in Central Indiana"
        subtitle="Our commitment to the community extends far beyond the courtroom. We believe in giving back through leadership, service, and support."
      />

      {/* Featured: Ask a Lawyer */}
      <section className="py-16 lg:py-20 bg-primary-burgundy text-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center bg-white/10 p-4 rounded-full mb-6">
              <Heart className="h-8 w-8 text-accent-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Compassion in Action
            </h2>
            <p className="text-xl text-neutral-100 leading-relaxed mb-4">
              Our attorneys volunteer nearly <span className="font-bold text-accent-gold">100 hours annually</span> with 
              the Indy Bar's <span className="font-semibold">"Ask a Lawyer"</span> program, providing free legal advice 
              to residents at public libraries and community sites.
            </p>
            <p className="text-lg text-neutral-200 leading-relaxed">
              This service reflects our belief that everyone deserves access to quality legal guidance, 
              regardless of their circumstances.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Roles */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-burgundy mb-4 text-center">
              Leadership in the Legal Community
            </h2>
            <p className="text-lg text-neutral-700 text-center mb-12 max-w-3xl mx-auto">
              Our attorneys hold influential positions in prestigious legal organizations, 
              shaping the future of the profession.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {organizations.map((org, index) => {
                const Icon = org.icon
                return (
                  <motion.div
                    key={org.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                  >
                    <Card className="h-full hover:shadow-corporate transition-shadow duration-300">
                      <CardHeader>
                        <div className="bg-primary-burgundy/10 p-3 rounded-sm inline-flex mb-3">
                          <Icon className="h-6 w-6 text-primary-burgundy" />
                        </div>
                        <CardTitle className="text-primary-burgundy">{org.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-700 leading-relaxed">
                          {org.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Non-Profit Support */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-burgundy mb-6 text-center">
              Supporting Our Community
            </h2>
            <p className="text-lg text-neutral-700 text-center mb-10">
              Proudly serving in leadership roles with organizations that enrich Central Indiana:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {nonprofits.map((nonprofit, index) => (
                <motion.div
                  key={nonprofit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + (index * 0.05) }}
                  className="bg-white rounded-sm px-6 py-4 shadow-soft flex items-center"
                >
                  <div className="h-2 w-2 bg-accent-gold rounded-full mr-4" />
                  <span className="font-medium text-neutral-800">{nonprofit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}