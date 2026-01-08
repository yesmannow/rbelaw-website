import type { Professional } from '../types'

/**
 * Other Professionals - Support staff and specialists
 * This will be replaced with CMS or API data in production
 */
export const professionals: Professional[] = [
  {
    id: 'jennie-maguire',
    name: 'Jennie Maguire',
    title: 'Nurse Consultant',
    email: 'jmaguire@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Jennie Maguire provides expert nursing consultation services to support our healthcare and workers\' compensation practice areas.',
    imageUrl: '/images/team/jennie-maguire.jpg',
    department: 'Healthcare Services',
    specialties: ['Medical Case Review', 'Workers\' Compensation', 'Healthcare Law Support']
  },
  {
    id: 'nathaniel-adrian',
    name: 'Nathaniel Adrian',
    title: 'Paralegal',
    email: 'nadrian@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Nathaniel Adrian provides comprehensive paralegal support across multiple practice areas.',
    imageUrl: '/images/team/nathaniel-adrian.jpg',
    department: 'Legal Support',
    specialties: ['Legal Research', 'Document Preparation', 'Case Management']
  },
  {
    id: 'shanda-mcpike',
    name: 'Shanda E. McPike',
    title: 'Chief Administrative Officer',
    email: 'smcpike@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Shanda E. McPike oversees the firm\'s administrative operations and strategic initiatives.',
    imageUrl: '/images/team/shanda-mcpike.jpg',
    department: 'Administration',
    specialties: ['Operations Management', 'Strategic Planning', 'Administrative Leadership']
  },
  {
    id: 'kimberly-simpson',
    name: 'Kimberly K. Simpson',
    title: 'IT Manager',
    email: 'kwright@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Kimberly K. Simpson manages the firm\'s information technology infrastructure and systems.',
    imageUrl: '/images/team/kimberly-simpson.jpg',
    department: 'Information Technology',
    specialties: ['IT Infrastructure', 'System Administration', 'Technology Support']
  },
  {
    id: 'anne-marie-farrow',
    name: 'Anne Marie Farrow',
    title: 'Director, Marketing',
    email: 'afarrow@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Anne Marie Farrow leads the firm\'s marketing and business development initiatives.',
    imageUrl: '/images/team/anne-marie-farrow.jpg',
    department: 'Marketing',
    specialties: ['Marketing Strategy', 'Business Development', 'Brand Management']
  },
  {
    id: 'erik-purvis',
    name: 'Erik Purvis',
    title: 'Lead Accountant',
    email: 'epurvis@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Erik Purvis manages the firm\'s financial operations and accounting functions.',
    imageUrl: '/images/team/erik-purvis.jpg',
    department: 'Finance',
    specialties: ['Financial Management', 'Accounting', 'Budget Planning']
  },
  {
    id: 'jodie-montgomery',
    name: 'Jodie C. Montgomery',
    title: 'Billing Coordinator',
    email: 'jmontgomery@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Jodie C. Montgomery coordinates billing operations and client account management.',
    imageUrl: '/images/team/jodie-montgomery.jpg',
    department: 'Billing',
    specialties: ['Billing Management', 'Client Accounts', 'Financial Coordination']
  },
  {
    id: 'amy-farrar',
    name: 'Amy L. Farrar',
    title: 'Billing',
    email: 'afarrar@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Amy L. Farrar handles billing operations and client account services.',
    imageUrl: '/images/team/amy-farrar.jpg',
    department: 'Billing',
    specialties: ['Billing Services', 'Account Management', 'Client Relations']
  },
  {
    id: 'kacy-perez',
    name: 'Kacy J. Perez',
    title: 'Billing',
    email: 'kperez@rbelaw.com',
    phone: '317.636.8000',
    bio: 'Kacy J. Perez provides billing support and client account services.',
    imageUrl: '/images/team/kacy-perez.jpg',
    department: 'Billing',
    specialties: ['Billing Services', 'Account Management', 'Client Relations']
  }
]

/**
 * Get a professional by ID
 */
export function getProfessionalById(id: string): Professional | undefined {
  return professionals.find(p => p.id === id)
}

/**
 * Get professionals by department
 */
export function getProfessionalsByDepartment(department: string): Professional[] {
  return professionals.filter(p => p.department === department)
}

