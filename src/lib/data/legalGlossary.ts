export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: string
  relatedTerms?: string[]
  practiceArea?: string
}

export const legalGlossaryTerms: GlossaryTerm[] = [
  // Employment Law Terms
  {
    id: 'at-will-employment',
    term: 'At-Will Employment',
    definition: 'An employment relationship where either the employer or employee can terminate the relationship at any time, for any legal reason, with or without notice. However, terminations cannot be for illegal reasons such as discrimination or retaliation.',
    category: 'Employment Law',
    relatedTerms: ['wrongful-termination', 'employment-contract'],
    practiceArea: 'employment-law'
  },
  {
    id: 'flsa',
    term: 'FLSA (Fair Labor Standards Act)',
    definition: 'Federal law that establishes minimum wage, overtime pay, recordkeeping, and youth employment standards. It requires non-exempt employees to be paid overtime (1.5x regular rate) for hours worked over 40 in a workweek.',
    category: 'Employment Law',
    relatedTerms: ['exempt-employee', 'overtime', 'minimum-wage'],
    practiceArea: 'employment-law'
  },
  {
    id: 'exempt-employee',
    term: 'Exempt Employee',
    definition: 'An employee who is exempt from FLSA overtime requirements. To be exempt, an employee must meet specific salary and duties tests (executive, administrative, professional, computer, or outside sales exemptions).',
    category: 'Employment Law',
    relatedTerms: ['flsa', 'non-exempt-employee', 'overtime'],
    practiceArea: 'employment-law'
  },
  {
    id: 'fmla',
    term: 'FMLA (Family and Medical Leave Act)',
    definition: 'Federal law requiring covered employers (50+ employees) to provide eligible employees up to 12 weeks of unpaid, job-protected leave per year for specified family and medical reasons.',
    category: 'Employment Law',
    relatedTerms: ['job-protection', 'medical-leave'],
    practiceArea: 'employment-law'
  },
  {
    id: 'hostile-work-environment',
    term: 'Hostile Work Environment',
    definition: 'A form of workplace harassment where unwelcome conduct based on protected characteristics (race, sex, religion, etc.) is severe or pervasive enough to create an intimidating, hostile, or offensive work environment.',
    category: 'Employment Law',
    relatedTerms: ['harassment', 'discrimination', 'protected-class'],
    practiceArea: 'employment-law'
  },

  // Construction Law Terms
  {
    id: 'mechanics-lien',
    term: "Mechanic's Lien",
    definition: 'A security interest in real property granted to contractors, subcontractors, and suppliers who have provided labor or materials for improvements to the property. It ensures payment by allowing the lienholder to force a sale of the property if not paid.',
    category: 'Construction Law',
    relatedTerms: ['notice-to-owner', 'lien-waiver', 'construction-contract'],
    practiceArea: 'construction-law'
  },
  {
    id: 'notice-to-owner',
    term: 'Notice to Owner',
    definition: 'A preliminary notice required in Indiana that subcontractors and suppliers must send to property owners to preserve their mechanic\'s lien rights. Must be sent within 60 days (residential) or 90 days (commercial) of first furnishing labor or materials.',
    category: 'Construction Law',
    relatedTerms: ['mechanics-lien', 'subcontractor', 'lien-deadline'],
    practiceArea: 'construction-law'
  },
  {
    id: 'retainage',
    term: 'Retainage',
    definition: 'A percentage (typically 5-10%) of each progress payment withheld by the owner until project completion to ensure the contractor completes all work satisfactorily and addresses any defects.',
    category: 'Construction Law',
    relatedTerms: ['progress-payment', 'construction-contract', 'final-payment'],
    practiceArea: 'construction-law'
  },
  {
    id: 'change-order',
    term: 'Change Order',
    definition: 'A written document signed by both parties that modifies the original construction contract scope, schedule, or price. Essential for documenting changes and avoiding disputes.',
    category: 'Construction Law',
    relatedTerms: ['construction-contract', 'scope-of-work', 'extra-work'],
    practiceArea: 'construction-law'
  },
  {
    id: 'pay-if-paid',
    term: 'Pay-If-Paid Clause',
    definition: 'A contractual provision making the general contractor\'s payment to subcontractors contingent on receiving payment from the owner. Shifts payment risk to subcontractors.',
    category: 'Construction Law',
    relatedTerms: ['construction-contract', 'subcontractor', 'payment-terms'],
    practiceArea: 'construction-law'
  },

  // Corporate/Business Law Terms
  {
    id: 'llc',
    term: 'LLC (Limited Liability Company)',
    definition: 'A business structure that combines the liability protection of a corporation with the tax benefits and flexibility of a partnership. Owners (members) are generally not personally liable for company debts.',
    category: 'Business Law',
    relatedTerms: ['corporation', 's-corp', 'operating-agreement'],
    practiceArea: 'business-corporate-law'
  },
  {
    id: 's-corp',
    term: 'S Corporation',
    definition: 'A corporation that elects to pass corporate income, losses, deductions, and credits through to shareholders for federal tax purposes. Avoids double taxation while providing liability protection. Limited to 100 shareholders.',
    category: 'Business Law',
    relatedTerms: ['c-corp', 'llc', 'pass-through-taxation'],
    practiceArea: 'business-corporate-law'
  },
  {
    id: 'c-corp',
    term: 'C Corporation',
    definition: 'A standard corporation taxed separately from its owners. Subject to double taxation (corporate and dividend taxes) but offers unlimited shareholders, multiple stock classes, and easier access to capital.',
    category: 'Business Law',
    relatedTerms: ['s-corp', 'llc', 'shareholders'],
    practiceArea: 'business-corporate-law'
  },
  {
    id: 'operating-agreement',
    term: 'Operating Agreement',
    definition: 'A legal document that outlines the ownership and operating procedures of an LLC. Covers member rights, profit distribution, management structure, and procedures for adding/removing members.',
    category: 'Business Law',
    relatedTerms: ['llc', 'bylaws', 'membership-interest'],
    practiceArea: 'business-corporate-law'
  },
  {
    id: 'fiduciary-duty',
    term: 'Fiduciary Duty',
    definition: 'The legal obligation of corporate officers and directors to act in the best interests of the company and shareholders, including duties of care, loyalty, and good faith.',
    category: 'Business Law',
    relatedTerms: ['board-of-directors', 'corporate-governance', 'breach-of-duty'],
    practiceArea: 'business-corporate-law'
  },

  // Insurance/Litigation Terms
  {
    id: 'duty-to-defend',
    term: 'Duty to Defend',
    definition: 'An insurer\'s obligation to provide legal defense for an insured when a claim is made that potentially falls within policy coverage, even if the claim is groundless or fraudulent. Broader than the duty to indemnify.',
    category: 'Insurance Law',
    relatedTerms: ['duty-to-indemnify', 'insurance-policy', 'coverage'],
    practiceArea: 'insurance-defense'
  },
  {
    id: 'duty-to-indemnify',
    term: 'Duty to Indemnify',
    definition: 'An insurer\'s obligation to pay damages and settlements for covered claims. Narrower than the duty to defend and only applies when liability is established and falls within policy coverage.',
    category: 'Insurance Law',
    relatedTerms: ['duty-to-defend', 'insurance-policy', 'coverage'],
    practiceArea: 'insurance-defense'
  },
  {
    id: 'bad-faith',
    term: 'Bad Faith (Insurance)',
    definition: 'An insurer\'s unreasonable denial or delay of a valid claim, or failure to properly investigate a claim. Can result in extra-contractual damages beyond policy limits.',
    category: 'Insurance Law',
    relatedTerms: ['duty-to-defend', 'insurance-claim', 'punitive-damages'],
    practiceArea: 'insurance-defense'
  },
  {
    id: 'subrogation',
    term: 'Subrogation',
    definition: 'The right of an insurer who has paid a claim to step into the shoes of the insured and pursue recovery from the party actually responsible for the loss.',
    category: 'Insurance Law',
    relatedTerms: ['insurance-claim', 'third-party-liability', 'reimbursement'],
    practiceArea: 'insurance-defense'
  },
  {
    id: 'summary-judgment',
    term: 'Summary Judgment',
    definition: 'A court decision made without a full trial when there are no genuine disputes of material fact and one party is entitled to judgment as a matter of law. Can dispose of all or part of a case.',
    category: 'Litigation',
    relatedTerms: ['motion', 'trial', 'discovery'],
    practiceArea: 'litigation'
  },

  // Workers' Compensation Terms
  {
    id: 'ttd',
    term: 'TTD (Temporary Total Disability)',
    definition: 'Workers\' compensation benefits paid when an injured worker is temporarily unable to work while recovering. Typically pays 2/3 of average weekly wage, subject to statutory maximums.',
    category: 'Workers\' Compensation',
    relatedTerms: ['ppi', 'workers-comp', 'disability-benefits'],
    practiceArea: 'workers-compensation'
  },
  {
    id: 'ppi',
    term: 'PPI (Permanent Partial Impairment)',
    definition: 'Workers\' compensation benefits for permanent physical impairment that remains after maximum medical improvement. Calculated based on impairment rating and statutory schedule.',
    category: 'Workers\' Compensation',
    relatedTerms: ['ttd', 'workers-comp', 'impairment-rating'],
    practiceArea: 'workers-compensation'
  },
  {
    id: 'mmi',
    term: 'MMI (Maximum Medical Improvement)',
    definition: 'The point at which an injured worker\'s condition has stabilized and is unlikely to improve significantly with further medical treatment. Marks transition from TTD to PPI benefits.',
    category: 'Workers\' Compensation',
    relatedTerms: ['ttd', 'ppi', 'medical-treatment'],
    practiceArea: 'workers-compensation'
  },

  // General Legal Terms
  {
    id: 'statute-of-limitations',
    term: 'Statute of Limitations',
    definition: 'The time period within which a lawsuit must be filed. Varies by type of claim (e.g., 2 years for personal injury, 6 years for written contracts in Indiana). Missing the deadline bars the claim.',
    category: 'General',
    relatedTerms: ['lawsuit', 'filing-deadline', 'tolling'],
    practiceArea: 'litigation'
  },
  {
    id: 'discovery',
    term: 'Discovery',
    definition: 'The pre-trial phase where parties exchange information and evidence through interrogatories, document requests, depositions, and requests for admission.',
    category: 'Litigation',
    relatedTerms: ['deposition', 'interrogatories', 'trial'],
    practiceArea: 'litigation'
  },
  {
    id: 'indemnification',
    term: 'Indemnification',
    definition: 'A contractual obligation where one party agrees to compensate another for losses, damages, or liabilities. Common in construction and business contracts to shift risk.',
    category: 'Contracts',
    relatedTerms: ['hold-harmless', 'liability', 'insurance'],
    practiceArea: 'business-corporate-law'
  },
  {
    id: 'force-majeure',
    term: 'Force Majeure',
    definition: 'A contract clause that excuses performance when extraordinary events beyond the parties\' control (acts of God, war, pandemic) make performance impossible or impractical.',
    category: 'Contracts',
    relatedTerms: ['contract', 'breach', 'impossibility'],
    practiceArea: 'business-corporate-law'
  },
  {
    id: 'arbitration',
    term: 'Arbitration',
    definition: 'Alternative dispute resolution where parties present their case to a neutral arbitrator who makes a binding decision. Often faster and less expensive than litigation.',
    category: 'Dispute Resolution',
    relatedTerms: ['mediation', 'litigation', 'adr'],
    practiceArea: 'litigation'
  },
  {
    id: 'mediation',
    term: 'Mediation',
    definition: 'Alternative dispute resolution where a neutral mediator helps parties negotiate a settlement. Non-binding unless parties reach agreement.',
    category: 'Dispute Resolution',
    relatedTerms: ['arbitration', 'settlement', 'adr'],
    practiceArea: 'litigation'
  }
]

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(legalGlossaryTerms.map(term => term.category)))
}

/**
 * Search glossary terms
 */
export function searchGlossary(query: string, category?: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase()
  
  return legalGlossaryTerms.filter(term => {
    const matchesQuery = 
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery)
    
    const matchesCategory = !category || category === 'all' || term.category === category
    
    return matchesQuery && matchesCategory
  })
}

/**
 * Get term by ID
 */
export function getTermById(id: string): GlossaryTerm | undefined {
  return legalGlossaryTerms.find(term => term.id === id)
}

/**
 * Get related terms
 */
export function getRelatedTerms(termId: string): GlossaryTerm[] {
  const term = getTermById(termId)
  if (!term || !term.relatedTerms) return []
  
  return term.relatedTerms
    .map(id => getTermById(id))
    .filter((t): t is GlossaryTerm => t !== undefined)
}
