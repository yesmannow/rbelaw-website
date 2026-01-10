/**
 * Seed Practice Areas from Firecrawl JSON
 *
 * Reads practice area data from a Firecrawl scrape JSON file and seeds the
 * Payload CMS database.
 *
 * Run with: tsx scripts/seed-practice-areas-from-json.mjs --in=data/practice-areas.json
 *
 * Options:
 *   --in          Input file path (default: data/practice-areas.json)
 *   --dry-run     Show actions without writing to the database (default: false)
 */

import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import process from 'node:process'
import { getPayload } from 'payload'
import { normalizeSlug } from './lib/slug.js'
import {
  findIndustryByName,
  resolveRelationIds,
  mergeRelationIds,
} from './lib/relations.js'

// Load env
const envLocal = path.resolve(process.cwd(), '.env.local')
if (existsSync(envLocal)) {
  dotenv.config({ path: envLocal })
} else {
  dotenv.config()
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = {
    in: 'data/practice-areas.json',
    dryRun: false,
  }

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i]
    const nextArg = process.argv[i + 1]

    if (arg.startsWith('--in=')) {
      args.in = arg.substring(5)
    } else if (arg === '--in' && nextArg) {
      args.in = nextArg
      i++
    } else if (arg === '--dry-run') {
      args.dryRun = true
    }
  }

  return args
}



/**
 * Convert plain text to Lexical rich text format
 */
function createRichText(text = '') {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [
            {
              type: 'text',
              text,
              version: 1,
            },
          ],
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Main function
 */
async function main() {
  const args = parseArgs()

  console.log('== Practice areas firecrawl seed ==')
  console.log(`Input: ${args.in}`)
  console.log(`Dry run: ${args.dryRun}`)
  console.log('--------------------------------------------\n')

  try {
    const inputPath = path.resolve(args.in)
    if (!existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`)
    }

    const inputContent = await fs.readFile(inputPath, 'utf8')
    const inputData = JSON.parse(inputContent)

    if (!inputData.items || !Array.isArray(inputData.items)) {
      throw new Error('No items array found in input data')
    }

    console.log(`Found ${inputData.items.length} practice area items to process\n`)

    // Load Payload config after env vars are set
    const configModule = await import('../src/payload.config.js')
    const config = configModule.default

    // Initialize Payload
    const payload = await getPayload({ config })

    let created = 0
    let updated = 0
    let skipped = 0
    let errors = 0

    for (const item of inputData.items) {
      try {
        if (!item.extracted) {
          console.log(`- Skipping ${item.url} (no extracted data)`)
          skipped++
          continue
        }

        const data = item.extracted
        if (!data.name) {
          console.log(`- Skipping ${item.url} (missing name)`)
          skipped++
          continue
        }

        const slug = normalizeSlug(data.name)
        const description = data.description || data.overviewMarkdown || ''
        const contentText = data.overviewMarkdown || data.description || data.name

        // Resolve industry relations
        const industryIds = await resolveRelationIds(
          payload,
          data.relatedIndustries || data.industries,
          findIndustryByName
        )

        // Check if practice area already exists
        const existing = await payload.find({
          collection: 'practice-areas',
          where: {
            slug: { equals: slug },
          },
          limit: 1,
        })

        const payloadData = {
          title: data.name,
          slug,
          description,
          content: createRichText(contentText),
          richContent: createRichText(contentText),
          leadMagnetType: 'none',
          icon: data.icon || null,
          featuredImage: null,
          featuredAttorneys: [],
          subAreas: (data.services || []).filter(Boolean).map(name => ({ name })),
          caseStudies: [],
          tags: [],
        }

        if (existing.docs.length > 0) {
          // Update existing practice area
          const existingPracticeArea = existing.docs[0]

          // Merge industry relations without duplicates
          const mergedIndustries = mergeRelationIds(existingPracticeArea.industries, industryIds)
          payloadData.industries = mergedIndustries

          if (args.dryRun) {
            console.log(`- Would update practice area: ${data.name}`)
          } else {
            await payload.update({
              collection: 'practice-areas',
              id: existing.docs[0].id,
              data: payloadData,
            })
            console.log(`- Updated practice area: ${data.name}`)
          }
          updated++
        } else {
          // Create new practice area
          payloadData.industries = industryIds

          if (args.dryRun) {
            console.log(`- Would create practice area: ${data.name}`)
          } else {
            await payload.create({
              collection: 'practice-areas',
              data: payloadData,
            })
            console.log(`- Created practice area: ${data.name}`)
          }
          created++
        }
      } catch (error) {
        console.error(`! Error processing ${item.url || 'item'}:`, error.message)
        errors++
      }
    }

    console.log('\nSeeding complete')
    console.log(`Created: ${created}`)
    console.log(`Updated: ${updated}`)
    console.log(`Skipped: ${skipped}`)
    console.log(`Errors: ${errors}`)

    if (args.dryRun) {
      console.log('\nDry run only - no database changes were made')
    }

    process.exit(errors > 0 ? 1 : 0)
  } catch (error) {
    console.error('\nPractice areas seeding failed:', error)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
