import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { ContentPageLayout } from '../../components/layout'
import { getIndustryPageBySlug } from '../../lib/data/industryPages'
import { getCaseResultsByIndustry } from '../../lib/data/caseResults'
import { CaseResultsGrid } from '../../components/ui/CaseResultCard'
import { SEO } from '../../components/seo/SEO'
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData'

export function IndustryPage() {
  const { slug } = useParams<{ slug: string }>()
  const industryPage = slug ? getIndustryPageBySlug(slug) : undefined

  if (!industryPage) {
    return (
      <div className="section-container py-20">
        <h1 className="heading-primary mb-4">Industry Not Found</h1>
        <Link to="/industries" className="text-accent-gold hover:underline">
          ← Back to Industries
        </Link>
      </div>
    )
  }

  // Get case results for this industry
  const caseResults = getCaseResultsByIndustry(industryPage.slug)

  return (
    <>
      <SEO
        title={industryPage.title}
        description={industryPage.description}
        canonical={`/industries/${industryPage.slug}`}
        image={industryPage.heroImage}
      />
      
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Industries', url: '/industries' },
          { name: industryPage.name, url: `/industries/${industryPage.slug}` }
        ]}
      />

      {industryPage.faqs && industryPage.faqs.length > 0 && (
        <FAQSchema faqs={industryPage.faqs} />
      )}

      <ContentPageLayout
        title={industryPage.title}
        subtitle={industryPage.description}
        relatedAttorneys={industryPage.relatedAttorneys || []}
      >
        {/* Hero Image */}
        {industryPage.heroImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={industryPage.heroImage}
              alt={industryPage.name}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Detailed Description */}
        <div className="prose prose-lg max-w-none mb-12">
          {industryPage.detailedDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-lg text-neutral-700 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Services */}
        {industryPage.services && industryPage.services.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary-navy mb-6">
              Our {industryPage.name} Legal Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industryPage.services.map((service, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent-gold mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-neutral-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Case Results */}
        {caseResults.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary-navy mb-6">
              {industryPage.name} Case Results
            </h2>
            <CaseResultsGrid caseResults={caseResults.slice(0, 4)} />
          </div>
        )}

        {/* FAQs */}
        {industryPage.faqs && industryPage.faqs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary-navy mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {industryPage.faqs.map((faq) => (
                <div key={faq.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-primary-navy text-white p-8 rounded-lg">
          <h3 className="text-2xl font-serif font-semibold mb-4">
            Ready to Discuss Your {industryPage.name} Legal Needs?
          </h3>
          <p className="text-lg mb-6 text-gray-100">
            Our experienced attorneys are here to help. Contact us today for a consultation.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center bg-accent-gold text-white px-8 py-3 rounded-sm font-semibold hover:bg-accent-bronze transition-colors"
          >
            Contact Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </ContentPageLayout>
    </>
  )
}
