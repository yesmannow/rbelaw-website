import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { getPracticeAreaBySlug } from '../../lib/data'

export function PracticeAreaPage() {
  const { slug } = useParams<{ slug: string }>()
  const practiceArea = slug ? getPracticeAreaBySlug(slug) : undefined

  if (!practiceArea) {
    return (
      <div className="section-container py-20">
        <h1 className="heading-primary mb-4">Practice Area Not Found</h1>
        <Link to="/practice-areas" className="text-accent-gold hover:underline">
          ← Back to Practice Areas
        </Link>
      </div>
    )
  }

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
            <Link to="/" className="inline-flex items-center text-neutral-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="heading-primary text-white mb-4">
              {practiceArea.name}
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl">
              {practiceArea.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-serif font-semibold text-primary-navy mb-6">
                  Overview
                </h2>
                <p className="text-neutral-700 leading-relaxed mb-8">
                  {practiceArea.detailedDescription}
                </p>

                {practiceArea.subAreas && practiceArea.subAreas.length > 0 && (
                  <>
                    <h2 className="text-2xl font-serif font-semibold text-primary-navy mb-6">
                      Areas of Focus
                    </h2>
                    <ul className="space-y-3 mb-8">
                      {practiceArea.subAreas.map((subArea, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-6 w-6 text-accent-gold mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{subArea}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="bg-neutral-50 p-8 rounded-sm border border-neutral-200 mt-12">
                  <h3 className="text-xl font-serif font-semibold text-primary-navy mb-4">
                    Need Legal Assistance?
                  </h3>
                  <p className="text-neutral-700 mb-6">
                    Our experienced attorneys are ready to help you navigate complex legal challenges. 
                    Contact us today to discuss your needs.
                  </p>
                  <Link to="/contact" className="btn-primary">
                    Schedule a Consultation
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border border-neutral-200 rounded-sm p-6 sticky top-24"
              >
                <h3 className="text-lg font-serif font-semibold text-primary-navy mb-4">
                  Related Practice Areas
                </h3>
                <div className="space-y-3">
                  <Link 
                    to="/practice-areas/corporate-law"
                    className="block text-neutral-700 hover:text-accent-gold transition-colors"
                  >
                    Corporate Law
                  </Link>
                  <Link 
                    to="/practice-areas/insurance-defense"
                    className="block text-neutral-700 hover:text-accent-gold transition-colors"
                  >
                    Insurance Defense
                  </Link>
                  <Link 
                    to="/practice-areas/construction"
                    className="block text-neutral-700 hover:text-accent-gold transition-colors"
                  >
                    Construction Law
                  </Link>
                  <Link 
                    to="/practice-areas/litigation"
                    className="block text-neutral-700 hover:text-accent-gold transition-colors"
                  >
                    Business Litigation
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
