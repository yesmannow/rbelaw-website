import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'
import { throttle } from '@/lib/utils'

interface ContextualCTAProps {
  practiceAreaId: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  delay?: number // Delay in seconds before showing
  scrollDepth?: number // Percentage of page scroll before showing (0-100)
}

export function ContextualCTA({
  practiceAreaId,
  title,
  description,
  ctaText,
  ctaLink,
  delay = 10,
  scrollDepth = 50
}: ContextualCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(() => {
    // Initialize from session storage
    const dismissedKey = `cta-dismissed-${practiceAreaId}`
    return sessionStorage.getItem(dismissedKey) === 'true'
  })

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (isDismissed) return

        const scrolled = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        const scrollPercentage = (scrolled / (documentHeight - windowHeight)) * 100

        if (scrollPercentage >= scrollDepth) {
          setIsVisible(true)
        }
      }, 100),
    [isDismissed, scrollDepth]
  )

  useEffect(() => {
    // Skip if already dismissed
    if (isDismissed) return

    const timeoutId = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true)
      }
    }, delay * 1000)

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [delay, isDismissed, handleScroll])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem(`cta-dismissed-${practiceAreaId}`, 'true')
  }

  const handleCTAClick = () => {
    // Analytics tracking can be added here
    // Example: analytics.track('CTA Clicked', { practiceAreaId })
  }

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 100, x: 20 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20
          }}
          className="fixed bottom-8 right-8 z-50 max-w-sm no-print"
        >
          <div className="relative backdrop-blur-md bg-white/90 border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/5 to-accent-gold/5 pointer-events-none" />
            
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-200/50 transition-colors z-10"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5 text-neutral-600" />
            </button>

            {/* Content */}
            <div className="relative p-6 pr-12">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-accent-gold/20 rounded-lg">
                  <Download className="w-6 h-6 text-primary-navy" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary-navy mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-neutral-700">
                    {description}
                  </p>
                </div>
              </div>

              <a
                href={ctaLink}
                onClick={handleCTAClick}
                className="block w-full px-6 py-3 bg-accent-gold hover:bg-accent-gold/90 text-white font-semibold text-center rounded-lg transition-colors"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
