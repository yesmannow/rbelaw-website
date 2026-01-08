import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

interface ListBlock { type: 'list'; items: string[] }
interface Section {
  heading: string
  level: 'h2' | 'h3' | 'h4'
  content: Array<string | ListBlock>
}
interface ScrapyItem {
  url: string
  slug: string
  name: string
  description: string
  content: Section[]
  image_urls?: string[]
  images?: { url: string; path: string; checksum?: string }[]
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
const REPO_ROOT = path.resolve(__dirname, '..')

async function main() {
  const inputPath = path.resolve(REPO_ROOT, 'scripts', 'scrapy', 'practice-areas.json')
  const outputPath = path.resolve(REPO_ROOT, 'src', 'lib', 'data', 'practiceAreas-md.ts')

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input not found: ${inputPath}`)
    process.exit(1)
  }

  const raw = fs.readFileSync(inputPath, 'utf-8')
  const data = JSON.parse(raw) as ScrapyItem[]

  const areas: PracticeArea[] = data.map((item) => {
    // Choose a first downloaded image if present (Scrapy ImagesPipeline)
    const firstImage = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : undefined
    const publicImage = firstImage ? `/images/practice-areas/${firstImage.path.replace(/\\/g, '/')}` : ''

    const pa: PracticeArea = {
      id: item.slug,
      name: item.name || item.slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()),
      slug: item.slug,
      description: item.description || '',
      icon: 'Scale',
      color: '#213469',
      image: publicImage,
      content: Array.isArray(item.content) ? item.content : [],
      relatedAttorneys: [],
      relatedIndustries: [],
      featured: false,
    }
    return pa
  })

  const header = `// Auto-generated from Scrapy crawl by scripts/convert-practice-areas-json.ts\n// Last updated: ${new Date().toISOString()}\n\nimport type { PracticeArea } from '../types/content'\n\nexport const practiceAreasMd: PracticeArea[] = `
  const ts = header + JSON.stringify(areas, null, 2) + '\n'

  fs.writeFileSync(outputPath, ts, 'utf-8')
  console.log(`✓ Wrote ${areas.length} practice areas to ${path.relative(REPO_ROOT, outputPath)}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
