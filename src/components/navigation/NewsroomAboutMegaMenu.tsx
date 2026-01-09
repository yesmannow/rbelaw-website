/**
 * Newsroom & About Mega Menu
 * Combined mega menu with Resource Toolbox section
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight, Calculator, FileText, Shield, Newspaper, Building2, Users, Heart, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navData } from '@/lib/data/navigation'

export function NewsroomAboutMegaMenu() {
  const [isNewsroomOpen, setIsNewsroomOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const handleNewsroomEnter = () => setIsNewsroomOpen(true)
  const handleNewsroomLeave = () => setIsNewsroomOpen(false)
  const handleAboutEnter = () => setIsAboutOpen(true)
  const handleAboutLeave = () => setIsAboutOpen(false)

  const newsroomSection = navData.newsroom
  const aboutSection = navData.about

  const resourceTools = [
    {
      name: 'Lien Calculator',
      href: '/resources/tools/lien-calculator',
      icon: Calculator,
      description: 'Never miss a Notice to Owner or Mechanic\'s Lien filing deadline'
    },
    {
      name: 'Succession Quiz',
      href: '/resources/tools/succession-quiz',
      icon: FileText,
      description: 'Assess your business succession planning preparedness'
    },
    {
      name: 'FLSA Wizard',
      href: '/resources/tools/flsa-wizard',
      icon: Shield,
      description: 'Determine if your employee meets federal overtime exemption requirements'
    }
  ]

  return (
    <>
      {/* Newsroom Menu */}
      <div
        className="relative"
        onMouseEnter={handleNewsroomEnter}
        onMouseLeave={handleNewsroomLeave}
      >
        <button
          className={cn(
            'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors text-white',
            'hover:text-accent-tan focus:outline-none focus:ring-2 focus:ring-white/20 rounded',
            isNewsroomOpen && 'text-accent-tan'
          )}
          aria-expanded={isNewsroomOpen}
          aria-haspopup="true"
        >
          Newsroom
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isNewsroomOpen && 'rotate-180'
            )}
          />
        </button>

        <AnimatePresence>
          {isNewsroomOpen && (
            <>
              {/* Background Overlay with Backdrop Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 pointer-events-none"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(10, 37, 64, 0.85)'
                }}
                onClick={() => setIsNewsroomOpen(false)}
              />

              {/* Focus Drawer Effect */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 0.98 }}
                exit={{ scale: 1 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-30 pointer-events-none"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-0 right-0 z-50 backdrop-blur-xl border-t border-white/10"
                style={{
                  backgroundColor: 'rgba(10, 37, 64, 0.95)',
                  top: 'var(--nav-height)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
              <div className="section-container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Newsroom Links */}
                  <div>
                    <h3 className="text-3xl font-playfair font-bold text-white mb-6">
                      Newsroom
                    </h3>
                    <div className="space-y-3">
                      {newsroomSection.links.map((link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={link.href}
                            className="group flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#B8860B] transition-all"
                          >
                            <Newspaper className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-white group-hover:text-[#B8860B] transition-colors font-inter">
                                {link.label}
                              </h4>
                              {link.description && (
                                <p className="text-sm text-white/70 mt-1 font-inter">
                                  {link.description}
                                </p>
                              )}
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Resource Toolbox */}
                  <div>
                    <h3 className="text-3xl font-playfair font-bold text-white mb-2">
                      Resource Toolbox
                    </h3>
                    <p className="text-white/80 text-lg mb-6 font-inter">
                      Interactive tools to help you navigate complex legal challenges
                    </p>
                    <div className="space-y-3">
                      {resourceTools.map((tool, index) => {
                        const Icon = tool.icon
                        return (
                          <motion.div
                            key={tool.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index + newsroomSection.links.length) * 0.05 }}
                          >
                            <Link
                              to={tool.href}
                              className="group flex items-center gap-4 p-5 rounded-lg bg-[#0A2540] border-2 border-[#B8860B] hover:border-[#D4A017] hover:bg-[#0A2540]/90 transition-all"
                            >
                              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[#B8860B]/20 text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-white transition-all">
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[#B8860B] mb-1 group-hover:text-[#D4A017] transition-colors font-inter">
                                  {tool.name}
                                </h4>
                                <p className="text-sm text-white/80 font-inter">
                                  {tool.description}
                                </p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 flex-shrink-0" />
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

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
              {/* Background Overlay with Backdrop Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 pointer-events-none"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(10, 37, 64, 0.85)'
                }}
                onClick={() => setIsAboutOpen(false)}
              />

              {/* Focus Drawer Effect */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 0.98 }}
                exit={{ scale: 1 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-30 pointer-events-none"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-0 right-0 z-50 backdrop-blur-xl border-t border-white/10"
                style={{
                  backgroundColor: 'rgba(10, 37, 64, 0.95)',
                  top: 'var(--nav-height)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
              <div className="section-container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* About Links */}
                  <div>
                    <h3 className="text-3xl font-playfair font-bold text-white mb-6">
                      About Our Firm
                    </h3>
                    <div className="space-y-3">
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
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={link.href}
                              className="group flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#B8860B] transition-all"
                            >
                              <Icon className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-white group-hover:text-[#B8860B] transition-colors font-inter">
                                  {link.label}
                                </h4>
                                {link.description && (
                                  <p className="text-sm text-white/70 mt-1 font-inter">
                                    {link.description}
                                  </p>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Featured Card */}
                  {aboutSection.featured && (
                    <div>
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
