import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface DockItemProps {
  icon: LucideIcon
  label: string
  to: string
  isActive?: boolean
}

export function DockItem({ icon: Icon, label, to, isActive: isActiveProp }: DockItemProps) {
  const location = useLocation()
  const isActive = isActiveProp ?? location.pathname === to

  return (
    <Link to={to} className="relative flex flex-col items-center justify-center flex-1">
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="relative flex flex-col items-center justify-center gap-1 py-2"
      >
        {/* Icon */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          animate={{ scale: isActive ? 1 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={cn(
            'relative transition-colors duration-200',
            isActive ? 'text-primary-burgundy' : 'text-neutral-600'
          )}
        >
          <Icon className="w-6 h-6" />
          
          {/* Active indicator dot */}
          {isActive && (
            <motion.div
              layoutId="activeDot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-burgundy"
            />
          )}
        </motion.div>

        {/* Label */}
        <span
          className={cn(
            'text-xs font-medium transition-colors duration-200',
            isActive ? 'text-primary-burgundy' : 'text-neutral-600'
          )}
        >
          {label}
        </span>
      </motion.div>
    </Link>
  )
}
