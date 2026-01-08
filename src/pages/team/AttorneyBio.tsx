import { useParams, Navigate } from 'react-router-dom'
import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReactToPrint } from 'react-to-print'
import { getAttorneyById } from '@/lib/data/attorney-helpers'
import { BioHero } from '@/components/team/BioHero'
import { BioStickyNav } from '@/components/team/BioStickyNav'
import { PrintableBioTemplate } from '@/components/team/PrintableBioTemplate'
import { Search } from 'lucide-react'

const bioSections = [
  { id: 'biography', label: 'Biography' },
  { id: 'representative-matters', label: 'Representative Matters' },
  { id: 'education', label: 'Education' },
  { id: 'associations', label: 'Associations' },
  { id: 'community', label: 'Community' }
]

export function AttorneyBio() {
  const { id } = useParams<{ id: string }>()
  const attorney = id ? getAttorneyById(id) : undefined
  const printRef = useRef<HTMLDivElement>(null)
  const [matterFilter, setMatterFilter] = useState('')

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${attorney?.name} - Bio`,
  })

  const filteredMatters = useMemo(() => {
    return attorney?.representativeMatters?.filter(matter =>
      matter.title.toLowerCase().includes(matterFilter.toLowerCase()) ||
      matter.description.toLowerCase().includes(matterFilter.toLowerCase())
    ) || []
  }, [attorney?.representativeMatters, matterFilter])

  if (!attorney) {
    return <Navigate to="/attorneys" replace />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <BioHero attorney={attorney} onPrint={handlePrint} />

      {/* Sticky Navigation */}
      <BioStickyNav sections={bioSections} />

      {/* Content Sections */}
      <div className="section-container py-12 lg:py-16">
        {/* Biography Section */}
        <motion.section
          id="biography"
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-primary-navy mb-6">Biography</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-700 leading-relaxed">{attorney.bio}</p>
          </div>
        </motion.section>

        {/* Representative Matters Section */}
        {attorney.representativeMatters && attorney.representativeMatters.length > 0 && (
          <motion.section
            id="representative-matters"
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-3xl font-bold text-primary-navy mb-4 md:mb-0">
                Representative Matters
              </h2>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search matters..."
                  value={matterFilter}
                  onChange={(e) => setMatterFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                />
              </div>
            </div>
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredMatters.length > 0 ? (
                  filteredMatters.map((matter, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="p-6 bg-neutral-50 rounded-lg border border-neutral-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-primary-navy">
                          {matter.title}
                        </h3>
                        {matter.year && (
                          <span className="text-sm text-neutral-500 font-medium">
                            {matter.year}
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-700">{matter.description}</p>
                      {matter.practiceArea && (
                        <span className="inline-block mt-3 px-3 py-1 bg-accent-gold/20 text-primary-navy text-sm rounded-full">
                          {matter.practiceArea}
                        </span>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 text-center py-8"
                  >
                    No matters found matching your search.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {attorney.education && attorney.education.length > 0 && (
          <motion.section
            id="education"
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-primary-navy mb-6">Education</h2>
            <div className="space-y-4">
              {attorney.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-6 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <h3 className="text-xl font-semibold text-primary-navy mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-neutral-700">{edu.institution}</p>
                  <p className="text-neutral-600 text-sm mt-1">{edu.year}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Associations Section */}
        {attorney.associations && attorney.associations.length > 0 && (
          <motion.section
            id="associations"
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-primary-navy mb-6">
              Professional Associations
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {attorney.associations.map((association, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <span className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-neutral-700">{association}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Community Section */}
        {attorney.community && attorney.community.length > 0 && (
          <motion.section
            id="community"
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-primary-navy mb-6">
              Community Involvement
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {attorney.community.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <span className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}
      </div>

      {/* Hidden Print Template */}
      <div style={{ display: 'none' }}>
        <PrintableBioTemplate ref={printRef} attorney={attorney} />
      </div>
    </div>
  )
}
