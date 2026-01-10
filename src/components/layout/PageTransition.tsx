import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

/**
 * PageTransition Component
 *
 * Provides smooth page transitions throughout the site.
 * Exit: Fade out + Slide Left (10px)
 * Enter: Fade in + Slide from Right (10px)
 * Timing: Fast (0.3s) and smooth (easeOut)
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1], // easeOut cubic bezier
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
