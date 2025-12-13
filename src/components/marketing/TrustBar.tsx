import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const recognitions = [
  {
    name: 'Best Lawyers',
    description: 'America\'s Premier Legal Directory',
    year: '2024'
  },
  {
    name: 'Super Lawyers',
    description: 'Top-Rated Attorneys',
    year: '2024'
  },
  {
    name: 'Martindale-Hubbell',
    description: 'AV Preeminent® Rated',
    year: 'Peer Reviewed'
  }
]

export function TrustBar() {
  return (
    <section className="py-12 bg-white border-t border-neutral-200">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-lg font-semibold text-neutral-600 mb-2">
            Recognized for Excellence
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recognitions.map((recognition, index) => (
            <motion.div
              key={recognition.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-neutral-50 transition-all duration-300">
                {/* Icon */}
                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 group-hover:from-accent-gold/20 group-hover:to-accent-bronze/20 transition-all duration-300">
                  <Award className="h-8 w-8 text-neutral-400 group-hover:text-accent-gold transition-colors duration-300" />
                </div>

                {/* Recognition Name */}
                <h4 className="text-xl font-serif font-bold text-primary-navy mb-2 group-hover:text-accent-gold transition-colors duration-300">
                  {recognition.name}
                </h4>

                {/* Description */}
                <p className="text-sm text-neutral-600 mb-1">
                  {recognition.description}
                </p>

                {/* Year */}
                <p className="text-xs text-neutral-500 font-medium">
                  {recognition.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-sm text-neutral-500">
            Trusted by businesses and individuals throughout Indiana since 1979
          </p>
        </motion.div>
      </div>
    </section>
  )
}
