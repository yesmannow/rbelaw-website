import { MarketTicker } from '@/components/marketing/MarketTicker'
import { PracticeAreaHero } from '@/components/practice-areas/PracticeAreaHero'
import { AttorneyCard } from '@/components/attorneys'
import { getAttorneysByPracticeArea } from '@/lib/data/attorney-helpers'
import type { ReactNode } from 'react'

interface Section {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

interface PracticeAreaTemplateProps {
  slug: string
  title: string
  intro: string
  sections?: Section[]
  children?: ReactNode
}

export function PracticeAreaTemplate({ slug, title, intro, sections = [], children }: PracticeAreaTemplateProps) {
  const team = getAttorneysByPracticeArea(title)

  return (
    <div className="min-h-screen bg-neutral-50">
      <MarketTicker />

      {/* Hero */}
      <PracticeAreaHero
        title={title}
        description={intro}
        slug={slug}
      />

      {/* Content */}
      <div className="section-container py-12">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="prose prose-lg max-w-none">
            {sections.map((s, i) => (
              <div key={i} className={i > 0 ? 'mt-8' : ''}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h2>
                {s.paragraphs?.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1">
                    {s.bullets.map((b, bi) => (<li key={bi}>{b}</li>))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-2 text-xl font-bold text-gray-900">How Can We Help?</h3>
            <p className="mb-4 text-gray-600">
              Speak with our {title} team to get clear, practical guidance tailored to your goals.
            </p>
            <a href="/contact" className="inline-block rounded-lg bg-rbe-navy px-6 py-3 text-white hover:bg-rbe-navy/90">Contact Us</a>
          </div>
        </div>

      </div>

      {children}

      {/* Professionals Section */}
      {team.length > 0 && (
        <section className="py-16 lg:py-20 bg-neutral-50">
          <div className="section-container">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-8">
              Professionals in {title}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((attorney, index) => (
                <AttorneyCard
                  key={attorney.id}
                  attorney={attorney}
                  index={index}
                  showContact={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
    </div>
  )
}
