import { Link, useLocation } from 'react-router-dom'
import { Phone, Mail, Linkedin, Facebook, Twitter, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PracticeAreasMegaMenu } from '../navigation/PracticeAreasMegaMenu'
import { OurTeamMegaMenu } from '../navigation/OurTeamMegaMenu'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  // Enhanced scroll behavior: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine if scrolled past threshold
      const scrolled = currentScrollY > 20
      setIsScrolled(scrolled)
      
      // Toggle nav-scrolled class on document element for global CSS variable
      if (scrolled) {
        document.documentElement.classList.add('nav-scrolled')
      } else {
        document.documentElement.classList.remove('nav-scrolled')
      }
      
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
      aria-label="Primary"
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        backgroundColor: isScrolled ? 'rgba(33, 52, 105, 0.98)' : 'rgba(33, 52, 105, 1)'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`hidden md:block fixed top-0 left-0 right-0 z-50 overflow-visible transition-shadow duration-300 ${
        isScrolled ? 'shadow-xl backdrop-blur-sm' : 'shadow-soft'
      }`}
      id="main-navbar"
    >
      {/* Top Bar - Contact Info (only show when not scrolled, hidden on mobile) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block bg-white border-b border-neutral-200 overflow-hidden"
          >
            <div className="section-container">
              <div className="flex items-center justify-between py-2 text-sm">
                <div className="flex items-center gap-6" style={{ color: '#334155' }}>
                  <a href="tel:3176368000" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: '#334155' }}>
                    <Phone className="h-3.5 w-3.5" style={{ color: '#74243C' }} />
                    <span>(317) 636-8000</span>
                  </a>
                  <a href="mailto:info@rbelaw.com" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: '#334155' }}>
                    <Mail className="h-3.5 w-3.5" style={{ color: 'rgba(116, 36, 60, 1)' }} />
                    <span>info@rbelaw.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.google.com/maps/place/Riley+Bennett+Egloff+LLP/@39.7744407,-86.1584926,17z/data=!3m1!4b1!4m6!3m5!1s0x8814adc962f52329:0x4fab7c1b61238f20!8m2!3d39.7744407!4d-86.1584926!16s%2Fg%2F1tld0sl6?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hidden md:block hover:opacity-80 transition-opacity"
                    style={{ color: '#334155' }}
                  >
                    500 N. Meridian Street, Suite 550 | Indianapolis, IN 46204
                  </a>
                  <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-neutral-200">
                    <a
                      href="https://www.linkedin.com/company/riley-bennett-egloff-llp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" style={{ color: '#74243C' }} />
                    </a>
                    <a
                      href="https://www.facebook.com/RBELaw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" style={{ color: '#74243C' }} />
                    </a>
                    <a
                      href="https://twitter.com/RBE_Law"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-4 w-4" style={{ color: '#74243C' }} />
                    </a>
                  </div>
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
          {/* Logo - Hidden on mobile */}
          <Link to="/" className="hidden lg:flex items-center group">
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
            <PracticeAreasMegaMenu />

            {/* Our Team - Special Mega Menu */}
            <OurTeamMegaMenu />

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

            {/* Search */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.dispatchEvent(new CustomEvent('rbe:open-search'))}
              className="flex items-center gap-2 text-white hover:text-accent-tan transition-colors font-medium px-4 py-2 border border-white/30 rounded hover:border-accent-tan hover:bg-white/5"
              aria-label="Open site search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden 2xl:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white/80 bg-white/10 rounded">
                Ctrl K
              </kbd>
            </motion.button>

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

        </div>
      </div>
    </motion.nav>
  )
}
