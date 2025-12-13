import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, Search, Users, Briefcase, Phone } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'

export function NotFound() {
  return (
    <>
      <SEOMeta
        title="Page Not Found | Riley Bennett Egloff LLP"
        description="The page you're looking for cannot be found."
      />

      <div className="min-h-[80vh] bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8">
              <h1 className="text-9xl font-serif font-bold text-primary-navy/10 mb-4">404</h1>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-navy mb-4">
                Case Not Found
              </h2>
              <p className="text-xl text-neutral-600 mb-8">
                We apologize, but the page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link
                  to="/"
                  className="group block bg-white hover:bg-primary-navy border border-neutral-200 hover:border-primary-navy rounded-lg p-6 transition-all duration-300 shadow-soft hover:shadow-corporate"
                >
                  <Home className="h-8 w-8 mx-auto mb-3 text-primary-navy group-hover:text-white transition-colors" />
                  <div className="font-semibold text-primary-navy group-hover:text-white transition-colors">
                    Home
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  to="/attorneys"
                  className="group block bg-white hover:bg-primary-navy border border-neutral-200 hover:border-primary-navy rounded-lg p-6 transition-all duration-300 shadow-soft hover:shadow-corporate"
                >
                  <Users className="h-8 w-8 mx-auto mb-3 text-primary-navy group-hover:text-white transition-colors" />
                  <div className="font-semibold text-primary-navy group-hover:text-white transition-colors">
                    Our Team
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  to="/practice-areas/business-law"
                  className="group block bg-white hover:bg-primary-navy border border-neutral-200 hover:border-primary-navy rounded-lg p-6 transition-all duration-300 shadow-soft hover:shadow-corporate"
                >
                  <Briefcase className="h-8 w-8 mx-auto mb-3 text-primary-navy group-hover:text-white transition-colors" />
                  <div className="font-semibold text-primary-navy group-hover:text-white transition-colors">
                    Practice Areas
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="group block bg-white hover:bg-primary-navy border border-neutral-200 hover:border-primary-navy rounded-lg p-6 transition-all duration-300 shadow-soft hover:shadow-corporate"
                >
                  <Phone className="h-8 w-8 mx-auto mb-3 text-primary-navy group-hover:text-white transition-colors" />
                  <div className="font-semibold text-primary-navy group-hover:text-white transition-colors">
                    Contact Us
                  </div>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-white rounded-lg shadow-soft p-8 max-w-md mx-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <Search className="h-5 w-5 text-neutral-400" />
                <h3 className="text-lg font-semibold text-primary-navy">Need Help Finding Something?</h3>
              </div>
              <p className="text-neutral-600 mb-4">
                Try using the search feature or navigate to one of the quick links above.
              </p>
              <button
                onClick={() => {
                  const searchButton = document.querySelector('[data-search-trigger]') as HTMLButtonElement
                  if (searchButton) searchButton.click()
                }}
                className="w-full bg-primary-navy hover:bg-primary-slate text-white px-6 py-3 rounded-sm font-semibold transition-colors duration-300"
              >
                Search Our Site
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
