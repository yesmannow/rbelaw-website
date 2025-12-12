import { motion } from 'framer-motion'
import { PageHeader } from '../../components/layout'
import { DollarSign, FileText, TrendingDown, CheckCircle } from 'lucide-react'

export function FeesPage() {
  const costControls = [
    'No charge for most administrative services or regular mailings',
    'No markup on travel expenses or staff overtime',
    'Photocopies billed without personnel charges',
    'Transparent monthly billing statements'
  ]

  const alternativeBilling = [
    {
      icon: DollarSign,
      title: 'Blended Rates',
      description: 'Simplified billing with a single rate regardless of which attorney works on your matter.'
    },
    {
      icon: FileText,
      title: 'Fixed Fees',
      description: 'Predictable costs for specific projects or matters, giving you budget certainty.'
    },
    {
      icon: TrendingDown,
      title: 'Annual Retainers',
      description: 'Ongoing legal support at a consistent monthly rate for businesses that need regular counsel.'
    }
  ]

  return (
    <div>
      <PageHeader 
        title="Transparent, Value-Driven Representation"
        subtitle="We pride ourselves on providing the highest quality legal services in a timely, result-oriented, and cost-effective manner."
      />

      {/* Philosophy */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-burgundy mb-6 text-center">
              Our Fee Structure
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed mb-6 text-center">
              Fees are typically based on hourly rates, adjusted annually to reflect market conditions 
              and our attorneys' growing experience and expertise.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed text-center">
              We provide <span className="font-semibold text-primary-burgundy">detailed monthly statements</span> that 
              ensure you know exactly what work was performed, by whom, and at what cost. Transparency 
              is at the heart of our billing practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cost Control Promise */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white border-2 border-primary-burgundy rounded-sm p-8 lg:p-12 shadow-corporate">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary-burgundy/10 p-4 rounded-full">
                  <CheckCircle className="h-10 w-10 text-primary-burgundy" />
                </div>
              </div>
              
              <h2 className="text-3xl font-serif font-semibold text-primary-burgundy mb-6 text-center">
                Our Cost Control Commitment
              </h2>
              
              <p className="text-lg text-neutral-700 text-center mb-8">
                We believe in fair billing practices that put your interests first:
              </p>

              <ul className="space-y-4">
                {costControls.map((control, index) => (
                  <motion.li
                    key={control}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + (index * 0.05) }}
                    className="flex items-start"
                  >
                    <CheckCircle className="h-6 w-6 text-accent-gold mr-4 mt-0.5 flex-shrink-0" />
                    <span className="text-lg text-neutral-800">{control}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alternative Billing */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-burgundy mb-4 text-center">
              Flexible Billing Options
            </h2>
            <p className="text-lg text-neutral-700 text-center mb-12 max-w-3xl mx-auto">
              We understand that every business has unique needs. We're open to alternative fee 
              arrangements to suit your budget and business requirements.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {alternativeBilling.map((option, index) => {
                const Icon = option.icon
                return (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                    className="bg-neutral-50 rounded-sm p-8 hover:shadow-corporate transition-shadow duration-300"
                  >
                    <div className="bg-primary-burgundy/10 p-3 rounded-sm inline-flex mb-4">
                      <Icon className="h-6 w-6 text-primary-burgundy" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-primary-burgundy mb-3">
                      {option.title}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed">
                      {option.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-20 bg-primary-burgundy text-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-serif font-semibold mb-6">
              Let's Discuss Your Needs
            </h2>
            <p className="text-xl text-neutral-100 leading-relaxed mb-8">
              Every client's situation is unique. Contact us to discuss a fee arrangement 
              that works for your business and budget.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-primary-burgundy px-8 py-3 rounded-sm font-semibold hover:bg-neutral-100 transition-colors duration-300"
            >
              Contact Us Today
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
