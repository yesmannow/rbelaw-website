/**
 * Consolidate Attorney Data Script
 * Merges attorneys-parsed.ts and attorney-images.ts into master attorneys.ts
 * Converts education strings to structured objects
 * Applies WebP image paths
 * Sanitizes all data
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Import source data from backup files
import { attorneys as parsedAttorneys } from '../src/lib/data/attorneys-parsed.ts.bak'
import { attorneyImages } from '../src/lib/data/attorney-images.ts.bak'

interface MasterEducation {
  degree: string
  institution: string
  year: string
}

interface MasterAttorney {
  id: string
  name: string
  title: string
  email: string
  phone: string
  image: string
  imageThumb: string
  slug: string
  linkedIn?: string
  vCard: string
  bio: string[]
  representativeMatters: string[]
  awards: string[]
  barAdmissions: string[]
  education: MasterEducation[]
  practiceAreas: string[]
  industries: string[]
  publications?: Array<{ title: string; url?: string; date?: string }>
  videos?: Array<{ title: string; url: string; date?: string }>
  beyondOffice?: string
}

// Helper: Parse education string into structured object
function parseEducation(eduStr: string): MasterEducation {
  // Remove markdown artifacts
  const cleaned = eduStr
    .replace(/╳.*$/, '')
    .replace(/!\[\].*$/, '')
    .replace(/\*\*/g, '')
    .replace(/_/g, '')
    .trim()

  // Pattern: "Institution, Degree, Year" or "Institution, Degree (Year)"
  const pattern1 = /^(.*?),\s*(.*?),\s*\(?([\d]{4})\)?$/
  const match1 = cleaned.match(pattern1)
  if (match1) {
    return {
      institution: match1[1].trim(),
      degree: match1[2].trim(),
      year: match1[3].trim()
    }
  }

  // Pattern: "Institution, Degree, Year" without parens
  const pattern2 = /^(.*?),\s*(.*?),\s*([\d]{4})$/
  const match2 = cleaned.match(pattern2)
  if (match2) {
    return {
      institution: match2[1].trim(),
      degree: match2[2].trim(),
      year: match2[3].trim()
    }
  }

  // Pattern: "Institution, Year"
  const pattern3 = /^(.*?),\s*([\d]{4})$/
  const match3 = cleaned.match(pattern3)
  if (match3) {
    return {
      institution: match3[1].trim(),
      degree: '',
      year: match3[2].trim()
    }
  }

  // Fallback: treat as institution name
  return {
    institution: cleaned,
    degree: '',
    year: ''
  }
}

// Helper: Sanitize text (remove markdown/HTML artifacts)
function sanitize(text: string): string {
  return text
    .replace(/╳.*$/g, '')
    .replace(/!\[\].*$/g, '')
    .replace(/\[(\d+)\]\(.*?\)/g, '') // Remove [0](link) artifacts
    .replace(/\*\*/g, '')
    .replace(/<[^>]+>/g, '')
    .trim()
}

// Helper: Sanitize array of strings
function sanitizeArray(arr: string[]): string[] {
  return arr
    .map(sanitize)
    .filter(s => s.length > 0 && !s.startsWith('http') && !s.startsWith('!['))
}

// Main consolidation function
function consolidateAttorneys(): MasterAttorney[] {
  const masterAttorneys: MasterAttorney[] = []

  for (const attorney of parsedAttorneys) {
    // Find matching image data
    const imageData = attorneyImages.find(img => img.id === attorney.id)
    
    // Build WebP paths - use actual public directory structure
    const imageBasePath = `/images/team/Attorneys`
    const imageName = attorney.id
    const image = imageData?.images.default.replace('/assets/attorneys/', imageBasePath + '/') || `${imageBasePath}/${imageName}.webp`
    const imageThumb = imageData?.images.thumb.replace('/assets/attorneys/', imageBasePath + '/') || `${imageBasePath}/${imageName}-thumb.webp`

    // Parse education
    const education: MasterEducation[] = attorney.education
      .map(parseEducation)
      .filter(edu => edu.institution.length > 0)

    // Build master attorney object
    const masterAttorney: MasterAttorney = {
      id: attorney.id,
      name: sanitize(attorney.name),
      title: sanitize(attorney.title),
      email: attorney.email,
      phone: attorney.phone,
      image,
      imageThumb,
      slug: attorney.slug,
      linkedIn: attorney.linkedIn,
      vCard: `/vcards/${attorney.id}.vcf`,
      bio: sanitizeArray([attorney.bio]),
      representativeMatters: sanitizeArray(attorney.representativeMatters),
      awards: sanitizeArray(attorney.awards),
      barAdmissions: sanitizeArray(attorney.barAdmissions),
      education,
      practiceAreas: sanitizeArray(attorney.practiceAreas),
      industries: sanitizeArray(attorney.industries),
      publications: attorney.publications.length > 0 ? attorney.publications : undefined,
      videos: attorney.videos.length > 0 ? attorney.videos : undefined,
      beyondOffice: attorney.beyondOffice ? sanitize(attorney.beyondOffice) : undefined
    }

    masterAttorneys.push(masterAttorney)
  }

  return masterAttorneys
}

// Generate TypeScript file content
function generateMasterFile(attorneys: MasterAttorney[]): string {
  return `/**
 * Master Attorney Database
 * Unified source of truth for all attorney data
 * Auto-generated by scripts/consolidate-attorney-data.ts
 * Last updated: ${new Date().toISOString()}
 */

export interface MasterEducation {
  degree: string
  institution: string
  year: string
}

export interface MasterAttorney {
  id: string // Dynamic route key (e.g., 'anna-marvin')
  name: string
  title: string
  email: string
  phone: string
  image: string // Full WebP Path
  imageThumb: string // Thumb WebP Path for cards
  slug: string
  linkedIn?: string
  vCard: string // Dynamic path: /vcards/[id].vcf
  bio: string[] // Structured paragraphs
  representativeMatters: string[]
  awards: string[]
  barAdmissions: string[]
  education: MasterEducation[]
  practiceAreas: string[]
  industries: string[]
  publications?: Array<{ title: string; url?: string; date?: string }>
  videos?: Array<{ title: string; url: string; date?: string }>
  beyondOffice?: string
}

export const attorneys: MasterAttorney[] = ${JSON.stringify(attorneys, null, 2)}

export function getAttorneyBySlug(slug: string): MasterAttorney | undefined {
  return attorneys.find(a => a.slug === slug || a.id === slug)
}

export function getAttorneysByPracticeArea(practiceArea: string): MasterAttorney[] {
  return attorneys.filter(a =>
    a.practiceAreas.some(pa =>
      pa.toLowerCase().includes(practiceArea.toLowerCase())
    )
  )
}

export function getAttorneysByIndustry(industry: string): MasterAttorney[] {
  return attorneys.filter(a =>
    a.industries.some(ind =>
      ind.toLowerCase().includes(industry.toLowerCase())
    )
  )
}
`
}

// Main execution
console.log('🔄 Consolidating attorney data...')
const masterAttorneys = consolidateAttorneys()
console.log(`✅ Processed ${masterAttorneys.length} attorneys`)

const fileContent = generateMasterFile(masterAttorneys)
const outputPath = resolve(__dirname, '../src/lib/data/attorneys.ts')

writeFileSync(outputPath, fileContent, 'utf-8')
console.log(`✅ Master file written to: ${outputPath}`)
console.log('✅ Consolidation complete!')
