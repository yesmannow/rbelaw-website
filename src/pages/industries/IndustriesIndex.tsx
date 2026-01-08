import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { getAllIndustriesManual } from '@/lib/data/industries-manual'

export function IndustriesIndex() {
  const industries = getAllIndustriesManual()

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOMeta
        title="Industries Served – Riley Bennett Egloff LLP"
        description="Our attorneys provide a full range of legal services across construction, finance, healthcare, insurance, technology, and more."
      />
      <PageHeader
        title="Industries Served"
        subtitle="Our attorneys provide a full range of legal services, representing clients in virtually every industry."
      />

      <div className="section-container py-12">
        <p className="mb-8 text-gray-700 max-w-4xl">
          We partner with businesses of all sizes and stages—from emerging startups to established enterprises—and
          collaborate across practice areas to help you achieve practical, business‑minded results.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              to={`/industries/${ind.slug}`}
              className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-rbe-navy">{ind.name}</h3>
              {ind.intro && (
                <p className="text-sm text-gray-600 line-clamp-3">{ind.intro}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IndustriesIndex
