/**
 * Mobile Command Center
 * Premium floating action button with radial menu
 * Next-level app-like functionality
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Calendar, MessageCircle, X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommandAction {
  icon: typeof Phone
  label: string
  action: () => void
  color: string
  angle: number
}

export function MobileCommandCenter() {
  const [isOpen, setIsOpen] = useState(false)

  const handleCall = () => {
    window.location.assign('tel:3176368000')
    setIsOpen(false)
  }

  const handleEmail = () => {
    window.location.assign('mailto:info@rbelaw.com')
    setIsOpen(false)
  }

  const actions: CommandAction[] = [
    {
      icon: Phone,
      label: 'Call Now',
      action: handleCall,
      color: 'bg-green-500',
      angle: 225
    },
    {
      icon: Mail,
      label: 'Email',
      action: handleEmail,
      color: 'bg-blue-500',
      angle: 270
    },
    {
      icon: Calendar,
      label: 'Schedule',
      action: () => {
        // Open calendar/scheduling
        setIsOpen(false)
      },
      color: 'bg-purple-500',
      angle: 315
    },
    {
      icon: MessageCircle,
      label: 'Chat',
      action: () => {
        // Open chat widget
        setIsOpen(false)
      },
      color: 'bg-pink-500',
      angle: 180
    },
    {
      icon: MapPin,
      label: 'Directions',
      action: () => {
        window.open('https://maps.google.com/?q=Riley+Bennett+Egloff+LLP', '_blank')
        setIsOpen(false)
      },
      color: 'bg-orange-500',
      angle: 135
    }
  ]

  const radius = 90

  return (
    <div className="lg:hidden fixed bottom-24 right-4 z-[95]">
      {/* Radial Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <>
            {actions.map((action, index) => {
              const Icon = action.icon
              const angleRad = (action.angle * Math.PI) / 180
              const x = Math.cos(angleRad) * radius
              const y = Math.sin(angleRad) * radius

              return (
                <motion.button
                  key={action.label}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={{ scale: 1, x, y, opacity: 1 }}
                  exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.05
                  }}
                  onClick={action.action}
                  className={cn(
                    'absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full',
                    action.color,
                    'shadow-2xl flex items-center justify-center text-white',
                    'active:scale-90'
                  )}
                  style={{
                    boxShadow: `0 10px 30px ${action.color.replace('bg-', 'rgba(').replace('-500', ', 0.4)')}`
                  }}
                >
                  <Icon className="w-6 h-6" />
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-full mr-3 px-3 py-1.5 bg-[#0A2540] text-white text-xs font-semibold rounded-lg whitespace-nowrap"
                  >
                    {action.label}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-[#0A2540] border-b-4 border-b-transparent" />
                  </motion.div>
                </motion.button>
              )
            })}

            {/* Backdrop Circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#B8860B]/10 backdrop-blur-sm"
              style={{ transform: 'translate(-50%, 50%)' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen)
          if ('vibrate' in navigator) {
            navigator.vibrate(10)
          }
        }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-10',
          isOpen ? 'bg-[#0A2540]' : 'bg-[#B8860B]'
        )}
        style={{
          boxShadow: isOpen
            ? '0 0 40px rgba(184, 134, 11, 0.5)'
            : '0 10px 40px rgba(184, 134, 11, 0.4)'
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <Plus className="w-7 h-7 text-[#0A2540]" />
          )}
        </motion.div>

        {/* Pulse Animation */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-full bg-[#B8860B]"
          />
        )}
      </motion.button>
    </div>
  )
}
