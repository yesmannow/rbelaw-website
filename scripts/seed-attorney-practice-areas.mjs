/**
 * Idempotent Attorney-Practice Area Relations Seed Script
 * Creates/updates relationships between attorneys and practice areas.
 * Uses Payload Local API. Idempotent - merges existing + new unique IDs.
 *
 * Usage: npm run db:seed:relations
 */

import { getPayload } from 'payload'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
import { config as dotenvConfig } from 'dotenv'

// Load environment variables FIRST
const envLocalPath = resolve(process.cwd(), '.env.local')
const envPath = resolve(process.cwd(), '.env')

let envLoaded = false

if (existsSync(envLocalPath)) {
  dotenvConfig({ path: envLocalPath })
  console.log('✓ Loaded .env.local')
  envLoaded = true
}

if (existsSync(envPath)) {
  dotenvConfig({ path: envPath })
  if (!envLoaded) {
    console.log('✓ Loaded .env')
    envLoaded = true
  }
}

if (!process.env.DIRECT_DATABASE_URL && !process.env.DATABASE_URL) {
  console.error('\n❌ Error: Missing database environment variable!')
  process.exit(1)
}

// Import config AFTER env vars are loaded
const configModule = await import('@payload-config')
const config = configModule.default

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load mapping data
const mappingPath = join(__dirname, 'seed-data', 'attorney-practice-area-map.json')
const mappings = JSON.parse(readFileSync(mappingPath, 'utf-8'))

async function seedRelations() {
  console.log('🌱 Starting Attorney-Practice Area Relations Seed Script...\n')

  try {
    // Initialize Payload
    console.log('📦 Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('✓ Payload initialized\n')

    const results = {
      updated: [],
      skipped: [],
      failed: [],
    }

    console.log(`📝 Processing ${mappings.length} attorney mappings...\n`)

    for (const mapping of mappings) {
      try {
        // Find attorney by email
        const attorneyResult = await payload.find({
          collection: 'attorneys',
          where: {
            email: {
              equals: mapping.attorneyEmail,
            },
          },
          limit: 1,
        })

        if (attorneyResult.totalDocs === 0) {
          results.skipped.push({
            email: mapping.attorneyEmail,
            reason: 'Attorney not found',
          })
          console.log(`   ⊘ Skipped: ${mapping.attorneyEmail} (attorney not found)`)
          continue
        }

        const attorney = attorneyResult.docs[0]
        const attorneyId = attorney.id

        // Find practice areas by title (fuzzy match - try exact first, then contains)
        const practiceAreaIds = []

        for (const practiceAreaTitle of mapping.practiceAreas) {
          // Try exact match first
          let practiceAreaResult = await payload.find({
            collection: 'practice-areas',
            where: {
              title: {
                equals: practiceAreaTitle,
              },
            },
            limit: 1,
          })

          // If not found, try slug match (convert title to slug)
          if (practiceAreaResult.totalDocs === 0) {
            const slug = practiceAreaTitle
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')

            practiceAreaResult = await payload.find({
              collection: 'practice-areas',
              where: {
                slug: {
                  equals: slug,
                },
              },
              limit: 1,
            })
          }

          if (practiceAreaResult.totalDocs > 0) {
            practiceAreaIds.push(practiceAreaResult.docs[0].id)
          } else {
            console.log(`   ⚠️  Practice area not found: ${practiceAreaTitle}`)
          }
        }

        if (practiceAreaIds.length === 0) {
          results.skipped.push({
            email: mapping.attorneyEmail,
            reason: 'No practice areas found',
          })
          console.log(`   ⊘ Skipped: ${mapping.attorneyEmail} (no matching practice areas)`)
          continue
        }

        // Get existing practice area IDs (if any)
        const existingPracticeAreaIds = Array.isArray(attorney.practices)
          ? attorney.practices.map((pa) => (typeof pa === 'object' ? pa.id : pa))
          : []

        // Merge existing + new, remove duplicates
        const allPracticeAreaIds = [
          ...new Set([...existingPracticeAreaIds, ...practiceAreaIds]),
        ]

        // Update attorney with merged practice areas
        await payload.update({
          collection: 'attorneys',
          id: attorneyId,
          data: {
            practices: allPracticeAreaIds,
          },
        })

        const addedCount = practiceAreaIds.length
        const wasNew = existingPracticeAreaIds.length === 0

        results.updated.push({
          email: mapping.attorneyEmail,
          name: attorney.name,
          added: addedCount,
          total: allPracticeAreaIds.length,
          wasNew,
        })

        console.log(
          `   ✓ Updated: ${attorney.name} (${wasNew ? 'added' : 'merged'} ${addedCount} practice area${addedCount !== 1 ? 's' : ''}, total: ${allPracticeAreaIds.length})`
        )
      } catch (error) {
        results.failed.push({
          email: mapping.attorneyEmail,
          error: error.message,
        })
        console.error(`   ✗ Failed: ${mapping.attorneyEmail} - ${error.message}`)
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50))
    console.log('📊 Relations Summary:')
    console.log(`   ✅ Updated: ${results.updated.length}`)
    console.log(`   ⊘ Skipped: ${results.skipped.length}`)
    if (results.failed.length > 0) {
      console.log(`   ❌ Failed: ${results.failed.length}`)
      results.failed.forEach((f) => {
        console.log(`      - ${f.email}: ${f.error}`)
      })
    }

    console.log('\n✅ Relations seed script completed!')
    console.log('\n🔍 Verify via Payload API:')
    console.log('   const attorneys = await payload.find({')
    console.log('     collection: "attorneys",')
    console.log('     depth: 1')
    console.log('   })')
    console.log('   // Check attorneys[0].practices array')

    process.exit(results.failed.length > 0 ? 1 : 0)
  } catch (error) {
    console.error('\n❌ Relations seed script failed:', error)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run the seed
seedRelations()
