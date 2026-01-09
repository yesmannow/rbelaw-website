import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { practiceAreas } from '../../lib/data'
import { PracticeAreasMegaMenu } from '../navigation/PracticeAreasMegaMenu'
import { IndustriesMegaMenu } from '../navigation/IndustriesMegaMenu'
import { OurTeamMegaMenu } from '../navigation/OurTeamMegaMenu'
import { NewsroomMegaMenu } from '../navigation/NewsroomMegaMenu'
import { NewsroomAboutMegaMenu } from '../navigation/NewsroomAboutMegaMenu'
import { navData } from '../../lib/data/navigation'
import { PrestigeButton } from '../ui/PrestigeButton'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPracticeAreasOpen, setIsPracticeAreasOpen] = useState(false)
  const [isOurTeamOpen, setIsOurTeamOpen] = useState(false)
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
              <div className="flex items-center justify-center py-2 text-sm">
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
          {/* Logo - Home Link */}
          <Link to="/" className="flex items-center group relative">
            <motion.img
              src="/images/logo/RBE_Logo_RBG-01.png"
              alt="Riley Bennett Egloff LLP"
              className={`transition-all duration-300 ${
                isScrolled ? 'h-10' : 'h-14'
              } w-auto brightness-0 invert group-hover:scale-105`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            {location.pathname === '/' && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B8860B]"
                animate={{
                  opacity: [1, 0.7, 1],
                  scaleX: [1, 1.05, 1]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.5, 1]
                }}
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Practice Areas - Special Mega Menu */}
            <PracticeAreasMegaMenu />

            {/* Industries - Special Mega Menu */}
            <IndustriesMegaMenu section={navData.industries} />

            {/* Our Team - Special Mega Menu */}
            <OurTeamMegaMenu />

            {/* Newsroom - Standalone Mega Menu */}
            <NewsroomMegaMenu />

            {/* About - Standalone Mega Menu */}
            <NewsroomAboutMegaMenu />

            {/* Divider */}
            <div className="h-6 w-px bg-white/20 mx-2" />

            {/* Call to Action Buttons with Liquid Fill */}
            <PrestigeButton
              href="tel:3176368000"
              variant="call"
              className="hidden xl:flex"
            >
              Call Now
            </PrestigeButton>

            <PrestigeButton
              to="/contact"
              variant="consultation"
            >
              Contact Us
            </PrestigeButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-accent-gold"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Prestige Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
                onClick={() => setIsOpen(false)}
              />

              {/* Full-screen drawer from right */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-[#0A2540] z-[100] lg:hidden overflow-y-auto shadow-2xl"
              >
                {/* Drawer Header */}
                <div className="sticky top-0 bg-[#0A2540] border-b border-[#B8860B]/20 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-[#B8860B] font-playfair text-2xl font-bold">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>

                {/* Quick Tools Bar - Horizontal Scrolling */}
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Quick Tools</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
                    <Link
                      to="/tools/lien-calculator"
                      className="flex-shrink-0 bg-[#B8860B]/10 border border-[#B8860B]/30 hover:bg-[#B8860B]/20 text-[#B8860B] px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                      onClick={() => setIsOpen(false)}
                    >
                      🧮 Lien Calculator
                    </Link>
                    <Link
                      to="/tools/flsa-wizard"
                      className="flex-shrink-0 bg-[#B8860B]/10 border border-[#B8860B]/30 hover:bg-[#B8860B]/20 text-[#B8860B] px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                      onClick={() => setIsOpen(false)}
                    >
                      ⚖️ FLSA Wizard
                    </Link>
                  </div>
                </div>

                {/* Menu Links with Staggered Entry */}
                <motion.div
                  className="px-6 py-6 space-y-2"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.02, staggerDirection: -1 }
                    }
                  }}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >

                  <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } }}>
                    <button
                      onClick={() => setIsPracticeAreasOpen(!isPracticeAreasOpen)}
                      className="flex items-center justify-between text-white hover:text-[#B8860B] hover:bg-white/5 transition-all font-medium w-full px-4 py-3 rounded-lg"
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
                          className="ml-4 mt-1 space-y-1 overflow-hidden max-h-64 overflow-y-auto"
                        >
                          {practiceAreas.map((area) => (
                            <Link
                              key={area.id}
                              to={`/practice-areas/${area.slug}`}
                              className="block text-sm text-white/80 hover:text-[#B8860B] hover:bg-white/5 transition-all px-4 py-2 rounded-lg"
                              onClick={() => setIsOpen(false)}
                            >
                              {area.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } }}>
                    <button
                      onClick={() => setIsOurTeamOpen(!isOurTeamOpen)}
                      className="flex items-center justify-between text-white hover:text-[#B8860B] hover:bg-white/5 transition-all font-medium w-full px-4 py-3 rounded-lg"
                    >
                      <span>Our Team</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOurTeamOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOurTeamOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1 space-y-1 overflow-hidden"
                        >
                          <Link
                            to="/attorneys"
                            className="block text-sm text-white/80 hover:text-[#B8860B] hover:bg-white/5 transition-all px-4 py-2 rounded-lg"
                            onClick={() => setIsOpen(false)}
                          >
                            Attorneys
                          </Link>
                          <Link
                            to="/team/legal-assistants"
                            className="block text-sm text-white/80 hover:text-[#B8860B] hover:bg-white/5 transition-all px-4 py-2 rounded-lg"
                            onClick={() => setIsOpen(false)}
                          >
                            Legal Assistants
                          </Link>
                          <Link
                            to="/team/professionals"
                            className="block text-sm text-white/80 hover:text-[#B8860B] hover:bg-white/5 transition-all px-4 py-2 rounded-lg"
                            onClick={() => setIsOpen(false)}
                          >
                            Other Professionals
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } }}>
                    <Link
                      to="/about"
                      className="block text-white hover:text-[#B8860B] hover:bg-white/5 transition-all px-4 py-3 rounded-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                  </motion.div>

                  <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } }}>
                    <Link
                      to="/newsroom"
                      className="block text-white hover:text-[#B8860B] hover:bg-white/5 transition-all px-4 py-3 rounded-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Newsroom
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Fixed Footer - Thumb Zone CTAs */}
                <div className="sticky bottom-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540] to-transparent pt-6 pb-6 px-6 border-t border-[#B8860B]/20">
                  <div className="space-y-3">
                    <a
                      href="tel:3176368000"
                      className="flex items-center justify-center gap-3 bg-[#B8860B] hover:bg-[#D4A017] text-[#0A2540] px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg active:scale-95"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Call Now</span>
                    </a>

                    <Link
                      to="/contact"
                      className="block text-center border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#0A2540] px-6 py-4 rounded-lg font-bold text-lg transition-all active:scale-95"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
