/**
 * Standalone Sitemap Generator
 * Generates sitemap.xml for all static and dynamic routes
 * Ensures Google indexes all 28 attorneys and practice/industry pages
 * 
 * Run after build: npm run postbuild
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import attorney data directly
const attorneysPath = path.join(__dirname, '../src/lib/data/attorneys.ts')
const practiceAreasPath = path.join(__dirname, '../src/lib/data/practiceAreasEnhanced.ts')
const industriesPath = path.join(__dirname, '../src/lib/data/industries-manual.ts')

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

// Static routes
const staticRoutes: SitemapUrl[] = [
  { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 1.0 },
  { loc: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
  { loc: '/attorneys', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.9 },
  { loc: '/practice-areas', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.9 },
  { loc: '/industries', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
  { loc: '/newsroom', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.7 },
  { loc: '/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
]

async function extractDynamicRoutes(): Promise<SitemapUrl[]> {
  const routes: SitemapUrl[] = []
  const lastmod = new Date().toISOString().split('T')[0]

  try {
    // Read and parse attorneys data
    const attorneysContent = fs.readFileSync(attorneysPath, 'utf-8')
    const attorneyIdMatches = attorneysContent.matchAll(/"id":\s*"([^"]+)"/g)
    for (const match of attorneyIdMatches) {
      routes.push({
        loc: `/attorneys/${match[1]}`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.8
      })
    }

    // Read and parse practice areas
    const practiceAreasContent = fs.readFileSync(practiceAreasPath, 'utf-8')
    const practiceSlugMatches = practiceAreasContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)
    for (const match of practiceSlugMatches) {
      routes.push({
        loc: `/practice-areas/${match[1]}`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.7
      })
    }

    // Read and parse industries
    const industriesContent = fs.readFileSync(industriesPath, 'utf-8')
    const industrySlugMatches = industriesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)
    for (const match of industrySlugMatches) {
      routes.push({
        loc: `/industries/${match[1]}`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.7
      })
    }
  } catch (error) {
    console.error('Error extracting dynamic routes:', error)
  }

  return routes
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlElements = urls.map(url => `
  <url>
    <loc>https://www.rbelaw.com${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`
}

async function generateSitemap() {
  console.log('🗺️  Generating sitemap.xml...')
  
  const dynamicRoutes = await extractDynamicRoutes()
  const allRoutes = [...staticRoutes, ...dynamicRoutes]
  
  console.log(`📄 Found ${staticRoutes.length} static routes`)
  console.log(`🔄 Found ${dynamicRoutes.length} dynamic routes`)
  console.log(`✅ Total: ${allRoutes.length} URLs`)
  
  const sitemapXml = generateSitemapXml(allRoutes)
  
  // Write to dist folder (post-build)
  const distPath = path.join(__dirname, '../dist/sitemap.xml')
  fs.writeFileSync(distPath, sitemapXml, 'utf-8')
  
  console.log(`✓ Sitemap generated at dist/sitemap.xml`)
  console.log(`✓ Attorneys indexed: ${dynamicRoutes.filter(r => r.loc.includes('/attorneys/')).length}`)
}

// Run the generator
generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error)
  process.exit(1)
})
