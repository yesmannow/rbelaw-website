import React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Briefcase, Home, Mail, MapPin, Newspaper, Phone, Plus, Search, Users } from 'lucide-react'

type NavItem = {
  label: string
  to: string
  icon: React.ComponentType<{ className?: string }>
  end?: boolean
}

type SpeedDialItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  onSelect: () => void
}

const DIRECTIONS_URL =
  'https://www.google.com/maps/search/?api=1&query=500%20N.%20Meridian%20Street%2C%20Suite%20550%2C%20Indianapolis'

function hapticTick() {
  if ('vibrate' in navigator) navigator.vibrate(10)
}

export function MobileNavBar() {
  const [open, setOpen] = useState(false)
  const [barVisible, setBarVisible] = useState(true)
  const idleTimerRef = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()
  const navigate = useNavigate()

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: 'Home', to: '/', icon: Home, end: true },
      { label: 'Attorneys', to: '/attorneys', icon: Users },
      { label: 'Practice', to: '/practice-areas', icon: Briefcase },
      // Required route mapping for the new nav:
      { label: 'News', to: '/news', icon: Newspaper },
    ],
    []
  )

  const speedDialItems = useMemo<SpeedDialItem[]>(
    () => [
      {
        label: 'Call Now',
        icon: Phone,
        onSelect: () => {
          window.location.href = 'tel:317-636-8000'
        },
      },
      {
        label: 'Search',
        icon: Search,
        onSelect: () => {
          window.dispatchEvent(new CustomEvent('rbe:open-search'))
        },
      },
      {
        label: 'Contact Us',
        icon: Mail,
        onSelect: () => {
          navigate('/contact')
        },
      },
      {
        label: 'Directions',
        icon: MapPin,
        onSelect: () => {
          window.open(DIRECTIONS_URL, '_blank', 'noopener,noreferrer')
        },
      },
    ],
    [navigate]
  )

  // Hide when idle; fade in while user scrolls/gestures.
  useEffect(() => {
    const idleDelayMs = 1200

    const clearIdleTimer = () => {
      if (idleTimerRef.current != null) {
        window.clearTimeout(idleTimerRef.current)
        idleTimerRef.current = null
      }
    }

    const armIdleTimer = () => {
      clearIdleTimer()
      idleTimerRef.current = window.setTimeout(() => {
        setBarVisible(false)
      }, idleDelayMs)
    }

    const onActivity = () => {
      // If the speed dial is open, keep the bar visible.
      if (open) return
      setBarVisible(true)
      armIdleTimer()
    }

    // Start visible, then auto-hide after idle delay.
    if (!open) armIdleTimer()

    window.addEventListener('scroll', onActivity, { passive: true })
    window.addEventListener('wheel', onActivity, { passive: true })
    window.addEventListener('touchmove', onActivity, { passive: true })

    return () => {
      window.removeEventListener('scroll', onActivity)
      window.removeEventListener('wheel', onActivity)
      window.removeEventListener('touchmove', onActivity)
      clearIdleTimer()
    }
  }, [open])

  // Escape to close when open.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const toggle = () => {
    setOpen((v) => !v)
    hapticTick()
  }

  const selectSpeedDial = (fn: () => void) => {
    fn()
    setOpen(false)
    hapticTick()
  }

  const shouldShowBar = barVisible || open

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close quick actions"
              className="md:hidden fixed inset-0 z-40 bg-black/35 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
            />

            {/* Speed dial */}
            <motion.div
              className="md:hidden fixed left-0 right-0 z-50 px-4"
              style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 7.25rem)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <motion.ul
                className="mx-auto flex max-w-sm flex-col gap-3"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
                  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
              >
                {speedDialItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.li
                      key={item.label}
                      variants={{
                        open: { opacity: 1, y: 0, scale: 1 },
                        closed: { opacity: 0, y: 14, scale: 0.98 },
                      }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    >
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => selectSpeedDial(item.onSelect)}
                        className="w-full rounded-2xl border border-white/20 bg-white/92 px-4 py-4 text-left shadow-2xl backdrop-blur-xl
                                   dark:bg-primary-navy/92"
                      >
                        <span className="flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-navy text-white shadow-soft">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                              {item.label}
                            </span>
                            <span className="text-xs text-neutral-600 dark:text-white/70">
                              {item.label === 'Call Now'
                                ? '(317) 636-8000'
                                : item.label === 'Directions'
                                  ? '500 N. Meridian St., Suite 550'
                                  : 'Send us a message'}
                            </span>
                          </span>
                        </span>
                      </motion.button>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Island */}
      <motion.nav
        aria-label="Primary mobile navigation"
        className="md:hidden fixed left-4 right-4 z-50"
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
          pointerEvents: shouldShowBar ? 'auto' : 'none',
        }}
        initial={false}
        animate={{
          opacity: shouldShowBar ? 1 : 0,
          y: shouldShowBar ? 0 : 16,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.22, ease: 'easeOut' }
        }
      >
        <div
          className="relative mx-auto max-w-md rounded-full border border-white/25 bg-white/90 shadow-2xl backdrop-blur-xl
                     dark:bg-primary-navy/90"
        >
          <div className="grid grid-cols-5 items-center px-2 py-2">
            {/* Left two */}
            {navItems.slice(0, 2).map((item) => (
              <MobileTab key={item.to} item={item} onAnyNavigate={() => setOpen(false)} />
            ))}

            {/* Center action */}
            <div className="relative flex items-center justify-center">
              <motion.button
                type="button"
                aria-label="Quick actions"
                aria-expanded={open}
                onClick={toggle}
                whileTap={{ scale: 0.92 }}
                className="relative -mt-7 grid h-14 w-14 place-items-center rounded-full
                           bg-gradient-to-br from-primary-navy to-primary-navy/80 text-white shadow-2xl"
              >
                <img
                  src="/images/logo/rbe-mark-white.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 m-auto h-7 w-7 opacity-95"
                />
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                  className="relative grid place-items-center"
                >
                  <Plus className="h-6 w-6" />
                </motion.span>
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/25" />
                <AnimatePresence>
                  {open && (
                    <motion.span
                      className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary-navy blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.45 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Right two */}
            {navItems.slice(2, 4).map((item) => (
              <MobileTab key={item.to} item={item} onAnyNavigate={() => setOpen(false)} />
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  )
}

function MobileTab({ item, onAnyNavigate }: { item: NavItem; onAnyNavigate: () => void }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={() => {
        onAnyNavigate()
        hapticTick()
      }}
      className="relative flex flex-col items-center justify-center gap-1 rounded-full px-2 py-2"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="mobile-nav-pill"
              className="absolute inset-0 rounded-full bg-primary-navy/10"
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            />
          )}

          <motion.span
            className="relative z-10 grid place-items-center"
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            <Icon
              className={[
                'h-5 w-5 transition-colors',
                isActive ? 'text-primary-navy' : 'text-neutral-700 dark:text-white/75',
              ].join(' ')}
            />
          </motion.span>

          <span
            className={[
              'relative z-10 text-[10px] font-semibold tracking-tight transition-colors',
              isActive ? 'text-primary-navy' : 'text-neutral-600 dark:text-white/70',
            ].join(' ')}
          >
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  )
}
