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
        'group relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-6',
        'transition-all duration-300',
        'hover:shadow-[0_0_25px_rgba(184,134,11,0.3)]',
        'hover:border-accent-gold',
        // Glowing border effect on hover using pseudo-elements
        'before:absolute before:inset-0 before:rounded-lg before:p-[2px]',
        'before:bg-gradient-to-br before:from-accent-gold before:via-accent-bronze before:to-accent-gold',
        'before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100',
        'before:-z-10',
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
