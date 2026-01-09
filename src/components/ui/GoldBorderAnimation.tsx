/**
 * Gold Border Animation Component
 * Uses SVG path with pathLength for smooth border drawing effect
 */

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GoldBorderAnimationProps {
  isHovering: boolean
  className?: string
  borderRadius?: string
}

export function GoldBorderAnimation({ isHovering, className = '', borderRadius = '0.75rem' }: GoldBorderAnimationProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (reducedMotion) return null

  // Calculate path for rounded rectangle border
  const width = 100
  const height = 100
  const radius = 12
  const path = `M ${radius} 0 L ${width - radius} 0 Q ${width} 0 ${width} ${radius} L ${width} ${height - radius} Q ${width} ${height} ${width - radius} ${height} L ${radius} ${height} Q 0 ${height} 0 ${height - radius} L 0 ${radius} Q 0 0 ${radius} 0 Z`

  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ borderRadius }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d={path}
        fill="none"
        stroke="#B8860B"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isHovering ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
