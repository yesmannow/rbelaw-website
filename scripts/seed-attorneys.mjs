/**
 * Idempotent Attorney Seed Script
 * Seeds initial attorney data ONLY if the attorneys table is empty.
 * Uses Payload Local API to ensure hooks, slugs, and relations work correctly.
 *
 * Usage: npm run db:seed
 */

import { getPayload } from 'payload'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
import { config as dotenvConfig } from 'dotenv'

// Load environment variables FIRST (before importing config)
// Priority: .env.local > .env
const envLocalPath = resolve(process.cwd(), '.env.local')
const envPath = resolve(process.cwd(), '.env')

let envLoaded = false

// Load .env.local if it exists
if (existsSync(envLocalPath)) {
  dotenvConfig({ path: envLocalPath })
  console.log('✓ Loaded .env.local')
  envLoaded = true
} else {
  console.log('⚠️  .env.local not found (this is okay if using .env)')
}

// Load .env if it exists (and .env.local wasn't loaded, or as fallback)
if (existsSync(envPath)) {
  dotenvConfig({ path: envPath })
  if (!envLoaded) {
    console.log('✓ Loaded .env')
    envLoaded = true
  }
} else if (!envLoaded) {
  console.log('⚠️  .env not found')
}

// Verify required env vars are set
if (!process.env.DIRECT_DATABASE_URL && !process.env.DATABASE_URL) {
  console.error('\n❌ Error: Missing database environment variable!')
  console.error('   Please set DIRECT_DATABASE_URL (preferred) or DATABASE_URL in .env.local or .env')
  console.error('   See .env.example for the required format\n')
  process.exit(1)
}

// Import config AFTER env vars are loaded using dynamic import
// This allows env vars to be loaded before the config (which needs them)
const configModule = await import('@payload-config')
const config = configModule.default

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load seed data
const seedDataPath = join(__dirname, 'seed-data', 'attorneys.json')
const seedData = JSON.parse(readFileSync(seedDataPath, 'utf-8'))

/**
 * Generate slug from name
 * Example: "Sarah MacGill Marr" -> "sarah-macgill-marr"
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
}

/**
 * Convert plain text bio to Lexical rich text format
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

async function seedAttorneys() {
  console.log('🌱 Starting Attorney Seed Script...\n')

  try {
    // Initialize Payload
    console.log('📦 Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('✓ Payload initialized\n')

    // Check if attorneys already exist
    console.log('🔍 Checking existing attorneys...')
    const existingAttorneys = await payload.find({
      collection: 'attorneys',
      limit: 1,
    })

    if (existingAttorneys.totalDocs > 0) {
      console.log(`⚠️  Found ${existingAttorneys.totalDocs} existing attorney(s)`)
      console.log('✅ Attorneys already exist — skipping seed')
      console.log('   (This is expected behavior for idempotent seeding)\n')
      process.exit(0)
    }

    console.log('✓ No attorneys found — proceeding with seed\n')

    // Seed attorneys
    console.log(`📝 Seeding ${seedData.length} attorneys...\n`)

    const results = []

    for (const attorneyData of seedData) {
      try {
        const slug = generateSlug(attorneyData.name)

        const created = await payload.create({
          collection: 'attorneys',
          data: {
            name: attorneyData.name,
            slug: slug,
            jobType: attorneyData.jobType || 'attorney',
            role: attorneyData.role,
            email: attorneyData.email,
            bio: createRichText(attorneyData.bio),
            // Optional fields can be added here if needed
            education: [],
            quickFacts: {
              barAdmissions: [],
              languages: [],
            },
            awards: [],
            representativeMatters: [],
            publications: [],
            videos: [],
          },
        })

        results.push({ success: true, name: attorneyData.name, id: created.id })
        console.log(`   ✓ Created: ${attorneyData.name} (${slug})`)
      } catch (error) {
        results.push({ success: false, name: attorneyData.name, error: error.message })
        console.error(`   ✗ Failed: ${attorneyData.name} - ${error.message}`)
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50))
    console.log('📊 Seed Summary:')
    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length

    console.log(`   ✅ Successfully created: ${successful}`)
    if (failed > 0) {
      console.log(`   ❌ Failed: ${failed}`)
      results
        .filter((r) => !r.success)
        .forEach((r) => {
          console.log(`      - ${r.name}: ${r.error}`)
        })
    }

    console.log('\n✅ Seed script completed!')
    console.log('\n🔍 Verify in Neon SQL Editor:')
    console.log('   SELECT count(*) FROM public.attorneys;')
    console.log('   SELECT name, slug, email FROM public.attorneys;')

    process.exit(failed > 0 ? 1 : 0)
  } catch (error) {
    console.error('\n❌ Seed script failed:', error)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run the seed
seedAttorneys()
