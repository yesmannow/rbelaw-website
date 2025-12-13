import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Home, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export function NotFound() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would navigate to a search results page
    window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="section-container max-w-3xl text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Visual */}
          <div className="mb-8">
            <h1 className="text-9xl font-serif font-bold text-primary-burgundy mb-4">
              404
            </h1>
            <div className="w-24 h-1 bg-accent-gold mx-auto mb-6"></div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-navy mb-6">
            Case Not Found
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            We couldn't locate the page you're looking for. It may have been moved, deleted, 
            or the URL might be incorrect.
          </p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search our website..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-neutral-300 rounded-sm focus:border-accent-gold focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary-burgundy hover:bg-primary-burgundy/90 text-white font-semibold rounded-sm transition-all duration-300"
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-navy hover:bg-primary-slate text-white font-semibold rounded-sm transition-all duration-300 min-w-[200px]"
            >
              <Home className="h-5 w-5 mr-2" />
              Return to Homepage
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white font-semibold rounded-sm transition-all duration-300 min-w-[200px]"
            >
              Contact Us
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-neutral-200"
          >
            <p className="text-sm text-neutral-600 mb-4">
              Or try one of these popular pages:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/attorneys"
                className="text-accent-gold hover:text-primary-burgundy font-medium text-sm transition-colors"
              >
                Our Team
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                to="/practice-areas/corporate-law"
                className="text-accent-gold hover:text-primary-burgundy font-medium text-sm transition-colors"
              >
                Practice Areas
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                to="/industries"
                className="text-accent-gold hover:text-primary-burgundy font-medium text-sm transition-colors"
              >
                Industries
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                to="/newsroom"
                className="text-accent-gold hover:text-primary-burgundy font-medium text-sm transition-colors"
              >
                Newsroom
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                to="/about"
                className="text-accent-gold hover:text-primary-burgundy font-medium text-sm transition-colors"
              >
                About Us
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
