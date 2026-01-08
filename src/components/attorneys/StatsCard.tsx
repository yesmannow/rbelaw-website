import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
  color?: string
}

export function StatsCard({ 
  icon: Icon, 
  value, 
  suffix = '', 
  prefix = '',
  label, 
  description,
  color = 'text-accent-gold'
}: StatsCardProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          // Animate counter
          const duration = 2000 // 2 seconds
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 border-2 border-neutral-100 hover:border-accent-gold/30 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className={`text-3xl font-bold ${color} mb-1 font-mono`}>
            {prefix}{count.toLocaleString()}{suffix}
          </div>
          <div className="text-sm font-semibold text-neutral-900 mb-1">
            {label}
          </div>
          {description && (
            <div className="text-xs text-neutral-600">
              {description}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
