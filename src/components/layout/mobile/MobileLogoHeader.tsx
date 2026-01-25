import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export function MobileLogoHeader() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header when scrolled to top (within 50px)
      if (currentScrollY < 50) {
        setIsVisible(true)
      } 
      // Hide header when scrolling down past 50px
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)
      }
      // Show header when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Mobile Logo Header */}
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-sm"
          >
            <div className="flex items-center justify-center py-3 px-4">
              <Link to="/" className="block">
                <img 
                  src="/images/logo/RBE_Logo_RBG-01.png" 
                  alt="Riley Bennett Egloff LLP" 
                  className="h-8 w-auto"
                />
              </Link>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from going under the fixed header when visible */}
      <div className="md:hidden h-14" />
    </>
  )
}
