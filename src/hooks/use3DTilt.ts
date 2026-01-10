/**
 * 3D Tilt Hook
 * Provides cursor-based 3D tilt effect for prestige cards
 * Respects prefers-reduced-motion
 */

import { useRef, useState, useEffect } from 'react'
import { useSpring, SpringOptions } from 'framer-motion'

interface Use3DTiltOptions {
  maxTilt?: number
  springConfig?: SpringOptions
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

  const rotateX = useSpring(0, {
    stiffness: 300,
    damping: 30,
    ...springConfig
  })
  const rotateY = useSpring(0, {
    stiffness: 300,
    damping: 30,
    ...springConfig
  })
  const scale = useSpring(1, {
    stiffness: 300,
    damping: 30,
    ...springConfig
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const newRotateX = ((y - centerY) / centerY) * -maxTilt
    const newRotateY = ((x - centerX) / centerX) * maxTilt

    rotateX.set(newRotateX)
    rotateY.set(newRotateY)
    scale.set(1.02)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (!reducedMotion) {
      rotateX.set(0)
      rotateY.set(0)
      scale.set(1)
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  return {
    cardRef,
    tilt: reducedMotion ? { rotateX: 0, rotateY: 0, scale: 1 } : { rotateX, rotateY, scale },
    isHovering,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  }
}
