import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DrawerProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Drawer({ open, onOpenChange, children }: DrawerProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5 text-neutral-600" />
            </button>
            
            {/* Content */}
            <div className="px-6 pb-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface DrawerTriggerProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function DrawerTrigger({ children, onClick, className }: DrawerTriggerProps) {
  return (
    <button onClick={onClick} className={cn(className)}>
      {children}
    </button>
  )
}

interface DrawerContentProps {
  children: React.ReactNode
  className?: string
}

export function DrawerContent({ children, className }: DrawerContentProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  )
}

interface DrawerHeaderProps {
  children: React.ReactNode
  className?: string
}

export function DrawerHeader({ children, className }: DrawerHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  )
}

interface DrawerTitleProps {
  children: React.ReactNode
  className?: string
}

export function DrawerTitle({ children, className }: DrawerTitleProps) {
  return (
    <h2 className={cn('text-2xl font-serif font-bold text-primary-navy', className)}>
      {children}
    </h2>
  )
}
