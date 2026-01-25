/**
 * Audit attorney bios: scraped vs site data.
 *
 * Produces a quick per-attorney checklist of whether each major section exists:
 * - Biography
 * - Representative matters
 * - Awards & recognition
 * - Education
 * - Bar admissions
 *
 * Output: scripts/output/attorney-bio-audit.md
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { attorneys as siteAttorneys } from '../src/lib/data/attorneys'
import { attorneyExtrasById } from '../src/lib/data/attorney-extras'

type ScrapedSection =
  | {
      heading: string
      content: Array<
        | string
        | {
            type: 'list'
            items: string[]
          }
      >
    }

type ScrapedAttorney = {
  name: string
  bio?: ScrapedSection[]
  education?: string[]
  barAdmissions?: string[]
}

function normName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function countSection(sections: ScrapedSection[] | undefined, needle: string): number {
  if (!sections) return 0
  const n = needle.toLowerCase()
  return sections.filter(s => (s.heading || '').toLowerCase().includes(n)).length
}

function mergeCounts(id: string, base: any) {
  const extras = attorneyExtrasById[id]
  return {
    representativeMatters: (base.representativeMatters?.length ?? 0) || (extras?.representativeMatters?.length ?? 0),
    awards: (base.awards?.length ?? 0) || (extras?.awards?.length ?? 0),
    education: (base.education?.length ?? 0) || (extras?.education?.length ?? 0),
    barAdmissions: (base.barAdmissions?.length ?? 0) || (extras?.barAdmissions?.length ?? 0),
  }
}

async function main() {
  const root = process.cwd()
  const scrapedPath = path.join(root, 'scraped-content', 'attorneys.json')
  const outPath = path.join(root, 'scripts', 'output', 'attorney-bio-audit.md')

  const raw = await fs.readFile(scrapedPath, 'utf8')
  const scraped = (JSON.parse(raw) as ScrapedAttorney[]).filter(s => s?.name && s.name !== 'No Results Found')

  const scrapedByNorm = new Map<string, ScrapedAttorney>()
  for (const s of scraped) scrapedByNorm.set(normName(s.name), s)

  const lines: string[] = []
  lines.push(`# Attorney Bio Audit`)
  lines.push(``)
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push(`Scraped profiles: ${scraped.length}`)
  lines.push(`Site attorneys: ${siteAttorneys.length}`)
  lines.push(``)

  let matched = 0
  let missingAny = 0

  for (const a of siteAttorneys) {
    const s = scrapedByNorm.get(normName(a.name))
    if (!s) continue
    matched++

    const scrapedBio = countSection(s.bio, 'biography') + countSection(s.bio, 'overview')
    const scrapedMatters = countSection(s.bio, 'representative matters')
    const scrapedAwards = countSection(s.bio, 'awards')
    const scrapedBar = countSection(s.bio, 'bar admissions')
    const scrapedEdu = countSection(s.bio, 'education')

    const siteCounts = mergeCounts(a.id, a)

    const missing: string[] = []
    if (scrapedMatters > 0 && siteCounts.representativeMatters === 0) missing.push('Representative matters')
    if (scrapedAwards > 0 && siteCounts.awards === 0) missing.push('Awards')
    if ((s.education?.length ?? 0) > 0 && siteCounts.education === 0) missing.push('Education')
    if ((s.barAdmissions?.length ?? 0) > 0 && siteCounts.barAdmissions === 0) missing.push('Bar admissions')

    if (missing.length > 0) missingAny++

    lines.push(`## ${a.name} (\`${a.id}\`)`)
    lines.push(`- Scraped: bio=${scrapedBio > 0 ? 'yes' : 'no'}, matters=${scrapedMatters > 0 ? 'yes' : 'no'}, awards=${scrapedAwards > 0 ? 'yes' : 'no'}, edu=${(s.education?.length ?? 0) > 0 ? 'yes' : 'no'}, bar=${(s.barAdmissions?.length ?? 0) > 0 ? 'yes' : 'no'}`)
    lines.push(`- Site (incl extras): matters=${siteCounts.representativeMatters}, awards=${siteCounts.awards}, edu=${siteCounts.education}, bar=${siteCounts.barAdmissions}`)
    if (missing.length > 0) lines.push(`- Missing on site: **${missing.join(', ')}**`)
    lines.push(``)
  }

  lines.unshift(`Matched profiles: ${matched}, Profiles missing at least one scraped section: ${missingAny}`)

  await fs.mkdir(path.join(root, 'scripts', 'output'), { recursive: true })
  await fs.writeFile(outPath, lines.join('\n'), 'utf8')
  // eslint-disable-next-line no-console
  console.log(`✓ Wrote ${outPath}`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

