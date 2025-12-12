import { useParams, Link } from 'react-router-dom'
import { ContentPageLayout } from '../../components/layout'
import { getIndustryBySlug } from '../../lib/data'

export function IndustryPage() {
  const { slug } = useParams<{ slug: string }>()
  const industry = slug ? getIndustryBySlug(slug) : undefined

  if (!industry) {
    return (
      <div className="section-container py-20">
        <h1 className="heading-primary mb-4">Industry Not Found</h1>
        <Link to="/industries" className="text-accent-gold hover:underline">
          ← Back to Industries
        </Link>
      </div>
    )
  }

  return (
    <ContentPageLayout
      title={industry.name}
      subtitle={industry.description}
      relatedAttorneys={industry.relatedAttorneys || []}
    >
      <p className="text-lg text-neutral-700 leading-relaxed mb-6">
        {industry.detailedDescription || industry.description}
      </p>

      <p className="text-lg text-neutral-700 leading-relaxed">
        Riley Bennett Egloff has extensive experience serving clients in the {industry.name.toLowerCase()} industry. 
        Our attorneys understand the unique legal challenges and regulatory requirements that businesses in this 
        sector face every day.
      </p>

      <div className="mt-10 bg-neutral-50 p-8 rounded-sm border border-neutral-200">
        <h3 className="text-2xl font-serif font-semibold text-primary-navy mb-4">
          Industry-Specific Legal Services
        </h3>
        <p className="text-neutral-700 mb-6 leading-relaxed">
          Whether you need assistance with contracts, compliance, litigation, or strategic business planning, 
          our team is ready to provide the specialized legal counsel you need to succeed in {industry.name.toLowerCase()}.
        </p>
        <Link 
          to="/contact" 
          className="inline-block bg-accent-gold text-white px-8 py-3 rounded-sm font-semibold hover:bg-accent-bronze transition-colors"
        >
          Contact Our Team
        </Link>
      </div>
    </ContentPageLayout>
  )
}
