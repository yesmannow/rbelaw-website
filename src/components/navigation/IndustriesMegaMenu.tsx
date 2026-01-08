/**
 * Industries Mega Menu
 * Visual card-based mega menu for industries
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { iconMap } from '@/lib/data/navigation';
import type { NavigationSection } from '@/lib/data/navigation';

interface IndustriesMegaMenuProps {
  section: NavigationSection;
}

export function IndustriesMegaMenu({ section }: IndustriesMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            <div className="w-[700px] rounded-lg border border-gray-200 bg-white shadow-2xl">
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-rbe-navy">
                    Industries We Serve
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Specialized legal counsel for various industry sectors
                  </p>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {section.links.map((link, index) => {
                    const Icon = link.icon ? iconMap[link.icon] : null;
                    const isHovered = hoveredIndex === index;
                    
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.04 }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <Link
                          to={link.href}
                          className="group relative flex items-center gap-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-rbe-burgundy hover:shadow-lg"
                        >
                          {/* Icon with animated background */}
                          {Icon && (
                            <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rbe-burgundy/10 to-rbe-navy/10 text-rbe-burgundy transition-all group-hover:scale-110 group-hover:from-rbe-burgundy group-hover:to-rbe-navy group-hover:text-white">
                              <Icon className="h-7 w-7" />
                              
                              {/* Sparkle effect on hover */}
                              {isHovered && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute -right-1 -top-1"
                                >
                                  <Sparkles className="h-4 w-4 text-yellow-400" />
                                </motion.div>
                              )}
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-rbe-burgundy">
                              {link.label}
                            </h4>
                            {link.description && (
                              <p className="mt-1 text-sm text-gray-600">
                                {link.description}
                              </p>
                            )}
                          </div>

                          {/* Arrow */}
                          <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-rbe-burgundy group-hover:opacity-100" />

                          {/* Animated background gradient */}
                          <motion.div
                            className="absolute inset-0 -z-10 bg-gradient-to-r from-rbe-burgundy/5 via-rbe-navy/5 to-rbe-burgundy/5"
                            initial={{ x: '-100%' }}
                            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Featured Section */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="rounded-lg bg-gradient-to-r from-rbe-burgundy to-rbe-navy p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold">
                          Industry-Specific Expertise
                        </h4>
                        <p className="mt-2 text-sm text-white/90">
                          Our attorneys understand the unique challenges and regulations 
                          facing your industry. Let us help you navigate complex legal matters.
                        </p>
                      </div>
                      <Link
                        to="/industries"
                        className="ml-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-rbe-burgundy transition-transform hover:scale-105"
                      >
                        View All
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
  );
}
