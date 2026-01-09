/**
 * PWA Install Prompt
 * Smart install prompt that only appears on mobile devices
 * and limits the number of times it shows to avoid overwhelming users
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Smartphone } from 'lucide-react'

const MAX_PROMPTS = 3 // Maximum number of times to show the prompt
const PROMPT_DELAY = 5000 // Delay before showing prompt (5 seconds)
const STORAGE_KEY = 'pwa-install-prompt-count'
const DISMISSED_KEY = 'pwa-install-prompt-dismissed'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [promptTimer, setPromptTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if user is on mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768
      setIsMobile(isMobileDevice)
    }

    checkMobile()
    const resizeHandler = () => checkMobile()
    window.addEventListener('resize', resizeHandler)

    // Check if prompt was already dismissed permanently
    const dismissed = localStorage.getItem(DISMISSED_KEY)
    if (dismissed === 'true') {
      return () => window.removeEventListener('resize', resizeHandler)
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const event = e as BeforeInstallPromptEvent
      setDeferredPrompt(event)

      // Check prompt count
      const promptCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
      if (promptCount >= MAX_PROMPTS) {
        return
      }

      // Show prompt after delay (only on mobile)
      const timer = setTimeout(() => {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768

        if (isMobileDevice && !window.matchMedia('(display-mode: standalone)').matches) {
          setIsVisible(true)
          // Increment prompt count
          localStorage.setItem(STORAGE_KEY, (promptCount + 1).toString())
        }
      }, PROMPT_DELAY)

      setPromptTimer(timer)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('resize', resizeHandler)
      if (promptTimer) {
        clearTimeout(promptTimer)
      }
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        setIsInstalled(true)
        setIsVisible(false)
        // Clear the count since user installed
        localStorage.removeItem(STORAGE_KEY)
      } else {
        setIsVisible(false)
      }

      setDeferredPrompt(null)
    } catch (error) {
      console.error('Error installing PWA:', error)
      setIsVisible(false)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    // Mark as dismissed permanently
    localStorage.setItem(DISMISSED_KEY, 'true')
  }

  // Don't show if not mobile, already installed, or not visible
  if (!isMobile || isInstalled || !isVisible || !deferredPrompt) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="lg:hidden fixed bottom-24 left-4 right-4 z-[105] max-w-sm mx-auto"
        >
          <div className="bg-[#0A2540] border-2 border-[#B8860B] rounded-2xl shadow-2xl p-4 backdrop-blur-xl">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Dismiss install prompt"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-3 pr-8">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#B8860B]/20 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-[#B8860B]" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-white font-playfair font-bold text-lg mb-1">
                  Install RBE Law App
                </h3>
                <p className="text-white/70 text-sm mb-3 font-inter">
                  Add to your home screen for quick access and a better experience.
                </p>

                {/* Install Button */}
                <button
                  onClick={handleInstall}
                  className="w-full flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#D4A017] text-[#0A2540] font-semibold py-2.5 px-4 rounded-lg transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Install Now</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
