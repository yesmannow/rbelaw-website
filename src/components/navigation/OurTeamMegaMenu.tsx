/**
 * Our Team Mega Menu - Prestige Redesign
 * Impressive full-width showcase with visual cards
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Users, Briefcase, UserCheck, ArrowRight, Award, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getAllAttorneys } from '@/lib/utils/attorney-logic'

export function OurTeamMegaMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)

  const attorneys = getAllAttorneys()
  const attorneyCount = attorneys.length

  const teamSections = [
    {
      title: 'Attorneys',
      href: '/attorneys',
      icon: Users,
      description: 'Meet our experienced legal professionals',
      count: attorneyCount,
      gradient: 'from-[#0A2540] to-[#1a3a5a]',
      hoverGradient: 'group-hover:from-[#B8860B] group-hover:to-[#D4A017]'
    },
    {
      title: 'Legal Assistants',
      href: '/team/legal-assistants',
      icon: UserCheck,
      description: 'Our dedicated legal support team',
      count: null,
      gradient: 'from-[#0A2540] to-[#1a3a5a]',
      hoverGradient: 'group-hover:from-[#B8860B] group-hover:to-[#D4A017]'
    },
    {
      title: 'Other Professionals',
      href: '/team/professionals',
      icon: Briefcase,
      description: 'Specialists and support staff',
      count: null,
      gradient: 'from-[#0A2540] to-[#1a3a5a]',
      hoverGradient: 'group-hover:from-[#B8860B] group-hover:to-[#D4A017]'
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

      {/* Full-Width Glassmorphism Mega Menu */}
      <AnimatePresence>
        {isOpen && (
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
              onClick={() => setIsOpen(false)}
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
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-playfair font-bold text-white mb-2">
                      Our Team
                    </h3>
                    <p className="text-white/80 text-lg font-inter">
                      Meet the professionals who make Riley Bennett Egloff exceptional
                    </p>
                  </div>
                  <Link
                    to="/attorneys"
                    className="flex items-center gap-2 rounded-lg bg-[#B8860B] hover:bg-[#D4A017] px-6 py-3 text-sm font-semibold text-[#0A2540] transition-all hover:scale-105"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Team Cards Grid - 3 Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {teamSections.map((section, index) => {
                    const Icon = section.icon
                    return (
                      <motion.div
                        key={section.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={section.href}
                          className={cn(
                            'group relative block h-full p-8 rounded-xl overflow-hidden',
                            'bg-gradient-to-br', section.gradient, section.hoverGradient,
                            'border-2 border-white/10 hover:border-[#B8860B]',
                            'transition-all duration-300 hover:shadow-2xl hover:-translate-y-2'
                          )}
                        >
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                              backgroundSize: '24px 24px'
                            }} />
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            {/* Icon */}
                            <div className="mb-6">
                              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
                                <Icon className="w-8 h-8 text-white group-hover:text-[#B8860B] transition-colors" />
                              </div>
                            </div>

                            {/* Title */}
                            <h4 className="text-2xl font-playfair font-bold text-white mb-2 group-hover:text-[#B8860B] transition-colors">
                              {section.title}
                            </h4>

                            {/* Description */}
                            <p className="text-white/80 text-sm mb-4 font-inter leading-relaxed">
                              {section.description}
                            </p>

                            {/* Count Badge */}
                            {section.count && (
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-4">
                                <Award className="w-4 h-4" />
                                <span>{section.count} Professionals</span>
                              </div>
                            )}

                            {/* CTA */}
                            <div className="flex items-center gap-2 text-[#B8860B] font-semibold mt-6">
                              <span>Explore</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </div>
                          </div>

                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/0 to-[#B8860B]/0 group-hover:from-[#B8860B]/10 group-hover:to-transparent transition-all duration-300 rounded-xl" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Footer CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Link
                    to="/about/careers"
                    className="group flex items-center justify-between p-6 rounded-xl bg-[#0A2540] border-2 border-[#B8860B] hover:border-[#D4A017] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#B8860B]/20 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[#B8860B]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-playfair font-bold text-white mb-1">
                          Join Our Team
                        </h4>
                        <p className="text-white/80 text-sm font-inter">
                          Explore career opportunities and become part of our exceptional team
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#B8860B] font-semibold">
                      <span>View Careers</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
