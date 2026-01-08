import { attorneys as rawAttorneys } from './attorneys'
import type { Attorney as UIAttorney, Education as UIEducation, Publication, RepresentativeMatter } from '@/lib/types'

function parseEducationItem(item: any): UIEducation | null {
  if (typeof item !== 'string') return null
  const s = item.trim()
  const full = s.match(/^(.*?),\s*(.*?),\s*(\d{4})$/)
  if (full) {
    const [, institution, degree, year] = full
    return { degree: degree.trim(), institution: institution.trim(), year: year.trim() }
  }
  const two = s.match(/^(.*?),\s*(\d{4})$/)
  if (two) {
    const [, institution, year] = two
    return { degree: '', institution: institution.trim(), year: year.trim() }
  }
  return { degree: s, institution: '', year: '' }
}

function extractBioText(a: any): string {
  const sections = Array.isArray(a?.bio) ? a.bio : []
  const chunks: string[] = []
  for (const section of sections) {
    const content = Array.isArray(section?.content) ? section.content : []
    for (const c of content) {
      if (typeof c === 'string') chunks.push(c)
      else if (c && typeof c === 'object' && Array.isArray(c.items)) chunks.push(c.items.join('; '))
    }
  }
  return chunks.filter(Boolean).slice(0, 2).join(' ')
}

function extractRepresentativeMatters(a: any): RepresentativeMatter[] | undefined {
  const sections = Array.isArray(a?.bio) ? a.bio : []
  const rep = sections.find((s: any) => typeof s?.heading === 'string' && s.heading.toLowerCase().includes('representative'))
  if (!rep) return undefined
  const items: string[] = []
  const content = Array.isArray(rep.content) ? rep.content : []
  for (const c of content) {
    if (c && typeof c === 'object' && c.type === 'list' && Array.isArray(c.items)) {
      items.push(...c.items)
    }
  }
  if (items.length === 0) return undefined
  return items.map((t) => ({ title: t, description: t }))
}

function adaptAttorney(a: any): UIAttorney {
  const bio = extractBioText(a)
  const educationRaw: any[] = Array.isArray(a?.education) ? a.education : []
  const education: UIEducation[] = educationRaw.map(parseEducationItem).filter(Boolean) as UIEducation[]
  const barAdmissions: string[] = Array.isArray(a?.barAdmissions) ? a.barAdmissions.filter((x: any) => typeof x === 'string') : []
  const awards: string[] = Array.isArray(a?.honors) ? a.honors.filter((x: any) => typeof x === 'string') : []
  const publicationsRaw: any[] = Array.isArray(a?.publications) ? a.publications : []
  const publications: Publication[] = publicationsRaw
    .filter((x: any) => typeof x === 'string')
    .map((title: string) => ({ title, publication: '', date: '' }))

  const representativeMatters = extractRepresentativeMatters(a)

  return {
    id: String(a?.slug ?? '').trim() || String(a?.name ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: String(a?.name ?? ''),
    title: String(a?.title ?? ''),
    email: String(a?.email ?? ''),
    phone: String(a?.phone ?? ''),
    bio,
    imageUrl: String(a?.image ?? ''),
    practiceAreas: Array.isArray(a?.practiceAreas) ? a.practiceAreas.filter((x: any) => typeof x === 'string') : [],
    education,
    barAdmissions,
    awards,
    publications,
    representativeMatters,
    associations: Array.isArray(a?.professionalAffiliations) ? a.professionalAffiliations.filter((x: any) => typeof x === 'string') : [],
    community: [],
    linkedIn: undefined,
    twitter: undefined,
    vCard: undefined,
  }
}

export const attorneys: UIAttorney[] = (Array.isArray(rawAttorneys) ? rawAttorneys : []).map(adaptAttorney)

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
