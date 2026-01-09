/**
 * 3D Tilt Hook
 * Provides cursor-based 3D tilt effect for prestige cards
 * Respects prefers-reduced-motion
 */

import { useRef, useState, useEffect } from 'react'
import { useSpring, SpringConfig } from 'framer-motion'

interface Use3DTiltOptions {
  maxTilt?: number
  springConfig?: SpringConfig
}

export function use3DTilt({ maxTilt = 2, springConfig }: Use3DTiltOptions = {}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const [tilt, setTilt] = useSpring(
    { rotateX: 0, rotateY: 0, scale: 1 },
    {
      stiffness: 300,
      damping: 30,
      ...springConfig
    }
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setTilt({
      rotateX,
      rotateY,
      scale: 1.02
    })
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (!reducedMotion) {
      setTilt({
        rotateX: 0,
        rotateY: 0,
        scale: 1
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  return {
    cardRef,
    tilt: reducedMotion ? { rotateX: 0, rotateY: 0, scale: 1 } : tilt,
    isHovering,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  }
}
