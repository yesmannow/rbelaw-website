import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import process from 'node:process'

// Types align to src/lib/types/content.ts PracticeArea shape used by PracticeAreaDetail
interface ListBlock { type: 'list'; items: string[] }
interface Section {
  heading: string
  level: 'h2' | 'h3' | 'h4'
  content: Array<string | ListBlock>
}
interface PracticeArea {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color?: string
  image?: string
  content: Section[]
  relatedAttorneys: string[]
  relatedIndustries: string[]
  featured?: boolean
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const OUTPUT = path.join(ROOT, 'src', 'lib', 'data', 'practiceAreas-md.ts')

function slugFromUrl(url: string): string {
  try {
    const u = new URL(url)
    const parts = u.pathname.replace(/\/$/, '').split('/')
    return parts[parts.length - 1] || 'practice-areas'
  } catch {
    return ''
  }
}

function parseFrontmatter(md: string) {
  const fmMatch = md.match(/^---[\s\S]*?---/)
  if (!fmMatch) return { title: '', url: '' }
  const fm = fmMatch[0]
  const titleMatch = fm.match(/title:\s*"([^"]+)"/)
  const urlMatch = fm.match(/url:\s*"([^"]+)"/)
  return {
    title: titleMatch?.[1] || '',
    url: urlMatch?.[1] || ''
  }
}

function toTitle(slug: string) {
  return slug
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

function parseMarkdownToSections(mdBody: string): Section[] {
  const lines = mdBody.split(/\r?\n/)
  const sections: Section[] = []
  let current: Section | null = null
  let pendingList: string[] | null = null

  function flushList() {
    if (pendingList && current) {
      current.content.push({ type: 'list', items: pendingList })
    }
    pendingList = null
  }

  function ensureSection(heading: string, level: 'h2' | 'h3' | 'h4') {
    flushList()
    current = { heading, level, content: [] }
    sections.push(current)
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue

    // Headings
    if (line.startsWith('### ')) {
      ensureSection(line.replace(/^###\s+/, '').trim(), 'h3')
      continue
    }
    if (line.startsWith('## ')) {
      ensureSection(line.replace(/^##\s+/, '').trim(), 'h2')
      continue
    }
    if (line.startsWith('# ')) {
      ensureSection(line.replace(/^#\s+/, '').trim(), 'h2')
      continue
    }

    // Lists
    if (line.startsWith('- ')) {
      if (!pendingList) pendingList = []
      pendingList.push(line.replace(/^-\s+/, '').trim())
      continue
    }

    // Paragraph text
    flushList()
    if (!current) {
      ensureSection('Overview', 'h2')
    }
    // After ensureSection, current is guaranteed to be non-null
    current!.content.push(line)
  }

  flushList()
  return sections
}

async function readMarkdownFiles(): Promise<PracticeArea[]> {
  const docsDir = path.join(ROOT, 'docs', 'scraped')
  const entries = await fs.readdir(docsDir)
  const mdFiles = entries.filter(f => f.startsWith('rbelaw.com_practice-areas') && f.endsWith('.md'))
  const areas: PracticeArea[] = []

  for (const file of mdFiles) {
    const full = path.join(docsDir, file)
    const raw = await fs.readFile(full, 'utf-8')
    const { title, url } = parseFrontmatter(raw)

    // Skip the main index file
    if (file === 'rbelaw.com_practice-areas_.md') continue

    const slug = slugFromUrl(url) || file
      .replace(/^rbelaw\.com_practice-areas_/, '')
      .replace(/_?rbelaw\.com/, '')
      .replace(/_+\.md$/, '')
      .replace(/\.md$/, '')
      .replace(/_+$/, '')
      .replace(/[^a-z0-9-]+/gi, '-')
      .toLowerCase()

    const body = raw.replace(/^---[\s\S]*?---\s*/, '')
    const sections = parseMarkdownToSections(body)

    const firstText = sections.find(s => s.content.some(c => typeof c === 'string'))
    const description = firstText
      ? (firstText.content.find(c => typeof c === 'string') as string)
      : ''

    const area: PracticeArea = {
      id: slug,
      name: title || toTitle(slug),
      slug,
      description,
      icon: 'Scale',
      color: '#213469',
      image: '',
      content: sections,
      relatedAttorneys: [],
      relatedIndustries: [],
      featured: false
    }

    areas.push(area)
  }

  return areas
}

async function main() {
  const areas = await readMarkdownFiles()
  const header = `// Auto-generated from markdown files by scripts/convert-practice-areas-md.ts\n// Last updated: ${new Date().toISOString()}\n\nimport type { PracticeArea } from '../types/content'\n\nexport const practiceAreasMd: PracticeArea[] = `
  const content = header + JSON.stringify(areas, null, 2) + "\n"
  await fs.writeFile(OUTPUT, content, 'utf-8')
  console.log(`✓ Wrote ${areas.length} practice areas to ${path.relative(ROOT, OUTPUT)}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
