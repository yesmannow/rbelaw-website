/**
 * Database Quality Assurance Report
 *
 * Prints a comprehensive QA report for the database including:
 * - Counts per table
 * - Duplicate slugs detection
 * - Attorneys missing bio/headshot/email
 * - Practice areas with zero attorneys
 * - Industries with zero attorneys
 *
 * Run with: npm run db:qa
 */

import { existsSync } from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import process from 'node:process'
import { getPayload } from 'payload'

// Load env
const envLocal = path.resolve(process.cwd(), '.env.local')
if (existsSync(envLocal)) {
  dotenv.config({ path: envLocal })
} else {
  dotenv.config()
}

/**
 * Count documents in a collection
 */
async function countCollection(payload, collection) {
  try {
    const result = await payload.find({
      collection,
      limit: 0,
    })
    return result.totalDocs
  } catch (error) {
    console.error(`Error counting ${collection}:`, error.message)
    return 0
  }
}

/**
 * Find duplicate slugs in a collection
 */
async function findDuplicateSlugs(payload, collection) {
  try {
    const result = await payload.find({
      collection,
      limit: 10000,
    })

    const slugCounts = {}
    for (const doc of result.docs) {
      const slug = doc.slug
      if (slug) {
        slugCounts[slug] = (slugCounts[slug] || 0) + 1
      }
    }

    const duplicates = []
    for (const [slug, count] of Object.entries(slugCounts)) {
      if (count > 1) {
        duplicates.push({ slug, count })
      }
    }

    return duplicates
  } catch (error) {
    console.error(`Error finding duplicate slugs in ${collection}:`, error.message)
    return []
  }
}

/**
 * Find attorneys missing bio, headshot, or email
 */
async function findIncompleteAttorneys(payload) {
  try {
    const result = await payload.find({
      collection: 'attorneys',
      limit: 10000,
    })

    const incomplete = {
      missingBio: [],
      missingHeadshot: [],
      missingEmail: [],
    }

    for (const attorney of result.docs) {
      // Check bio
      const bioText = attorney.bio?.root?.children?.[0]?.children?.[0]?.text || ''
      if (!bioText || bioText.trim().length === 0) {
        incomplete.missingBio.push(attorney.name)
      }

      // Check headshot
      if (!attorney.headshot) {
        incomplete.missingHeadshot.push(attorney.name)
      }

      // Check email
      if (!attorney.email) {
        incomplete.missingEmail.push(attorney.name)
      }
    }

    return incomplete
  } catch (error) {
    console.error('Error finding incomplete attorneys:', error.message)
    return { missingBio: [], missingHeadshot: [], missingEmail: [] }
  }
}

/**
 * Find practice areas with zero attorneys
 */
async function findEmptyPracticeAreas(payload) {
  try {
    const result = await payload.find({
      collection: 'practice-areas',
      limit: 10000,
    })

    const empty = []
    for (const practiceArea of result.docs) {
      const attorneyCount = practiceArea.featuredAttorneys?.length || 0
      if (attorneyCount === 0) {
        empty.push(practiceArea.title)
      }
    }

    return empty
  } catch (error) {
    console.error('Error finding empty practice areas:', error.message)
    return []
  }
}

/**
 * Find attorneys by practice area
 */
async function countAttorneysByPracticeArea(payload, practiceAreaId) {
  try {
    const result = await payload.find({
      collection: 'attorneys',
      where: {
        practices: {
          contains: practiceAreaId,
        },
      },
      limit: 0,
    })

    return result.totalDocs
  } catch (error) {
    return 0
  }
}

/**
 * Find practice areas with zero attorneys (bidirectional check)
 */
async function findPracticeAreasWithZeroAttorneys(payload) {
  try {
    const result = await payload.find({
      collection: 'practice-areas',
      limit: 10000,
    })

    const empty = []
    for (const practiceArea of result.docs) {
      const attorneyCount = await countAttorneysByPracticeArea(payload, practiceArea.id)
      if (attorneyCount === 0) {
        empty.push(practiceArea.title)
      }
    }

    return empty
  } catch (error) {
    console.error('Error finding practice areas with zero attorneys:', error.message)
    return []
  }
}

/**
 * Find attorneys by industry
 */
async function countAttorneysByIndustry(payload, industryId) {
  try {
    const result = await payload.find({
      collection: 'attorneys',
      where: {
        industries: {
          contains: industryId,
        },
      },
      limit: 0,
    })

    return result.totalDocs
  } catch (error) {
    return 0
  }
}

/**
 * Find industries with zero attorneys
 */
async function findIndustriesWithZeroAttorneys(payload) {
  try {
    const result = await payload.find({
      collection: 'industries',
      limit: 10000,
    })

    const empty = []
    for (const industry of result.docs) {
      const attorneyCount = await countAttorneysByIndustry(payload, industry.id)
      if (attorneyCount === 0) {
        empty.push(industry.title)
      }
    }

    return empty
  } catch (error) {
    console.error('Error finding industries with zero attorneys:', error.message)
    return []
  }
}

/**
 * Main function
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════╗')
  console.log('║         DATABASE QUALITY ASSURANCE REPORT              ║')
  console.log('╚════════════════════════════════════════════════════════╝')
  console.log('')

  try {
    // Load Payload config after env vars are set
    const configModule = await import('../src/payload.config.js')
    const config = configModule.default

    // Initialize Payload
    const payload = await getPayload({ config })

    // ========================================
    // Section 1: Table Counts
    // ========================================
    console.log('┌─────────────────────────────────────────┐')
    console.log('│  TABLE COUNTS                           │')
    console.log('└─────────────────────────────────────────┘')
    console.log('')

    const collections = [
      'attorneys',
      'practice-areas',
      'industries',
      'blog',
      'case-results',
      'testimonials',
      'tags',
      'media',
    ]

    for (const collection of collections) {
      const count = await countCollection(payload, collection)
      console.log(`  ${collection.padEnd(20)} : ${count}`)
    }

    console.log('')

    // ========================================
    // Section 2: Duplicate Slugs
    // ========================================
    console.log('┌─────────────────────────────────────────┐')
    console.log('│  DUPLICATE SLUGS                        │')
    console.log('└─────────────────────────────────────────┘')
    console.log('')

    let foundDuplicates = false
    const slugCollections = ['attorneys', 'practice-areas', 'industries', 'blog', 'tags']

    for (const collection of slugCollections) {
      const duplicates = await findDuplicateSlugs(payload, collection)
      if (duplicates.length > 0) {
        foundDuplicates = true
        console.log(`  ${collection}:`)
        for (const dup of duplicates) {
          console.log(`    - "${dup.slug}" appears ${dup.count} times`)
        }
        console.log('')
      }
    }

    if (!foundDuplicates) {
      console.log('  ✅ No duplicate slugs found')
      console.log('')
    }

    // ========================================
    // Section 3: Incomplete Attorneys
    // ========================================
    console.log('┌─────────────────────────────────────────┐')
    console.log('│  ATTORNEYS DATA QUALITY                 │')
    console.log('└─────────────────────────────────────────┘')
    console.log('')

    const incomplete = await findIncompleteAttorneys(payload)

    if (incomplete.missingBio.length > 0) {
      console.log(`  Missing Bio (${incomplete.missingBio.length}):`)
      for (const name of incomplete.missingBio.slice(0, 10)) {
        console.log(`    - ${name}`)
      }
      if (incomplete.missingBio.length > 10) {
        console.log(`    ... and ${incomplete.missingBio.length - 10} more`)
      }
      console.log('')
    } else {
      console.log('  ✅ All attorneys have bio')
      console.log('')
    }

    if (incomplete.missingHeadshot.length > 0) {
      console.log(`  Missing Headshot (${incomplete.missingHeadshot.length}):`)
      for (const name of incomplete.missingHeadshot.slice(0, 10)) {
        console.log(`    - ${name}`)
      }
      if (incomplete.missingHeadshot.length > 10) {
        console.log(`    ... and ${incomplete.missingHeadshot.length - 10} more`)
      }
      console.log('')
    } else {
      console.log('  ✅ All attorneys have headshots')
      console.log('')
    }

    if (incomplete.missingEmail.length > 0) {
      console.log(`  Missing Email (${incomplete.missingEmail.length}):`)
      for (const name of incomplete.missingEmail) {
        console.log(`    - ${name}`)
      }
      console.log('')
    } else {
      console.log('  ✅ All attorneys have email')
      console.log('')
    }

    // ========================================
    // Section 4: Practice Areas with Zero Attorneys
    // ========================================
    console.log('┌─────────────────────────────────────────┐')
    console.log('│  PRACTICE AREAS WITH ZERO ATTORNEYS     │')
    console.log('└─────────────────────────────────────────┘')
    console.log('')

    const emptyPracticeAreas = await findPracticeAreasWithZeroAttorneys(payload)

    if (emptyPracticeAreas.length > 0) {
      console.log(`  Found ${emptyPracticeAreas.length} practice area(s):`)
      for (const title of emptyPracticeAreas) {
        console.log(`    - ${title}`)
      }
      console.log('')
    } else {
      console.log('  ✅ All practice areas have at least one attorney')
      console.log('')
    }

    // ========================================
    // Section 5: Industries with Zero Attorneys
    // ========================================
    console.log('┌─────────────────────────────────────────┐')
    console.log('│  INDUSTRIES WITH ZERO ATTORNEYS         │')
    console.log('└─────────────────────────────────────────┘')
    console.log('')

    const emptyIndustries = await findIndustriesWithZeroAttorneys(payload)

    if (emptyIndustries.length > 0) {
      console.log(`  Found ${emptyIndustries.length} industry/industries:`)
      for (const title of emptyIndustries) {
        console.log(`    - ${title}`)
      }
      console.log('')
    } else {
      console.log('  ✅ All industries have at least one attorney')
      console.log('')
    }

    // ========================================
    // Summary
    // ========================================
    console.log('╔════════════════════════════════════════════════════════╗')
    console.log('║                  REPORT COMPLETE                       ║')
    console.log('╚════════════════════════════════════════════════════════╝')

    process.exit(0)
  } catch (error) {
    console.error('\n❌ QA report failed:', error)
    console.error(error.stack)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
