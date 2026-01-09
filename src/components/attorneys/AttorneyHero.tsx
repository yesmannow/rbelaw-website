import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Download, Calendar, MapPin } from 'lucide-react'
import type { Attorney } from '@/lib/types'

interface AttorneyHeroProps {
  attorney: Attorney
  onScheduleClick: () => void
}

export function AttorneyHero({ attorney, onScheduleClick }: AttorneyHeroProps) {
  const handleDownloadVCard = () => {
    // Generate vCard data
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
    <section className="relative bg-gradient-to-br from-primary-navy via-primary-slate to-primary-navy text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="section-container relative z-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-gold to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-neutral-800 border-4 border-white/10">
                <img
                  src={attorney.image}
                  alt={attorney.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-avatar.jpg'
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
              {attorney.name}
            </h1>
            <p className="text-2xl text-accent-gold mb-6 font-semibold">
              {attorney.title}
            </p>

            {/* Practice Areas Badges */}
            {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {attorney.practiceAreas.slice(0, 4).map((areaId, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
                  >
                    {areaId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href={`tel:${attorney.phone.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 group"
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{attorney.phone}</span>
              </a>

              <a
                href={`mailto:${attorney.email}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Email</span>
              </a>

              <button
                onClick={onScheduleClick}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-gold hover:bg-accent-gold/90 text-primary-navy rounded-lg font-semibold transition-all duration-300 group"
              >
                <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Schedule Consultation</span>
              </button>

              <button
                onClick={handleDownloadVCard}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 group"
              >
                <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Download vCard</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {attorney.linkedIn && (
                <a
                  href={attorney.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-200 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Connect on LinkedIn</span>
                </a>
              )}
              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Indianapolis, IN</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
