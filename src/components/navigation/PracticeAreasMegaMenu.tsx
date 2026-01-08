/**
 * Practice Areas Mega Menu
 * Visual card-based mega menu with icons and descriptions
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { iconMap } from '@/lib/data/navigation';
import type { NavigationSection } from '@/lib/data/navigation';

interface PracticeAreasMegaMenuProps {
  section: NavigationSection;
}

export function PracticeAreasMegaMenu({ section }: PracticeAreasMegaMenuProps) {
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
        Practice Areas
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
            <div className="w-[900px] rounded-lg border border-gray-200 bg-white shadow-2xl">
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-rbe-navy">
                    Practice Areas
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Comprehensive legal services across diverse practice areas
                  </p>
                </div>

                {/* Practice Areas Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {section.links.map((link, index) => {
                    const Icon = link.icon ? iconMap[link.icon] : null;
                    
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          to={link.href}
                          className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-rbe-navy hover:shadow-lg"
                        >
                          {/* Icon */}
                          {Icon && (
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-rbe-navy/10 text-rbe-navy transition-all group-hover:scale-110 group-hover:bg-rbe-navy group-hover:text-white">
                              <Icon className="h-6 w-6" />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-rbe-navy">
                              {link.label}
                            </h4>
                            {link.description && (
                              <p className="mt-1 text-sm text-gray-600">
                                {link.description}
                              </p>
                            )}
                          </div>

                          {/* Arrow Icon */}
                          <div className="mt-3 flex items-center text-sm font-medium text-rbe-navy opacity-0 transition-all group-hover:opacity-100">
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>

                          {/* Hover Effect */}
                          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rbe-navy/5 to-rbe-burgundy/5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer CTA */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Need help choosing?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Contact us to discuss your legal needs
                      </p>
                    </div>
                    <Link
                      to="/contact"
                      className="flex items-center gap-2 rounded-lg bg-rbe-navy px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                    >
                      Contact Us
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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
