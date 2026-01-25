/**
 * Attorney Carousel Component
 * Auto-scrolling carousel with hover pause and navigation
 * Shows attorney name, title, and hover interactions
 */

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Mail, Linkedin, User } from 'lucide-react'
import { attorneys as allAttorneys } from '@/lib/utils/attorney-logic'
import type { Attorney } from '@/lib/types'
import { getAttorneyImages } from '@/lib/utils/attorney-images'
import { AttorneyCarouselSearch } from './AttorneyCarouselSearch'
import { cn } from '@/lib/utils'

export function AttorneyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [filteredAttorneys, setFilteredAttorneys] = useState<Attorney[]>(allAttorneys)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Number of cards to show at once
  const cardsToShow = 5

  const totalCards = filteredAttorneys.length
  const maxIndex = Math.max(0, totalCards - cardsToShow)

  // Reset to first page when filtered attorneys change
  useEffect(() => {
    setCurrentIndex(0)
  }, [filteredAttorneys])

  // Auto-scroll every 5 seconds when not paused
  useEffect(() => {
    if (!isPaused && !isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1
          return next > maxIndex ? 0 : next
        })
      }, 5000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, isHovering, maxIndex])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-navy mb-4">
            Our Team
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Experienced attorneys dedicated to achieving your legal objectives
          </p>
        </motion.div>

        {/* Attorney Search Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <AttorneyCarouselSearch onFilterChange={setFilteredAttorneys} />
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => {
            setIsHovering(true)
            setIsPaused(true)
          }}
          onMouseLeave={() => {
            setIsHovering(false)
            setIsPaused(false)
          }}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{
                  x: `-${currentIndex * (100 / cardsToShow)}%`
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut'
                }}
              >
                {filteredAttorneys.length === 0 ? (
                  <div className="w-full flex items-center justify-center py-16">
                    <div className="text-center">
                      <p className="text-lg text-neutral-600 mb-2">No attorneys found</p>
                      <p className="text-sm text-neutral-500">Try adjusting your search terms</p>
                    </div>
                  </div>
                ) : (
                  filteredAttorneys.map((attorney, index) => {
                    const images = getAttorneyImages(attorney.name, attorney.image)
                    const isVisible = index >= currentIndex && index < currentIndex + cardsToShow

                  return (
                    <div
                      key={attorney.id}
                      className={cn(
                        'flex-shrink-0',
                        'transition-all duration-300',
                        isHovering && isVisible ? 'scale-105' : 'scale-100'
                      )}
                      style={{
                        width: `calc(${100 / cardsToShow}% - 1.5rem)`
                      }}
                    >
                      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                        {/* Attorney Image */}
                        <div className="relative aspect-square overflow-hidden bg-neutral-100">
                          <picture>
                            <source srcSet={images.avif} type="image/avif" />
                            <source srcSet={images.webp} type="image/webp" />
                            <img
                              src={images.fallback}
                              alt={attorney.name}
                              className="w-full h-full object-cover"
                            />
                          </picture>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Attorney Info */}
                        <div className="p-4">
                          <div className="mb-3">
                            <h3 className="text-lg font-serif font-bold text-primary-navy mb-1 line-clamp-2">
                              {attorney.name}
                            </h3>
                            <p className="text-sm text-accent-gold font-semibold">
                              {attorney.title || 'Attorney'}
                            </p>
                          </div>

                          {/* Hover Actions */}
                          {isHovering && isVisible && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-2 pt-3 border-t border-neutral-200"
                            >
                              {attorney.email && (
                                <a
                                  href={`mailto:${attorney.email}`}
                                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 hover:bg-accent-gold hover:text-white transition-all duration-300"
                                  onClick={(e) => e.stopPropagation()}
                                  aria-label={`Email ${attorney.name}`}
                                >
                                  <Mail className="w-4 h-4" />
                                </a>
                              )}
                              {attorney.linkedIn && (
                                <a
                                  href={attorney.linkedIn}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 hover:bg-accent-gold hover:text-white transition-all duration-300"
                                  onClick={(e) => e.stopPropagation()}
                                  aria-label={`${attorney.name} LinkedIn`}
                                >
                                  <Linkedin className="w-5 h-5" />
                                </a>
                              )}
                              <Link
                                to={`/attorneys/${attorney.id}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-gold hover:bg-accent-gold/90 text-white transition-all duration-300 text-xs font-medium"
                              >
                                <User className="w-3.5 h-3.5" />
                                View Bio
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                  })
                )}
              </motion.div>
            </div>

            {/* Navigation Arrows - Show on Hover and if there are multiple pages */}
            {isHovering && filteredAttorneys.length > cardsToShow && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-primary-navy hover:text-accent-gold transition-all z-10"
                  aria-label="Previous attorneys"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-primary-navy hover:text-accent-gold transition-all z-10"
                  aria-label="Next attorneys"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator - Only show if there are multiple pages */}
          {filteredAttorneys.length > cardsToShow && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(totalCards / cardsToShow) }).map((_, index) => {
                const startIndex = index * cardsToShow
                const isActive = currentIndex >= startIndex && currentIndex < startIndex + cardsToShow

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(Math.min(startIndex, maxIndex))}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      isActive
                        ? 'bg-accent-gold w-8'
                        : 'bg-neutral-300 hover:bg-neutral-400'
                    )}
                    aria-label={`Go to page ${index + 1}`}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
