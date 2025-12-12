import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '../ui/Button'

interface StickyAuthorCTAProps {
  articleTitle: string
  authorName: string
  authorEmail?: string
  onContactClick?: () => void
}

export function StickyAuthorCTA({
  articleTitle,
  authorName,
  authorEmail,
  onContactClick
}: StickyAuthorCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      if (isDismissed) return

      // Throttle scroll event to improve performance
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Calculate scroll percentage
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = (scrollTop / docHeight) * 100

        // Show CTA when user has scrolled 75% of the article
        if (scrollPercent >= 75 && !isVisible) {
          setIsVisible(true)
        } else if (scrollPercent < 75 && isVisible) {
          setIsVisible(false)
        }
      }, 100)
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Check initial scroll position
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [isVisible, isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  const handleContact = () => {
    if (onContactClick) {
      onContactClick()
    } else if (authorEmail) {
      // Fallback to email if no custom handler
      window.location.href = `mailto:${authorEmail}?subject=Question about: ${articleTitle}`
    }
  }

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: 100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 100, x: 100 }}
          transition={{ duration: 0.4, type: 'spring', damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-white rounded-sm shadow-2xl border border-neutral-200 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Dismiss"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="p-6 pr-10">
              <div className="flex items-start space-x-4">
                {/* Author Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-accent-gold">
                    {authorName.charAt(0)}
                  </span>
                </div>

                {/* Message */}
                <div className="flex-1">
                  <p className="text-sm text-neutral-600 mb-3">
                    Have a question about <strong className="text-neutral-900">{articleTitle}</strong>?
                  </p>
                  <p className="text-sm font-semibold text-neutral-900 mb-4">
                    Speak directly with {authorName}.
                  </p>

                  <Button
                    onClick={handleContact}
                    size="sm"
                    className="w-full"
                  >
                    Contact {authorName.split(' ')[0]}
                  </Button>
                </div>
              </div>
            </div>

            {/* Accent Bar */}
            <div className="h-1 bg-gradient-to-r from-accent-gold to-accent-gold/50" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
