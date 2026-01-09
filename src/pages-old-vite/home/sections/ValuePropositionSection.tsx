import { motion } from 'framer-motion'

export function ValuePropositionSection() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-navy mb-8">
            Big Law Expertise. <span className="text-accent-gold">Boutique Agility.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-4xl mx-auto">
            Riley Bennett Egloff offers the depth of experience you expect from a large tier-one firm, 
            combined with the responsive, personalized attention of a specialized practice. From complex 
            commercial litigation to corporate transactions, we answer your questions, guide you through 
            challenges, and deliver cost-effective results.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
