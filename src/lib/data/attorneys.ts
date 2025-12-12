import type { Attorney } from '../types'

/**
 * Sample attorneys data for Riley Bennett Egloff
 * This will be replaced with CMS or API data in production
 */
export const attorneys: Attorney[] = [
  {
    id: 'anthony-jost',
    name: 'Anthony R. Jost',
    title: 'Partner',
    email: 'tjost@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Anthony R. Jost is a partner at Riley Bennett Egloff LLP, focusing on complex business litigation and corporate law matters.',
    imageUrl: '/images/team/anthony-jost.jpg',
    practiceAreas: ['business-litigation', 'corporate-law'],
    education: [
      {
        degree: 'J.D.',
        institution: 'Indiana University Maurer School of Law',
        year: '2000'
      },
      {
        degree: 'B.A.',
        institution: 'Indiana University',
        year: '1997'
      }
    ],
    barAdmissions: ['Indiana', 'Illinois'],
    linkedIn: 'https://www.linkedin.com/in/anthony-jost'
  },
  {
    id: 'laura-binford',
    name: 'Laura K. Binford',
    title: 'Partner',
    email: 'lbinford@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Laura K. Binford is a partner at Riley Bennett Egloff LLP, specializing in insurance defense and healthcare law.',
    imageUrl: '/images/team/laura-binford.jpg',
    practiceAreas: ['insurance-defense', 'healthcare-law'],
    education: [
      {
        degree: 'J.D.',
        institution: 'Indiana University Maurer School of Law',
        year: '2002'
      },
      {
        degree: 'B.S.',
        institution: 'Indiana University',
        year: '1999'
      }
    ],
    barAdmissions: ['Indiana'],
    linkedIn: 'https://www.linkedin.com/in/laura-binford'
  },
  {
    id: 'eric-hylton',
    name: 'Eric M. Hylton',
    title: 'Partner',
    email: 'ehylton@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Eric M. Hylton is a partner at Riley Bennett Egloff LLP, with extensive experience in construction law and commercial litigation.',
    imageUrl: '/images/team/eric-hylton.jpg',
    practiceAreas: ['construction-law', 'business-litigation'],
    education: [
      {
        degree: 'J.D.',
        institution: 'Indiana University Maurer School of Law',
        year: '1998'
      },
      {
        degree: 'B.A.',
        institution: 'DePauw University',
        year: '1995'
      }
    ],
    barAdmissions: ['Indiana'],
    linkedIn: 'https://www.linkedin.com/in/eric-hylton'
  },
  {
    id: 'sarah-marr',
    name: 'Sarah MacGill Marr',
    title: 'Partner',
    email: 'smarr@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Sarah MacGill Marr is a partner at Riley Bennett Egloff LLP, focusing on corporate law and business transactions.',
    imageUrl: '/images/team/sarah-marr.jpg',
    practiceAreas: ['corporate-law', 'business-transactions'],
    education: [
      {
        degree: 'J.D.',
        institution: 'Indiana University Maurer School of Law',
        year: '2005'
      },
      {
        degree: 'B.A.',
        institution: 'Indiana University',
        year: '2002'
      }
    ],
    barAdmissions: ['Indiana'],
    linkedIn: 'https://www.linkedin.com/in/sarah-marr'
  },
  {
    id: 'kathleen-hart',
    name: 'Kathleen Hart',
    title: 'Partner',
    email: 'khart@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Kathleen Hart is a partner at Riley Bennett Egloff LLP, specializing in employment law and business litigation.',
    imageUrl: '/images/team/kathleen-hart.jpg',
    practiceAreas: ['employment-law', 'business-litigation'],
    education: [
      {
        degree: 'J.D.',
        institution: 'Indiana University Maurer School of Law',
        year: '2003'
      },
      {
        degree: 'B.A.',
        institution: 'Butler University',
        year: '2000'
      }
    ],
    barAdmissions: ['Indiana'],
    linkedIn: 'https://www.linkedin.com/in/kathleen-hart'
  },
  {
    id: 'donald-smith',
    name: 'Donald S. Smith',
    title: 'Partner',
    email: 'dsmith@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Donald S. Smith is a partner at Riley Bennett Egloff LLP, with deep expertise in insurance defense and coverage matters.',
    imageUrl: '/images/team/donald-smith.jpg',
    practiceAreas: ['insurance-defense', 'coverage-litigation'],
    education: [
      {
        degree: 'J.D.',
        institution: 'Indiana University Maurer School of Law',
        year: '1995'
      },
      {
        degree: 'B.S.',
        institution: 'Purdue University',
        year: '1992'
      }
    ],
    barAdmissions: ['Indiana', 'Kentucky'],
    linkedIn: 'https://www.linkedin.com/in/donald-smith'
  },
  {
    id: 'ryan-leitch',
    name: 'Ryan L. Leitch',
    title: 'Partner',
    email: 'rleitch@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Ryan L. Leitch is a partner at Riley Bennett Egloff LLP, focusing on construction law and complex commercial litigation.',
    imageUrl: '/images/team/ryan-leitch.jpg',
    practiceAreas: ['construction-law', 'business-litigation'],
    education: [
      {
        degree: 'J.D.',
        institution: 'Indiana University Maurer School of Law',
        year: '2004'
      },
      {
        degree: 'B.A.',
        institution: 'Wabash College',
        year: '2001'
      }
    ],
    barAdmissions: ['Indiana'],
    linkedIn: 'https://www.linkedin.com/in/ryan-leitch'
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
