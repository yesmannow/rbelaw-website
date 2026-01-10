/**
 * Industries Mega Menu
 * Full-width glassmorphism popout with staggered animations
 */

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IndustriesGrid } from './IndustriesGrid';
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
                      Industries We Serve
                    </h3>
                    <p className="text-white/80 text-lg font-inter">
                      Specialized legal counsel for various industry sectors
                    </p>
                  </div>
                  <Link
                    href="/industries"
                    className="flex items-center gap-2 rounded-lg bg-[#B8860B] hover:bg-[#A07A0A] px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Industries Grid - 3 Column Prestige Layout */}
                <IndustriesGrid />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
