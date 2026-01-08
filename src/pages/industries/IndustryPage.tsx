import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { getIndustryBySlugManual } from '@/lib/data/industries-manual'
import { attorneys } from '@/lib/data/attorney-helpers'

export default function IndustryPage() {
  const { slug } = useParams()
  const industry = slug ? getIndustryBySlugManual(slug) : undefined

  if (!industry) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Industry Not Found" subtitle="The page you are looking for does not exist." />
        <div className="section-container py-12">
          <Link to="/industries" className="text-rbe-burgundy hover:underline">← Back to Industries</Link>
        </div>
      </div>
    )
  }

  const resolveAttorney = (name: string) => attorneys.find(a => a.name === name)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-rbe-burgundy to-rbe-navy py-16 text-white">
        <div className="section-container">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{industry.name}</h1>
          <p className="text-lg text-white/90 max-w-4xl">{industry.intro}</p>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Services */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Key Services</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            {industry.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Professionals */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Professionals in {industry.name}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industry.attorneys.map((n) => {
              const a = resolveAttorney(n)
              const first = n.split(' ')[0]
              const card = (
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  {a?.imageUrl && (
                    <img src={a.imageUrl} alt={n} className="mb-4 h-56 w-full rounded-md object-cover shadow" loading="lazy" />
                  )}
                  <div className="mb-1 font-semibold text-gray-900">{n}</div>
                  <div className="mb-3 text-sm text-rbe-burgundy font-semibold">{a?.title || ''}</div>
                  <div>
                    <a
                      href={a?.email ? `mailto:${a.email}` : '/contact'}
                      className="text-rbe-burgundy hover:underline"
                      aria-label={`Email ${n}`}
                    >
                      email {first}
                    </a>
                  </div>
                </div>
              )
              return (
                <div key={n}>
                  {a?.id ? (
                    <Link to={`/attorneys/${a.id}`}>{card}</Link>
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
