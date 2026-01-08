import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { practiceAreas } from '../../lib/data'
import { PracticeAreasMegaMenu } from '../navigation/PracticeAreasMegaMenu'
import { IndustriesMegaMenu } from '../navigation/IndustriesMegaMenu'
import { navData } from '../../lib/data/navigation'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPracticeAreasOpen, setIsPracticeAreasOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  // Enhanced scroll behavior: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine if scrolled past threshold
      setIsScrolled(currentScrollY > 20)
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show navbar
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        backgroundColor: isScrolled ? 'rgba(33, 52, 105, 0.98)' : 'rgba(33, 52, 105, 1)'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-shadow duration-300 ${
        isScrolled ? 'shadow-xl backdrop-blur-sm' : 'shadow-soft'
      }`}
    >
      {/* Top Bar - Contact Info (only show when not scrolled) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-primary-navy/50 border-b border-white/10 overflow-hidden"
          >
            <div className="section-container">
              <div className="flex items-center justify-between py-2 text-sm">
                <div className="flex items-center gap-6 text-white/80">
                  <a href="tel:3176368000" className="flex items-center gap-2 hover:text-accent-tan transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                    <span>(317) 636-8000</span>
                  </a>
                  <a href="mailto:info@rbelaw.com" className="hidden sm:flex items-center gap-2 hover:text-accent-tan transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                    <span>info@rbelaw.com</span>
                  </a>
                </div>
                <div className="text-white/60 text-xs hidden md:block">
                  255 E. Carmel Drive, Suite 200 | Carmel, IN 46032
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <div className="section-container overflow-visible">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.img 
              src="/images/logo/RBE_Logo_RBG-01.png" 
              alt="Riley Bennett Egloff LLP" 
              className={`transition-all duration-300 ${
                isScrolled ? 'h-10' : 'h-14'
              } w-auto brightness-0 invert group-hover:scale-105`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className="relative text-white hover:text-accent-tan transition-all duration-200 font-medium px-3 py-2 rounded group"
            >
              <span className="relative z-10">Home</span>
              {location.pathname === '/' && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-white/10 rounded"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>

            {/* Practice Areas - Special Mega Menu */}
            <PracticeAreasMegaMenu section={navData.practiceAreas} />

            {/* Industries - Special Mega Menu */}
            <IndustriesMegaMenu section={navData.industries} />

            <Link
              to="/attorneys"
              className="relative text-white hover:text-accent-tan transition-all duration-200 font-medium px-3 py-2 rounded"
            >
              <span className="relative z-10">Attorneys</span>
              {location.pathname.includes('/attorneys') && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-white/10 rounded"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>

            <Link
              to="/newsroom"
              className="relative text-white hover:text-accent-tan transition-all duration-200 font-medium px-3 py-2 rounded"
            >
              <span className="relative z-10">Newsroom</span>
              {location.pathname.includes('/newsroom') && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-white/10 rounded"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>

            <Link
              to="/about"
              className="relative text-white hover:text-accent-tan transition-all duration-200 font-medium px-3 py-2 rounded"
            >
              <span className="relative z-10">About</span>
              {location.pathname.includes('/about') && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-white/10 rounded"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-white/20 mx-2" />

            {/* Call to Action Buttons */}
            <motion.a
              href="tel:3176368000"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-white hover:text-accent-tan transition-colors font-medium px-4 py-2 border border-white/30 rounded hover:border-accent-tan hover:bg-white/5"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">Call Now</span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/contact" 
                className="bg-accent-tan hover:bg-accent-tan/90 text-primary-navy px-6 py-2 rounded font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-accent-gold"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <div className="py-4 space-y-2">
                <Link 
                  to="/" 
                  className="block text-white hover:text-accent-tan hover:bg-white/5 transition-all px-4 py-3 rounded font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>

                <div>
                  <button
                    onClick={() => setIsPracticeAreasOpen(!isPracticeAreasOpen)}
                    className="flex items-center justify-between text-white hover:text-accent-tan hover:bg-white/5 transition-all font-medium w-full px-4 py-3 rounded"
                  >
                    <span>Practice Areas</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isPracticeAreasOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isPracticeAreasOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-1 space-y-1 overflow-hidden"
                      >
                        {practiceAreas.map((area) => (
                          <Link
                            key={area.id}
                            to={`/practice-areas/${area.slug}`}
                            className="block text-sm text-white/80 hover:text-accent-tan hover:bg-white/5 transition-all px-4 py-2 rounded"
                            onClick={() => setIsOpen(false)}
                          >
                            {area.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link 
                  to="/attorneys" 
                  className="block text-white hover:text-accent-tan hover:bg-white/5 transition-all px-4 py-3 rounded font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Attorneys
                </Link>

                <Link 
                  to="/about" 
                  className="block text-white hover:text-accent-tan hover:bg-white/5 transition-all px-4 py-3 rounded font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>

                {/* Mobile CTAs */}
                <div className="pt-4 space-y-2 border-t border-white/10 mt-4">
                  <a
                    href="tel:3176368000"
                    className="flex items-center justify-center gap-2 text-white hover:text-accent-tan border border-white/30 hover:border-accent-tan transition-all px-4 py-3 rounded font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    <span>(317) 636-8000</span>
                  </a>

                  <Link 
                    to="/contact" 
                    className="block text-center bg-accent-tan hover:bg-accent-tan/90 text-primary-navy px-4 py-3 rounded font-semibold transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
