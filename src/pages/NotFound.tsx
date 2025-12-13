import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Home, Search, Users, Briefcase, Phone, AlertCircle, ArrowRight } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { useState } from 'react'

export function NotFound() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to a search results page or trigger global search
      // For now, we'll use the global search trigger
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        code: 'KeyK',
        metaKey: true,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      })
      document.dispatchEvent(event)
    }
  }

  const handleEmergencyContact = () => {
    navigate('/contact')
    // Scroll to top after navigation
    window.scrollTo(0, 0)
  }

  return (
    <>
      <SEOMeta
        title="Page Not Found | Riley Bennett Egloff LLP"
        description="The page you're looking for cannot be found, but we can help you find what you need."
      />

      <div className="min-h-[80vh] bg-gradient-to-br from-neutral-50 via-white to-neutral-50 flex items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Abstract Background Graphic */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Architectural line drawing style */}
            <path
              d="M100 100 L1100 100 L1100 700 L100 700 Z"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary-navy"
            />
            <path
              d="M200 200 L1000 200 L1000 600 L200 600 Z"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary-navy"
            />
            <line x1="600" y1="100" x2="600" y2="700" stroke="currentColor" strokeWidth="1" className="text-primary-navy" />
            <line x1="100" y1="400" x2="1100" y2="400" stroke="currentColor" strokeWidth="1" className="text-primary-navy" />
          </svg>
        </div>

        <div className="max-w-4xl w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* 404 Display */}
            <div className="mb-8">
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-9xl font-serif font-bold text-primary-navy/10 mb-4"
              >
                404
              </motion.h1>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-navy mb-4">
                Case Not Found
              </h2>
              <p className="text-xl text-neutral-600 mb-2">
                We apologize, but the page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-lg text-neutral-500 mb-8">
                We can't find that page, but we can help you find counsel.
              </p>
            </div>

            {/* Emergency Contact Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <button
                onClick={handleEmergencyContact}
                className="inline-flex items-center gap-3 bg-primary-burgundy hover:bg-primary-burgundy/90 text-white px-8 py-4 rounded-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                Contact Us Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-soft p-8 max-w-2xl mx-auto mb-12 border border-neutral-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Search className="h-5 w-5 text-primary-navy" />
                <h3 className="text-lg font-semibold text-primary-navy">Search Our Site</h3>
              </div>
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for attorneys, practice areas, or topics..."
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-primary-navy hover:bg-primary-slate text-white px-6 py-3 rounded-sm font-semibold transition-colors duration-300"
                >
                  Search
                </button>
              </form>
              <p className="text-sm text-neutral-500 mt-3">
                Or press <kbd className="px-2 py-1 bg-neutral-100 rounded text-xs font-mono">Ctrl+K</kbd> / <kbd className="px-2 py-1 bg-neutral-100 rounded text-xs font-mono">Cmd+K</kbd> to open global search
              </p>
            </motion.div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  to="/"
                  className="group block bg-white hover:bg-primary-navy border-2 border-neutral-200 hover:border-primary-navy rounded-lg p-6 transition-all duration-300 shadow-soft hover:shadow-corporate"
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
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link
                  to="/attorneys"
                  className="group block bg-white hover:bg-primary-navy border-2 border-neutral-200 hover:border-primary-navy rounded-lg p-6 transition-all duration-300 shadow-soft hover:shadow-corporate"
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
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Link
                  to="/practice-areas/business-law"
                  className="group block bg-white hover:bg-primary-navy border-2 border-neutral-200 hover:border-primary-navy rounded-lg p-6 transition-all duration-300 shadow-soft hover:shadow-corporate"
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
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Link
                  to="/contact"
                  className="group block bg-white hover:bg-primary-navy border-2 border-neutral-200 hover:border-primary-navy rounded-lg p-6 transition-all duration-300 shadow-soft hover:shadow-corporate"
                >
                  <Phone className="h-8 w-8 mx-auto mb-3 text-primary-navy group-hover:text-white transition-colors" />
                  <div className="font-semibold text-primary-navy group-hover:text-white transition-colors">
                    Contact Us
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Helpful Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="bg-primary-navy/5 border-l-4 border-primary-burgundy rounded-r-lg p-6 max-w-2xl mx-auto"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-primary-burgundy flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-semibold text-primary-navy mb-2">Need Immediate Assistance?</h3>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    If you're looking for urgent legal help, our team is ready to assist.
                    Call us at{' '}
                    <a href="tel:+13176368000" className="text-primary-burgundy hover:underline font-semibold">
                      317.636.8000
                    </a>
                    {' '}or use the contact form above.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
