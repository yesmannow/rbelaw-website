import { attorneys as parsedAttorneys, type ParsedAttorney } from './attorneys-parsed'
import type { Attorney as UIAttorney, Education as UIEducation, Publication, RepresentativeMatter } from '../types'

function parseEducationItem(item: string): UIEducation | null {
  const s = item.trim()
  // Remove trailing markdown artifacts
  const cleaned = s.replace(/╳.*$/, '').replace(/!\[\].*$/, '').trim()
  
  const full = cleaned.match(/^(.*?),\s*(.*?),?\s*\((\d{4})\)$/)
  if (full) {
    const [, institution, degree, year] = full
    return { degree: degree.trim(), institution: institution.trim(), year: year.trim() }
  }
  const two = cleaned.match(/^(.*?),\s*(\d{4})$/)
  if (two) {
    const [, institution, year] = two
    return { degree: '', institution: institution.trim(), year: year.trim() }
  }
  return { degree: cleaned, institution: '', year: '' }
}

function adaptAttorney(a: ParsedAttorney): UIAttorney {
  const education: UIEducation[] = a.education.map(parseEducationItem).filter(Boolean) as UIEducation[]
  
  const publications: Publication[] = a.publications.map(p => ({
    title: p.title,
    publication: p.author || '',
    date: p.date || '',
    url: p.url,
  }))

  const representativeMatters: RepresentativeMatter[] | undefined = 
    a.representativeMatters.length > 0 
      ? a.representativeMatters.map(t => ({ title: t, description: t }))
      : undefined

  return {
    id: a.id,
    name: a.name,
    title: a.title,
    email: a.email,
    phone: a.phone,
    bio: a.bio,
    imageUrl: a.imageUrl,
    practiceAreas: a.practiceAreas,
    education,
    barAdmissions: a.barAdmissions,
    awards: a.awards,
    publications,
    representativeMatters,
    associations: a.associations,
    community: a.communityActivity,
    linkedIn: a.linkedIn,
    twitter: undefined,
    vCard: a.vCard,
    // Additional fields from parsed data
    assistant: a.assistant,
    assistantEmail: a.assistantEmail,
    presentations: a.presentations,
    beyondOffice: a.beyondOffice,
    videos: a.videos,
    industries: a.industries,
  }
}

export const attorneys: UIAttorney[] = parsedAttorneys.map(adaptAttorney)

export function getAttorneyById(id: string): UIAttorney | undefined {
  const norm = String(id)
  return attorneys.find((a) => a.id === norm || a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === norm)
}

export function getAttorneyBySlug(slug: string): UIAttorney | undefined {
  const norm = String(slug)
  return attorneys.find((a) => a.id === norm)
}

export function getAttorneysByPracticeArea(practiceArea: string): UIAttorney[] {
  const term = String(practiceArea).toLowerCase()
  return attorneys.filter((a) => a.practiceAreas.some((pa) => String(pa).toLowerCase().includes(term)))
}

export function getAttorneysByName(names: string[]): UIAttorney[] {
  return attorneys.filter((a) => names.some(name => a.name === name))
}
