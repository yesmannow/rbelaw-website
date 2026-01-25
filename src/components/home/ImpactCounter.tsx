/**
 * ImpactCounter Component
 * Displays animated success metrics with viewport-triggered spring animations
 */

import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { impactMetrics, type ImpactMetric } from '@/lib/data/impactMetrics'

interface CounterProps {
  metric: ImpactMetric
  index: number
}

function AnimatedCounter({ metric, index }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001
  })

  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  )

  useEffect(() => {
    // Additional check to ensure setHasAnimated only runs if !hasAnimated
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      springValue.set(metric.value)
    }
  }, [isInView, metric.value, springValue, hasAnimated]) // Include hasAnimated to ensure proper check

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Glassmorphism card with Navy background and Gold glow */}
      <div className="relative bg-primary-navy/90 backdrop-blur-sm rounded-2xl p-8 
                      border border-accent-gold/20 hover:border-accent-gold/40 
                      transition-all duration-300
                      shadow-lg hover:shadow-accent-gold/20 hover:shadow-2xl">
        {/* Gold glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-gold/10 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 text-center">
          {/* Animated number */}
          <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
            {metric.prefix}
            <motion.span>{displayValue}</motion.span>
            {metric.suffix}
          </div>
          
          {/* Label */}
          <div className="text-accent-gold text-lg md:text-xl font-semibold">
            {metric.label}
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent-gold/30 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent-gold/30 rounded-br-2xl" />
      </div>
    </motion.div>
  )
}

export function ImpactCounter() {
  return (
    <section className="section-container py-16 md:py-24 bg-neutral-50">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-primary-navy mb-4"
        >
          Success in Motion
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-neutral-600 max-w-2xl mx-auto"
        >
          Our track record speaks for itself. Delivering exceptional results for clients across industries.
        </motion.p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {impactMetrics.map((metric, index) => (
          <AnimatedCounter 
            key={metric.id} 
            metric={metric} 
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
