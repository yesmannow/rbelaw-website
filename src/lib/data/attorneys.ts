import type { Attorney } from '../types'

/**
 * Sample attorneys data for Riley Bennett Egloff
 * This will be replaced with CMS or API data in production
 */
export const attorneys: Attorney[] = [
  {
    id: 'jaclyn-flint',
    name: 'Jaclyn Flint',
    title: 'Partner',
    email: 'jflint@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Jaclyn Flint focuses her practice on business and corporate law matters.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'kathleen-hart',
    name: 'Kathleen Hart',
    title: 'Partner',
    email: 'khart@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Kathleen Hart specializes in business and corporate law.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'eric-hylton',
    name: 'Eric Hylton',
    title: 'Partner',
    email: 'ehylton@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Eric Hylton provides comprehensive business and corporate legal services.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'anthony-jost',
    name: 'Anthony Jost',
    title: 'Partner',
    email: 'ajost@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Anthony Jost advises clients on business entity formation and corporate governance.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'ryan-leitch',
    name: 'Ryan Leitch',
    title: 'Partner',
    email: 'rleitch@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Ryan Leitch focuses on corporate law and business transactions.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'courtney-david-mills',
    name: 'Courtney David Mills',
    title: 'Partner',
    email: 'cmills@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Courtney David Mills represents businesses in a wide range of corporate matters.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'katie-riles',
    name: 'Katie Riles',
    title: 'Associate',
    email: 'kriles@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Katie Riles assists clients with business formation and contract matters.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'raymond-seach',
    name: 'Raymond Seach',
    title: 'Partner',
    email: 'rseach@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Raymond Seach provides strategic counsel on business and corporate law.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'justin-sorrell',
    name: 'Justin Sorrell',
    title: 'Partner',
    email: 'jsorrell@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Justin Sorrell advises businesses on corporate governance and transactions.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'kevin-tharp',
    name: 'Kevin Tharp',
    title: 'Partner',
    email: 'ktharp@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Kevin Tharp focuses on business law and corporate compliance.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'john-egloff',
    name: 'John Egloff',
    title: 'Partner',
    email: 'jegloff@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'John Egloff represents businesses in corporate and transactional matters.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'blair-vandivier',
    name: 'Blair Vandivier',
    title: 'Associate',
    email: 'bvandivier@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Blair Vandivier assists clients with business formation and corporate matters.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'lindsay-llewellyn',
    name: 'Lindsay Llewellyn',
    title: 'Associate',
    email: 'lllewellyn@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Lindsay Llewellyn focuses on business and corporate law.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  },
  {
    id: 'patrick-mccarney',
    name: 'Patrick McCarney',
    title: 'Partner',
    email: 'pmccarney@rbelaw.com',
    phone: '(502) 589-4440',
    bio: 'Patrick McCarney provides comprehensive business and corporate legal counsel.',
    imageUrl: '/images/attorneys/placeholder.jpg',
    practiceAreas: ['business-corporate'],
    education: [],
    barAdmissions: ['Kentucky']
  }
]

/**
 * Get an attorney by ID
 */
export const getAttorneyById = (id: string): Attorney | undefined => {
  return attorneys.find(attorney => attorney.id === id)
}

/**
 * Get attorneys by practice area
 */
export const getAttorneysByPracticeArea = (practiceAreaId: string): Attorney[] => {
  return attorneys.filter(attorney => 
    attorney.practiceAreas.includes(practiceAreaId)
  )
}

/**
 * Sort attorneys alphabetically by last name
 */
export const sortAttorneysByName = (attorneyList: Attorney[]): Attorney[] => {
  return [...attorneyList].sort((a, b) => {
    const lastNameA = a.name.split(' ').pop() || ''
    const lastNameB = b.name.split(' ').pop() || ''
    return lastNameA.localeCompare(lastNameB)
  })
}
