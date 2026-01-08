/**
 * PrestigePath Component
 * SVG path animation that "draws" itself as the user scrolls
 * Inspired by DLA Piper's swooping line animations
 */

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

interface PrestigePathProps {
  /**
   * The direction of the path
   * - 'left-to-right': Swoops from left to right
   * - 'right-to-left': Swoops from right to left
   * - 'top-to-bottom': Swoops from top to bottom
   */
  direction?: 'left-to-right' | 'right-to-left' | 'top-to-bottom'
  /**
   * Vertical offset in pixels (for positioning)
   */
  offsetY?: number
  /**
   * Whether to show the path (useful for conditional rendering)
   */
  show?: boolean
}

export function PrestigePath({ 
  direction = 'left-to-right', 
  offsetY = 0,
  show = true 
}: PrestigePathProps) {
  const pathRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ['start end', 'end start']
  })

  // Apply spring physics for smooth, liquid-like movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform progress to path length
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1])

  if (!show) return null

  // Define SVG paths based on direction
  const pathData = {
    'left-to-right': 'M 0 50 Q 150 10, 300 50 T 600 50',
    'right-to-left': 'M 600 50 Q 450 10, 300 50 T 0 50',
    'top-to-bottom': 'M 50 0 Q 10 150, 50 300 T 50 600'
  }

  const viewBox = direction === 'top-to-bottom' ? '0 0 100 600' : '0 0 600 100'
  const height = direction === 'top-to-bottom' ? 'h-96' : 'h-24'
  const width = direction === 'top-to-bottom' ? 'w-24' : 'w-full'

  return (
    <div 
      ref={pathRef}
      className={`absolute left-0 right-0 pointer-events-none ${width} ${height} overflow-visible`}
      style={{ top: `${offsetY}px`, '--accent-gold': '#B8860B' } as React.CSSProperties}
    >
      <svg
        className="w-full h-full"
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Glow effect layer */}
        <motion.path
          d={pathData[direction]}
          stroke="var(--accent-gold)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength,
            filter: 'blur(8px)',
            opacity: 0.6
          }}
          initial={{ pathLength: 0 }}
        />
        
        {/* Main path */}
        <motion.path
          d={pathData[direction]}
          stroke="var(--accent-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength
          }}
          initial={{ pathLength: 0 }}
        />
      </svg>
    </div>
  )
}
