/**
 * Firecrawl Industries Scraper
 *
 * Extracts structured industry data from rbelaw.com using Firecrawl v2 scrape with extract.
 *
 * Run with: tsx scripts/firecrawl-scrape-industries.mjs --out=data/industries.json
 *
 * Options:
 *   --in          Input file path (default: data/site-map.json)
 *   --out         Output file path (default: data/industries.json)
 *   --concurrency Max concurrent requests (default: 2)
 *   --force       Ignore cache and fetch fresh data (default: false)
 */

import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import process from 'node:process'
import Firecrawl from '@mendable/firecrawl-js'
import { callFirecrawl } from './lib/firecrawl.js'
import { readScrapeCache, writeScrapeCache } from './lib/cache.js'
import { getErrorMessage } from './lib/errors.js'
import { normalizeIndustryExtract } from './lib/normalize.js'

// Load env
const envLocal = path.resolve(process.cwd(), '.env.local')
if (existsSync(envLocal)) {
  dotenv.config({ path: envLocal })
} else {
  dotenv.config()
}

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY

// Industry extraction schema
const INDUSTRY_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    overviewMarkdown: { type: 'string' },
    services: { type: 'array', items: { type: 'string' } },
    relatedPracticeAreas: { type: 'array', items: { type: 'string' } },
    attorneys: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'overviewMarkdown'],
}

// Extraction prompt
const EXTRACTION_PROMPT = `
Extract industry information from this page. Focus on:
- Industry name
- Description/overview (convert to markdown)
- Services offered
- Related practice areas
- Attorneys who serve this industry

Be thorough but accurate. If information is not present, omit the field rather than guessing.
`

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = {
    in: 'data/site-map.json',
    out: 'data/industries.json',
    concurrency: 2,
    force: false,
  }

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i]
    const nextArg = process.argv[i + 1]

    if (arg === '--in' && nextArg) {
      args.in = nextArg
      i++
    } else if (arg === '--out' && nextArg) {
      args.out = nextArg
      i++
    } else if (arg === '--concurrency' && nextArg) {
      args.concurrency = parseInt(nextArg, 10)
      i++
    } else if (arg === '--force') {
      args.force = true
    }
  }

  return args
}

/**
 * Scrape a single industry URL
 */
async function scrapeIndustry(app, url, force) {
  try {
    // Check cache first
    if (!force) {
      const cached = await readScrapeCache(url)
      if (cached) {
        console.log(`📦 Using cached data for ${url}`)
        return {
          ...cached,
          extracted: cached.extracted ? normalizeIndustryExtract(cached.extracted) : null,
          cached: true,
        }
      }
    }

    console.log(`🔍 Scraping ${url}...`)

    const result = await callFirecrawl(
      () => app.v1.scrapeUrl(url, {
        formats: ['markdown', 'extract'],
        onlyMainContent: true,
        extract: {
          schema: INDUSTRY_SCHEMA,
          prompt: EXTRACTION_PROMPT,
        },
      }),
      { name: `Scrape ${url}` }
    )

    const normalized = {
      url,
      extracted: result?.extract ? normalizeIndustryExtract(result.extract) : null,
      rawMarkdown: result?.markdown || null,
      metadata: result?.metadata || null,
      errors: result?.success === false ? [result?.error || 'Unknown Firecrawl error'] : [],
      cached: false,
    }

    // Cache the result
    await writeScrapeCache(url, normalized)

    return normalized
  } catch (error) {
    const message = getErrorMessage(error)
    console.error(`❌ Error scraping ${url}:`, message)
    return {
      url,
      extracted: null,
      rawMarkdown: null,
      errors: [message],
    }
  }
}

/**
 * Process industries with concurrency control
 */
async function processIndustries(industryUrls, concurrency, force) {
  if (!FIRECRAWL_API_KEY) {
    console.log('ℹ️  FIRECRAWL_API_KEY not found. Skipping Firecrawl scraping (optional tooling).')
    console.log('   Set FIRECRAWL_API_KEY in .env.local to enable industry scraping.')
    return industryUrls.map(url => ({
      url,
      extracted: null,
      rawMarkdown: null,
      errors: ['FIRECRAWL_API_KEY not configured'],
    }))
  }

  const app = new Firecrawl({ apiKey: FIRECRAWL_API_KEY })
  const results = []
  const semaphore = new Semaphore(concurrency)

  for (const url of industryUrls) {
    await semaphore.acquire()
    scrapeIndustry(app, url, force)
      .then(result => {
        results.push(result)
        semaphore.release()
      })
      .catch(error => {
        const message = getErrorMessage(error)
        console.error(`❌ Unexpected error processing ${url}:`, message)
        results.push({
          url,
          extracted: null,
          rawMarkdown: null,
          errors: [message],
        })
        semaphore.release()
      })
  }

  // Wait for all to complete
  while (results.length < industryUrls.length) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  return results
}

/**
 * Simple semaphore for concurrency control
 */
class Semaphore {
  constructor(max) {
    this.max = max
    this.current = 0
    this.waiting = []
  }

  async acquire() {
    if (this.current < this.max) {
      this.current++
      return
    }

    return new Promise(resolve => {
      this.waiting.push(resolve)
    })
  }

  release() {
    this.current--
    if (this.waiting.length > 0) {
      this.current++
      const resolve = this.waiting.shift()
      resolve()
    }
  }
}

/**
 * Main function
 */
async function main() {
  const args = parseArgs()

  // Ensure output directory exists
  const outputPath = path.resolve(args.out)
  const outputDir = path.dirname(outputPath)
  await fs.mkdir(outputDir, { recursive: true })

  console.log('🚀 Starting industry scraping\n')
  console.log(`   Input: ${args.in}`)
  console.log(`   Output: ${args.out}`)
  console.log(`   Concurrency: ${args.concurrency}`)
  console.log(`   Force: ${args.force}`)
  console.log('=' .repeat(60) + '\n')

  try {
    // Read site map
    const siteMapPath = path.resolve(args.in)
    if (!existsSync(siteMapPath)) {
      throw new Error(`Input file not found: ${siteMapPath}`)
    }

    const siteMapContent = await fs.readFile(siteMapPath, 'utf8')
    const siteMap = JSON.parse(siteMapContent)

    if (!siteMap.industries || !Array.isArray(siteMap.industries)) {
      throw new Error('No industries array found in site map')
    }

    console.log(`📊 Found ${siteMap.industries.length} industry URLs to process\n`)

    // Process industries
    const results = await processIndustries(siteMap.industries, args.concurrency, args.force)

    // Prepare output
    const output = {
      baseUrl: siteMap.baseUrl,
      generatedAt: new Date().toISOString(),
      total: results.length,
      items: results,
    }

    // Write output
    await fs.writeFile(outputPath, JSON.stringify(output, null, 2), 'utf8')

    // Summary
    const processed = results.filter(r => r.extracted).length
    const cached = results.filter(r => r.cached && r.extracted).length
    const errors = results.filter(r => r.errors && r.errors.length > 0).length

    console.log('✅ Industry scraping complete!\n')
    console.log('📊 Results:')
    console.log(`   - Total URLs: ${results.length}`)
    console.log(`   - Processed: ${processed}`)
    console.log(`   - Cached: ${cached}`)
    console.log(`   - Errors: ${errors}`)
    console.log(`\n📁 Results saved to: ${outputPath}`)

  } catch (error) {
    console.error('\n❌ Industry scraping failed:', getErrorMessage(error))
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('❌ Fatal error:', getErrorMessage(err))
  process.exit(1)
})
