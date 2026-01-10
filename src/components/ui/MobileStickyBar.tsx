'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone, MessageSquare } from 'lucide-react'

const SLIDE_UP_DELAY = 500 // milliseconds

/**
 * MobileStickyBar Component
 * 
 * A conversion-optimized sticky bar for mobile devices featuring:
 * - "Call Now" button with direct tel: link
 * - "Free Consultation" button linking to contact page
 * - Fixed positioning at bottom of viewport
 * - Slide-up animation on mount
 * - Hidden on desktop (md and larger screens)
 * 
 * Goal: Increase mobile conversion rates by 15-20% by providing
 * persistent access to contact options regardless of scroll position.
 */
export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger slide-up animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, SLIDE_UP_DELAY)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        bg-white border-t-2 border-gray-200 shadow-lg
        transition-transform duration-500 ease-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
    >
      <div className="flex gap-2 p-3">
        {/* Call Now Button - Primary Action */}
        <a
          href="tel:+13176368000"
          className="
            flex-1 flex items-center justify-center gap-2
            bg-[#B8860B] hover:bg-[#9a710a]
            text-white font-bold
            px-4 py-3 rounded-lg
            transition-colors duration-200
            shadow-md active:shadow-sm
          "
          aria-label="Call Riley Bennett Egloff LLP"
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm">Call Now</span>
        </a>

        {/* Free Consultation Button - Secondary Action */}
        <Link
          href="/contact"
          className="
            flex-1 flex items-center justify-center gap-2
            bg-[#0A2540] hover:bg-[#134067]
            text-white font-bold
            px-4 py-3 rounded-lg
            transition-colors duration-200
            shadow-md active:shadow-sm
          "
          aria-label="Request a free consultation"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm">Free Consultation</span>
        </Link>
      </div>
    </div>
  )
}
