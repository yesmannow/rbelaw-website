import { MarketTicker } from '@/components/marketing/MarketTicker'
import { attorneys } from '@/lib/data/attorney-helpers'
import { Scale, Landmark } from 'lucide-react'
import { getPracticeAreaHero } from '@/lib/data/practiceAreaHeroes'
import { Link } from 'react-router-dom'

export function BankruptcyReorganization() {
  const intro = "Our focus is on maximizing our clients' recovery in a timely and cost-effective manner. Our attorneys have substantial experience collecting monies owed to our business clients, ranging from thousands to hundreds of millions of dollars."

  const team: { name: string; role: string }[] = [
    { name: 'Anthony R. Jost', role: 'Partner' },
    { name: 'Eric M. Hylton', role: 'Partner' },
    { name: 'Justin O. Sorrell', role: 'Partner' },
  ]

  const getEmail = (name: string): string => {
    const a = attorneys.find((x) => x.name === name)
    return a?.email || ''
  }
  const getImage = (name: string): string | undefined => {
    const a = attorneys.find((x) => x.name === name)
    return a?.imageUrl
  }
  const getId = (name: string): string | undefined => {
    const a = attorneys.find((x) => x.name === name)
    return a?.id
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketTicker />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-rbe-navy to-rbe-burgundy py-20 text-white">
        {(() => { const hero = getPracticeAreaHero('bankruptcy-reorganization'); return hero ? (
          <>
            <img src={hero.src} srcSet={hero.srcset} alt="Bankruptcy & Reorganization hero" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-rbe-navy/80 to-rbe-burgundy/70" />
          </>
        ) : null })()}
        <div className="section-container relative">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Bankruptcy & Reorganization</h1>
          <p className="text-lg text-white/90">{intro}</p>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-12">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <Scale className="h-5 w-5 text-rbe-navy" />
                <h2 className="m-0 text-2xl font-bold text-gray-900">Creditor’s Rights</h2>
              </div>
              <p>
                Our bankruptcy and reorganization attorneys represent creditors in state courts and federal bankruptcy courts,
                including complex litigation and restructuring matters.
              </p>
              <p className="mb-2">Representative areas include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Foreclosures and deeds-in-lieu of foreclosure</li>
                <li>Appointment of receivers</li>
                <li>Replevin, garnishment, and attachment proceedings (pre- and post-judgment)</li>
                <li>Uniform Commercial Code (UCC) issues</li>
              </ul>
            </div>

            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-rbe-burgundy" />
                <h2 className="m-0 text-2xl font-bold text-gray-900">Debt Relief</h2>
              </div>
              <p>
                We help individuals, businesses, and investors evaluate and pursue options under the U.S. Bankruptcy Code,
                including Chapter 7 liquidation and Chapter 11 or 13 reorganization.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-2 text-xl font-bold text-gray-900">Focused on Practical Results</h3>
            <p className="mb-4 text-gray-600">
              We prioritize timely, cost-effective strategies that protect our clients’ interests and maximize recovery.
            </p>
            <a href="/contact" className="inline-block rounded-lg bg-rbe-navy px-6 py-3 text-white hover:bg-rbe-navy/90">Contact Us</a>
          </div>
        </div>

        {/* Team Grid */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Professionals in Bankruptcy & Reorganization Law</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p) => {
              const email = getEmail(p.name)
              const img = getImage(p.name)
              const id = getId(p.name)
              const first = p.name.split(' ')[0]
              const card = (
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  {img && (
                    <img src={img} alt={p.name} className="mb-4 h-56 w-full rounded-md object-cover shadow" loading="lazy" />
                  )}
                  <div className="mb-1 font-semibold text-gray-900">{p.name}</div>
                  <div className="mb-3 text-sm text-rbe-burgundy font-semibold">{p.role}</div>
                  <div>
                    <a
                      href={email ? `mailto:${email}` : '/contact'}
                      className="text-rbe-burgundy hover:underline"
                      aria-label={`Email ${p.name}`}
                    >
                      email {first}
                    </a>
                  </div>
                </div>
              )
              return (
                <div key={p.name}>
                  {id ? (
                    <Link to={`/attorneys/${id}`}>{card}</Link>
                  ) : (
                    card
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
