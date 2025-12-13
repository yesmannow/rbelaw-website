import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar } from 'lucide-react'
import { getCalendlyUrl } from '@/services/api'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  attorneyCalendlyUrl?: string
  attorneyName?: string
}

export function BookingModal({
  isOpen,
  onClose,
  attorneyCalendlyUrl,
  attorneyName,
}: BookingModalProps) {
  const calendlyUrl = getCalendlyUrl(attorneyCalendlyUrl)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-navy to-primary-slate p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-accent-gold" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">
                      Schedule a Consultation
                    </h2>
                    {attorneyName && (
                      <p className="text-white/80 text-sm">with {attorneyName}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close booking modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Calendly Embed */}
              <div className="h-[600px] overflow-hidden">
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule a consultation"
                  className="border-0"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

