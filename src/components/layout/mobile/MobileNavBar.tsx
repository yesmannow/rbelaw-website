import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Users, Briefcase, Newspaper, Plus, Phone, Mail, MapPin } from 'lucide-react'

interface NavItem {
  icon: typeof Home
  label: string
  path: string
}

interface SpeedDialAction {
  icon: typeof Phone
  label: string
  action: () => void
  color: string
}

export function MobileNavBar() {
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Core navigation items
  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Attorneys', path: '/attorneys' },
    { icon: Briefcase, label: 'Practice', path: '/practice-areas' },
    { icon: Newspaper, label: 'News', path: '/newsroom' },
  ]

  // Speed Dial actions
  const speedDialActions: SpeedDialAction[] = [
    {
      icon: Phone,
      label: 'Call Now',
      action: () => {
        window.location.href = 'tel:317-636-8000'
      },
      color: 'bg-primary-burgundy',
    },
    {
      icon: Mail,
      label: 'Contact Us',
      action: () => {
        navigate('/contact')
      },
      color: 'bg-primary-navy',
    },
    {
      icon: MapPin,
      label: 'Directions',
      action: () => {
        window.open(
          'https://www.google.com/maps/search/?api=1&query=500+N.+Meridian+Street,+Suite+550,+Indianapolis',
          '_blank'
        )
      },
      color: 'bg-accent-tan',
    },
  ]

  const handleSpeedDialToggle = () => {
    setIsSpeedDialOpen(!isSpeedDialOpen)
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  const handleSpeedDialAction = (action: () => void) => {
    action()
    setIsSpeedDialOpen(false)
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  // Check if current path matches nav item
  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Speed Dial Overlay */}
      <AnimatePresence>
        {isSpeedDialOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsSpeedDialOpen(false)}
            />

            {/* Speed Dial Menu */}
            <div className="md:hidden fixed bottom-24 left-0 right-0 z-50 flex flex-col items-center gap-3 px-4">
              {speedDialActions.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }}
                    onClick={() => handleSpeedDialAction(item.action)}
                    className={`${item.color} text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-3 min-w-[200px] hover:scale-105 active:scale-95 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Island Navigation */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative bg-white/90 dark:bg-primary-navy/90 backdrop-blur-xl rounded-full shadow-2xl border border-white/20"
        >
          {/* Navigation Items Container */}
          <div className="relative flex items-center justify-between px-3 py-3">
            {/* Left Nav Items */}
            <div className="flex items-center gap-2">
              {navItems.slice(0, 2).map((item) => {
                const Icon = item.icon
                const isActive = isActivePath(item.path)
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-full"
                  >
                    {/* Sliding Pill Background */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary-burgundy/10 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Icon */}
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="relative z-10"
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          isActive ? 'text-primary-burgundy' : 'text-neutral-600'
                        }`}
                      />
                    </motion.div>
                    
                    {/* Label */}
                    <span
                      className={`relative z-10 text-[10px] font-medium mt-1 transition-colors ${
                        isActive ? 'text-primary-burgundy' : 'text-neutral-600'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* Central Speed Dial Button */}
            <motion.button
              onClick={handleSpeedDialToggle}
              whileTap={{ scale: 0.9 }}
              className="relative -mt-8 w-14 h-14 rounded-full bg-gradient-to-br from-primary-burgundy to-primary-burgundy/80 shadow-lg flex items-center justify-center text-white z-20"
            >
              <motion.div
                animate={{ rotate: isSpeedDialOpen ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Plus className="w-6 h-6" />
              </motion.div>
              
              {/* Glow effect when active */}
              {isSpeedDialOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-full bg-primary-burgundy blur-xl -z-10"
                />
              )}
            </motion.button>

            {/* Right Nav Items */}
            <div className="flex items-center gap-2">
              {navItems.slice(2, 4).map((item) => {
                const Icon = item.icon
                const isActive = isActivePath(item.path)
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-full"
                  >
                    {/* Sliding Pill Background */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary-burgundy/10 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Icon */}
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="relative z-10"
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          isActive ? 'text-primary-burgundy' : 'text-neutral-600'
                        }`}
                      />
                    </motion.div>
                    
                    {/* Label */}
                    <span
                      className={`relative z-10 text-[10px] font-medium mt-1 transition-colors ${
                        isActive ? 'text-primary-burgundy' : 'text-neutral-600'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  )
}
