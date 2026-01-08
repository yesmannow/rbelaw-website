/**
 * Parse scraped attorney bios from markdown into structured TypeScript data
 * Run with: npx tsx scripts/parse-attorney-bios.ts
 */

import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import process from 'node:process'

interface ParsedAttorney {
  id: string
  slug: string
  name: string
  title: string
  email: string
  phone: string
  fax?: string
  assistant?: string
  assistantEmail?: string
  linkedIn?: string
  vCard?: string
  imageUrl: string
  bio: string
  representativeMatters: string[]
  publications: Array<{ title: string; url?: string; date?: string; author?: string }>
  presentations: string[]
  awards: string[]
  communityActivity: string[]
  beyondOffice?: string
  videos: Array<{ title: string; url: string; date?: string }>
  industries: string[]
  practiceAreas: string[]
  associations: string[]
  barAdmissions: string[]
  education: string[]
}

function extractSection(markdown: string, heading: string): string {
  const regex = new RegExp(`##\\s+${heading}\\s*\\n([\\s\\S]*?)(?=\\n##|$)`, 'i')
  const match = markdown.match(regex)
  return match ? match[1].trim() : ''
}

function extractH1Title(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : ''
}

function extractH2Subtitle(markdown: string): string {
  // Look for title right after the name (Partner, Of Counsel, etc.)
  const lines = markdown.split('\n')
  let foundH1 = false
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundH1 = true
      continue
    }
    if (foundH1 && line.trim() && !line.startsWith('#') && !line.startsWith('!') && !line.startsWith('[')) {
      return line.trim()
    }
  }
  return ''
}

function extractEmail(markdown: string): string {
  const match = markdown.match(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
  return match ? match[1] : ''
}

function extractPhone(markdown: string): string {
  const match = markdown.match(/\[(\d{3}-\d{3}-\d{4})\]\(tel:/i)
  return match ? match[1] : ''
}

function extractLinkedIn(markdown: string): string {
  const match = markdown.match(/\[Connect on LinkedIn\]\((https:\/\/www\.linkedin\.com\/[^)]+)\)/i)
  return match ? match[1] : ''
}

function extractImageUrl(markdown: string): string {
  const match = markdown.match(/!\[\]\((https:\/\/rbelaw\.com\/wp-content\/uploads\/[^)]+\.(?:png|jpg|jpeg))\)/i)
  return match ? match[1] : ''
}

function extractAssistant(markdown: string): { name?: string; email?: string } {
  const match = markdown.match(/\*\*Assistant:\*\*\s*\[([^\]]+)\]\(mailto:([^)]+)\)/i)
  if (match) {
    return { name: match[1].trim(), email: match[2].trim() }
  }
  return {}
}

function extractListItems(section: string): string[] {
  if (!section) return []
  const lines = section.split('\n')
  const items: string[] = []
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      items.push(trimmed.substring(2).trim())
    } else if (trimmed && !trimmed.startsWith('#') && items.length > 0) {
      // Continuation of previous item
      items[items.length - 1] += ' ' + trimmed
    } else if (trimmed && !trimmed.startsWith('#')) {
      // Standalone paragraph
      items.push(trimmed)
    }
  }
  
  return items.filter(Boolean)
}

function extractPublications(markdown: string): Array<{ title: string; url?: string; date?: string; author?: string }> {
  const section = extractSection(markdown, 'Publications')
  if (!section) return []
  
  const publications: Array<{ title: string; url?: string; date?: string; author?: string }> = []
  const blocks = section.split(/\n\n+/)
  
  for (const block of blocks) {
    const titleMatch = block.match(/##\s+\[([^\]]+)\]\(([^)]+)\)/i)
    const dateMatch = block.match(/by\s+\[([^\]]+)\][^|]*\|\s+([A-Za-z]+\s+\d+,\s+\d{4})/i)
    
    if (titleMatch) {
      publications.push({
        title: titleMatch[1].trim(),
        url: titleMatch[2].trim(),
        date: dateMatch ? dateMatch[2].trim() : undefined,
        author: dateMatch ? dateMatch[1].trim() : undefined,
      })
    }
  }
  
  return publications
}

function extractVideos(markdown: string): Array<{ title: string; url: string; date?: string }> {
  const section = extractSection(markdown, 'Video')
  if (!section) return []
  
  const videos: Array<{ title: string; url: string; date?: string }> = []
  const blocks = section.split(/\n\n+/)
  
  for (const block of blocks) {
    const titleMatch = block.match(/##\s+\[([^\]]+)\]\(([^)]+)\)/i)
    const dateMatch = block.match(/by\s+[^|]*\|\s+([A-Za-z]+\s+\d+,\s+\d{4})/i)
    
    if (titleMatch) {
      videos.push({
        title: titleMatch[1].trim(),
        url: titleMatch[2].trim(),
        date: dateMatch ? dateMatch[1].trim() : undefined,
      })
    }
  }
  
  return videos
}

function extractIndustries(markdown: string): string[] {
  const section = extractSection(markdown, 'Industries Served')
  if (!section) return []
  return section.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'))
}

function extractPracticeAreas(markdown: string): string[] {
  const section = extractSection(markdown, 'Practice Areas')
  if (!section) return []
  return section.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'))
}

function parseAttorneyBio(rawData: any, slug: string): ParsedAttorney {
  const markdown = rawData.markdown || ''
  const metadata = rawData.metadata || {}
  
  const name = extractH1Title(markdown)
  const title = extractH2Subtitle(markdown)
  const email = extractEmail(markdown)
  const phone = extractPhone(markdown)
  const linkedIn = extractLinkedIn(markdown)
  const imageUrl = extractImageUrl(markdown) || metadata.ogImage || ''
  const assistant = extractAssistant(markdown)
  
  const bioSection = extractSection(markdown, 'Biography')
  const bio = bioSection.split('\n\n')[0] || metadata.description || ''
  
  const representativeMatters = extractListItems(extractSection(markdown, 'Representative Matters'))
  const presentations = extractListItems(extractSection(markdown, 'Presentations'))
  const awards = extractListItems(extractSection(markdown, 'Awards & Recognition'))
  const communityActivity = extractListItems(extractSection(markdown, 'Community Activity'))
  const beyondOffice = extractSection(markdown, 'Beyond the Office')
  const associations = extractListItems(extractSection(markdown, 'Associations'))
  const barAdmissions = extractListItems(extractSection(markdown, 'Bar and Court Admissions'))
  const education = extractListItems(extractSection(markdown, 'Education'))
  
  const publications = extractPublications(markdown)
  const videos = extractVideos(markdown)
  const industries = extractIndustries(markdown)
  const practiceAreas = extractPracticeAreas(markdown)
  
  // Generate ID from slug
  const id = slug.replace(/^.*\//, '').replace(/\.json$/, '')
  
  return {
    id,
    slug: id,
    name,
    title,
    email,
    phone,
    assistant: assistant.name,
    assistantEmail: assistant.email,
    linkedIn,
    imageUrl,
    bio,
    representativeMatters,
    publications,
    presentations,
    awards,
    communityActivity,
    beyondOffice: beyondOffice || undefined,
    videos,
    industries,
    practiceAreas,
    associations,
    barAdmissions,
    education,
  }
}

async function main() {
  const inputDir = path.resolve('scripts/output/attorney-bios-raw')
  const outputFile = path.resolve('src/lib/data/attorneys-parsed.ts')
  
  if (!existsSync(inputDir)) {
    console.error(`❌ Input directory not found: ${inputDir}`)
    process.exit(1)
  }
  
  const files = await fs.readdir(inputDir)
  const jsonFiles = files.filter(f => f.endsWith('.json'))
  
  console.log(`📂 Found ${jsonFiles.length} attorney bio files\n`)
  
  const attorneys: ParsedAttorney[] = []
  
  for (const file of jsonFiles) {
    const filePath = path.join(inputDir, file)
    const rawData = JSON.parse(await fs.readFile(filePath, 'utf8'))
    
    try {
      const parsed = parseAttorneyBio(rawData, file)
      attorneys.push(parsed)
      console.log(`✅ ${parsed.name} (${parsed.title})`)
    } catch (error) {
      console.error(`❌ Error parsing ${file}:`, (error as Error).message)
    }
  }
  
  // Sort alphabetically by last name
  attorneys.sort((a, b) => {
    const aLast = a.name.split(' ').pop() || ''
    const bLast = b.name.split(' ').pop() || ''
    return aLast.localeCompare(bLast)
  })
  
  // Generate TypeScript file
  const tsContent = `/**
 * Parsed attorney data from scraped bios
 * Auto-generated by scripts/parse-attorney-bios.ts
 * DO NOT EDIT MANUALLY
 */

export interface ParsedAttorney {
  id: string
  slug: string
  name: string
  title: string
  email: string
  phone: string
  fax?: string
  assistant?: string
  assistantEmail?: string
  linkedIn?: string
  vCard?: string
  imageUrl: string
  bio: string
  representativeMatters: string[]
  publications: Array<{ title: string; url?: string; date?: string; author?: string }>
  presentations: string[]
  awards: string[]
  communityActivity: string[]
  beyondOffice?: string
  videos: Array<{ title: string; url: string; date?: string }>
  industries: string[]
  practiceAreas: string[]
  associations: string[]
  barAdmissions: string[]
  education: string[]
}

export const attorneys: ParsedAttorney[] = ${JSON.stringify(attorneys, null, 2)}
`
  
  await fs.writeFile(outputFile, tsContent, 'utf8')
  
  console.log(`\n✨ Successfully parsed ${attorneys.length} attorneys`)
  console.log(`📁 Output saved to: ${outputFile}`)
  console.log(`\n📊 Summary:`)
  console.log(`   - Partners: ${attorneys.filter(a => a.title.toLowerCase().includes('partner')).length}`)
  console.log(`   - Of Counsel: ${attorneys.filter(a => a.title.toLowerCase().includes('counsel')).length}`)
  console.log(`   - Associates: ${attorneys.filter(a => a.title.toLowerCase().includes('associate')).length}`)
  console.log(`   - With LinkedIn: ${attorneys.filter(a => a.linkedIn).length}`)
  console.log(`   - With Photos: ${attorneys.filter(a => a.imageUrl).length}`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
