/**
 * About Mega Menu
 * Standalone About section with firm information
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight, Building2, Users, Heart, Briefcase, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navData } from '@/lib/data/navigation'

export function NewsroomAboutMegaMenu() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const handleAboutEnter = () => setIsAboutOpen(true)
  const handleAboutLeave = () => setIsAboutOpen(false)

  const aboutSection = navData.about

  return (
    <>
      {/* About Menu */}
      <div
        className="relative"
        onMouseEnter={handleAboutEnter}
        onMouseLeave={handleAboutLeave}
      >
        <button
          className={cn(
            'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors text-white',
            'hover:text-accent-tan focus:outline-none focus:ring-2 focus:ring-white/20 rounded',
            isAboutOpen && 'text-accent-tan'
          )}
          aria-expanded={isAboutOpen}
          aria-haspopup="true"
        >
          About
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isAboutOpen && 'rotate-180'
            )}
          />
        </button>

        <AnimatePresence>
          {isAboutOpen && (
            <>
              {/* Background Overlay with Backdrop Blur - Starts below nav */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed left-0 right-0 bottom-0 z-40 pointer-events-none"
                style={{
                  top: 'var(--nav-height)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(10, 37, 64, 0.85)'
                }}
                onClick={() => setIsAboutOpen(false)}
              />

              {/* Menu Content - Positioned directly below nav */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-0 right-0 z-[60] backdrop-blur-xl border-t border-white/10"
                style={{
                  backgroundColor: 'rgba(10, 37, 64, 0.95)',
                  top: 'var(--nav-height)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
              <div className="section-container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                  {/* About Links - 60% Layout */}
                  <div className="lg:col-span-6">
                    <h3 className="text-3xl font-playfair font-bold text-white mb-6">
                      About Our Firm
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {aboutSection.links.map((link, index) => {
                        const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                          'Firm History': Building2,
                          'Community Engagement': Heart,
                          'Diversity & Inclusion': Users,
                          'Careers': Briefcase,
                          'Fee Arrangements': FileText
                        }
                        const Icon = iconMap[link.label] || FileText

                        return (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={link.href}
                              className="group flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#B8860B] transition-all"
                            >
                              <Icon className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white group-hover:text-[#B8860B] transition-colors font-inter mb-1">
                                  {link.label}
                                </h4>
                                {link.description && (
                                  <p className="text-sm text-white/70 font-inter line-clamp-2">
                                    {link.description}
                                  </p>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 flex-shrink-0 mt-0.5" />
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Featured Card - 40% */}
                  {aboutSection.featured && (
                    <div className="lg:col-span-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="h-full bg-[#0A2540] border-2 border-[#B8860B] rounded-lg p-8 flex flex-col"
                      >
                        <h4 className="text-2xl font-playfair font-bold text-white mb-3">
                          {aboutSection.featured.title}
                        </h4>
                        <p className="text-white/80 text-base leading-relaxed mb-6 flex-1 font-inter">
                          {aboutSection.featured.description}
                        </p>
                        <Link
                          to={aboutSection.featured.href}
                          className="inline-flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#D4A017] text-[#0A2540] px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                        >
                          <span>{aboutSection.featured.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
