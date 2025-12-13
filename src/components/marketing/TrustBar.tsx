import { motion } from 'framer-motion'

interface Award {
  name: string
  description: string
}

const awards: Award[] = [
  {
    name: 'Best Lawyers',
    description: 'Best Lawyers in America',
  },
  {
    name: 'Super Lawyers',
    description: 'Super Lawyers Recognition',
  },
  {
    name: 'Martindale-Hubbell',
    description: 'AV Preeminent Rated',
  },
]

export function TrustBar() {
  return (
    <section className="py-12 bg-white border-y border-neutral-200">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-8">
            Recognized for Excellence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 hover:bg-neutral-50">
                  {/* Logo Badge Placeholder - using text for now */}
                  <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-primary-navy/10 to-primary-burgundy/10 flex items-center justify-center group-hover:from-primary-navy/20 group-hover:to-primary-burgundy/20 transition-all duration-300">
                    <div className="text-center">
                      <div className="text-2xl font-serif font-bold text-primary-navy group-hover:text-primary-burgundy transition-colors duration-300">
                        {award.name.split(' ')[0]}
                      </div>
                      {award.name.split(' ').length > 1 && (
                        <div className="text-xs font-semibold text-primary-burgundy group-hover:text-accent-gold transition-colors duration-300">
                          {award.name.split(' ').slice(1).join(' ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-neutral-600 group-hover:text-primary-navy transition-colors duration-300">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm text-neutral-500 mt-8"
          >
            Trusted by Fortune 500 companies and leading organizations across Indiana
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
