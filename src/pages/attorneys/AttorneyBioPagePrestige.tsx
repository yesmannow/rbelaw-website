/**
 * Enhanced Attorney Bio Page - Prestige Version
 * Smart tab logic, sticky prestige bar, personal insights grid
 */

import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { Mail, Phone, Linkedin, ArrowLeft, Download, FileText } from 'lucide-react'
import { getAttorneyById } from '@/lib/utils/attorney-logic'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { getAttorneyImages } from '@/lib/utils/attorney-images'
import { useArticlesByAuthor } from '@/lib/utils/linker'
import { blogPosts } from '@/lib/data'
import { BlogCard } from '@/components/blog/BlogCard'
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar'
import { Accordion, AccordionItem, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import type { Attorney } from '@/lib/types'
import { getPracticeAreaImages } from '@/lib/utils/practiceAreaImages'

type TabType = 'biography' | 'matters' | 'publications' | 'awards' | 'beyond' | 'videos'

interface TabConfig {
  id: TabType
  label: string
  // eslint-disable-next-line no-unused-vars
  hasContent: (attorney: Attorney) => boolean
}

const hasBiographyContent: TabConfig['hasContent'] = () => true

const ALL_TABS: TabConfig[] = [
  {
    id: 'biography',
    label: 'Biography',
    hasContent: hasBiographyContent,
  },
  {
    id: 'matters',
    label: 'Representative Matters',
    hasContent: (atty: Attorney) =>
      atty.representativeMatters !== undefined && atty.representativeMatters.length > 0,
  },
  {
    id: 'publications',
    label: 'Publications',
    hasContent: (atty: Attorney) => atty.publications !== undefined && atty.publications.length > 0,
  },
  {
    id: 'awards',
    label: 'Awards & Recognition',
    hasContent: (atty: Attorney) => atty.awards !== undefined && atty.awards.length > 0,
  },
  {
    id: 'beyond',
    label: 'Beyond the Office',
    hasContent: (atty: Attorney) => atty.beyondOffice !== undefined && atty.beyondOffice.trim().length > 0,
  },
  {
    id: 'videos',
    label: 'Videos',
    hasContent: (atty: Attorney) => atty.videos !== undefined && atty.videos.length > 0,
  },
]

function AtAGlanceCard({ attorney }: { attorney: Attorney }) {
  return (
    <Card className="border-neutral-200 shadow-soft">
      <CardHeader>
        <CardTitle className="text-primary-navy">At a glance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-primary-navy mb-2">Practice areas</h4>
            <div className="flex flex-wrap gap-2">
              {attorney.practiceAreas.map((area, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs">
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {attorney.industries && attorney.industries.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-primary-navy mb-2">Industries</h4>
            <div className="flex flex-wrap gap-2">
              {attorney.industries.map((ind, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        )}

        {(attorney.associations && attorney.associations.length > 0) ||
        (attorney.education && attorney.education.length > 0) ||
        (attorney.barAdmissions && attorney.barAdmissions.length > 0) ? (
          <Accordion className="rounded-lg border border-neutral-200 bg-white">
            {attorney.associations && attorney.associations.length > 0 && (
              <AccordionItem title="Associations">
                <ul className="space-y-2">
                  {attorney.associations.map((a, idx) => (
                    <li key={idx} className="text-sm text-neutral-700">
                      {a}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            )}

            {attorney.education && attorney.education.length > 0 && (
              <AccordionItem title="Education">
                <ul className="space-y-2">
                  {attorney.education.map((edu, idx) => (
                    <li key={idx} className="text-sm text-neutral-700">
                      {edu.institution || edu.degree}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            )}

            {attorney.barAdmissions && attorney.barAdmissions.length > 0 && (
              <AccordionItem title="Bar Admissions">
                <ul className="space-y-2">
                  {attorney.barAdmissions.map((bar, idx) => (
                    <li key={idx} className="text-sm text-neutral-700">
                      {bar}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            )}
          </Accordion>
        ) : null}

        {attorney.bioPdfUrl && (
          <div className="flex flex-col gap-2">
            <a
              href={attorney.bioPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-prestige-gold px-4 py-2 text-sm font-semibold text-prestige-gold transition-all hover:bg-prestige-gold/10"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download bio (PDF)
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function AttorneyBioPagePrestige() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const attorney = id ? getAttorneyById(id) : null

  const [activeTab, setActiveTab] = useState<TabType>('biography')
  const [dragDirection, setDragDirection] = useState(0)

  // Get top 3 articles by this attorney
  const authorArticles = useArticlesByAuthor(blogPosts, attorney?.id || null, 3)

  const availableTabs = useMemo(
    () => (attorney ? ALL_TABS.filter((tab) => tab.hasContent(attorney)) : []),
    [attorney]
  )

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

  // vCard path for direct download
  const vCardPath = `/vcards/${attorney.id}.vcf`

  const pickPrimaryPracticeAreaSlug = (atty: Attorney): string | null => {
    const rawAreas = atty.practiceAreas ?? []
    if (rawAreas.length === 0) return null

    const norm = (s: string) =>
      s
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9\s-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    const areas = rawAreas.map(norm)

    type Candidate = {
      slug:
        | 'labor-employment'
        | 'employment-law'
        | 'bankruptcy-reorganization'
        | 'construction'
        | 'family-law'
        | 'government-law'
        | 'health-care'
        | 'insurance'
        | 'commercial-litigation'
        | 'business-litigation'
        | 'business-law'
      priority: number // higher wins ties
      patterns: Array<{ re: RegExp; weight: number }>
      // eslint-disable-next-line no-unused-vars
      bonus?: (areasNorm: string[]) => number
    }

    const candidates: Candidate[] = [
      {
        slug: 'labor-employment',
        priority: 100,
        patterns: [
          { re: /\blabor and employment\b/, weight: 30 },
          { re: /\blabor employment\b/, weight: 24 },
          { re: /\blabor law\b/, weight: 12 },
          { re: /\bemployment law\b/, weight: 12 },
          { re: /\blabor\b/, weight: 6 },
          { re: /\bemployment\b/, weight: 6 },
          { re: /\bworkplace\b/, weight: 4 },
          { re: /\bhr\b/, weight: 2 },
        ],
        bonus: (areasNorm) => {
          const hasLabor = areasNorm.some(a => /\blabor\b/.test(a))
          const hasEmployment = areasNorm.some(a => /\bemployment\b/.test(a))
          // If both appear anywhere, strongly prefer the combined hero.
          return hasLabor && hasEmployment ? 18 : 0
        },
      },
      {
        slug: 'employment-law',
        priority: 60,
        patterns: [
          { re: /\bemployment law\b/, weight: 18 },
          { re: /\bemployment\b/, weight: 10 },
          { re: /\bworkplace\b/, weight: 6 },
          { re: /\bhr\b/, weight: 3 },
        ],
      },
      {
        slug: 'bankruptcy-reorganization',
        priority: 55,
        patterns: [
          { re: /\bbankruptcy\b/, weight: 18 },
          { re: /\breorganization\b/, weight: 10 },
          { re: /\binsolvenc(y|e)\b/, weight: 10 },
          { re: /\bcreditor(s)?\b/, weight: 6 },
        ],
      },
      {
        slug: 'construction',
        priority: 50,
        patterns: [
          { re: /\bconstruction\b/, weight: 18 },
          { re: /\bmechanic(s)? lien(s)?\b/, weight: 10 },
          { re: /\blien(s)?\b/, weight: 6 },
          { re: /\bcontract(s)?\b/, weight: 4 },
        ],
      },
      {
        slug: 'commercial-litigation',
        priority: 48,
        patterns: [
          { re: /\bcommercial litigation\b/, weight: 22 },
          { re: /\bcommercial\b/, weight: 8 },
          { re: /\blitigation\b/, weight: 6 },
        ],
      },
      {
        slug: 'business-litigation',
        priority: 46,
        patterns: [
          { re: /\bbusiness litigation\b/, weight: 22 },
          { re: /\blitigation\b/, weight: 7 },
          { re: /\bdispute(s)?\b/, weight: 4 },
        ],
      },
      {
        slug: 'business-law',
        priority: 44,
        patterns: [
          { re: /\bbusiness and corporate law\b/, weight: 22 },
          { re: /\bcorporate\b/, weight: 10 },
          { re: /\bbusiness\b/, weight: 8 },
          { re: /\btransaction(s)?\b/, weight: 6 },
          { re: /\bgovernance\b/, weight: 5 },
        ],
      },
      {
        slug: 'insurance',
        priority: 42,
        patterns: [
          { re: /\binsurance\b/, weight: 18 },
          { re: /\bcoverage\b/, weight: 10 },
          { re: /\bbad faith\b/, weight: 10 },
          { re: /\bclaim(s)?\b/, weight: 4 },
        ],
      },
      {
        slug: 'health-care',
        priority: 40,
        patterns: [
          { re: /\bhealth care\b/, weight: 18 },
          { re: /\bhealthcare\b/, weight: 18 },
          { re: /\bhealth\b/, weight: 8 },
          { re: /\bmedical\b/, weight: 6 },
          { re: /\bhospital\b/, weight: 6 },
        ],
      },
      {
        slug: 'government-law',
        priority: 38,
        patterns: [
          { re: /\bgovernment law\b/, weight: 18 },
          { re: /\bgovernment\b/, weight: 8 },
          { re: /\bmunicipal\b/, weight: 6 },
          { re: /\bpublic\b/, weight: 4 },
        ],
      },
      {
        slug: 'family-law',
        priority: 36,
        patterns: [
          { re: /\bfamily law\b/, weight: 18 },
          { re: /\bfamily\b/, weight: 8 },
          { re: /\bdivorce\b/, weight: 8 },
          { re: /\bcustody\b/, weight: 8 },
          { re: /\bparenting\b/, weight: 5 },
        ],
      },
    ]

    const scoreCandidate = (c: Candidate) => {
      let score = 0
      for (const a of areas) {
        for (const p of c.patterns) {
          if (p.re.test(a)) score += p.weight
        }
      }
      if (c.bonus) score += c.bonus(areas)
      return score
    }

    const scored = candidates
      .map(c => ({ c, score: scoreCandidate(c) }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return b.c.priority - a.c.priority
      })

    const best = scored[0]
    // Confidence threshold: avoid picking a hero when the match is weak/ambiguous.
    if (!best || best.score < 10) return null
    return best.c.slug
  }

  const primaryPracticeAreaSlug = pickPrimaryPracticeAreaSlug(attorney)
  const primaryPracticeAreaImages = primaryPracticeAreaSlug ? getPracticeAreaImages(primaryPracticeAreaSlug) : null
  const defaultBioHero = '/images/hero/Riley-Bennett-Egloff-Attorneys-at-Law-Indianapolis-Reception-Area-DSC_1220-1-scaled-1.jpg'

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
        description={typeof attorney.bio === 'string' ? attorney.bio : attorney.bio.join(' ')}
        image={attorney.image}
        type="profile"
        author={attorney.name}
      />

      <div className="min-h-screen pb-32">
        {/* Hero Section */}
        <section className="relative min-h-[500px] lg:min-h-[600px] overflow-hidden text-white">
          {/* Background image (practice-area first, fallback to default office) */}
          <div className="absolute inset-0">
            {primaryPracticeAreaImages ? (
              <picture className="absolute inset-0">
                <source srcSet={primaryPracticeAreaImages.avif} type="image/avif" />
                <source srcSet={primaryPracticeAreaImages.webp} type="image/webp" />
                <img
                  src={primaryPracticeAreaImages.fallback}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />
              </picture>
            ) : (
              <img
                src={defaultBioHero}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            )}
            {/* Dark overlay for readability (match PracticeAreaTemplate feel) */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/80 via-primary-navy/70 to-primary-slate/85" />
          </div>

          <div className="section-container relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-24">
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
                      const images = getAttorneyImages(attorney.name, attorney.image)
                      return (
                        <>
                          <source srcSet={images.avif} type="image/avif" />
                          <source srcSet={images.webp} type="image/webp" />
                          <img
                            src={images.fallback}
                            alt={attorney.name}
                            className="w-full h-full object-cover attorney-portrait"
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
                <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-3 text-blue-50 drop-shadow-sm">
                  {attorney.name}
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100/90 drop-shadow-sm mb-6">{attorney.title}</p>

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

          {/* Decorative bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
        </section>

        {/* Sticky Prestige Bar - Glassmorphism CTA */}
        <div className="sticky top-0 z-40 glass-stat-card border-b border-prestige-gold/20 shadow-lg">
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
                {attorney.fax && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-2 text-primary-navy font-medium">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Fax</span>
                      {attorney.fax}
                    </span>
                  </>
                )}
                {attorney.assistant?.name && (
                  <>
                    <span className="text-gray-300">•</span>
                    {attorney.assistant.email ? (
                      <a
                        href={`mailto:${attorney.assistant.email}`}
                        className="flex items-center gap-2 text-primary-navy hover:text-prestige-gold transition-colors font-medium"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Assistant</span>
                        {attorney.assistant.name}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-primary-navy font-medium">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Assistant</span>
                        {attorney.assistant.name}
                      </span>
                    )}
                  </>
                )}
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
                {attorney.bioPdfUrl && (
                  <a
                    href={attorney.bioPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-prestige-gold px-4 py-2 text-sm font-semibold text-prestige-gold transition-all hover:bg-prestige-gold/10"
                  >
                    <FileText className="w-4 h-4" />
                    Download Bio
                  </a>
                )}
                {/* Direct vCard download link */}
                <a
                  href={vCardPath}
                  download={`${attorney.name.replace(/\s+/g, '_')}.vcf`}
                  className="flex items-center gap-2 rounded-lg bg-prestige-gold px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-prestige-gold/90 hover:shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Download vCard
                </a>
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
                    <div className="grid lg:grid-cols-3 gap-10 items-start">
                      {/* Main editorial column */}
                      <div className="lg:col-span-2">
                        {/* Biography Tab */}
                        {activeTab === 'biography' && attorney.bio && (
                          <div className="prose prose-lg max-w-none">
                            <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                              Biography
                            </h2>
                            {typeof attorney.bio === 'string' ? (
                              <p className="text-neutral-700 whitespace-pre-line">{attorney.bio}</p>
                            ) : (
                              attorney.bio.map((paragraph, idx) => (
                                <p key={idx} className="text-neutral-700 mb-4">{paragraph}</p>
                              ))
                            )}
                          </div>
                        )}

                        {/* Representative Matters */}
                        {activeTab === 'matters' && (
                          <div>
                            <h2 className="text-2xl font-serif font-bold text-primary-navy mb-6">
                              Representative Matters
                            </h2>
                            <Accordion className="rounded-lg border border-neutral-200 bg-white">
                              <AccordionItem title={`Matters (${attorney.representativeMatters?.length ?? 0})`} defaultOpen={true}>
                                <ul className="space-y-3">
                                  {attorney.representativeMatters?.map((m, idx) => (
                                    <li key={idx} className="text-neutral-700 text-sm leading-relaxed border-l-4 border-prestige-gold pl-4 py-1">
                                      {m}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        )}

                        {/* Publications */}
                        {activeTab === 'publications' && (
                          <div>
                            <h2 className="text-2xl font-serif font-bold text-primary-navy mb-6">
                              Publications
                            </h2>
                            <Accordion className="rounded-lg border border-neutral-200 bg-white">
                              <AccordionItem title={`Publications (${attorney.publications?.length ?? 0})`} defaultOpen={true}>
                                <ul className="space-y-3">
                                  {(attorney.publications ?? []).map((p, idx) => (
                                    <li key={idx} className="text-sm text-neutral-700">
                                      {p.url ? (
                                        <a className="text-primary-navy hover:text-prestige-gold hover:underline font-semibold" href={p.url} target="_blank" rel="noopener noreferrer">
                                          {p.title}
                                        </a>
                                      ) : (
                                        <span className="font-semibold">{p.title}</span>
                                      )}
                                      {p.date && <span className="text-neutral-500"> — {p.date}</span>}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        )}

                        {/* Awards */}
                        {activeTab === 'awards' && (
                          <div>
                            <h2 className="text-2xl font-serif font-bold text-primary-navy mb-6">
                              Awards & Recognition
                            </h2>
                            <Accordion className="rounded-lg border border-neutral-200 bg-white">
                              <AccordionItem title={`Awards (${attorney.awards?.length ?? 0})`} defaultOpen={true}>
                                <ul className="space-y-3">
                                  {attorney.awards?.map((a, idx) => (
                                    <li key={idx} className="text-neutral-700 text-sm leading-relaxed border-l-4 border-prestige-gold pl-4 py-1">
                                      {a}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        )}

                        {/* Beyond the Office */}
                        {activeTab === 'beyond' && (
                          <div className="prose prose-lg max-w-none">
                            <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                              Beyond the Office
                            </h2>
                            <p className="text-neutral-700 whitespace-pre-line">
                              {attorney.beyondOffice}
                            </p>
                          </div>
                        )}

                        {/* Videos */}
                        {activeTab === 'videos' && (
                          <div>
                            <h2 className="text-2xl font-serif font-bold text-primary-navy mb-6">
                              Videos
                            </h2>
                            <div className="space-y-3">
                              {(attorney.videos ?? []).map((v, idx) => (
                                <a
                                  key={idx}
                                  href={v.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block rounded-lg border border-neutral-200 bg-white p-4 hover:shadow-soft transition-shadow"
                                >
                                  <div className="font-semibold text-primary-navy">{v.title}</div>
                                  {v.date && <div className="text-sm text-neutral-500">{v.date}</div>}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sidebar */}
                      <aside className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
                        <AtAGlanceCard attorney={attorney} />
                      </aside>
                    </div>
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
