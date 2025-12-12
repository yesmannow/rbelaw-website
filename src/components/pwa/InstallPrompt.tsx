import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after a short delay (don't be annoying immediately)
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('PWA installed')
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setIsDismissed(true)
    sessionStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!showPrompt || isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md z-50"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-neutral-200 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-burgundy/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-primary-burgundy" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary-navy text-sm">
                Install the RBE Law App
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Install our app for faster access and offline support
              </p>
              
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleInstall}
                  className="flex-1 px-4 py-2 bg-primary-burgundy text-white text-sm font-medium rounded-lg hover:bg-primary-burgundy/90 transition-colors"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 text-neutral-600 text-sm font-medium hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
            
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 hover:bg-neutral-100 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-neutral-500" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
