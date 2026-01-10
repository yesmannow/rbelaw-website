/**
 * Seed Industries from Firecrawl JSON
 *
 * Reads industries data from JSON file and seeds the Payload CMS database.
 *
 * Run with: tsx scripts/seed-industries-from-json.mjs --in=data/industries.json
 *
 * Options:
 *   --in          Input file path (default: data/industries.json)
 *   --dry-run     Show what would be done without making changes (default: false)
 */

import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import process from 'node:process'
import { getPayload } from 'payload'
import { normalizeSlug } from './lib/slug.js'

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
    in: 'data/industries.json',
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
 * Main function
 */
async function main() {
  const args = parseArgs()

  console.log('🚀 Starting industries seeding\n')
  console.log(`   Input: ${args.in}`)
  console.log(`   Dry run: ${args.dryRun}`)
  console.log('=' .repeat(60) + '\n')

  try {
    // Read input file
    const inputPath = path.resolve(args.in)
    if (!existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`)
    }

    const inputContent = await fs.readFile(inputPath, 'utf8')
    const inputData = JSON.parse(inputContent)

    if (!inputData.items || !Array.isArray(inputData.items)) {
      throw new Error('No items array found in input data')
    }

    console.log(`📊 Found ${inputData.items.length} industry items to process\n`)

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
          console.log(`⚠️  Skipping ${item.url} - no extracted data`)
          skipped++
          continue
        }

        const data = item.extracted
        if (!data.name) {
          console.log(`⚠️  Skipping ${item.url} - missing name`)
          skipped++
          continue
        }

        const slug = normalizeSlug(data.name)

        // Check if industry already exists by slug
        const existing = await payload.find({
          collection: 'industries',
          where: {
            slug: { equals: slug }
          },
          limit: 1,
        })

        const payloadData = {
          title: data.name,
          slug,
          description: data.description || data.overviewMarkdown || '',
          icon: data.icon || null,
        }

        if (existing.docs.length > 0) {
          if (args.dryRun) {
            console.log(`📝 Would update existing industry: ${data.name}`)
          } else {
            // Update existing
            await payload.update({
              collection: 'industries',
              id: existing.docs[0].id,
              data: payloadData,
            })
            console.log(`📝 Updated industry: ${data.name}`)
          }
          updated++
        } else {
          if (args.dryRun) {
            console.log(`➕ Would create new industry: ${data.name}`)
          } else {
            // Create new
            await payload.create({
              collection: 'industries',
              data: payloadData,
            })
            console.log(`➕ Created industry: ${data.name}`)
          }
          created++
        }
      } catch (error) {
        console.error(`❌ Error processing ${item.url}:`, error.message)
        errors++
      }
    }

    console.log('\n✅ Industries seeding complete!\n')
    console.log('📊 Results:')
    console.log(`   - Created: ${created}`)
    console.log(`   - Updated: ${updated}`)
    console.log(`   - Skipped: ${skipped}`)
    console.log(`   - Errors: ${errors}`)

    if (args.dryRun) {
      console.log('\n🔍 This was a dry run - no changes were made')
    }

    process.exit(errors > 0 ? 1 : 0)

  } catch (error) {
    console.error('\n❌ Industries seeding failed:', error)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
