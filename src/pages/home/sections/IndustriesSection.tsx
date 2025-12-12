import { motion } from 'framer-motion'

const industries = [
  'Healthcare',
  'Construction',
  'Insurance',
  'Manufacturing',
  'Transportation'
]

export function IndustriesSection() {
  return (
    <section className="py-20 bg-primary-navy text-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Industries We Serve
          </h2>
          <p className="text-neutral-200 text-lg max-w-2xl mx-auto">
            Trusted counsel across diverse sectors
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-default"
            >
              <span className="text-xl md:text-2xl font-semibold text-neutral-400 group-hover:text-accent-gold transition-colors duration-300">
                {industry}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
