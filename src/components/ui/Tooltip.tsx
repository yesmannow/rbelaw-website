import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: ReactNode
  content: string | ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  delayDuration?: number
  className?: string
}

export function Tooltip({
  children,
  content,
  side = 'bottom',
  delayDuration = 300,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const tooltipOffset = 12

      let top = 0
      let left = 0

      switch (side) {
        case 'top':
          top = rect.top - tooltipOffset
          left = rect.left + rect.width / 2
          break
        case 'bottom':
          top = rect.bottom + tooltipOffset
          left = rect.left + rect.width / 2
          break
        case 'left':
          top = rect.top + rect.height / 2
          left = rect.left - tooltipOffset
          break
        case 'right':
          top = rect.top + rect.height / 2
          left = rect.right + tooltipOffset
          break
      }

      setPosition({ top, left })
    }
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      updatePosition()
      setIsOpen(true)
    }, delayDuration)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => {
        updatePosition()
      }
      window.addEventListener('scroll', handleScroll, true)
      window.addEventListener('resize', updatePosition)
      return () => {
        window.removeEventListener('scroll', handleScroll, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getTooltipClasses = () => {
    const baseClasses = 'absolute z-[100] rounded-lg bg-primary-navy text-white px-4 py-2.5 text-sm font-medium shadow-xl border border-accent-gold/30 pointer-events-none whitespace-nowrap max-w-xs'

    switch (side) {
      case 'top':
        return `${baseClasses} -translate-x-1/2 -translate-y-full mb-2`
      case 'bottom':
        return `${baseClasses} -translate-x-1/2 mt-2`
      case 'left':
        return `${baseClasses} -translate-y-1/2 -translate-x-full mr-2`
      case 'right':
        return `${baseClasses} -translate-y-1/2 ml-2`
      default:
        return baseClasses
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: side === 'top' ? 5 : side === 'bottom' ? -5 : 0, x: side === 'left' ? 5 : side === 'right' ? -5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: side === 'top' ? 5 : side === 'bottom' ? -5 : 0, x: side === 'left' ? 5 : side === 'right' ? -5 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            className={getTooltipClasses()}
          >
            {content}
            {/* Arrow */}
            <div
              className={`absolute w-2 h-2 bg-primary-navy border-accent-gold/30 ${
                side === 'top' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 border-r border-b' :
                side === 'bottom' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t' :
                side === 'left' ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-t' :
                'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-b'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

