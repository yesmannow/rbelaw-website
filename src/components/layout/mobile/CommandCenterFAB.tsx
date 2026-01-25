import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, User, Plus, X } from 'lucide-react'

interface CommandCenterFABProps {
  onAction?: (action: string) => void
}

export function CommandCenterFAB({ onAction: _onAction }: CommandCenterFABProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  const handleAction = (action: string) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
    setIsOpen(false)
    onAction?.(action)

    // Handle default actions
    switch (action) {
      case 'phone':
        // eslint-disable-next-line
        window.location.href = 'tel:317-636-8000'
        break
      case 'email':
        // eslint-disable-next-line
        window.location.href = 'mailto:info@rbelaw.com'
        break
      case 'map':
        window.open('https://maps.google.com/?q=Riley+Bennett+Egloff+LLP', '_blank')
        break
      case 'portal':
        // Open client portal (placeholder)
        break
    }
  }

  const radialButtons = [
    { icon: Phone, action: 'phone', label: 'Call Office', angle: 225 },
    { icon: Mail, action: 'email', label: 'Email Firm', angle: 270 },
    { icon: MapPin, action: 'map', label: 'Directions', angle: 315 },
    { icon: User, action: 'portal', label: 'Client Portal', angle: 180 },
  ]

  return (
    <div className="relative">
      {/* Radial Menu Buttons */}
      <AnimatePresence>
        {isOpen && radialButtons.map((btn, idx) => {
          const Icon = btn.icon
          const radius = 80
          const angleRad = (btn.angle * Math.PI) / 180
          const x = Math.cos(angleRad) * radius
          const y = Math.sin(angleRad) * radius

          return (
            <motion.button
              key={btn.action}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{ scale: 1, x, y, opacity: 1 }}
              exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: idx * 0.05,
              }}
              onClick={() => handleAction(btn.action)}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-burgundy hover:bg-primary-burgundy hover:text-white transition-colors border border-neutral-200"
              aria-label={btn.label}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          )
        })}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary-burgundy to-primary-burgundy/80 shadow-lg flex items-center justify-center text-white z-10"
        style={{
          boxShadow: isOpen
            ? '0 0 30px rgba(93, 31, 52, 0.6)'
            : '0 10px 25px rgba(0, 0, 0, 0.2)',
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Plus className="w-7 h-7" />}
        </motion.div>

        {/* Neon glow effect when active */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-full bg-primary-burgundy blur-xl -z-10"
          />
        )}
      </motion.button>
    </div>
  )
}
