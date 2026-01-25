/**
 * Our Team Mega Menu - Redesigned
 * Professional mega menu showcasing attorneys with live search
 * Client-side filtering with no page load
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Users, Briefcase, UserCheck, ArrowRight, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { attorneys } from '@/lib/utils/attorney-logic'
import { getAttorneyImages } from '@/lib/utils/attorney-images'

export function OurTeamMegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)

  // Filter attorneys based on search
  const filteredAttorneys = useMemo(() => {
    if (!searchQuery.trim()) {
      return attorneys.slice(0, 6) // Show first 6 by default
    }

    const query = searchQuery.toLowerCase().trim()
    return attorneys.filter(attorney => {
      const nameMatch = attorney.name.toLowerCase().includes(query)
      const titleMatch = attorney.title?.toLowerCase().includes(query)
      const practiceAreaMatch = attorney.practiceAreas?.some(area =>
        area.toLowerCase().includes(query)
      )

      return nameMatch || titleMatch || practiceAreaMatch
    }).slice(0, 6) // Limit to 6 results
  }, [searchQuery])

  const teamPages = [
    {
      title: 'Attorneys',
      href: '/attorneys',
      icon: Users,
      description: 'Meet our experienced legal professionals',
      count: attorneys.length
    },
    {
      title: 'Legal Assistants',
      href: '/team/legal-assistants',
      icon: UserCheck,
      description: 'Our dedicated legal support team'
    },
    {
      title: 'Other Professionals',
      href: '/team/professionals',
      icon: Briefcase,
      description: 'Specialists and support staff'
    }
  ]

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={cn(
          'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors text-white',
          'hover:text-accent-tan focus:outline-none focus:ring-2 focus:ring-white/20 rounded',
          isOpen && 'text-accent-tan'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Our Team
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 z-40 h-[700px] pointer-events-none"
              style={{
                backgroundColor: 'rgba(10, 37, 64, 0.95)',
                top: 'var(--nav-total-height)'
              }}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 right-0 z-[70] backdrop-blur-xl border-t border-white/10"
              style={{
                backgroundColor: 'rgba(10, 37, 64, 0.95)',
                top: 'var(--nav-total-height)'
              }}
            >
              <div className="section-container py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left: Team Pages Navigation */}
                  <div className="lg:col-span-1">
                    <h3 className="text-2xl font-serif font-bold text-white mb-6">
                      Our Team
                    </h3>
                    <div className="space-y-3 mb-8">
                      {teamPages.map((page) => {
                        const Icon = page.icon

                        return (
                          <Link
                            key={page.href}
                            to={page.href}
                            className="group flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent-gold/50 transition-all"
                          >
                            <div className="p-3 rounded-lg bg-accent-gold/20 group-hover:bg-accent-gold/30 transition-colors">
                              <Icon className="w-6 h-6 text-accent-gold" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-white group-hover:text-accent-gold transition-colors">
                                {page.title}
                              </h4>
                              <p className="text-sm text-white/70">
                                {page.description}
                              </p>
                              {page.count && (
                                <p className="text-xs text-white/50 mt-1">
                                  {page.count} professionals
                                </p>
                              )}
                            </div>
                            <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-accent-gold group-hover:translate-x-1 transition-all" />
                          </Link>
                        )
                      })}
                    </div>

                    {/* Careers CTA */}
                    <Link
                      to="/about/careers"
                      className="block p-6 rounded-lg bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 border border-accent-gold/30 hover:border-accent-gold/50 transition-all group"
                    >
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent-gold transition-colors">
                        Join Our Team
                      </h4>
                      <p className="text-sm text-white/80 mb-3">
                        Explore career opportunities
                      </p>
                      <span className="text-sm text-accent-gold font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Careers
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>

                  {/* Right: Attorney Search & Results */}
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <h3 className="text-2xl font-serif font-bold text-white mb-2">
                        Find an Attorney
                      </h3>
                      <p className="text-white/80 text-sm mb-4">
                        Search by name, title, or practice area
                      </p>

                      {/* Search Input */}
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search attorneys..."
                          className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
                            aria-label="Clear search"
                          >
                            <X className="w-4 h-4 text-white/60" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Attorney Results Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                      <AnimatePresence mode="wait">
                        {filteredAttorneys.length === 0 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="col-span-full text-center py-12"
                          >
                            <p className="text-white/60">No attorneys found</p>
                            <p className="text-white/40 text-sm mt-2">Try a different search term</p>
                          </motion.div>
                        ) : (
                          filteredAttorneys.map((attorney) => {
                            const images = getAttorneyImages(attorney.name, attorney.image)

                            return (
                              <motion.div
                                key={attorney.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Link
                                  to={`/attorneys/${attorney.id}`}
                                  className="group block p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent-gold/50 transition-all"
                                >
                                  {/* Attorney Image */}
                                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-neutral-800">
                                    <picture>
                                      <source srcSet={images.avif} type="image/avif" />
                                      <source srcSet={images.webp} type="image/webp" />
                                      <img
                                        src={images.fallback}
                                        alt={attorney.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      />
                                    </picture>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>

                                  {/* Attorney Info */}
                                  <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-accent-gold transition-colors line-clamp-1">
                                    {attorney.name}
                                  </h4>
                                  <p className="text-xs text-white/60 mb-2">
                                    {attorney.title || 'Attorney'}
                                  </p>
                                  {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
                                    <p className="text-xs text-white/50 line-clamp-1">
                                      {attorney.practiceAreas[0]}
                                    </p>
                                  )}
                                </Link>
                              </motion.div>
                            )
                          })
                        )}
                      </AnimatePresence>
                    </div>

                    {/* View All Link */}
                    {filteredAttorneys.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <Link
                          to="/attorneys"
                          className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-gold/80 font-semibold transition-colors"
                        >
                          View All Attorneys
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
