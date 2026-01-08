/**
 * Modern Mega Menu Component
 * Impressive dropdown navigation with icons, descriptions, and visual cards
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { iconMap } from '@/lib/data/navigation';
import type { NavigationSection } from '@/lib/data/navigation';

interface MegaMenuProps {
  section: NavigationSection;
  label: string;
}

export function MegaMenu({ section, label }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const columns = section.columns || 1;
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns] || 'grid-cols-2';

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={cn(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
          'hover:text-rbe-navy focus:outline-none focus:ring-2 focus:ring-rbe-navy/20',
          isOpen && 'text-rbe-navy'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
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
            <div className="rounded-lg border border-gray-200 bg-white shadow-2xl">
              <div className="p-6">
                {/* Grid Layout */}
                <div className={cn('grid gap-6', gridCols)}>
                  {/* Links */}
                  {section.links.map((link) => {
                    const Icon = link.icon ? iconMap[link.icon] : null;
                    
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
                      >
                        {Icon && (
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-rbe-navy/10 text-rbe-navy transition-colors group-hover:bg-rbe-navy group-hover:text-white">
                            <Icon className="h-5 w-5" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 group-hover:text-rbe-navy">
                              {link.label}
                            </span>
                            <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                          </div>
                          {link.description && (
                            <p className="mt-1 text-sm text-gray-600">
                              {link.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Featured Card */}
                {section.featured && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="rounded-lg bg-gradient-to-br from-rbe-navy to-rbe-burgundy p-6 text-white">
                      <h3 className="text-lg font-bold">{section.featured.title}</h3>
                      <p className="mt-2 text-sm text-white/90">
                        {section.featured.description}
                      </p>
                      <Link
                        to={section.featured.href}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-rbe-navy transition-transform hover:scale-105"
                      >
                        {section.featured.buttonText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {section.action && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <button className="flex w-full items-center justify-between rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-rbe-navy hover:bg-gray-50">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {section.action.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {section.action.description}
                        </div>
                      </div>
                      {section.action.icon && iconMap[section.action.icon] && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rbe-navy/10 text-rbe-navy">
                          {(() => {
                            const ActionIcon = iconMap[section.action.icon];
                            return <ActionIcon className="h-5 w-5" />;
                          })()}
                        </div>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
