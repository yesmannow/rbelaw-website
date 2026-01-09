import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Phone, Mail, MapPin, Users, Scale, Briefcase } from 'lucide-react'
import { attorneys } from '@/lib/utils/attorney-logic'
import { practiceAreas } from '@/lib/data/practiceAreas'
import { getAllIndustriesManual } from '@/lib/data/industries-manual'

interface GlobalSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const industries = getAllIndustriesManual()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  const handleSelect = (callback: () => void) => {
    callback()
    onOpenChange(false)
    setSearch('')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[201] px-4"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
              <Command shouldFilter={true} className="w-full">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200">
                  <Search className="w-5 h-5 text-neutral-400" />
                  <Command.Input
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Search for attorneys, practice areas, industries, or actions..."
                    className="flex-1 bg-transparent outline-none text-primary-navy placeholder:text-neutral-400"
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-500 bg-neutral-100 rounded">
                    ESC
                  </kbd>
                </div>

                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-neutral-500">
                    No results found.
                  </Command.Empty>

                  {/* Actions Group */}
                  <Command.Group heading="Actions" className="mb-2">
                    <Command.Item
                      onSelect={() => handleSelect(() => window.location.href = 'tel:317-636-8000')}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary-burgundy/10 aria-selected:bg-primary-burgundy/10"
                    >
                      <Phone className="w-4 h-4 text-primary-burgundy" />
                      <span className="text-sm">Call Office: 317-636-8000</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleSelect(() => window.location.href = 'mailto:info@rbelaw.com')}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary-burgundy/10 aria-selected:bg-primary-burgundy/10"
                    >
                      <Mail className="w-4 h-4 text-primary-burgundy" />
                      <span className="text-sm">Email Firm: info@rbelaw.com</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleSelect(() => window.open('https://maps.google.com/?q=Riley+Bennett+Egloff+LLP', '_blank'))}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary-burgundy/10 aria-selected:bg-primary-burgundy/10"
                    >
                      <MapPin className="w-4 h-4 text-primary-burgundy" />
                      <span className="text-sm">Get Directions</span>
                    </Command.Item>
                  </Command.Group>

                  {/* Practice Areas Group */}
                  <Command.Group heading="Practice Areas" className="mb-2">
                    {practiceAreas.map((area) => (
                      <Command.Item
                        key={area.id}
                        onSelect={() => handleSelect(() => navigate(`/practice-areas/${area.slug}`))}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary-burgundy/10 aria-selected:bg-primary-burgundy/10"
                        keywords={[area.name, area.description]}
                      >
                        <Scale className="w-4 h-4 text-primary-navy" />
                        <div>
                          <div className="text-sm font-medium">{area.name}</div>
                          <div className="text-xs text-neutral-500">{area.description}</div>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Industries Group */}
                  <Command.Group heading="Industries" className="mb-2">
                    {industries.map((industry) => (
                      <Command.Item
                        key={industry.slug}
                        onSelect={() => handleSelect(() => navigate(`/industries/${industry.slug}`))}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary-burgundy/10 aria-selected:bg-primary-burgundy/10"
                        keywords={[industry.name, industry.intro || '']}
                      >
                        <Briefcase className="w-4 h-4 text-primary-navy" />
                        <div>
                          <div className="text-sm font-medium">{industry.name}</div>
                          {industry.intro && (
                            <div className="text-xs text-neutral-500 line-clamp-1">{industry.intro}</div>
                          )}
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Attorneys Group */}
                  <Command.Group heading="Our Team" className="mb-2">
                    {attorneys.map((attorney) => (
                      <Command.Item
                        key={attorney.id}
                        onSelect={() => handleSelect(() => navigate(`/attorneys/${attorney.id}`))}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary-burgundy/10 aria-selected:bg-primary-burgundy/10"
                        keywords={[attorney.name, attorney.title, attorney.bio]}
                      >
                        <Users className="w-4 h-4 text-primary-navy" />
                        <div>
                          <div className="text-sm font-medium">{attorney.name}</div>
                          <div className="text-xs text-neutral-500">{attorney.title}</div>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
