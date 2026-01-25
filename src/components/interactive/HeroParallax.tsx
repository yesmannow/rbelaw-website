import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'

interface HeroParallaxProps {
  children: ReactNode
  className?: string
}

export function HeroParallax({ children, className = '' }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // Create parallax effect - background moves slower than foreground
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        {/* Reception Area Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero/Riley-Bennett-Egloff-Attorneys-at-Law-Indianapolis-Reception-Area-DSC_1220-1-scaled-1.jpg"
            alt="Riley Bennett Egloff Reception Area"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/85 via-primary-navy/75 to-primary-navy/80" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
