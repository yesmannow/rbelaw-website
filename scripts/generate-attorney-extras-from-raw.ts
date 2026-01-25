/**
 * Generate `src/lib/data/attorney-extras.ts` from `scripts/output/attorney-bios-raw/*.json`.
 *
 * This is the most reliable source we have for complete bios (28 files).
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import type { Attorney, Education } from '../src/lib/types'
import { attorneys as masterAttorneys } from '../src/lib/data/attorneys'

type RawBio = {
  markdown: string
  metadata?: Record<string, unknown>
}

function toPosix(p: string) {
  return p.split(path.sep).join('/')
}

function sectionSlice(markdown: string, headingRegex: RegExp): string | null {
  const m = markdown.match(headingRegex)
  if (!m || m.index === undefined) return null
  const start = m.index + m[0].length
  const rest = markdown.slice(start)
  const next = rest.search(/\n#{1,4}\s+/) // next heading
  const body = (next === -1 ? rest : rest.slice(0, next)).trim()
  return body || null
}

function extractBullets(section: string | null): string[] {
  if (!section) return []
  const lines = section.split('\n').map(l => l.trim())
  const bullets = lines
    .filter(l => l.startsWith('- '))
    .map(l => l.replace(/^-+\s*/, '').trim())
    .filter(Boolean)
    .filter((l) => l !== '╳' && !l.startsWith('![') && !l.startsWith('![](') && !l.startsWith('[!['))
  return Array.from(new Set(bullets))
}

function extractAssistant(markdown: string): Attorney['assistant'] | undefined {
  const re = /\*\*Assistant:\*\*\s*\[([^\]]+)\]\(\s*mailto:([^)]+)\s*\)/i
  const m = markdown.match(re)
  if (!m) return undefined
  const name = m[1].trim()
  const email = decodeURIComponent(m[2]).replace(/\s+/g, '')
  return name ? { name, email } : undefined
}

function extractFax(markdown: string): string | undefined {
  // Fax icon often precedes the number (), but we also accept "Fax" text.
  const re1 = /\s*\n+\s*([0-9][0-9().\-\s]{7,})/m
  const m1 = markdown.match(re1)
  if (m1) return m1[1].trim()

  const re2 = /\bfax\b\s*[:\-]?\s*([0-9][0-9().\-\s]{7,})/i
  const m2 = markdown.match(re2)
  return m2 ? m2[1].trim() : undefined
}

function extractBioPdf(markdown: string): string | undefined {
  const re = /\[Download\s+my\s+Bio\]\(([^)]+\.pdf)\)/i
  const m = markdown.match(re)
  return m ? m[1].trim() : undefined
}

function extractAssociations(markdown: string): string[] {
  const body = sectionSlice(markdown, /\n####\s+Associations\s*\n/i) ?? sectionSlice(markdown, /\n####\s+Association[s]?\s*\n/i)
  return extractBullets(body)
}

function extractBarAdmissions(markdown: string): string[] {
  const body =
    sectionSlice(markdown, /\n####\s+Bar\s+and\s+Court\s+Admissions\s*\n/i) ??
    sectionSlice(markdown, /\n####\s+Bar\s+Admissions\s*\n/i)
  return extractBullets(body)
}

function extractEducation(markdown: string): Education[] {
  const body = sectionSlice(markdown, /\n####\s+Education\s*\n/i)
  const lines = (body ?? '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => l.replace(/^-+\s*/, '').trim())
    .filter(Boolean)
    .filter((l) => l !== '╳' && !l.startsWith('![') && !l.startsWith('![](') && !l.startsWith('[!['))

  return lines.map((institution) => ({ institution, degree: '', year: '' }))
}

function extractBeyondOffice(markdown: string): string | undefined {
  const body = sectionSlice(markdown, /\n##\s+Beyond\s+the\s+Office\s*\n/i)
  if (!body) return undefined
  const cleaned = body
    .replace(/^\s*-\s*\[.*?\]\(.*?\)\s*$/gm, '') // remove nav fragments if any
    .trim()
  return cleaned || undefined
}

async function main() {
  const root = process.cwd()
  const rawDir = path.join(root, 'scripts', 'output', 'attorney-bios-raw')
  const outPath = path.join(root, 'src', 'lib', 'data', 'attorney-extras.ts')

  const masterIds = new Set(masterAttorneys.map(a => a.id))

  const files = (await fs.readdir(rawDir)).filter(f => f.endsWith('.json'))
  const extras: Record<string, Partial<Attorney>> = {}

  for (const f of files) {
    const id = f.replace(/\.json$/i, '')
    if (!masterIds.has(id)) continue

    const raw = await fs.readFile(path.join(rawDir, f), 'utf8')
    const parsed = JSON.parse(raw) as RawBio
    const md = parsed.markdown || ''
    if (!md) continue

    const assistant = extractAssistant(md)
    const fax = extractFax(md)
    const bioPdfUrl = extractBioPdf(md)
    const associations = extractAssociations(md)
    const barAdmissions = extractBarAdmissions(md)
    const education = extractEducation(md)
    const beyondOffice = extractBeyondOffice(md)

    const representativeMatters = extractBullets(sectionSlice(md, /\n##\s+Representative\s+Matters\s*\n/i))
    const awards = extractBullets(sectionSlice(md, /\n##\s+Awards\s*&\s*Recognition\s*\n/i))

    const out: Record<string, unknown> = {}
    if (assistant) out.assistant = assistant
    if (fax) out.fax = fax
    if (bioPdfUrl) out.bioPdfUrl = bioPdfUrl
    if (associations.length > 0) out.associations = associations
    if (beyondOffice) out.beyondOffice = beyondOffice
    if (representativeMatters.length > 0) out.representativeMatters = representativeMatters
    if (awards.length > 0) out.awards = awards
    if (barAdmissions.length > 0) out.barAdmissions = barAdmissions
    if (education.length > 0) out.education = education

    if (Object.keys(out).length > 0) extras[id] = out as any
  }

  const file = `/**
 * Attorney extras (id -> supplemental fields) sourced from scraped bios.
 *
 * Auto-generated by \`scripts/generate-attorney-extras-from-raw.ts\`.
 * Do not edit by hand.
 */

import type { Attorney } from '@/lib/types'

export type AttorneyExtras = Partial<
  Pick<
    Attorney,
    | 'representativeMatters'
    | 'awards'
    | 'barAdmissions'
    | 'education'
    | 'beyondOffice'
    | 'assistant'
    | 'fax'
    | 'bioPdfUrl'
    | 'associations'
  >
>

export const attorneyExtrasById: Record<string, AttorneyExtras> = ${JSON.stringify(extras, null, 2)} as const
`

  await fs.writeFile(outPath, file, 'utf8')
  // eslint-disable-next-line no-console
  console.log(`✓ Wrote ${toPosix(path.relative(root, outPath))} (${Object.keys(extras).length} attorneys with extras)`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

