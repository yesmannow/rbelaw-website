/**
 * Prestige Button Component
 * High-performance button with liquid fill effect and icon motion
 * Optimized for INP < 200ms
 */

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PrestigeButtonProps {
  children: ReactNode
  href?: string
  to?: string
  variant?: 'primary' | 'secondary' | 'call' | 'consultation'
  icon?: ReactNode
  className?: string
  onClick?: () => void
}

export function PrestigeButton({
  children,
  href,
  to,
  variant = 'primary',
  icon,
  className,
  onClick
}: PrestigeButtonProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const progress = useMotionValue(0)
  const fillProgress = useSpring(progress, {
    stiffness: 400,
    damping: 30
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      progress.set(0)
      return
    }
    progress.set(isHovering ? 1 : 0)
  }, [isHovering, progress, reducedMotion])

  const fillWidth = useTransform(fillProgress, [0, 1], ['0%', '100%'])

  const baseStyles = cn(
    'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 overflow-hidden',
    'focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2',
    className
  )

  const variantStyles = {
    primary: 'bg-[#B8860B] hover:bg-[#D4A017] text-[#0A2540]',
    secondary: 'bg-transparent border-2 border-[#B8860B] text-[#B8860B] hover:text-[#0A2540]',
    call: 'bg-[#B8860B] hover:bg-[#D4A017] text-[#0A2540]',
    consultation: 'bg-[#0A2540] hover:bg-[#0A2540]/90 text-white border-2 border-[#B8860B]'
  }

  const defaultIcon = variant === 'call' ? <Phone className="w-4 h-4" /> : variant === 'consultation' ? <ArrowRight className="w-4 h-4" /> : icon

  const buttonContent = (
    <>
      {/* Liquid Fill Background */}
      {(variant === 'call' || variant === 'consultation') && (
        <motion.div
          className="absolute inset-0 bg-[#B8860B] origin-left"
          style={{
            width: fillWidth,
            opacity: reducedMotion ? 0 : fillProgress
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {defaultIcon && (
          <motion.span
            animate={isHovering && !reducedMotion ? { x: 4 } : { x: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {defaultIcon}
          </motion.span>
        )}
        <span>{children}</span>
      </span>
    </>
  )

  const commonProps = {
    ref: buttonRef,
    className: cn(baseStyles, variantStyles[variant]),
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
    onClick,
    style: {
      transition: 'all 0.2s ease-out'
    }
  }

  if (href) {
    return (
      <motion.a
        href={href}
        {...commonProps}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {buttonContent}
      </motion.a>
    )
  }

  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Link to={to} {...commonProps}>
          {buttonContent}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      {...commonProps}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {buttonContent}
    </motion.button>
  )
}
