import { motion } from 'framer-motion'
import { PageHeader } from '../../components/layout'
import { AboutSidebar } from '../../components/about/AboutSidebar'
import { Building2, TrendingUp, Users } from 'lucide-react'

export function HistoryPage() {
  const milestones = [
    {
      icon: Building2,
      title: 'The Foundation',
      year: '1979',
      description: 'Established in 1979 by three attorneys sharing a commitment to results-oriented representation. Our firm was founded on a vision of respected business litigation and high-quality service.'
    },
    {
      icon: TrendingUp,
      title: 'The Evolution',
      year: '1980s-2000s',
      description: 'Growth into a full-service firm covering Business Law, Insurance Defense, Labor & Employment, and Estate Planning. Our expertise expanded to meet the evolving needs of our clients.'
    },
    {
      icon: Users,
      title: 'The Philosophy',
      year: 'Today',
      description: 'We function as a unified firm, not a casual affiliation. Staffing is based on complexity and cost-efficiency, ensuring the right attorney handles the right matter for optimal results.'
    }
  ]

  return (
    <div>
      <PageHeader 
        title="A Legacy of Excellence Since 1979"
        subtitle="Founded on a vision of respected business litigation and high-quality service, Riley Bennett Egloff has evolved into a premier legal partner for local, national, and international businesses."
        backgroundImage="/images/practice-areas/bus-corp-law-1024x284-1.jpg"
      />

      {/* Main Content with Sidebar */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-burgundy mb-12 text-center">
                  Our Journey
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <motion.div
                    key={milestone.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                    className="bg-white rounded-sm p-8 shadow-soft hover:shadow-corporate transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-primary-burgundy/10 p-3 rounded-sm mr-4">
                        <Icon className="h-6 w-6 text-primary-burgundy" />
                      </div>
                      <span className="text-sm font-semibold text-accent-gold uppercase tracking-wider">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-primary-burgundy mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed">
                      {milestone.description}
                    </p>
                  </motion.div>
                )
              })}
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <AboutSidebar />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-burgundy mb-6">
              Our Commitment
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              For over four decades, we have maintained our commitment to excellence, integrity, and client service. 
              Our approach combines the sophistication of a large firm with the personalized attention of a boutique practice.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed">
              We pride ourselves on building lasting relationships with businesses across diverse industries, 
              providing strategic counsel that aligns with our clients' goals and drives their success.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}