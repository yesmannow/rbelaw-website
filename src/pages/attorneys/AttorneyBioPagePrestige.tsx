/**
 * Enhanced Attorney Bio Page - Prestige Version
 * Smart tab logic, sticky prestige bar, personal insights grid
 */

import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { Mail, Phone, Linkedin, ArrowLeft, Download } from 'lucide-react'
import { getAttorneyById } from '@/lib/data/attorney-helpers'
import { downloadVCard } from '@/lib/utils/vcard'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { getAttorneyImages } from '@/lib/utils/attorney-images'
import { useArticlesByAuthor } from '@/lib/utils/linker'
import { blogPosts } from '@/lib/data'
import { BlogCard } from '@/components/blog/BlogCard'
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar'
import type { Attorney } from '@/lib/types'

type TabType = 'biography' | 'matters' | 'publications' | 'awards' | 'community' | 'beyond' | 'videos' | 'education'

interface TabConfig {
  id: TabType
  label: string
  hasContent: (attorney: Attorney) => boolean
}

export function AttorneyBioPagePrestige() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const attorney = id ? getAttorneyById(id) : null

  const [activeTab, setActiveTab] = useState<TabType>('biography')
  const [dragDirection, setDragDirection] = useState(0)

  // Get top 3 articles by this attorney
  const authorArticles = useArticlesByAuthor(blogPosts, attorney?.id || null, 3)

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

  // Smart Tab Logic - Only show tabs with content
  const allTabs: TabConfig[] = [
    { 
      id: 'biography', 
      label: 'Biography',
      hasContent: (_atty: Attorney) => true // Always show biography
    },
    { 
      id: 'matters', 
      label: 'Representative Matters',
      hasContent: (atty: Attorney) => atty.representativeMatters !== undefined && atty.representativeMatters.length > 0
    },
    { 
      id: 'publications', 
      label: 'Publications',
      hasContent: (atty: Attorney) => atty.publications !== undefined && atty.publications.length > 0
    },
    { 
      id: 'awards', 
      label: 'Awards & Recognition',
      hasContent: (atty: Attorney) => atty.awards !== undefined && atty.awards.length > 0
    },
    { 
      id: 'community', 
      label: 'Community Activity',
      hasContent: (atty: Attorney) => (atty.associations !== undefined && atty.associations.length > 0) || (atty.community !== undefined && atty.community.length > 0)
    },
    { 
      id: 'beyond', 
      label: 'Beyond the Office',
      hasContent: (atty: Attorney) => atty.beyondOffice !== undefined && atty.beyondOffice.trim().length > 0
    },
    { 
      id: 'videos', 
      label: 'Videos',
      hasContent: (atty: Attorney) => atty.videos !== undefined && atty.videos.length > 0
    },
    { 
      id: 'education', 
      label: 'Education & Admissions',
      hasContent: (atty: Attorney) => (atty.education && atty.education.length > 0) || (atty.barAdmissions && atty.barAdmissions.length > 0)
    },
  ]

  // Filter tabs to only show those with content
  const availableTabs = useMemo(() => 
    allTabs.filter(tab => tab.hasContent(attorney)),
    [attorney]
  )

  // vCard path for direct download
  const vCardPath = `/vcards/${attorney.id}.vcf`

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    const currentIndex = availableTabs.findIndex(t => t.id === activeTab)

    if (info.offset.x < -threshold && currentIndex < availableTabs.length - 1) {
      setDragDirection(-1)
      setActiveTab(availableTabs[currentIndex + 1].id)
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setDragDirection(1)
      setActiveTab(availableTabs[currentIndex - 1].id)
    }
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />
      
      <SEOMeta
        title={attorney.name}
        description={attorney.bio || ''}
        image={attorney.imageUrl}
        type="profile"
        author={attorney.name}
      />

      <div className="min-h-screen pb-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-navy via-primary-navy to-primary-slate text-white pt-24 pb-16 lg:pt-32 lg:pb-20">
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
                <div className="w-56 h-56 lg:w-64 lg:h-64 rounded-xl bg-neutral-700 overflow-hidden shadow-2xl ring-4 ring-white/10">
                  <picture>
                    {(() => {
                      const images = getAttorneyImages(attorney.name, attorney.imageUrl)
                      return (
                        <>
                          <source srcSet={images.avif} type="image/avif" />
                          <source srcSet={images.webp} type="image/webp" />
                          <img
                            src={images.fallback}
                            alt={attorney.name}
                            className="w-full h-full object-cover"
                            loading="eager"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-avatar.jpg'
                            }}
                          />
                        </>
                      )
                    })()}
                  </picture>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-3">
                  {attorney.name}
                </h1>
                <p className="text-xl lg:text-2xl text-prestige-gold mb-6">{attorney.title}</p>

                {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {attorney.practiceAreas.slice(0, 3).map((area, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white/10 text-white text-sm rounded-full backdrop-blur-sm"
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

        {/* Sticky Prestige Bar - Glassmorphism CTA */}
        <div className="sticky top-0 z-50 glass-stat-card border-b border-prestige-gold/20 shadow-lg">
          <div className="section-container py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <a
                  href={`mailto:${attorney.email}`}
                  className="flex items-center gap-2 text-primary-navy hover:text-prestige-gold transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  {attorney.email}
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href={`tel:${attorney.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-primary-navy hover:text-prestige-gold transition-colors font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {attorney.phone}
                </a>
                {attorney.linkedIn && (
                  <>
                    <span className="text-gray-300">•</span>
                    <a
                      href={attorney.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-navy hover:text-prestige-gold transition-colors font-medium"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {/* Direct vCard download link */}
                <a
                  href={vCardPath}
                  download={`${attorney.name.replace(/\s+/g, '_')}.vcf`}
                  className="flex items-center gap-2 rounded-lg bg-prestige-gold px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-prestige-gold/90 hover:shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Download vCard
                </a>
                
                {/* Fallback button if direct download doesn't work */}
                <button
                  onClick={() => downloadVCard(attorney!)}
                  className="flex items-center gap-2 rounded-lg border border-prestige-gold px-4 py-2 text-sm font-semibold text-prestige-gold transition-all hover:bg-prestige-gold/10"
                  title="Generate vCard"
                >
                  <Download className="w-4 h-4" />
                  vCard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <section className="py-8">
          <div className="section-container">
            {/* Smart Tab Navigation - Only visible tabs */}
            <div className="flex gap-1 mb-8 bg-neutral-100 p-1 rounded-lg overflow-x-auto">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setDragDirection(0)
                    setActiveTab(tab.id)
                  }}
                  className={`flex-1 min-w-[120px] px-4 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-navy shadow-lg border-b-2 border-prestige-gold'
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
                    {/* Biography Tab */}
                    {activeTab === 'biography' && attorney.bio && (
                      <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                          Biography
                        </h2>
                        <p className="text-neutral-700 whitespace-pre-line">{attorney.bio}</p>
                      </div>
                    )}

                    {/* Other tabs with content checks */}
                    {activeTab === 'education' && (
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-primary-navy mb-6">
                          Education & Bar Admissions
                        </h2>
                        
                        {attorney.education && attorney.education.length > 0 && (
                          <div className="mb-8">
                            <h3 className="text-xl font-semibold text-primary-navy mb-3">Education</h3>
                            <ul className="space-y-2 text-neutral-700">
                              {attorney.education.map((edu, idx) => (
                                <li key={idx} className="border-l-4 border-prestige-gold pl-4 py-2">
                                  {typeof edu === 'string' ? edu : `${edu.degree}, ${edu.institution}`}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {attorney.barAdmissions && attorney.barAdmissions.length > 0 && (
                          <div>
                            <h3 className="text-xl font-semibold text-primary-navy mb-3">Bar Admissions</h3>
                            <ul className="space-y-2 text-neutral-700">
                              {attorney.barAdmissions.map((bar, idx) => (
                                <li key={idx} className="border-l-4 border-prestige-gold pl-4 py-2">
                                  {bar}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Add other tab content as needed */}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Personal Insights Grid - Top 3 Articles */}
        {authorArticles.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="section-container">
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-primary-navy mb-2">
                  Insights from {attorney.name.split(' ')[0]}
                </h2>
                <p className="text-gray-600">
                  Recent articles and thought leadership
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {authorArticles.map((article, index) => (
                  <BlogCard key={article.id} post={article} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
