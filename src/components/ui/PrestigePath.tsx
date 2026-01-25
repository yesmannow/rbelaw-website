/**
 * PrestigePath - Narrative Motion Component
 * "The Legal Thread" - A scroll-triggered SVG path animation
 * 
 * Creates a high-end visual narrative flow using:
 * - Maroon (#74243C) Bezier curve stroke
 * - 4px blur glow effect
 * - Scroll-driven pathLength animation
 */

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

interface PrestigePathProps {
  /**
   * The direction of the path
   * - 'swooping': The main Bezier swooping path (M 500,0 C 800,400 200,600 500,1000)
   * - 'left-to-right': Swoops from left to right
   * - 'right-to-left': Swoops from right to left
   */
  direction?: 'swooping' | 'left-to-right' | 'right-to-left'
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
  direction = 'swooping', 
  offsetY = 0,
  show = true 
}: PrestigePathProps) {
  const pathRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ['start end', 'end start']
  })

  // Apply spring physics for smooth, liquid-like movement (stiffness: 100, damping: 30)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform progress to path length and opacity
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  if (!show) return null

  // Define SVG paths based on direction
  const pathData = {
    'swooping': 'M 500,0 C 800,400 200,600 500,1000 S 800,1600 500,2000',
    'left-to-right': 'M 0 50 Q 150 10, 300 50 T 600 50',
    'right-to-left': 'M 600 50 Q 450 10, 300 50 T 0 50'
  }

  const viewBox = direction === 'swooping' ? '0 0 1000 2000' : '0 0 600 100'
  const height = direction === 'swooping' ? 'h-full' : 'h-24'
  const width = 'w-full'

  return (
    <div 
      ref={pathRef}
      className={`absolute inset-0 pointer-events-none ${width} ${height} overflow-hidden`}
      style={{ top: `${offsetY}px` }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio={direction === 'swooping' ? 'xMidYMid slice' : 'none'}
      >
        <defs>
          {/* Gold glow filter - 4px blur */}
          <filter id="prestige-glow-4px" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor="#74243C" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* The swooping path with 4px glow */}
        <motion.path
          d={pathData[direction]}
          stroke="#74243C"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#prestige-glow-4px)"
          style={{
            pathLength,
            opacity
          }}
          initial={{ pathLength: 0 }}
        />
      </svg>
    </div>
  )
}
