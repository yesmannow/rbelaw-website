/**
 * Industries Mega Menu
 * Full-width glassmorphism popout with staggered animations
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { iconMap } from '@/lib/data/navigation';
import type { NavigationSection } from '@/lib/data/navigation';

interface IndustriesMegaMenuProps {
  section: NavigationSection;
}

export function IndustriesMegaMenu({ section }: IndustriesMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

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
        Industries
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
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 z-40 h-[600px] pointer-events-none"
              style={{ 
                backgroundColor: 'rgba(10, 37, 64, 0.95)',
                top: 'var(--nav-height)'
              }}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 right-0 z-50 backdrop-blur-xl border-t border-white/10"
              style={{ 
                backgroundColor: 'rgba(10, 37, 64, 0.95)',
                top: 'var(--nav-height)'
              }}
            >
              <div className="section-container py-12">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">
                      Industries We Serve
                    </h3>
                    <p className="text-white/80 text-lg">
                      Specialized legal counsel for various industry sectors
                    </p>
                  </div>
                  <Link
                    to="/industries"
                    className="flex items-center gap-2 rounded-lg bg-[#B8860B] hover:bg-[#A07A0A] px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Industries Grid with Staggered Animations */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {section.links.map((link, index) => {
                    const Icon = link.icon ? iconMap[link.icon] : null;
                    
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          to={link.href}
                          className="group relative flex flex-col h-full overflow-hidden rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#B8860B] p-5 transition-all"
                        >
                          {/* Icon */}
                          {Icon && (
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#B8860B]/20 text-[#B8860B] transition-all group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white">
                              <Icon className="h-5 w-5" />
                            </div>
                          )}

                          {/* Title */}
                          <h4 className="font-semibold text-white mb-2 group-hover:text-[#B8860B] transition-colors">
                            {link.label}
                          </h4>

                          {/* Description */}
                          {link.description && (
                            <p className="text-sm text-white/70 line-clamp-2 mb-3 flex-1">
                              {link.description}
                            </p>
                          )}

                          {/* Arrow Icon */}
                          <div className="flex items-center text-sm font-medium text-[#B8860B] opacity-0 transition-all group-hover:opacity-100">
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
