import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Linkedin, ArrowLeft } from 'lucide-react'
import { getAttorneyById } from '@/lib/data/attorneys'
import { SEOMeta } from '@/components/seo/SEOMeta'

type TabType = 'biography' | 'matters' | 'education'

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
    { id: 'education', label: 'Education' },
  ]

  const handleDragEnd = (_event: any, info: any) => {
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
                <div className="w-48 h-48 rounded-lg bg-neutral-700 overflow-hidden">
                  <img
                    src={attorney.imageUrl}
                    alt={attorney.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-avatar.jpg'
                    }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-serif font-bold mb-2">
                  {attorney.name}
                </h1>
                <p className="text-xl text-accent-gold mb-6">{attorney.title}</p>

                <div className="flex flex-wrap gap-4">
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
                </div>
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
                        <p className="text-neutral-600">
                          Representative matters information will be available soon.
                        </p>
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
