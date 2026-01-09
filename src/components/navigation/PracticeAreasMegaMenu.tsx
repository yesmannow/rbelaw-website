/**
 * Practice Areas Mega Menu
 * Full-width glassmorphism popout with staggered animations
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { iconMap } from '@/lib/data/navigation';
import { practiceAreas } from '@/lib/data';
import { getSpecialistCount } from '@/lib/utils/attorney-logic';

export function PracticeAreasMegaMenu() {
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

      {/* Full-Width Glassmorphism Mega Menu */}
      <AnimatePresence>
        {isOpen && (
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
              onClick={() => setIsOpen(false)}
            />

            {/* Focus Drawer Effect - Scale down page body */}
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

            {/* Menu Content */}
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
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">
                      Practice Areas
                    </h3>
                    <p className="text-white/80 text-lg">
                      Comprehensive legal services across diverse practice areas
                    </p>
                  </div>
                  <Link
                    to="/practice-areas"
                    className="flex items-center gap-2 rounded-lg bg-[#B8860B] hover:bg-[#A07A0A] px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Practice Areas Grid with Staggered Animations */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {practiceAreas.map((area, index) => {
                    const Icon = area.icon ? iconMap[area.icon] : null;
                    const specialistCount = getSpecialistCount(area.name, 'practice');

                    return (
                      <motion.div
                        key={area.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          to={`/practice-areas/${area.slug}`}
                          className="group relative flex flex-col h-full overflow-hidden rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#B8860B] p-5 transition-all"
                        >
                          {/* Icon */}
                          {Icon && (
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#B8860B]/20 text-[#B8860B] transition-all group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white">
                              <Icon className="h-5 w-5" />
                            </div>
                          )}

                          {/* Title with Specialist Count */}
                          <div className="mb-2">
                            <h4 className="font-semibold text-white group-hover:text-[#B8860B] transition-colors">
                              {area.name}
                            </h4>
                            {specialistCount > 0 && (
                              <p className="text-xs text-[#B8860B]/80 mt-1 font-inter">
                                {specialistCount} specialist{specialistCount !== 1 ? 's' : ''}
                              </p>
                            )}
                          </div>

                          {/* Description */}
                          {area.description && (
                            <p className="text-sm text-white/70 line-clamp-2 mb-3 flex-1 font-inter">
                              {area.description}
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
