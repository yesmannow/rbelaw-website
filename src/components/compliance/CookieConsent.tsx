import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="section-container max-w-6xl">
            <div className="relative bg-[#0A2540]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
                aria-label="Close cookie consent"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-6 md:p-8 pr-12">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Icon and Text */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <Cookie className="h-6 w-6 text-accent-gold flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-serif font-semibold text-white mb-2">
                          Cookie Notice
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          We use cookies to enhance your experience on our website. By continuing to visit 
                          this site, you agree to our use of cookies for analytics, personalized content, 
                          and functionality improvements.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
                    <button
                      onClick={handleAccept}
                      className="px-6 py-3 bg-[#75253d] hover:bg-[#5D1F34] text-white font-semibold rounded-sm transition-all duration-300 whitespace-nowrap"
                    >
                      Accept Cookies
                    </button>
                    <button
                      onClick={handleDecline}
                      className="px-6 py-3 bg-transparent hover:bg-white/10 text-white font-semibold border border-white/30 rounded-sm transition-all duration-300 whitespace-nowrap"
                    >
                      Decline
                    </button>
                    <Link
                      to="/privacy"
                      className="px-6 py-3 text-accent-gold hover:text-white font-semibold transition-colors text-center whitespace-nowrap"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
