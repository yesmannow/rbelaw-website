import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { fetchGoogleReviews, type GoogleReview } from '@/services/api'

export function GoogleReviewsTicker() {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchGoogleReviews().then((data) => {
      setReviews(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="bg-primary-navy/90 backdrop-blur-lg py-4">
        <div className="section-container">
          <p className="text-white/80 text-sm text-center">Loading reviews...</p>
        </div>
      </div>
    )
  }

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <section className="bg-primary-navy/90 backdrop-blur-lg py-4 overflow-hidden relative">
      <div className="section-container">
        <motion.div
          className="flex gap-8"
          animate={{
            x: [0, -50 * reviews.length * 200],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <motion.div
              key={`${review.author_name}-${index}`}
              className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 min-w-[300px]"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center">
                    <span className="text-accent-gold font-semibold text-sm">
                      {review.author_name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-accent-gold text-accent-gold" />
                      ))}
                    </div>
                    <span className="text-white/60 text-xs">{review.relative_time_description}</span>
                  </div>
                  <p className="text-white text-sm leading-snug line-clamp-2">
                    "{review.text}"
                  </p>
                  <p className="text-white/80 text-xs mt-1 font-semibold">
                    — {review.author_name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

