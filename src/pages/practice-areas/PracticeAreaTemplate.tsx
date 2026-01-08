import { MarketTicker } from '@/components/marketing/MarketTicker'
import { getPracticeAreaHero } from '@/lib/data/practiceAreaHeroes'
import { getAttorneysByPracticeArea } from '@/lib/data/attorney-helpers'
import { Link } from 'react-router-dom'

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
}

export function PracticeAreaTemplate({ slug, title, intro, sections = [] }: PracticeAreaTemplateProps) {
  const team = getAttorneysByPracticeArea(title)

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketTicker />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-rbe-navy to-rbe-burgundy py-20 text-white">
        {(() => { const hero = getPracticeAreaHero(slug); return hero ? (
          <>
            <img src={hero.src} srcSet={hero.srcset} alt={`${title} hero`} className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-rbe-navy/80 to-rbe-burgundy/70" />
          </>
        ) : null })()}
        <div className="section-container relative">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="text-lg text-white/90">{intro}</p>
        </div>
      </div>

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

        {/* Team Grid */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Professionals in {title}</h2>
          {team.length === 0 ? (
            <p className="text-neutral-600">Attorney information will be added soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((a) => {
                const first = a.name.split(' ')[0]
                const card = (
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    {a.imageUrl && (
                      <img src={a.imageUrl} alt={a.name} className="mb-4 h-56 w-full rounded-md object-cover shadow" loading="lazy" />
                    )}
                    <div className="mb-1 font-semibold text-gray-900">{a.name}</div>
                    <div className="mb-3 text-sm text-rbe-burgundy font-semibold">{a.title}</div>
                    <div>
                      <a
                        href={a.email ? `mailto:${a.email}` : '/contact'}
                        className="text-rbe-burgundy hover:underline"
                        aria-label={`Email ${a.name}`}
                      >
                        email {first}
                      </a>
                    </div>
                  </div>
                )
                return (
                  <div key={a.id}>
                    {a.id ? (
                      <Link to={`/attorneys/${a.id}`}>{card}</Link>
                    ) : (
                      card
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
