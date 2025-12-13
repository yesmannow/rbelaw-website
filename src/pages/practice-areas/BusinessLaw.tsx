import { ContentPageLayout } from '../../components/layout'
import { Accordion, AccordionItem } from '../../components/ui'
import { MarketTicker } from '@/components/marketing/MarketTicker'

export function BusinessLaw() {
  const relatedAttorneys = [
    'Jaclyn Flint',
    'Kathleen Hart',
    'Eric M. Hylton',
    'Anthony R. Jost',
    'Ryan L. Leitch',
    'Courtney David Mills',
    'Katie Riles',
    'Raymond Seach',
    'Justin Sorrell',
    'Kevin Tharp',
    'John Egloff',
    'Blair Vandivier',
    'Lindsay Llewellyn',
    'Patrick McCarney'
  ]

  return (
    <>
      <MarketTicker />
      <ContentPageLayout
        title="Business & Corporate Law"
        subtitle="Comprehensive legal services from formation to dissolution."
        relatedAttorneys={relatedAttorneys}
      >
      <div className="mb-10">
        <p className="text-lg text-neutral-700 leading-relaxed mb-6">
          Riley Bennett Egloff provides comprehensive legal counsel to businesses at every stage of their lifecycle.
          From entity formation to succession planning and dissolution, our experienced attorneys understand the
          complex legal landscape that businesses navigate daily.
        </p>
        <p className="text-lg text-neutral-700 leading-relaxed">
          We work closely with business owners, executives, and entrepreneurs to provide strategic guidance that
          protects their interests while enabling growth and success. Our team combines deep legal expertise with
          practical business acumen to deliver solutions that work in the real world.
        </p>
      </div>

      <h2 className="text-3xl font-serif font-semibold text-primary-navy mb-6 mt-10">
        Our Services
      </h2>

      <Accordion className="mb-10">
        <AccordionItem title="Business Entity Selection & Formation" defaultOpen>
          <p className="mb-4">
            Choosing the right business structure is one of the most important decisions you'll make. Our attorneys
            help you evaluate your options and select the entity type that best fits your business goals, tax
            considerations, and liability concerns.
          </p>
          <p className="mb-4">We provide comprehensive formation services including:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Drafting articles of incorporation and organization</li>
            <li>Preparing bylaws and operating agreements</li>
            <li>Stock issuance and ownership structuring</li>
            <li>Shareholder and partnership agreements</li>
            <li>Compliance with state and federal registration requirements</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="Contract Review & Negotiation">
          <p className="mb-4">
            Well-drafted contracts are the foundation of successful business relationships. Our team meticulously
            reviews and negotiates contracts to protect your interests and minimize the risk of future disputes.
          </p>
          <p className="mb-4">We handle all types of business contracts, including:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Vendor and supplier agreements</li>
            <li>Customer and service contracts</li>
            <li>Employment and independent contractor agreements</li>
            <li>Non-disclosure and confidentiality agreements</li>
            <li>Purchase and sale agreements</li>
            <li>Licensing and franchise agreements</li>
          </ul>
          <p className="mt-4">
            Our careful attention to detail in the drafting phase helps avoid costly litigation down the road.
          </p>
        </AccordionItem>

        <AccordionItem title="Consultation & Strategic Advice">
          <p className="mb-4">
            Running a business involves making countless decisions with legal implications. Our attorneys serve as
            trusted advisors, providing guidance on day-to-day operations and strategic initiatives.
          </p>
          <p className="mb-4">We offer counsel on:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Employment relations and HR policies</li>
            <li>Intellectual property protection strategies</li>
            <li>Risk management and insurance coverage</li>
            <li>Regulatory compliance and licensing</li>
            <li>Mergers, acquisitions, and business sales</li>
            <li>Corporate governance best practices</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="Succession Planning">
          <p className="mb-4">
            Effective succession planning ensures business continuity while addressing tax efficiency, operational
            stability, and personal goals. Whether you're planning for retirement, considering bringing in new partners,
            or preparing for unforeseen circumstances, we help you develop a comprehensive succession strategy.
          </p>
          <p className="mb-4">Our succession planning services address:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Tax-efficient ownership transition strategies</li>
            <li>Buy-sell agreements and valuation methods</li>
            <li>Leadership transition planning</li>
            <li>Estate planning integration</li>
            <li>Family business succession</li>
            <li>Key employee retention and incentive programs</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="Dispute Resolution">
          <p className="mb-4">
            When business disputes arise—whether internal conflicts among owners or external disputes with vendors,
            customers, or competitors—our attorneys work diligently to find efficient resolutions while protecting
            your business interests.
          </p>
          <p className="mb-4">We handle:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Shareholder and partnership disputes</li>
            <li>Contract disputes and breach of contract claims</li>
            <li>Business divorce and dissolution</li>
            <li>Non-compete and trade secret enforcement</li>
            <li>Mediation and arbitration</li>
            <li>Commercial litigation when necessary</li>
          </ul>
          <p className="mt-4">
            Our goal is always to resolve disputes efficiently and cost-effectively, avoiding litigation when possible
            while being fully prepared to advocate vigorously in court when required.
          </p>
        </AccordionItem>
      </Accordion>

      <div className="bg-neutral-50 p-8 rounded-sm border border-neutral-200 mt-12">
        <h3 className="text-2xl font-serif font-semibold text-primary-navy mb-4">
          Ready to Discuss Your Business Needs?
        </h3>
        <p className="text-neutral-700 mb-6 leading-relaxed">
          Our experienced business law team is here to help you navigate the complexities of running and growing
          your business. Whether you're just starting out or looking to take your established business to the next
          level, we're ready to provide the strategic legal counsel you need.
        </p>
        <a href="/contact" className="inline-block bg-accent-gold text-white px-8 py-3 rounded-sm font-semibold hover:bg-accent-bronze transition-colors">
          Schedule a Consultation
        </a>
      </div>
    </ContentPageLayout>
    </>
  )
}
