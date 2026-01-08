
export interface IndustryManual {
  slug: string
  name: string
  intro: string
  services: string[]
  attorneys: string[] // names to resolve via attorney-helpers
}

export const industriesManual: IndustryManual[] = [
  {
    slug: 'construction',
    name: 'Construction',
    intro:
      'Our construction attorneys assist clients from conception to completion and represent owners, contractors, designers, and suppliers on projects ranging from single-family homes to multimillion-dollar commercial buildings. We draft strong contracts, anticipate disputes, and find cost-effective solutions.',
    services: [
      'Real estate, land use & zoning',
      'Financing and insurance advice',
      'Bid documents and bidding disputes',
      'Contract drafting/negotiation among owners, contractors, subcontractors, architects, suppliers',
      'OSHA compliance; payment claims & mechanic’s liens',
      'Mediation, arbitration, and litigation (state/federal)',
      'Claims analysis for design errors, contract disputes, change orders, delay/acceleration',
    ],
    attorneys: [
      'Jeffrey B. Fecht','Anthony R. Jost','Ryan L. Leitch','Sarah MacGill Marr','Katie R. Osborne','Laura S. Reed','Katie S. Riles','Raymond T. Seach','Donald S. Smith','Justin O. Sorrell'
    ],
  },
  {
    slug: 'finance',
    name: 'Finance',
    intro:
      'We represent banks, credit unions, private equity firms, and other financial institutions with comprehensive regulatory, transactional, and litigation counsel.',
    services: [
      'Preparation and review of private placement memoranda',
      'Labor and employment matters',
      'Review and negotiation of loan documents',
      'Creditor’s-rights litigation; FCRA/FDCPA defense',
    ],
    attorneys: [
      'John L. Egloff','Jeffrey B. Fecht','Kathleen Hart','Anthony R. Jost','Ryan L. Leitch','Katie S. Riles','Raymond T. Seach','Donald S. Smith','Kevin N. Tharp','Timothy H. Button','Blair R. Vandivier'
    ],
  },
  {
    slug: 'government',
    name: 'Government',
    intro:
      'We represent governmental entities of all sizes on a wide range of matters, including litigation, regulatory counsel, and contractual support.',
    services: [
      'Abandoned housing and public-nuisance litigation',
      'Landlord-tenant disputes; market conduct examinations',
      'Defense of civil-rights and personal-injury claims',
      'Contractual matters and general litigation',
    ],
    attorneys: ['Eric M. Hylton','Ryan L. Leitch','Justin O. Sorrell','Timothy H. Button'],
  },
  {
    slug: 'health-care',
    name: 'Health Care',
    intro:
      'A leading health-care litigation practice representing hospitals, physicians, extenders, paramedics, chiropractors, orthodontists, immediate care centers, and nursing homes, plus transactional counsel across employment, real estate, and governance.',
    services: [
      'Defense of medical-malpractice claims',
      'Labor & employment relations; real estate transactions',
      'Contract negotiation and drafting',
      'Corporate governance, M&A, and business litigation',
    ],
    attorneys: ['Laura K. Binford','Jeffrey B. Fecht','Anthony R. Jost','Courtney David Mills','Katie R. Osborne','Katie S. Riles','Donald S. Smith','Timothy H. Button'],
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    intro:
      'Decades of experience across the insurance industry, including compliance, market conduct, reinsurance, captives, self-insurance, and strategic transactions; first/third-party defense, bad-faith, and coverage disputes.',
    services: [
      'Regulatory compliance and approvals; market conduct exams; reinsurance; formation/capital structuring',
      'Defense of first- and third-party claims; bad-faith claims',
      'Coverage dispute evaluation and resolution (EUOs to declaratory actions)',
      'Support for insurers, reinsurers, agents, brokers, TPAs, and ASOs',
    ],
    attorneys: ['Jeffrey B. Fecht','Ryan L. Leitch','Sarah MacGill Marr','Katie R. Osborne','Laura S. Reed','Raymond T. Seach','Donald S. Smith','Timothy H. Button','James W. Riley Jr.'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    intro:
      'We represent manufacturers and suppliers from privately held businesses to publicly traded conglomerates, leveraging multi-disciplinary teams.',
    services: [
      'IP acquisition, registration, licensing, and litigation',
      'Product-liability defense',
      'Non-compete and contractual disputes',
      'Product supply and distribution agreements',
      'Insurance coverage litigation and M&A',
    ],
    attorneys: ['Jeffrey B. Fecht','Jaclyn M. Flint','Kathleen Hart','Anthony R. Jost','Ryan L. Leitch','Sarah MacGill Marr','Katie S. Riles','Raymond T. Seach','Donald S. Smith','Timothy H. Button','James W. Riley Jr.','Blair R. Vandivier'],
  },
  {
    slug: 'media',
    name: 'Media',
    intro:
      'We serve clients across the media spectrum, handling communications, media, IT, and IP matters including registration, litigation, and licensing.',
    services: [
      'Copyright & trademark protection and infringement litigation',
      'Defamation, misappropriation of publicity rights, and privacy claims',
      'Domain-name disputes and competitor litigation; USPTO procedures',
      'Software procurement/licensing; technology agreements; M&A',
    ],
    attorneys: ['Jaclyn M. Flint','Kevin N. Tharp','Timothy H. Button'],
  },
  {
    slug: 'food-beverage-service',
    name: 'Restaurant & Hospitality',
    intro:
      'We represent restaurants, manufacturers, processors, distributors, and other retailers on organization, M&A, contracts, IP, and operations.',
    services: [
      'Organizational structuring and business formation',
      'Mergers and acquisitions',
      'General contractual matters',
      'Intellectual-property protection (licensing and litigation)',
      'Dispute resolution; labor & employment; general litigation',
    ],
    attorneys: ['Kathleen Hart','Donald S. Smith','Katie S. Riles','Timothy H. Button'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    intro:
      'Broad-based practice including acquisitions, dispositions, financings, entity formation, leasing, construction contracting, workouts, and restructurings.',
    services: [
      'Acquisitions, dispositions, and financings',
      'Entity formation (LPs, LLCs, JVs, trusts)',
      'Leasing and construction contracts',
      'Workouts and restructurings',
    ],
    attorneys: ['John L. Egloff','Anthony R. Jost','Ryan L. Leitch','Sarah MacGill Marr','Katie S. Riles','Raymond T. Seach','Justin O. Sorrell','Timothy H. Button'],
  },
  {
    slug: 'sports-entertainment',
    name: 'Sports & Entertainment',
    intro:
      'We provide contract negotiation/drafting, dispute resolution, litigation, and IP management for sports organizations and entertainers.',
    services: [
      'Contract negotiation and drafting; dispute resolution',
      'Litigation and intellectual-property management',
    ],
    attorneys: ['Jaclyn M. Flint','Anthony R. Jost'],
  },
  {
    slug: 'technology',
    name: 'Technology',
    intro:
      'We counsel technology rights owners on creation/transfer and registration of IP, and represent clients in infringement and licensing disputes.',
    services: [
      'IP counseling and registration (trademarks, patents, copyrights, trade secrets)',
      'Litigation of IP infringement and licensing breaches',
    ],
    attorneys: ['Jaclyn M. Flint','Anthony R. Jost','Katie S. Riles','Raymond T. Seach','Timothy H. Button','James W. Riley Jr.'],
  },
  {
    slug: 'telecommunications',
    name: 'Telecommunications',
    intro:
      'We advise carriers and closely held companies on regulatory, real estate/land-use, IP, and dark-fiber rights matters.',
    services: [
      'Regulatory counsel for local exchange competition',
      'Real-estate and land-use (leasing, easements, encroachments)',
      'IP registration and infringement litigation',
      'Negotiation and documentation of dark-fiber rights (leases and IRUs)',
    ],
    attorneys: ['Jaclyn M. Flint','Anthony R. Jost','Ryan L. Leitch','Katie S. Riles','Timothy H. Button','John L. Egloff','James W. Riley Jr.'],
  },
  {
    slug: 'transportation',
    name: 'Transportation',
    intro:
      'We represent railroads, motor carriers, shippers, and 3PLs on labor & employment, cargo loss/damage, injury litigation, insurance/indemnity, warranty/title disputes, subrogation, and toxic tort.',
    services: [
      'Labor & employment (union organization, bargaining, discrimination)',
      'Cargo loss/damage/delay; property damage and personal injury litigation',
      'Insurance and indemnity; warranty/title disputes; subrogation',
      'Toxic tort litigation',
    ],
    attorneys: ['Anthony R. Jost','Ryan L. Leitch','Laura S. Reed','Raymond T. Seach','Donald S. Smith','Timothy H. Button'],
  },
  {
    slug: 'wholesale-retail',
    name: 'Wholesale & Retail Sales',
    intro:
      'We serve wholesale and retail clients including food manufacturers, pesticide distributors, janitorial suppliers, restaurants, and wireless providers; employment counsel, product/distribution agreements, M&A, non-compete enforcement, IP protection, and retail store leasing.',
    services: [
      'Employment counsel and day-to-day advice',
      'Product sale and distribution agreements; M&A',
      'Enforcement of non-competition covenants',
      'IP protection (licensing and litigation)',
      'Retail store lease negotiation',
    ],
    attorneys: ['Jeffrey B. Fecht','Anthony R. Jost','Ryan L. Leitch','Katie S. Riles','Timothy H. Button'],
  },
]

export function getIndustryBySlugManual(slug: string) {
  const s = String(slug || '').toLowerCase()
  return industriesManual.find(i => i.slug.toLowerCase() === s)
}

export function getAllIndustriesManual() {
  return industriesManual
}
