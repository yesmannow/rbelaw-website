/**
 * Seed Attorneys from Firecrawl JSON
 *
 * Reads attorney data from a Firecrawl scrape JSON file and seeds the
 * Payload CMS database with idempotent upserts by slug.
 *
 * Run with: tsx scripts/seed-attorneys-from-json.mjs --in=data/attorneys.json
 *
 * Options:
 *   --in          Input file path (default: data/attorneys.json)
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
  findPracticeAreaByName,
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
    in: 'data/attorneys.json',
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

  console.log('== Attorneys firecrawl seed ==')
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

    console.log(`Found ${inputData.items.length} attorney items to process\n`)

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
        const bio = data.bio || data.overviewMarkdown || data.description || ''

        // Resolve practice area and industry relations
        const practiceAreaIds = await resolveRelationIds(
          payload,
          data.practiceAreas,
          findPracticeAreaByName
        )

        const industryIds = await resolveRelationIds(
          payload,
          data.industries,
          findIndustryByName
        )

        // Check if attorney already exists by slug
        const existing = await payload.find({
          collection: 'attorneys',
          where: {
            slug: { equals: slug },
          },
          limit: 1,
        })

        const payloadData = {
          name: data.name,
          slug,
          jobType: data.jobType || 'attorney',
          role: data.role || 'associate',
          email: data.email || `${slug}@rbelaw.com`,
          phone: data.phone || null,
          bio: createRichText(bio),
          education: [],
          quickFacts: {
            barAdmissions: [],
            languages: [],
          },
          awards: [],
          representativeMatters: [],
          publications: [],
          videos: [],
        }

        if (existing.docs.length > 0) {
          // Update existing attorney
          const existingAttorney = existing.docs[0]

          // Merge relations without duplicates
          const mergedPractices = mergeRelationIds(existingAttorney.practices, practiceAreaIds)
          const mergedIndustries = mergeRelationIds(existingAttorney.industries, industryIds)

          payloadData.practices = mergedPractices
          payloadData.industries = mergedIndustries

          if (args.dryRun) {
            console.log(`- Would update attorney: ${data.name}`)
          } else {
            await payload.update({
              collection: 'attorneys',
              id: existingAttorney.id,
              data: payloadData,
            })
            console.log(`- Updated attorney: ${data.name}`)
          }
          updated++
        } else {
          // Create new attorney
          payloadData.practices = practiceAreaIds
          payloadData.industries = industryIds

          if (args.dryRun) {
            console.log(`- Would create attorney: ${data.name}`)
          } else {
            await payload.create({
              collection: 'attorneys',
              data: payloadData,
            })
            console.log(`- Created attorney: ${data.name}`)
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
    console.error('\nAttorneys seeding failed:', error)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
