'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, ExternalLink } from 'lucide-react'
import { getHealthcareComplianceAlerts } from '@/app/actions/legal-intelligence'

interface ComplianceAlert {
  title: string
  postedDate: string
  commentEndDate: string | null
  documentId: string
  url: string
}

export function RegulatoryAlert() {
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true)
        const data = await getHealthcareComplianceAlerts()
        setAlerts(data)
      } catch (err) {
        console.error('Failed to fetch compliance alerts:', err)
        setError('Unable to load compliance alerts')
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
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

  const isUrgent = (commentEndDate: string | null): boolean => {
    if (!commentEndDate) return false
    
    const endDate = new Date(commentEndDate)
    const today = new Date()
    const daysUntilEnd = Math.floor((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    return daysUntilEnd <= 14 && daysUntilEnd >= 0
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
          <AlertCircle className="h-6 w-6 text-accent-gold" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900">
          CMS Regulatory Alerts
        </h3>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-neutral-100 rounded w-2/3 mb-2"></div>
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

      {!loading && !error && alerts.length === 0 && (
        <p className="text-neutral-600 text-sm">
          No recent compliance alerts available
        </p>
      )}

      {!loading && !error && alerts.length > 0 && (
        <div className="space-y-4">
          {alerts.slice(0, 3).map((alert, index) => (
            <motion.div
              key={alert.documentId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="pb-4 border-b border-neutral-100 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-semibold text-neutral-900 leading-tight flex-1">
                  {alert.title}
                </h4>
                {isUrgent(alert.commentEndDate) && (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full whitespace-nowrap"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Urgent Action Required
                  </motion.span>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-neutral-600">
                  Posted: {formatDate(alert.postedDate)}
                </div>
                {alert.commentEndDate && (
                  <div className="text-xs text-neutral-600">
                    Comment Period Ends: {formatDate(alert.commentEndDate)}
                  </div>
                )}
              </div>

              <a
                href={alert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent-gold hover:text-accent-gold/80 transition-colors mt-2"
              >
                View on Regulations.gov
                <ExternalLink className="h-3 w-3" />
              </a>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-neutral-100">
        <p className="text-xs text-neutral-500">
          Showing recent proposed rules from Centers for Medicare & Medicaid Services
        </p>
      </div>
    </motion.div>
  )
}
