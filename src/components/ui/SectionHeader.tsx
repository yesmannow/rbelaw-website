import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={cn('text-center mb-12', className)}
    >
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-burgundy mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      {/* Burgundy underline separator */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '80px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mx-auto mt-6 h-1 bg-primary-burgundy"
      />
    </motion.div>
  )
}

