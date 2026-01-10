/**
 * Idempotent Blog Posts Seed Script
 * Seeds blog posts ONLY if they don't exist (by slug).
 * Uses Payload Local API. Links to attorneys and practice areas.
 *
 * Usage: npm run db:seed:blog:posts
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

// Load seed data
const seedDataPath = join(__dirname, 'seed-data', 'blog-posts.json')
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

async function seedBlogPosts() {
  console.log('🌱 Starting Blog Posts Seed Script...\n')

  try {
    // Initialize Payload
    console.log('📦 Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('✓ Payload initialized\n')

    const results = {
      created: [],
      skipped: [],
      failed: [],
    }

    console.log(`📝 Seeding ${seedData.length} blog posts...\n`)

    for (const postData of seedData) {
      try {
        // Check if post already exists by slug
        const existing = await payload.find({
          collection: 'blog',
          where: {
            slug: {
              equals: postData.slug,
            },
          },
          limit: 1,
        })

        if (existing.totalDocs > 0) {
          results.skipped.push(postData.slug)
          console.log(`   ⊘ Skipped: ${postData.title} (already exists)`)
          continue
        }

        // Find author by email
        const authorResult = await payload.find({
          collection: 'attorneys',
          where: {
            email: {
              equals: postData.authorEmail,
            },
          },
          limit: 1,
        })

        if (authorResult.totalDocs === 0) {
          results.skipped.push({
            slug: postData.slug,
            reason: `Author not found: ${postData.authorEmail}`,
          })
          console.log(`   ⚠️  Skipped: ${postData.title} (author not found: ${postData.authorEmail})`)
          continue
        }

        const authorId = authorResult.docs[0].id

        // Find related practice areas by title/slug
        const practiceAreaIds = []
        if (postData.relatedPracticeAreas && postData.relatedPracticeAreas.length > 0) {
          for (const practiceAreaTitle of postData.relatedPracticeAreas) {
            // Try exact title match
            let practiceAreaResult = await payload.find({
              collection: 'practice-areas',
              where: {
                title: {
                  equals: practiceAreaTitle,
                },
              },
              limit: 1,
            })

            // If not found, try slug match
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
            }
          }
        }

        // Create blog post
        const created = await payload.create({
          collection: 'blog',
          data: {
            title: postData.title,
            slug: postData.slug,
            author: authorId,
            excerpt: postData.excerpt,
            content: createRichText(postData.content),
            publishedDate: postData.publishedDate,
            status: postData.status || 'published',
            categories: (postData.categories || []).map((cat) => ({ category: cat })),
            relatedPracticeAreas: practiceAreaIds,
            industries: [],
            tags: [],
          },
        })

        results.created.push({
          title: postData.title,
          slug: postData.slug,
          id: created.id,
        })
        console.log(`   ✓ Created: ${postData.title} (${postData.slug})`)
      } catch (error) {
        results.failed.push({
          title: postData.title,
          slug: postData.slug,
          error: error.message,
        })
        console.error(`   ✗ Failed: ${postData.title} - ${error.message}`)
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

    console.log('\n✅ Blog posts seed script completed!')
    console.log('\n🔍 Verify in Neon SQL Editor:')
    console.log('   SELECT count(*) FROM public.blog;')
    console.log('   SELECT title, slug, status FROM public.blog;')

    process.exit(results.failed.length > 0 ? 1 : 0)
  } catch (error) {
    console.error('\n❌ Blog posts seed script failed:', error)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run the seed
seedBlogPosts()
