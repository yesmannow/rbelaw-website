import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { practiceAreas } from '@/lib/data'

export function PracticeAreasIndex() {
  const areas = practiceAreas

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Practice Areas"
        subtitle="Explore our full range of services, each tailored to help you achieve your goals."
      />

      <div className="section-container py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Link
              key={area.id}
              to={`/practice-areas/${area.slug}`}
              className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-rbe-navy">
                {area.name}
              </h3>
              {area.description && (
                <p className="text-sm text-gray-600">{area.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PracticeAreasIndex
