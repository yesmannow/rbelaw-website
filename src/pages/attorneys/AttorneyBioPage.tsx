import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { Mail, Phone, Linkedin, ArrowLeft, Download } from 'lucide-react'
import { getAttorneyById } from '@/lib/data/attorney-helpers'
import { downloadVCard } from '@/lib/utils/vcard'
import { SEOMeta } from '@/components/seo/SEOMeta'

type TabType = 'biography' | 'matters' | 'publications' | 'awards' | 'community' | 'beyond' | 'videos' | 'education'

export function AttorneyBioPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const attorney = id ? getAttorneyById(id) : null

  const [activeTab, setActiveTab] = useState<TabType>('biography')
  const [dragDirection, setDragDirection] = useState(0)

  if (!attorney) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-primary-navy mb-4">
            Attorney Not Found
          </h1>
          <button
            onClick={() => navigate('/attorneys')}
            className="text-primary-burgundy hover:underline"
          >
            Back to Attorneys
          </button>
        </div>
      </div>
    )
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'biography', label: 'Biography' },
    { id: 'matters', label: 'Representative Matters' },
    { id: 'publications', label: 'Publications' },
    { id: 'awards', label: 'Awards & Recognition' },
    { id: 'community', label: 'Community Activity' },
    { id: 'beyond', label: 'Beyond the Office' },
    { id: 'videos', label: 'Videos' },
    { id: 'education', label: 'Education & Admissions' },
  ]

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    const currentIndex = tabs.findIndex(t => t.id === activeTab)

    if (info.offset.x < -threshold && currentIndex < tabs.length - 1) {
      // Swipe left - next tab
      setDragDirection(-1)
      setActiveTab(tabs[currentIndex + 1].id)
    } else if (info.offset.x > threshold && currentIndex > 0) {
      // Swipe right - previous tab
      setDragDirection(1)
      setActiveTab(tabs[currentIndex - 1].id)
    }
  }

  return (
    <>
      <SEOMeta
        title={attorney.name}
        description={attorney.bio}
        image={attorney.imageUrl}
        type="profile"
        author={attorney.name}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-primary-navy text-white py-12 lg:py-16">
          <div className="section-container">
            <button
              onClick={() => navigate('/attorneys')}
              className="flex items-center gap-2 text-neutral-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Attorneys
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-lg bg-neutral-700 overflow-hidden shadow-xl">
                  <picture>
                    <source
                      srcSet={`/assets/attorneys/${attorney.id}.webp 1x, /assets/attorneys/${attorney.id}@2x.webp 2x`}
                      type="image/webp"
                    />
                    <img
                      src={attorney.imageUrl}
                      alt={attorney.name}
                      className="w-full h-full object-cover"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-avatar.jpg'
                      }}
                    />
                  </picture>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-serif font-bold mb-2">
                  {attorney.name}
                </h1>
                <p className="text-xl text-accent-gold mb-4">{attorney.title}</p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <a
                    href={`tel:${attorney.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-2 text-neutral-200 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {attorney.phone}
                  </a>
                  <a
                    href={`mailto:${attorney.email}`}
                    className="flex items-center gap-2 text-neutral-200 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {attorney.email}
                  </a>
                  {attorney.linkedIn && (
                    <a
                      href={attorney.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-200 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  <button
                    onClick={() => downloadVCard(attorney)}
                    className="flex items-center gap-2 text-neutral-200 hover:text-white transition-colors"
                    title="Download vCard"
                  >
                    <Download className="w-4 h-4" />
                    Download vCard
                  </button>
                </div>

                {attorney.assistant && (
                  <div className="text-sm text-neutral-300">
                    <span className="font-semibold">Assistant:</span>{' '}
                    {attorney.assistantEmail ? (
                      <a href={`mailto:${attorney.assistantEmail}`} className="hover:text-white transition-colors">
                        {attorney.assistant}
                      </a>
                    ) : (
                      attorney.assistant
                    )}
                  </div>
                )}

                {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {attorney.practiceAreas.slice(0, 3).map((area, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/10 text-white text-sm rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-8">
          <div className="section-container">
            {/* Tab Navigation */}
            <div className="flex gap-1 mb-8 bg-neutral-100 p-1 rounded-lg overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setDragDirection(0)
                    setActiveTab(tab.id)
                  }}
                  className={`flex-1 min-w-[120px] px-4 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-burgundy shadow-sm'
                      : 'text-neutral-600 hover:text-primary-navy'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Swipeable Content Area */}
            <div className="relative overflow-hidden">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="touch-pan-y"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{
                      x: dragDirection === 0 ? 0 : dragDirection > 0 ? -300 : 300,
                      opacity: 0,
                    }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                      x: dragDirection === 0 ? 0 : dragDirection > 0 ? 300 : -300,
                      opacity: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="py-8"
                  >
                    {activeTab === 'biography' && (
                      <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                          Biography
                        </h2>
                        <p className="text-neutral-700">{attorney.bio}</p>

                        {attorney.barAdmissions && attorney.barAdmissions.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-xl font-semibold text-primary-navy mb-2">
                              Bar Admissions
                            </h3>
                            <ul className="list-disc list-inside text-neutral-700">
                              {attorney.barAdmissions.map((bar, idx) => (
                                <li key={idx}>{bar}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'matters' && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                          Representative Matters
                        </h2>
                        {attorney.representativeMatters && attorney.representativeMatters.length > 0 ? (
                          <ul className="space-y-4">
                            {attorney.representativeMatters.map((matter, idx) => (
                              <li key={idx} className="border-l-4 border-accent-gold pl-4 py-2">
                                <p className="text-neutral-700 leading-relaxed">{matter.title}</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-neutral-600">No representative matters listed.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'publications' && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                          Publications & Presentations
                        </h2>
                        {attorney.publications && attorney.publications.length > 0 ? (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-semibold text-primary-navy mb-3">Publications</h3>
                              <ul className="space-y-3">
                                {attorney.publications.map((pub, idx) => (
                                  <li key={idx} className="border-l-2 border-neutral-300 pl-4">
                                    {pub.url ? (
                                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-primary-burgundy hover:underline font-medium">
                                        {pub.title}
                                      </a>
                                    ) : (
                                      <p className="font-medium text-neutral-800">{pub.title}</p>
                                    )}
                                    {pub.publication && <p className="text-sm text-neutral-600 mt-1">{pub.publication}</p>}
                                    {pub.date && <p className="text-sm text-neutral-500">{pub.date}</p>}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {attorney.presentations && attorney.presentations.length > 0 && (
                              <div>
                                <h3 className="text-xl font-semibold text-primary-navy mb-3">Presentations</h3>
                                <ul className="space-y-2">
                                  {attorney.presentations.map((pres, idx) => (
                                    <li key={idx} className="text-neutral-700">• {pres}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-neutral-600">No publications or presentations listed.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'awards' && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                          Awards & Recognition
                        </h2>
                        {attorney.awards && attorney.awards.length > 0 ? (
                          <ul className="space-y-2">
                            {attorney.awards.map((award, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-accent-gold text-xl">★</span>
                                <span className="text-neutral-700">{award}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-neutral-600">No awards or recognition listed.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'community' && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                          Community Activity
                        </h2>
                        {attorney.community && attorney.community.length > 0 ? (
                          <ul className="space-y-2">
                            {attorney.community.map((activity, idx) => (
                              <li key={idx} className="text-neutral-700">• {activity}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-neutral-600">No community activities listed.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'beyond' && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                          Beyond the Office
                        </h2>
                        {attorney.beyondOffice ? (
                          <div className="prose prose-lg max-w-none">
                            <p className="text-neutral-700 leading-relaxed">{attorney.beyondOffice}</p>
                          </div>
                        ) : (
                          <p className="text-neutral-600">No personal information available.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'videos' && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                          Videos
                        </h2>
                        {attorney.videos && attorney.videos.length > 0 ? (
                          <div className="grid gap-6 md:grid-cols-2">
                            {attorney.videos.map((video, idx) => (
                              <div key={idx} className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                <a href={video.url} target="_blank" rel="noopener noreferrer" className="block">
                                  <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                                    <span className="text-4xl text-neutral-400">▶</span>
                                  </div>
                                  <div className="p-4">
                                    <h3 className="font-semibold text-primary-navy hover:text-primary-burgundy">{video.title}</h3>
                                    {video.date && <p className="text-sm text-neutral-500 mt-1">{video.date}</p>}
                                  </div>
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-neutral-600">No videos available.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'education' && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                          Education
                        </h2>
                        {attorney.education && attorney.education.length > 0 ? (
                          <div className="space-y-4">
                            {attorney.education.map((edu, idx) => (
                              <div key={idx} className="border-l-4 border-primary-burgundy pl-4">
                                <h3 className="text-lg font-semibold text-primary-navy">
                                  {edu.degree}
                                </h3>
                                <p className="text-neutral-700">{edu.institution}</p>
                                <p className="text-sm text-neutral-500">{edu.year}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-neutral-600">Education information not available.</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Swipe hint */}
              <div className="mt-8 text-center text-sm text-neutral-500 md:hidden">
                <p>← Swipe to navigate between sections →</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
