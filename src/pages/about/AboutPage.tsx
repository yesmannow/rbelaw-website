import { motion } from 'framer-motion'

export function AboutPage() {
  return (
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
              About Riley Bennett Egloff
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl">
              A trusted legal partner dedicated to excellence and client success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-serif font-semibold text-primary-navy mb-6">
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
    </div>
  )
}
