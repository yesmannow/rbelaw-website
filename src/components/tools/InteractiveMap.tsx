import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Mail, Phone } from 'lucide-react'
import districtData from '@/lib/data/district-data.json'

interface District {
  district: number
  counties: string[]
  judge: {
    name: string
    title: string
  }
  courtReporter: {
    name: string
    email: string
    phone: string
  }
  boardMembers: Array<{
    name: string
    role: string
  }>
}

interface InteractiveMapProps {
  // eslint-disable-next-line no-unused-vars
  onDistrictSelect?: (district: District) => void
}

export function InteractiveMap({ onDistrictSelect }: InteractiveMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null)
  const districts = districtData as District[]

  const handleDistrictClick = (district: District) => {
    setSelectedDistrict(district)
    if (onDistrictSelect) {
      onDistrictSelect(district)
    }
  }

  return (
    <div className="relative w-full h-[600px] bg-neutral-900 rounded-lg overflow-hidden">
      {/* Map Container - Using SVG representation of Indiana */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white/20 text-6xl font-serif font-bold mb-4">INDIANA</div>
          <p className="text-white/40 text-sm">
            Interactive map visualization
            <br />
            <span className="text-xs">Hover over districts to see details</span>
          </p>
        </div>
      </div>

      {/* District Overlay Grid */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-8">
        {districts.map((district) => (
          <motion.button
            key={district.district}
            className="relative bg-primary-navy/30 hover:bg-primary-navy/50 border-2 border-white/20 hover:border-accent-gold rounded-lg p-4 transition-all duration-300"
            onMouseEnter={() => setHoveredDistrict(district)}
            onMouseLeave={() => setHoveredDistrict(null)}
            onClick={() => handleDistrictClick(district)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-white">
              <div className="text-2xl font-serif font-bold text-accent-gold mb-2">
                District {district.district}
              </div>
              <div className="text-sm text-white/80">
                <div className="font-semibold mb-1">{district.judge.name}</div>
                <div className="text-xs text-white/60">
                  {district.counties.length} {district.counties.length === 1 ? 'County' : 'Counties'}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredDistrict && !selectedDistrict && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 bg-primary-navy/95 backdrop-blur-lg border border-accent-gold/30 rounded-lg p-4 shadow-2xl z-10"
          >
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-serif font-bold text-white mb-2">
                  District {hoveredDistrict.district} - {hoveredDistrict.judge.name}
                </h3>
                <p className="text-white/80 text-sm mb-2">
                  <span className="font-semibold">Counties:</span>{' '}
                  {hoveredDistrict.counties.slice(0, 3).join(', ')}
                  {hoveredDistrict.counties.length > 3 && '...'}
                </p>
                <p className="text-white/60 text-xs">
                  Click to view full district information
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* District Dossier Card */}
      <AnimatePresence>
        {selectedDistrict && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="absolute top-0 right-0 bottom-0 w-full md:w-96 bg-primary-navy backdrop-blur-lg border-l border-accent-gold/30 shadow-2xl z-20 overflow-y-auto"
          >
            <div className="p-6">
              <button
                onClick={() => setSelectedDistrict(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                aria-label="Close district dossier"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <h2 className="text-3xl font-serif font-bold text-accent-gold mb-2">
                  District {selectedDistrict.district}
                </h2>
                <p className="text-white/80 text-sm">
                  Workers' Compensation District Information
                </p>
              </div>

              <div className="space-y-6">
                {/* Judge Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Judge</h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white font-semibold">{selectedDistrict.judge.name}</p>
                    <p className="text-white/60 text-sm">{selectedDistrict.judge.title}</p>
                  </div>
                </div>

                {/* Court Reporter */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Court Reporter</h3>
                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <p className="text-white font-semibold">{selectedDistrict.courtReporter.name}</p>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${selectedDistrict.courtReporter.email}`}
                        className="hover:text-accent-gold transition-colors"
                      >
                        {selectedDistrict.courtReporter.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Phone className="h-4 w-4" />
                      <a
                        href={`tel:${selectedDistrict.courtReporter.phone}`}
                        className="hover:text-accent-gold transition-colors"
                      >
                        {selectedDistrict.courtReporter.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Counties */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Counties ({selectedDistrict.counties.length})
                  </h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedDistrict.counties.map((county) => (
                        <span
                          key={county}
                          className="bg-accent-gold/20 text-accent-gold px-3 py-1 rounded text-sm font-medium"
                        >
                          {county}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Board Members */}
                {selectedDistrict.boardMembers && selectedDistrict.boardMembers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Board Members</h3>
                    <div className="bg-white/5 rounded-lg p-4 space-y-2">
                      {selectedDistrict.boardMembers.map((member, index) => (
                        <div key={index} className="text-white">
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-white/60 text-sm">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
