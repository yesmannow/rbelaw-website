/**
 * Our Team Mega Menu
 * Professional mega menu showcasing all team pages
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Users, Briefcase, UserCheck, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function OurTeamMegaMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)

  const teamPages = [
    {
      title: 'Attorneys',
      href: '/attorneys',
      icon: Users,
      description: 'Meet our experienced legal professionals',
      color: 'from-rbe-navy to-rbe-navy/80'
    },
    {
      title: 'Legal Assistants',
      href: '/team/legal-assistants',
      icon: UserCheck,
      description: 'Our dedicated legal support team',
      color: 'from-rbe-burgundy to-rbe-burgundy/80'
    },
    {
      title: 'Other Professionals',
      href: '/team/professionals',
      icon: Briefcase,
      description: 'Specialists and support staff',
      color: 'from-accent-gold to-accent-bronze'
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
          >
            <div className="w-[600px] rounded-lg border border-gray-200 bg-white shadow-2xl overflow-hidden">
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-rbe-navy">
                    Our Team
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Meet the professionals who make Riley Bennett Egloff exceptional
                  </p>
                </div>

                {/* Team Pages Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {teamPages.map((page, index) => {
                    const Icon = page.icon
                    
                    return (
                      <motion.div
                        key={page.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={page.href}
                          className="group relative flex items-center gap-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-rbe-navy hover:shadow-lg"
                        >
                          {/* Icon with gradient background */}
                          <div className={cn(
                            "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white transition-all group-hover:scale-110",
                            page.color
                          )}>
                            <Icon className="h-8 w-8" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-rbe-navy transition-colors">
                              {page.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                              {page.description}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-rbe-navy group-hover:opacity-100" />

                          {/* Hover gradient overlay */}
                          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-rbe-navy/5 to-rbe-burgundy/5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Footer CTA */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="rounded-lg bg-gradient-to-r from-rbe-navy to-rbe-burgundy p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold">
                          Join Our Team
                        </h4>
                        <p className="mt-2 text-sm text-white/90">
                          Explore career opportunities and become part of our exceptional team.
                        </p>
                      </div>
                      <Link
                        to="/about/careers"
                        className="ml-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-rbe-burgundy transition-transform hover:scale-105"
                      >
                        Careers
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
