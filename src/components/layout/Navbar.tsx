import { Link, useLocation } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PracticeAreasMegaMenu } from '../navigation/PracticeAreasMegaMenu'
import { IndustriesMegaMenu } from '../navigation/IndustriesMegaMenu'
import { OurTeamMegaMenu } from '../navigation/OurTeamMegaMenu'
import { NewsroomMegaMenu } from '../navigation/NewsroomMegaMenu'
import { NewsroomAboutMegaMenu } from '../navigation/NewsroomAboutMegaMenu'
import { navData } from '../../lib/data/navigation'
import { PrestigeButton } from '../ui/PrestigeButton'
import { MobileNavBar } from './mobile/MobileNavBar'
import { PWAInstallPrompt } from '../ui/PWAInstallPrompt'

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
    <>
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
          {/* Logo - Home Link with Premium Animations */}
          <Link to="/" className="flex items-center group relative">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-[#B8860B] rounded-full blur-xl opacity-0 group-hover:opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Logo Image */}
              <motion.img
                src="/images/logo/RBE_Logo_RBG-01.png"
                alt="Riley Bennett Egloff LLP"
                className={`relative transition-all duration-300 ${
                  isScrolled ? 'h-12' : 'h-20'
                } w-auto brightness-0 invert group-hover:brightness-110`}
                animate={{
                  filter: [
                    'brightness(1) invert(1)',
                    'brightness(1.1) invert(1)',
                    'brightness(1) invert(1)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut'
                }}
                style={{
                  clipPath: 'inset(0 0 0 0)'
                }}
              />
            </motion.div>

            {/* Active Indicator - Enhanced */}
            {location.pathname === '/' && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scaleX: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            )}

            {/* Pulse Ring on Hover */}
            <motion.div
              className="absolute inset-0 border-2 border-[#B8860B] rounded-full opacity-0"
              initial={false}
              whileHover={{
                opacity: [0, 0.5, 0],
                scale: [1, 1.3, 1.5]
              }}
              transition={{
                duration: 1.5,
                ease: 'easeOut'
              }}
            />
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

          {/* Mobile menu button - Hidden, using MobileNavBar instead */}
        </div>
      </div>
    </motion.nav>

    {/* Mobile Navigation Bar - Rendered outside nav container for proper layering */}
    <MobileNavBar />

    {/* PWA Install Prompt - Mobile Only, Limited Appearances */}
    <PWAInstallPrompt />
  </>
  )
}
