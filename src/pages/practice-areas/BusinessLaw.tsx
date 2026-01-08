import { MarketTicker } from '@/components/marketing/MarketTicker'
import { PracticeAreaHero, PracticeAreaProfessionals } from '@/components/practice-areas'
import { BusinessEntityComparison, ContractRiskAnalyzer } from '@/components/tools'

export function BusinessLaw() {
  const attorneyNames = [
    'Jaclyn M. Flint',
    'Kathleen Hart',
    'Eric M. Hylton',
    'Anthony R. Jost',
    'Ryan L. Leitch',
    'Courtney David Mills',
    'Katie S. Riles',
    'Raymond T. Seach',
    'Justin O. Sorrell',
    'Kevin N. Tharp',
    'John L. Egloff',
    'Blair R. Vandivier',
    'Lindsay A. Llewellyn',
    'Patrick S. McCarney',
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <MarketTicker />

      {/* Hero Section */}
      <PracticeAreaHero
        title="Business & Corporate Law"
        description="The business law attorneys of Riley Bennett Egloff offer a comprehensive range of legal services for their business clients, from formation to dissolution, handling all of the various legal issues that a business can face."
        slug="business-law"
      />

      {/* Content */}
      <div className="section-container py-12">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Selection & Formation</h2>
            <p>
              Choosing the right business structure is one of the most important decisions you'll make. Our attorneys
              help you evaluate your options and select the entity type that best fits your business goals, tax
              considerations, and liability concerns.
            </p>
            <p>We provide comprehensive formation services including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Drafting articles of incorporation and organization</li>
              <li>Preparing bylaws and operating agreements</li>
              <li>Stock issuance and ownership structuring</li>
              <li>Shareholder and partnership agreements</li>
              <li>Compliance with state and federal registration requirements</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">Contract Review</h2>
            <p>
              Well-drafted contracts are the foundation of successful business relationships. Our team meticulously
              reviews and negotiates contracts to protect your interests and minimize the risk of future disputes.
            </p>
            <p>We handle all types of business contracts, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Vendor and supplier agreements</li>
              <li>Customer and service contracts</li>
              <li>Employment and independent contractor agreements</li>
              <li>Non-disclosure and confidentiality agreements</li>
              <li>Purchase and sale agreements</li>
              <li>Licensing and franchise agreements</li>
            </ul>
            <p className="mt-4">Our careful attention to detail in the drafting phase helps avoid costly litigation down the road.</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">Consultation & Advice</h2>
            <p>
              Running a business involves making countless decisions with legal implications. Our attorneys serve as
              trusted advisors, providing guidance on day-to-day operations and strategic initiatives.
            </p>
            <p>We offer counsel on:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Employment relations and HR policies</li>
              <li>Intellectual property protection strategies</li>
              <li>Risk management and insurance coverage</li>
              <li>Regulatory compliance and licensing</li>
              <li>Mergers, acquisitions, and business sales</li>
              <li>Corporate governance best practices</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">Succession Planning</h2>
            <p>
              Effective succession planning ensures business continuity while addressing tax efficiency, operational
              stability, and personal goals. Whether you're planning for retirement, considering bringing in new partners,
              or preparing for unforeseen circumstances, we help you develop a comprehensive succession strategy.
            </p>
            <p>Our succession planning services address:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tax-efficient ownership transition strategies</li>
              <li>Buy-sell agreements and valuation methods</li>
              <li>Leadership transition planning</li>
              <li>Estate planning integration</li>
              <li>Family business succession</li>
              <li>Key employee retention and incentive programs</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">Dispute Resolution</h2>
            <p>
              When business disputes arise—whether internal conflicts among owners or external disputes with vendors,
              customers, or competitors—our attorneys work diligently to find efficient resolutions while protecting
              your business interests.
            </p>
            <p>We handle:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Shareholder and partnership disputes</li>
              <li>Contract disputes and breach of contract claims</li>
              <li>Business divorce and dissolution</li>
              <li>Non-compete and trade secret enforcement</li>
              <li>Mediation and arbitration</li>
              <li>Commercial litigation when necessary</li>
            </ul>
          </div>

          <div className="mt-8 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-2 text-xl font-bold text-gray-900">Ready to Discuss Your Business Needs?</h3>
            <p className="mb-4 text-gray-600">
              Our experienced business law team is here to help you navigate the complexities of running and growing
              your business. Whether you're just starting out or looking to take your established business to the next
              level, we're ready to provide the strategic legal counsel you need.
            </p>
            <a href="/contact" className="inline-block rounded-lg bg-rbe-navy px-6 py-3 text-white hover:bg-rbe-navy/90">Schedule a Consultation</a>
          </div>
        </div>

      </div>
      
      {/* Tools: Business Entity Comparison */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          <BusinessEntityComparison />
        </div>
      </section>

      {/* Tools: Contract Risk Analyzer */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="section-container">
          <ContractRiskAnalyzer />
        </div>
      </section>

      {/* Professionals Section */}
      <PracticeAreaProfessionals
        title="Professionals in Business & Corporate Law"
        attorneyNames={attorneyNames}
      />
    </div>
  )
}
