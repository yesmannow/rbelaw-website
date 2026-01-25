import { motion } from 'framer-motion'
import { Users, Heart, Globe, Award, Handshake } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'

export function DiversityPage() {
  const values = [
    {
      icon: Users,
      title: 'Inclusive Workplace',
      description: 'We believe that diverse perspectives strengthen our ability to serve clients effectively and create innovative solutions.'
    },
    {
      icon: Heart,
      title: 'Equal Opportunity',
      description: 'Riley Bennett Egloff is committed to providing equal employment opportunities regardless of race, gender, religion, age, or background.'
    },
    {
      icon: Globe,
      title: 'Community Engagement',
      description: 'We actively participate in initiatives that promote diversity and inclusion within the legal profession and our broader community.'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'We celebrate the unique contributions of each team member and recognize excellence across all backgrounds and experiences.'
    }
  ]

  const initiatives = [
    {
      title: 'Recruitment & Hiring',
      description: 'We actively seek to attract and hire talented individuals from diverse backgrounds, ensuring our team reflects the communities we serve.'
    },
    {
      title: 'Professional Development',
      description: 'All team members have access to mentorship, training, and advancement opportunities that support their career growth.'
    },
    {
      title: 'Inclusive Culture',
      description: 'We foster an environment where everyone feels valued, respected, and empowered to contribute their unique perspectives.'
    },
    {
      title: 'Community Partnerships',
      description: 'We partner with organizations and initiatives that promote diversity, equity, and inclusion in the legal profession.'
    }
  ]

  return (
    <>
      <SEOMeta
        title="Diversity & Inclusion | Riley Bennett Egloff LLP"
        description="Riley Bennett Egloff is committed to building a diverse, inclusive workplace that reflects the communities we serve."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-navy to-primary-slate text-white py-16 lg:py-20 overflow-hidden">
          {/* Subtle hero image wash */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <img
              src="/images/stock%20images/justice-2060093_1280.jpg"
              alt=""
              className="absolute right-0 top-0 h-full w-[60%] object-cover opacity-[0.10] grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/80 via-primary-navy/70 to-primary-navy/85" />
          </div>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-primary text-white mb-4">
                Diversity & Inclusion
              </h1>
              <p className="text-xl text-neutral-200 max-w-3xl">
                At Riley Bennett Egloff, we believe that diversity and inclusion are fundamental to our success
                and essential to delivering exceptional legal services to our clients.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <img
              src="/images/stock%20images/indianapolis-1888215_1280.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.05] grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
          </div>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Handshake className="w-16 h-16 mx-auto text-primary-navy mb-6" />
              <h2 className="text-3xl font-serif font-bold text-primary-navy mb-6">
                Our Commitment
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                Riley Bennett Egloff is committed to building a diverse and inclusive workplace where
                all individuals are valued, respected, and empowered to succeed. We recognize that diversity
                in backgrounds, experiences, and perspectives strengthens our firm and enhances our ability
                to serve our clients effectively.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                Our commitment to diversity and inclusion extends beyond our office walls. We actively work
                to create opportunities, remove barriers, and promote equity within the legal profession
                and our broader community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-20 bg-neutral-50">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-primary-navy mb-4">
                Our Values
              </h2>
              <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
                These core values guide our approach to diversity and inclusion
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-soft hover:shadow-corporate transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary-navy/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-navy" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-primary-navy mb-3">
                      {value.title}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Initiatives */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-primary-navy mb-4">
                Our Initiatives
              </h2>
              <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
                We take concrete actions to promote diversity and inclusion
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-neutral-50 p-8 rounded-lg border-l-4 border-primary-navy"
                >
                  <h3 className="text-xl font-serif font-semibold text-primary-navy mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {initiative.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary-navy text-white py-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-serif font-bold mb-6">
                Join Our Diverse Team
              </h2>
              <p className="text-xl text-neutral-200 mb-8 leading-relaxed">
                We're always looking for talented individuals who share our commitment to excellence,
                diversity, and inclusion. Explore career opportunities and see how you can contribute
                to our mission.
              </p>
              <a
                href="/about/careers"
                className="inline-block bg-accent-gold text-white px-8 py-3 rounded-sm font-semibold hover:bg-accent-bronze transition-colors"
              >
                View Career Opportunities
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

