'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, ExternalLink, Loader2 } from 'lucide-react'

/**
 * Healthcare Regulatory Alert Widget
 *
 * Displays recent healthcare compliance alerts from Regulations.gov (CMS).
 * Uses the secure proxy route at /api/proxy/regulations to fetch data.
 *
 * Features:
 * - Client-side fetch to internal proxy (no API keys exposed)
 * - Loading, error, and empty states
 * - Responsive design
 * - No build-time dependencies (client component)
 */

interface RegulatoryItem {
  id: string
  title: string
  agency?: string
  type?: string
  postedDate?: string
  url?: string
  summary?: string
}

interface ProxyResponse {
  ok: boolean
  source: string
  query: {
    q: string
    days: number
    limit: number
  }
  updatedAt: string
  items: RegulatoryItem[]
  message?: string
}

interface HealthcareRegulatoryAlertProps {
  /** Search query, default "healthcare" */
  query?: string
  /** Number of days to look back, default 14 */
  days?: number
  /** Maximum number of results, default 10 */
  limit?: number
  /** Custom className for styling */
  className?: string
}

export function HealthcareRegulatoryAlert({
  query = 'healthcare',
  days = 14,
  limit = 10,
  className = '',
}: HealthcareRegulatoryAlertProps) {
  const [data, setData] = useState<ProxyResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams({
          q: query,
          days: days.toString(),
          limit: limit.toString(),
        })

        const response = await fetch(`/api/proxy/regulations?${params.toString()}`)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const result: ProxyResponse = await response.json()
        setData(result)

        if (!result.ok && result.message) {
          setError(result.message)
        }
      } catch (err) {
        console.error('Failed to fetch regulatory alerts:', err)
        setError(err instanceof Error ? err.message : 'Unable to load regulatory alerts')
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [query, days, limit])

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Date not available'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className={`bg-white rounded-xl p-6 border-2 border-neutral-100 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-accent-gold/10 to-accent-gold/5">
          <AlertCircle className="h-6 w-6 text-accent-gold" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900">Healthcare Regulatory Alerts</h3>
          <p className="text-xs text-neutral-500 mt-1">CMS Proposed Rules</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-neutral-100 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-neutral-100 rounded w-1/4"></div>
            </div>
          ))}
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mt-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading regulatory alerts...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-6">
          <div className="text-red-600 text-sm mb-2">
            <AlertCircle className="h-5 w-5 inline-block mr-2" />
            {error}
          </div>
          {data?.message && (
            <p className="text-xs text-neutral-500 mt-2">{data.message}</p>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data && (!data.items || data.items.length === 0) && (
        <div className="text-center py-6">
          <p className="text-neutral-600 text-sm mb-2">No recent regulatory alerts available</p>
          {data.message && (
            <p className="text-xs text-neutral-500">{data.message}</p>
          )}
        </div>
      )}

      {/* Success State */}
      {!loading && !error && data && data.items && data.items.length > 0 && (
        <div className="space-y-4">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="pb-4 border-b border-neutral-100 last:border-b-0 last:pb-0"
            >
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-neutral-900 leading-tight mb-1">
                  {item.title}
                </h4>
                {item.agency && (
                  <p className="text-xs text-neutral-600">
                    Agency: {item.agency}
                    {item.type && ` • ${item.type}`}
                  </p>
                )}
              </div>

              <div className="space-y-1 mb-2">
                {item.postedDate && (
                  <div className="text-xs text-neutral-600">
                    Posted: {formatDate(item.postedDate)}
                  </div>
                )}
                {item.summary && (
                  <p className="text-xs text-neutral-500 line-clamp-2">{item.summary}</p>
                )}
              </div>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent-gold hover:text-accent-gold/80 transition-colors"
                >
                  View on Regulations.gov
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-neutral-100">
        <p className="text-xs text-neutral-500">
          Data from Regulations.gov • Updated {data?.updatedAt ? formatDate(data.updatedAt) : 'recently'}
        </p>
      </div>
    </div>
  )
}
