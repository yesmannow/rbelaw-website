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
        'hover:shadow-[0_0_30px_rgba(116,36,60,0.4)]',
        featured ? 'md:col-span-2 lg:row-span-2' : '',
        className
      )}
      style={{
        maskImage: 'linear-gradient(to bottom, black, black)',
        WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
      }}
    >
      {/* Glowing border effect on hover */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(116,36,60,0.3) 0%, rgba(116,36,60,0.1) 50%, rgba(116,36,60,0.3) 100%)',
          filter: 'blur(8px)',
          margin: '-2px',
        }}
      />
      <div className="relative h-full flex flex-col z-10">
        {children}
      </div>
    </motion.div>
  )
}
