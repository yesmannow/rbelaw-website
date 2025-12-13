import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

interface BentoGridItemProps {
  children: ReactNode
  className?: string
  featured?: boolean
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn('grid auto-rows-[minmax(200px,auto)] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {children}
    </div>
  )
}

export function BentoGridItem({ children, className, featured = false }: BentoGridItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative overflow-hidden rounded-lg bg-white p-6',
        'border-2 border-neutral-200',
        'transition-all duration-300',
        'hover:border-accent-gold',
        'hover:shadow-[0_0_20px_rgba(184,134,11,0.2)]',
        featured ? 'md:col-span-2 lg:row-span-2' : '',
        className
      )}
    >
      <div className="relative h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}
