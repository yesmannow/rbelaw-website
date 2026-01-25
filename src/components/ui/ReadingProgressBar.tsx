/**
 * Reading Progress Bar
 * Gold progress bar that indicates scroll depth for long-form content
 */

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ReadingProgressBar() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Smooth spring animation for the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    // Show the bar once user starts scrolling
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsVisible(latest > 0)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#74243C] origin-left z-[100]"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
}
