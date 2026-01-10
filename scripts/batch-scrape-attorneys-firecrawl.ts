/**
 * Batch scrape all attorney bios using Firecrawl SDK
 * Run with: tsx scripts/batch-scrape-attorneys-firecrawl.ts
 * 
 * Prerequisites:
 * npm install @mendable/firecrawl-js
 */

import Firecrawl from '@mendable/firecrawl-js'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
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
  console.log('ℹ️  FIRECRAWL_API_KEY not found. Skipping attorney scraping (optional tooling).')
  console.log('   Set FIRECRAWL_API_KEY in .env.local to enable attorney scraping.')
  process.exit(0)
}

const app = new Firecrawl({ apiKey: FIRECRAWL_API_KEY })

const attorneyUrls = [
  'https://rbelaw.com/our-team/attorneys/ryan-l-leitch',
  'https://rbelaw.com/our-team/attorneys/jaclyn-m-flint',
  'https://rbelaw.com/our-team/attorneys/lindsay-a-llewellyn',
  'https://rbelaw.com/our-team/attorneys/patrick-s-mccarney',
  'https://rbelaw.com/our-team/attorneys/kevin-n-tharp',
  'https://rbelaw.com/our-team/attorneys/john-l-egloff',
  'https://rbelaw.com/our-team/attorneys/katie-r-osborne',
  'https://rbelaw.com/our-team/attorneys/travis-r-watson',
  'https://rbelaw.com/our-team/attorneys/courtney-david-mills',
  'https://rbelaw.com/our-team/attorneys/katie-s-riles',
  'https://rbelaw.com/our-team/attorneys/laura-k-binford',
  'https://rbelaw.com/our-team/attorneys/raymond-t-seach',
  'https://rbelaw.com/our-team/attorneys/james-w-riley-jr',
  'https://rbelaw.com/our-team/attorneys/kathleen-hart',
  'https://rbelaw.com/our-team/attorneys/jeffrey-b-fecht',
  'https://rbelaw.com/our-team/attorneys/laura-s-reed',
  'https://rbelaw.com/our-team/attorneys/k-douglas-cook',
  'https://rbelaw.com/our-team/attorneys/beau-browning',
  'https://rbelaw.com/our-team/attorneys/anna-marvin',
  'https://rbelaw.com/our-team/attorneys/blair-r-vandivier',
  'https://rbelaw.com/our-team/attorneys/anthony-r-jost',
  'https://rbelaw.com/our-team/attorneys/megan-s-young',
  'https://rbelaw.com/our-team/attorneys/timothy-h-button',
  'https://rbelaw.com/our-team/attorneys/eric-m-hylton',
  'https://rbelaw.com/our-team/attorneys/justin-o-sorrell',
  'https://rbelaw.com/our-team/attorneys/donald-s-smith',
  'https://rbelaw.com/our-team/attorneys/sarah-macgill-marr',
  'https://rbelaw.com/our-team/attorneys/j-t-wynne',
]

async function main() {
  const outDir = path.resolve('scripts/output/attorney-bios-raw')
  await fs.mkdir(outDir, { recursive: true })

  console.log(`🚀 Starting batch scrape of ${attorneyUrls.length} attorneys...\n`)

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < attorneyUrls.length; i++) {
    const url = attorneyUrls[i]
    const slug = url.split('/').pop() || `attorney-${i}`

    try {
      console.log(`[${i + 1}/${attorneyUrls.length}] Scraping ${slug}...`)

      const result = await app.scrape(url, {
        formats: ['markdown'],
        onlyMainContent: true,
      })

      const outFile = path.join(outDir, `${slug}.json`)
      await fs.writeFile(outFile, JSON.stringify(result, null, 2), 'utf8')

      console.log(`  ✅ Saved to ${slug}.json`)
      successCount++

      // Rate limiting: wait 1 second between requests
      if (i < attorneyUrls.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    } catch (error: any) {
      // Handle rate limit errors gracefully
      if (isRateLimitError(error)) {
        console.warn(`  ⚠️  Rate limit hit while scraping ${slug}. Exiting gracefully (optional tooling).`)
        console.warn(`   Scraped ${successCount} attorneys before rate limit.`)
        break
      }
      console.error(`  ❌ Error scraping ${slug}:`, (error as Error).message)
      errorCount++
    }
  }

  console.log(`\n✨ Batch scrape complete!`)
  console.log(`   Success: ${successCount}`)
  console.log(`   Errors: ${errorCount}`)
  console.log(`\n📁 Raw data saved to: ${outDir}`)
  console.log(`\n🔄 Next step: Run transformation script to parse markdown into structured data`)
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
