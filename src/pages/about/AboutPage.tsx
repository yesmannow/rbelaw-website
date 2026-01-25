import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { History, Users, Briefcase, DollarSign } from 'lucide-react'
import { SectionSeparator } from '@/components/ui'
import { AboutSEO } from '@/components/seo/SEO'

export function AboutPage() {
  const sections = [
    {
      icon: History,
      title: 'Firm History',
      description: 'A legacy of excellence since 1979',
      link: '/about/history'
    },
    {
      icon: Users,
      title: 'Community Engagement',
      description: 'Deeply rooted in Central Indiana',
      link: '/about/community'
    },
    {
      icon: Briefcase,
      title: 'Careers',
      description: 'Build your future at RBE',
      link: '/about/careers'
    },
    {
      icon: DollarSign,
      title: 'Fee Arrangements',
      description: 'Transparent, value-driven representation',
      link: '/about/fees'
    }
  ]

  return (
    <>
      <AboutSEO />
      <div>
      {/* Hero Section with Background Image */}
      <section className="relative bg-primary-burgundy text-white py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/stock%20images/indianapolis-1888215_1280.jpg"
            alt="Indianapolis skyline"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/80 via-primary-navy/70 to-primary-navy/85" />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
              About Riley Bennett Egloff
            </h1>
            <p className="text-xl md:text-2xl text-neutral-100 max-w-3xl leading-relaxed">
              A trusted legal partner dedicated to excellence and client success.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionSeparator variant="brandRule" />

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-serif font-semibold text-primary-burgundy mb-6">
                Our Story
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-6">
                Riley Bennett Egloff is a premier mid-sized law firm with a reputation for excellence 
                in corporate law, insurance defense, construction, and litigation. Our team of experienced 
                attorneys delivers sophisticated legal solutions tailored to our clients' unique needs.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-6">
                Founded on principles of integrity, excellence, and client service, we have built lasting 
                relationships with businesses across diverse industries. Our commitment to understanding 
                our clients' businesses allows us to provide strategic counsel that aligns with their goals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Sections */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-burgundy mb-12 text-center">
              Learn More About Us
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map((section, index) => {
                const Icon = section.icon
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                  >
                    <Link
                      to={section.link}
                      className="block bg-white rounded-sm p-8 shadow-soft hover:shadow-corporate transition-shadow duration-300 h-full group"
                    >
                      <div className="flex items-start mb-4">
                        <div className="bg-primary-burgundy/10 p-3 rounded-sm mr-4 group-hover:bg-primary-burgundy/20 transition-colors duration-300">
                          <Icon className="h-6 w-6 text-primary-burgundy" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-semibold text-primary-burgundy mb-2 group-hover:text-accent-gold transition-colors duration-300">
                            {section.title}
                          </h3>
                          <p className="text-neutral-700 leading-relaxed">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  )
}
