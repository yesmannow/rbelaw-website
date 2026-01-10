/**
 * Content Structure Analysis Script
 *
 * Analyzes scraped content to identify patterns and inform database schema design.
 * Reads from site discovery output and analyzes content structure.
 *
 * Run with: tsx scripts/analyze-content-structure.ts
 */

import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import Firecrawl from '@mendable/firecrawl-js'
import dotenv from 'dotenv'
import process from 'node:process'
import { isRateLimitError } from './lib/firecrawl.js'

// Load env
const envLocal = path.resolve(process.cwd(), '.env.local')
if (existsSync(envLocal)) {
  dotenv.config({ path: envLocal })
} else {
  dotenv.config()
}

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY

if (!FIRECRAWL_API_KEY) {
  console.log('ℹ️  FIRECRAWL_API_KEY not found. Skipping content analysis (optional tooling).')
  console.log('   Set FIRECRAWL_API_KEY in .env.local to enable content analysis.')
  process.exit(0)
}

const app = new Firecrawl({ apiKey: FIRECRAWL_API_KEY })

interface ContentAnalysis {
  url: string
  type: string
  hasMetadata: boolean
  metadataFields: string[]
  contentLength: number
  hasStructuredData: boolean
  detectedEntities: {
    attorneys?: string[]
    practiceAreas?: string[]
    industries?: string[]
    dates?: string[]
    locations?: string[]
  }
  schemaRecommendations: string[]
}

interface AnalysisReport {
  analyzedAt: string
  totalAnalyzed: number
  byType: Record<string, ContentAnalysis[]>
  commonPatterns: {
    metadataFields: Record<string, number>
    contentLengths: { min: number; max: number; avg: number }
    structuredDataFields: Record<string, number>
  }
  recommendations: {
    databaseFields: string[]
    indexes: string[]
    relationships: string[]
    optimizations: string[]
  }
}

/**
 * Extract entities from content using simple pattern matching
 */
function extractEntities(markdown: string, metadata: any): ContentAnalysis['detectedEntities'] {
  const entities: ContentAnalysis['detectedEntities'] = {}

  // Extract dates (simple pattern)
  const datePattern = /\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi
  const dates = markdown.match(datePattern) || []
  if (dates.length > 0) {
    entities.dates = [...new Set(dates)]
  }

  // Extract locations (Indiana, Indianapolis, etc.)
  const locationPattern = /\b(Indiana|Indianapolis|Marion County|Fort Wayne|South Bend|Evansville|Bloomington)\b/gi
  const locations = markdown.match(locationPattern) || []
  if (locations.length > 0) {
    entities.locations = [...new Set(locations)]
  }

  return entities
}

/**
 * Analyze a single URL's content
 */
async function analyzeUrl(url: string, type: string): Promise<ContentAnalysis> {
  try {
    const result = await app.scrape(url, {
      formats: ['markdown'],
      onlyMainContent: true,
    })

    const markdown = result.markdown || ''
    const metadata = result.metadata || {}
    const metadataFields = Object.keys(metadata)

    // Detect structured data patterns
    const hasStructuredData =
      metadataFields.length > 5 || // Rich metadata
      markdown.includes('##') || // Has headings
      markdown.includes('- ') || // Has lists
      markdown.includes('|') // Has tables

    // Extract entities
    const detectedEntities = extractEntities(markdown, metadata)

    // Generate schema recommendations
    const schemaRecommendations: string[] = []

    if (metadata.title) schemaRecommendations.push('title field')
    if (metadata.description) schemaRecommendations.push('description/excerpt field')
    if (metadata.ogImage || metadata.image) schemaRecommendations.push('featured image field')
    if (detectedEntities.dates && detectedEntities.dates.length > 0) schemaRecommendations.push('date fields')
    if (type === 'blog') schemaRecommendations.push('author relationship')
    if (type === 'attorney') schemaRecommendations.push('bio rich text, practice areas, education arrays')
    if (type === 'practice-area') schemaRecommendations.push('content rich text, related attorneys, case studies')

    return {
      url,
      type,
      hasMetadata: metadataFields.length > 0,
      metadataFields,
      contentLength: markdown.length,
      hasStructuredData,
      detectedEntities,
      schemaRecommendations,
    }
  } catch (error: any) {
    // Handle rate limit errors gracefully
    if (isRateLimitError(error)) {
      console.warn(`  ⚠️  Rate limit hit while analyzing ${url}. Skipping (optional tooling).`)
      throw error // Re-throw to be handled by main
    }
    console.error(`  ⚠️  Error analyzing ${url}:`, (error as Error).message)
    return {
      url,
      type,
      hasMetadata: false,
      metadataFields: [],
      contentLength: 0,
      hasStructuredData: false,
      detectedEntities: {},
      schemaRecommendations: [],
    }
  }
}

/**
 * Main analysis function
 */
async function main() {
  const discoveryDir = path.resolve('scripts/output/site-discovery')
  const outputDir = path.resolve('scripts/output/content-analysis')
  await fs.mkdir(outputDir, { recursive: true })

  // Load site map
  const siteMapFile = path.join(discoveryDir, 'sitemap.json')
  if (!existsSync(siteMapFile)) {
    console.log('ℹ️  Site discovery not found. Run discover-site-urls.ts first (optional tooling).')
    process.exit(0)
  }

  const siteMap = JSON.parse(await fs.readFile(siteMapFile, 'utf8'))

  console.log('🔍 Starting content structure analysis...\n')
  console.log(`📋 Analyzing ${siteMap.totalUrls} URLs\n`)

  // Sample URLs for analysis (limit to avoid excessive API calls)
  const sampleUrls: { url: string; type: string }[] = [
    // Sample from each category
    ...siteMap.byType.pages.slice(0, 3).map(u => ({ url: u.url, type: u.type })),
    ...siteMap.byType.blog.slice(0, 5).map(u => ({ url: u.url, type: u.type })),
    ...siteMap.byType.attorneys.slice(0, 5).map(u => ({ url: u.url, type: u.type })),
    ...siteMap.byType.practiceAreas.slice(0, 3).map(u => ({ url: u.url, type: u.type })),
  ]

  console.log(`📊 Analyzing ${sampleUrls.length} sample URLs...\n`)

  const analyses: ContentAnalysis[] = []
  let analyzed = 0

  for (const { url, type } of sampleUrls) {
    analyzed++
    console.log(`[${analyzed}/${sampleUrls.length}] Analyzing ${type}: ${url}`)

    try {
      const analysis = await analyzeUrl(url, type)
      analyses.push(analysis)

      // Rate limiting
      if (analyzed < sampleUrls.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } catch (error: any) {
      // If rate limit error, exit gracefully
      if (isRateLimitError(error)) {
        console.warn(`\n⚠️  Rate limit hit. Exiting gracefully (optional tooling).`)
        console.warn(`   Analyzed ${analyses.length} URLs before rate limit.`)
        break
      }
      // Other errors: continue with next URL
    }
  }

  // Organize by type
  const byType: Record<string, ContentAnalysis[]> = {}
  analyses.forEach(analysis => {
    if (!byType[analysis.type]) {
      byType[analysis.type] = []
    }
    byType[analysis.type].push(analysis)
  })

  // Calculate common patterns
  const allMetadataFields: Record<string, number> = {}
  const allStructuredFields: Record<string, number> = {}
  const contentLengths: number[] = []

  analyses.forEach(analysis => {
    analysis.metadataFields.forEach(field => {
      allMetadataFields[field] = (allMetadataFields[field] || 0) + 1
    })

    analysis.schemaRecommendations.forEach(rec => {
      allStructuredFields[rec] = (allStructuredFields[rec] || 0) + 1
    })

    contentLengths.push(analysis.contentLength)
  })

  const avgContentLength = contentLengths.reduce((a, b) => a + b, 0) / contentLengths.length

  const report: AnalysisReport = {
    analyzedAt: new Date().toISOString(),
    totalAnalyzed: analyses.length,
    byType,
    commonPatterns: {
      metadataFields: allMetadataFields,
      contentLengths: {
        min: Math.min(...contentLengths),
        max: Math.max(...contentLengths),
        avg: Math.round(avgContentLength),
      },
      structuredDataFields: allStructuredFields,
    },
    recommendations: {
      databaseFields: [
        'title (text, indexed)',
        'slug (text, unique, indexed)',
        'description/excerpt (text)',
        'content (richText/JSON)',
        'featuredImage (upload relationship)',
        'publishedDate (date, indexed)',
        'updatedDate (date, indexed)',
        'metadata (JSON for flexible storage)',
      ],
      indexes: [
        'slug (unique)',
        'publishedDate',
        'type/category',
        'status (draft/published)',
        'full-text search on title + content',
      ],
      relationships: [
        'attorneys -> practice-areas (many-to-many)',
        'blog -> attorneys (author)',
        'blog -> practice-areas (many-to-many)',
        'blog -> industries (many-to-many)',
        'practice-areas -> industries (many-to-many)',
      ],
      optimizations: [
        'Add computed fields for search (title + excerpt)',
        'Add JSONB columns for flexible metadata',
        'Add GIN indexes for JSONB columns',
        'Add full-text search indexes',
        'Add materialized views for common queries',
        'Add caching layer for frequently accessed content',
        'Normalize repeated data (locations, dates)',
      ],
    },
  }

  // Save report
  const reportFile = path.join(outputDir, 'analysis-report.json')
  await fs.writeFile(reportFile, JSON.stringify(report, null, 2), 'utf8')

  // Generate markdown summary
  const summary = `
# Content Structure Analysis Report
Generated: ${new Date().toISOString()}

## Summary
- URLs Analyzed: ${report.totalAnalyzed}
- Content Length: ${report.commonPatterns.contentLengths.min} - ${report.commonPatterns.contentLengths.max} chars (avg: ${report.commonPatterns.contentLengths.avg})

## Common Metadata Fields
${Object.entries(report.commonPatterns.metadataFields)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([field, count]) => `- ${field}: ${count} occurrences`)
  .join('\n')}

## Schema Recommendations

### Database Fields
${report.recommendations.databaseFields.map(f => `- ${f}`).join('\n')}

### Indexes
${report.recommendations.indexes.map(i => `- ${i}`).join('\n')}

### Relationships
${report.recommendations.relationships.map(r => `- ${r}`).join('\n')}

### Optimizations
${report.recommendations.optimizations.map(o => `- ${o}`).join('\n')}

## Next Steps
1. Review analysis-report.json for detailed findings
2. Run design-enhanced-schema.ts to generate schema improvements
3. Create migration scripts for database enhancements
`

  const summaryFile = path.join(outputDir, 'ANALYSIS_REPORT.md')
  await fs.writeFile(summaryFile, summary, 'utf8')

  console.log('\n' + '='.repeat(60))
  console.log('✨ Analysis Complete!\n')
  console.log(`📊 Analyzed ${analyses.length} URLs`)
  console.log(`📁 Results saved to: ${outputDir}`)
  console.log(`   - analysis-report.json: Detailed analysis`)
  console.log(`   - ANALYSIS_REPORT.md: Summary report`)
  console.log('\n🔄 Next step: Review recommendations and design enhanced schema')
}

main().catch((err) => {
  // Optional tooling: exit gracefully
  if (isRateLimitError(err)) {
    console.warn('⚠️  Fatal rate limit error. Exiting gracefully (optional tooling).')
    process.exit(0)
  } else {
    console.warn('⚠️  Fatal error. Exiting gracefully (optional tooling):', err)
    process.exit(0)
  }
})
