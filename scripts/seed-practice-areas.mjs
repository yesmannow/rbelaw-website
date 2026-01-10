/**
 * Idempotent Practice Areas Seed Script
 * Seeds practice areas content ONLY if they don't exist (by slug).
 * Uses Payload Local API to ensure hooks, slugs, and relations work correctly.
 *
 * Usage: npm run db:seed:practice-areas
 */

import { getPayload } from 'payload'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
import { config as dotenvConfig } from 'dotenv'

// Load environment variables FIRST (before importing config)
const envLocalPath = resolve(process.cwd(), '.env.local')
const envPath = resolve(process.cwd(), '.env')

let envLoaded = false

if (existsSync(envLocalPath)) {
  dotenvConfig({ path: envLocalPath })
  console.log('✓ Loaded .env.local')
  envLoaded = true
} else {
  console.log('⚠️  .env.local not found (this is okay if using .env)')
}

if (existsSync(envPath)) {
  dotenvConfig({ path: envPath })
  if (!envLoaded) {
    console.log('✓ Loaded .env')
    envLoaded = true
  }
} else if (!envLoaded) {
  console.log('⚠️  .env not found')
}

if (!process.env.DIRECT_DATABASE_URL && !process.env.DATABASE_URL) {
  console.error('\n❌ Error: Missing database environment variable!')
  console.error('   Please set DIRECT_DATABASE_URL (preferred) or DATABASE_URL in .env.local or .env')
  console.error('   See .env.example for the required format\n')
  process.exit(1)
}

// Import config AFTER env vars are loaded
const configModule = await import('@payload-config')
const config = configModule.default

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load seed data
const seedDataPath = join(__dirname, 'seed-data', 'practice-areas.json')
const seedData = JSON.parse(readFileSync(seedDataPath, 'utf-8'))

/**
 * Convert plain text to Lexical rich text format
 */
function createRichText(text) {
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
              text: text,
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

async function seedPracticeAreas() {
  console.log('🌱 Starting Practice Areas Seed Script...\n')

  try {
    // Initialize Payload
    console.log('📦 Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('✓ Payload initialized\n')

    // Seed practice areas (check by slug for idempotency)
    console.log(`📝 Seeding ${seedData.length} practice areas...\n`)

    const results = {
      created: [],
      skipped: [],
      failed: [],
    }

    for (const practiceAreaData of seedData) {
      try {
        // Check if practice area already exists by slug
        const existing = await payload.find({
          collection: 'practice-areas',
          where: {
            slug: {
              equals: practiceAreaData.slug,
            },
          },
          limit: 1,
        })

        if (existing.totalDocs > 0) {
          results.skipped.push(practiceAreaData.slug)
          console.log(`   ⊘ Skipped: ${practiceAreaData.title} (already exists)`)
          continue
        }

        // Create new practice area
        const created = await payload.create({
          collection: 'practice-areas',
          data: {
            title: practiceAreaData.title,
            slug: practiceAreaData.slug,
            description: practiceAreaData.description,
            content: createRichText(practiceAreaData.content),
            icon: practiceAreaData.icon || null,
            leadMagnetType: 'none',
            subAreas: [],
            caseStudies: [],
            featuredAttorneys: [],
            industries: [],
            tags: [],
          },
        })

        results.created.push({
          title: practiceAreaData.title,
          slug: practiceAreaData.slug,
          id: created.id,
        })
        console.log(`   ✓ Created: ${practiceAreaData.title} (${practiceAreaData.slug})`)
      } catch (error) {
        results.failed.push({
          title: practiceAreaData.title,
          slug: practiceAreaData.slug,
          error: error.message,
        })
        console.error(`   ✗ Failed: ${practiceAreaData.title} - ${error.message}`)
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50))
    console.log('📊 Seed Summary:')
    console.log(`   ✅ Created: ${results.created.length}`)
    console.log(`   ⊘ Skipped: ${results.skipped.length}`)
    if (results.failed.length > 0) {
      console.log(`   ❌ Failed: ${results.failed.length}`)
      results.failed.forEach((f) => {
        console.log(`      - ${f.title}: ${f.error}`)
      })
    }

    console.log('\n✅ Seed script completed!')
    console.log('\n🔍 Verify in Neon SQL Editor:')
    console.log('   SELECT count(*) FROM public.practice_areas;')
    console.log('   SELECT title, slug FROM public.practice_areas;')

    process.exit(results.failed.length > 0 ? 1 : 0)
  } catch (error) {
    console.error('\n❌ Seed script failed:', error)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run the seed
seedPracticeAreas()
