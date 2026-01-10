'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Scale } from 'lucide-react'
import { getIndianaOpinions } from '@/app/actions/legal-intelligence'

interface Opinion {
  caseName: string
  dateFiled: string
  url: string
}

export function LitigationTracker() {
  const [opinions, setOpinions] = useState<Opinion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOpinions() {
      try {
        setLoading(true)
        const data = await getIndianaOpinions()
        setOpinions(data)
      } catch (err) {
        console.error('Failed to fetch opinions:', err)
        setError('Unable to load case feed')
      } finally {
        setLoading(false)
      }
    }

    fetchOpinions()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    } catch {
      return dateString
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 border-2 border-neutral-100 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-accent-gold/10 to-accent-gold/5">
          <Scale className="h-6 w-6 text-accent-gold" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900">
          Indiana Case Feed
        </h3>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-neutral-100 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm py-4">
          {error}
        </div>
      )}

      {!loading && !error && opinions.length === 0 && (
        <p className="text-neutral-600 text-sm">
          No recent opinions available
        </p>
      )}

      {!loading && !error && opinions.length > 0 && (
        <div className="space-y-4">
          {opinions.map((opinion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="pb-4 border-b border-neutral-100 last:border-b-0 last:pb-0"
            >
              <h4 className="text-sm font-semibold text-neutral-900 mb-2 leading-tight">
                {opinion.caseName}
              </h4>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-neutral-600">
                  Filed: {formatDate(opinion.dateFiled)}
                </span>
                <a
                  href={opinion.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent-gold hover:text-accent-gold/80 transition-colors"
                >
                  View Opinion
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-neutral-100">
        <p className="text-xs text-neutral-500">
          Showing recent precedential opinions from Indiana Supreme Court and Court of Appeals
        </p>
      </div>
    </motion.div>
  )
}
