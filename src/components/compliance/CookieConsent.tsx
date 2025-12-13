import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'
import { Link } from 'react-router-dom'

const COOKIE_CONSENT_KEY = 'rbe-cookie-consent'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
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
          <div className="section-container max-w-7xl">
            <div className="relative bg-primary-navy/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl overflow-hidden">
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-navy/50 to-primary-slate/50 backdrop-blur-sm"></div>
              
              <div className="relative p-6 md:p-8">
                <button
                  onClick={handleDecline}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                  aria-label="Dismiss cookie banner"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 pr-8">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center">
                      <Cookie className="h-6 w-6 text-accent-gold" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Cookie Notice
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
                      <Link 
                        to="/disclaimer" 
                        className="text-accent-gold hover:underline font-semibold"
                      >
                        Learn more
                      </Link>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={handleDecline}
                      className="px-6 py-3 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-sm font-semibold transition-all duration-300 whitespace-nowrap"
                      aria-label="Decline cookies"
                    >
                      Decline
                    </button>
                    <button
                      onClick={handleAccept}
                      className="px-6 py-3 bg-primary-burgundy hover:bg-primary-burgundy/90 text-white rounded-sm font-semibold transition-all duration-300 whitespace-nowrap shadow-lg"
                      aria-label="Accept cookies"
                    >
                      Accept Cookies
                    </button>
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
