import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, Download, MapPin } from 'lucide-react'
import type { Attorney } from '@/lib/types'
import { getAttorneyThumbnailImage } from '@/lib/utils/attorney-images'

interface StickyContactCardProps {
  attorney: Attorney
  onScheduleClick: () => void
}

export function StickyContactCard({ attorney, onScheduleClick }: StickyContactCardProps) {
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${attorney.name}
TITLE:${attorney.title}
EMAIL:${attorney.email}
TEL:${attorney.phone}
ORG:Riley Bennett Egloff LLP
URL:https://rbelaw.com/attorneys/${attorney.id}
END:VCARD`

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${attorney.name.replace(/\s+/g, '_')}.vcf`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 bg-white rounded-xl border-2 border-neutral-200 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-navy to-primary-slate p-6 text-white">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 mb-4 mx-auto">
          <img
            src={getAttorneyThumbnailImage(attorney.id, attorney.imageThumb)}
            alt={attorney.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-bold text-center mb-1">{attorney.name}</h3>
        <p className="text-sm text-accent-gold text-center">{attorney.title}</p>
      </div>

      {/* Contact Info */}
      <div className="p-6 space-y-3">
        <a
          href={`tel:${attorney.phone.replace(/\D/g, '')}`}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
        >
          <div className="p-2 bg-accent-gold/10 rounded-lg group-hover:bg-accent-gold/20 transition-colors">
            <Phone className="h-4 w-4 text-accent-gold" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-neutral-500 font-medium">Phone</div>
            <div className="text-sm font-semibold text-primary-navy">{attorney.phone}</div>
          </div>
        </a>

        <a
          href={`mailto:${attorney.email}`}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
        >
          <div className="p-2 bg-accent-gold/10 rounded-lg group-hover:bg-accent-gold/20 transition-colors">
            <Mail className="h-4 w-4 text-accent-gold" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-neutral-500 font-medium">Email</div>
            <div className="text-sm font-semibold text-primary-navy break-all">{attorney.email}</div>
          </div>
        </a>

        <div className="flex items-center gap-3 p-3">
          <div className="p-2 bg-accent-gold/10 rounded-lg">
            <MapPin className="h-4 w-4 text-accent-gold" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-neutral-500 font-medium">Office</div>
            <div className="text-sm font-semibold text-primary-navy">Indianapolis, IN</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 pt-0 space-y-3">
        <button
          onClick={onScheduleClick}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-gold hover:bg-accent-gold/90 text-primary-navy rounded-lg font-semibold transition-all duration-300 group"
        >
          <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span>Schedule Consultation</span>
        </button>

        <button
          onClick={handleDownloadVCard}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-primary-navy rounded-lg font-medium transition-all duration-300 group"
        >
          <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
          <span>Download vCard</span>
        </button>
      </div>

      {/* Footer */}
      <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-600 text-center">
          Available for consultations Monday-Friday, 9am-5pm EST
        </p>
      </div>
    </motion.div>
  )
}
