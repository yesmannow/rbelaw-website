import type { LegalAssistant } from '../types'

/**
 * Legal Assistants - Support staff for attorneys
 * Data scraped from rbelaw.com on January 8, 2026
 */
export const legalAssistants: LegalAssistant[] = [
  {
    id: 'julie-adams',
    name: 'Julie A. Adams',
    title: 'Legal Assistant',
    email: 'jadams@rbelaw.com',
    phone: '317.636.8000',
    supportingAttorneys: ['courtney-david-mills', 'katie-r-osborne'],
  },
  {
    id: 'rebecca-aldous',
    name: 'Rebecca Aldous',
    title: 'Legal Assistant',
    email: 'baldous@rbelaw.com',
    phone: '317.636.8000',
    supportingAttorneys: ['laura-s-reed'],
  },
  {
    id: 'penny-curtis',
    name: 'Penny A. Curtis',
    title: 'Legal Assistant',
    email: 'pcurtis@rbelaw.com',
    phone: '317.636.8000',
    supportingAttorneys: ['sarah-macgill-marr', 'justin-o-sorrell', 'kevin-n-tharp'],
  },
  {
    id: 'rebecca-keever',
    name: 'Rebecca D. Keever',
    title: 'Legal Assistant',
    email: 'bkeever@rbelaw.com',
    phone: '317.636.8000',
    supportingAttorneys: ['timothy-h-button', 'kathleen-hart', 'ryan-l-leitch', 'katie-s-riles'],
  },
  {
    id: 'rhonda-mcclintic',
    name: 'Rhonda L. McClintic',
    title: 'Legal Assistant',
    email: 'rmcclintic@rbelaw.com',
    phone: '317.636.8000',
    supportingAttorneys: ['jeffrey-b-fecht', 'anthony-r-jost', 'j-t-wynne'],
  },
  {
    id: 'lana-neligh',
    name: 'Lana K. Neligh',
    title: 'Legal Assistant',
    email: 'lneligh@rbelaw.com',
    phone: '317.636.8000',
    supportingAttorneys: ['laura-k-binford', 'beau-browning'],
  },
  {
    id: 'nicole-poletika',
    name: 'Nicole Poletika',
    title: 'Legal Assistant',
    email: 'npoletika@rbelaw.com',
    phone: '317.636.8000',
    supportingAttorneys: ['jaclyn-m-flint', 'eric-m-hylton', 'donald-s-smith'],
  },
  {
    id: 'nikki-viau',
    name: 'Nikki L. Viau',
    title: 'Legal Assistant',
    email: 'nviau@rbelaw.com',
    phone: '317.636.8000',
    supportingAttorneys: ['john-l-egloff', 'patrick-s-mccarney', 'raymond-t-seach', 'megan-s-young'],
  },
  {
    id: 'beth-reis',
    name: 'Beth A. Reis',
    title: 'Legal Assistant',
    email: 'breis@rbelaw.com',
    phone: '317.636.8000',
    supportingAttorneys: ['lindsay-a-llewellyn', 'anna-marvin', 'james-w-riley-jr', 'travis-r-watson'],
  },
]

/**
 * Get a legal assistant by ID
 */
export function getLegalAssistantById(id: string): LegalAssistant | undefined {
  return legalAssistants.find(la => la.id === id)
}

/**
 * Get legal assistants supporting a specific attorney
 */
export function getLegalAssistantsByAttorney(attorneyId: string): LegalAssistant[] {
  return legalAssistants.filter(la => 
    la.supportingAttorneys?.includes(attorneyId)
  )
}
