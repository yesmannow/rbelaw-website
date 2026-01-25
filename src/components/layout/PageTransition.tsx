import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'

/**
 * PageTransition Component
 *
 * Provides smooth page transitions throughout the site.
 * Exit: Fade out + Slide Left (10px)
 * Enter: Fade in + Slide from Right (10px)
 * Timing: Fast (0.3s) and smooth (easeOut)
 */
export function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1], // easeOut cubic bezier
        }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}
