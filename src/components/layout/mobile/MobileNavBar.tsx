/**
 * Next-Level Mobile Navigation Bar
 * App-like bottom navigation with gesture support and premium animations
 */

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Briefcase, Users, Newspaper, Building2, Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { practiceAreas } from '@/lib/data'
import { getRecentBlogPosts } from '@/lib/data/blog-posts'

interface NavItem {
  icon: typeof Home
  label: string
  to: string
  badge?: number
}

export function MobileNavBar() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', to: '/' },
    { icon: Briefcase, label: 'Practice', to: '/practice-areas' },
    { icon: Users, label: 'Team', to: '/attorneys' },
    { icon: Newspaper, label: 'News', to: '/newsroom' },
    { icon: Building2, label: 'About', to: '/about' }
  ]

  // Update active tab based on location
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => {
      if (item.to === '/') {
        return location.pathname === '/'
      }
      return location.pathname === item.to || location.pathname.startsWith(item.to + '/')
    })
    if (currentIndex !== -1) {
      setActiveTab(currentIndex)
    } else {
      // Default to first tab if no match
      setActiveTab(0)
    }
  }, [location.pathname])

  const featuredArticles = getRecentBlogPosts(3)

  return (
    <>
      {/* Bottom Navigation Bar - Always Visible */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#0A2540] border-t border-[#B8860B]/30 backdrop-blur-xl"
        style={{
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))'
        }}
      >
        {/* Active Indicator Bar */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-[#B8860B]"
          style={{
            width: `${100 / navItems.length}%`
          }}
          animate={{
            x: `${(100 / navItems.length) * activeTab}%`
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Navigation Items */}
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeTab === index

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-lg transition-all',
                  'active:scale-95'
                )}
                onClick={() => setActiveTab(index)}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={cn(
                    'p-2 rounded-xl transition-colors',
                    isActive
                      ? 'bg-[#B8860B]/20 text-[#B8860B]'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className={cn(
                  'text-xs font-medium transition-colors',
                  isActive ? 'text-[#B8860B]' : 'text-white/60'
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B8860B]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  />
                )}
              </Link>
            )
          })}

          {/* Quick Call Button - Integrated into Nav */}
          <motion.a
            href="tel:3176368000"
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-[#B8860B] shadow-lg flex items-center justify-center ml-2"
            style={{
              boxShadow: '0 4px 20px rgba(184, 134, 11, 0.4)'
            }}
          >
            <Phone className="w-5 h-5 text-[#0A2540]" />
          </motion.a>
        </div>
      </motion.nav>

      {/* Expanded Menu Drawer - Swipe up from bottom */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[120] lg:hidden bg-[#0A2540] rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden mobile-nav-safe"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-white/30 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b border-[#B8860B]/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-playfair font-bold text-white">Navigation</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
                {/* Quick Actions */}
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:3176368000"
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#B8860B]/10 border border-[#B8860B]/30 hover:bg-[#B8860B]/20 transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#B8860B]/20 flex items-center justify-center">
                        <span className="text-2xl">📞</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Call Now</div>
                        <div className="text-white/60 text-xs">(317) 636-8000</div>
                      </div>
                    </a>
                    <Link
                      to="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#B8860B]/10 border border-[#B8860B]/30 hover:bg-[#B8860B]/20 transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#B8860B]/20 flex items-center justify-center">
                        <span className="text-2xl">✉️</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Contact</div>
                        <div className="text-white/60 text-xs">Get in touch</div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Practice Areas Grid */}
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                    Practice Areas
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {practiceAreas.slice(0, 6).map((area) => (
                      <Link
                        key={area.id}
                        to={`/practice-areas/${area.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B8860B] transition-all"
                      >
                        <div className="text-white text-sm font-medium line-clamp-1">
                          {area.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/practice-areas"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-3 block text-center text-[#B8860B] font-semibold text-sm"
                  >
                    View All Practice Areas →
                  </Link>
                </div>

                {/* Featured Articles */}
                {featuredArticles.length > 0 && (
                  <div className="px-6 py-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                      Latest News
                    </h3>
                    <div className="space-y-2">
                      {featuredArticles.map((article) => (
                        <Link
                          key={article.id}
                          to={`/newsroom/${article.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B8860B] transition-all"
                        >
                          <div className="text-white text-sm font-medium line-clamp-2 mb-1">
                            {article.title}
                          </div>
                          <div className="text-white/60 text-xs">
                            {article.date}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team Links */}
                <div className="px-6 py-4">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                    Our Team
                  </h3>
                  <div className="space-y-2">
                    <Link
                      to="/attorneys"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B8860B] transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#B8860B]/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#B8860B]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Attorneys</div>
                        <div className="text-white/60 text-xs">Meet our legal professionals</div>
                      </div>
                    </Link>
                    <Link
                      to="/team/legal-assistants"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B8860B] transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#B8860B]/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#B8860B]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Legal Assistants</div>
                        <div className="text-white/60 text-xs">Our support team</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Menu Toggle Button - Replaces Hamburger */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.9 }}
        className="lg:hidden fixed bottom-20 right-4 z-[90] w-14 h-14 rounded-full bg-[#0A2540] border-2 border-[#B8860B] shadow-2xl flex items-center justify-center"
        style={{
          boxShadow: '0 10px 40px rgba(10, 37, 64, 0.4)'
        }}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-[#B8860B]" />
          ) : (
            <Menu className="w-6 h-6 text-[#B8860B]" />
          )}
        </motion.div>
      </motion.button>
    </>
  )
}
