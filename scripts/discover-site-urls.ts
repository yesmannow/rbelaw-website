/**
 * Site Discovery Script using Firecrawl - Map-First Pipeline
 *
 * Uses Firecrawl's map and crawl features to discover all URLs on rbelaw.com
 * This helps us understand the site structure and plan database improvements.
 *
 * Run with: tsx scripts/discover-site-urls.ts
 *
 * Options:
 *   --baseUrl      Base URL to discover (default: https://rbelaw.com)
 *   --out          Output file path (default: data/site-map.json)
 *   --useCrawl     Force crawl even if map has sufficient URLs (default: false)
 *   --requireCrawl Fail if crawl cannot complete (default: false)
 *   --depth        Max crawl depth (default: 2)
 *   --limit        Max crawl pages (default: 200)
 *   --force        Ignore cache and fetch fresh data (default: false)
 */

import Firecrawl from '@mendable/firecrawl-js'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import process from 'node:process'
import { callFirecrawl, pollWithBackoff, isRateLimitError } from './lib/firecrawl.js'
import { readMapCache, writeMapCache, readCrawlCache, writeCrawlCache } from './lib/cache.js'
import { getErrorMessage } from './lib/errors.js'

// Load env
const envLocal = path.resolve(process.cwd(), '.env.local')
if (existsSync(envLocal)) {
  dotenv.config({ path: envLocal })
} else {
  dotenv.config()
}

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY

if (!FIRECRAWL_API_KEY) {
  console.log('ℹ️  FIRECRAWL_API_KEY not found. Skipping Firecrawl discovery (optional tooling).')
  console.log('   Set FIRECRAWL_API_KEY in .env.local to enable site discovery.')
  process.exit(0)
}

const app = new Firecrawl({ apiKey: FIRECRAWL_API_KEY })

interface CategorizedUrls {
  attorneys: string[]
  practiceAreas: string[]
  industries: string[]
  blogPosts: string[]
  misc: string[]
}

interface SiteMap {
  baseUrl: string
  generatedAt: string
  counts: {
    total: number
    attorneys: number
    practiceAreas: number
    industries: number
    blogPosts: number
    misc: number
  }
  attorneys: string[]
  practiceAreas: string[]
  industries: string[]
  blogPosts: string[]
  misc: string[]
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = {
    baseUrl: 'https://rbelaw.com',
    out: 'data/site-map.json',
    useCrawl: false,
    requireCrawl: false,
    depth: 2,
    limit: 200,
    force: false,
  }

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i]
    const nextArg = process.argv[i + 1]

    if (arg === '--baseUrl' && nextArg) {
      args.baseUrl = nextArg
      i++
    } else if (arg === '--out' && nextArg) {
      args.out = nextArg
      i++
    } else if (arg === '--useCrawl') {
      args.useCrawl = true
    } else if (arg === '--requireCrawl') {
      args.requireCrawl = true
    } else if (arg === '--depth' && nextArg) {
      args.depth = parseInt(nextArg, 10)
      i++
    } else if (arg === '--limit' && nextArg) {
      args.limit = parseInt(nextArg, 10)
      i++
    } else if (arg === '--force') {
      args.force = true
    }
  }

  return args
}

/**
 * Normalize and validate a URL from various input formats
 * @param raw - Can be a string URL, relative path, or object with url/href/link property
 * @param baseUrl - Base URL for resolving relative paths
 * @returns Normalized absolute URL string, or null if invalid
 */
function normalizeUrl(raw: any, baseUrl: string): string | null {
  try {
    // Extract URL from object if needed
    let urlString: string | null = null

    if (typeof raw === 'string') {
      urlString = raw
    } else if (raw && typeof raw === 'object') {
      // Try common object properties
      urlString = raw.url || raw.href || raw.link || null
      if (urlString && typeof urlString !== 'string') {
        return null
      }
    } else {
      return null
    }

    if (!urlString) {
      return null
    }

    // Trim whitespace
    urlString = urlString.trim()

    if (!urlString) {
      return null
    }

    // Convert relative to absolute
    let absoluteUrl: string
    try {
      if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
        absoluteUrl = urlString
      } else if (urlString.startsWith('/')) {
        absoluteUrl = new URL(urlString, baseUrl).toString()
      } else {
        absoluteUrl = new URL(`/${urlString}`, baseUrl).toString()
      }
    } catch (e) {
      return null
    }

    // Parse URL to manipulate it
    const urlObj = new URL(absoluteUrl)

    // Strip fragments (#)
    urlObj.hash = ''

    // Remove common tracking parameters
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'gclid', 'fbclid', 'ref', '_ga', '_gid'
    ]

    trackingParams.forEach(param => {
      urlObj.searchParams.delete(param)
    })

    // Ensure same-origin as baseUrl
    const baseUrlObj = new URL(baseUrl)
    if (urlObj.origin !== baseUrlObj.origin) {
      return null
    }

    return urlObj.toString()
  } catch (error) {
    return null
  }
}

/**
 * Categorize URL based on regex patterns
 */
function categorizeUrl(url: string): keyof CategorizedUrls {
  const pathname = new URL(url).pathname.toLowerCase()

  // Attorneys: /(team|attorneys?)/
  if (/\/(team|attorneys?)\//.test(pathname)) {
    return 'attorneys'
  }

  // Practice Areas: /practice-areas/
  if (/\/practice-areas\//.test(pathname)) {
    return 'practiceAreas'
  }

  // Industries: /industr(ies|y)/
  if (/\/industr(ies|y)\//.test(pathname)) {
    return 'industries'
  }

  // Blog Posts: expanded patterns with optional trailing slash
  if (/\/(blog|insights|news|article|posts|category\/blog|category\/blog-post|tag)(\/|$)/.test(pathname)) {
    return 'blogPosts'
  }

  // Everything else
  return 'misc'
}

/**
 * Categorize a list of URLs
 */
function categorizeUrls(urls: string[]): CategorizedUrls {
  const categorized: CategorizedUrls = {
    attorneys: [],
    practiceAreas: [],
    industries: [],
    blogPosts: [],
    misc: [],
  }

  for (const url of urls) {
    const category = categorizeUrl(url)
    categorized[category].push(url)
  }

  return categorized
}

/**
 * Use Firecrawl Map to discover all URLs on the site
 */
async function discoverWithMap(baseUrl: string, force: boolean): Promise<string[]> {
  console.log('🗺️  Using Firecrawl Map to discover URLs...\n')

  // Check cache first
  if (!force) {
    const cached = await readMapCache()
    if (cached) {
      console.log('📦 Using cached Map response\n')
      // Continue with cached data
    } else {
      console.log('💾 No cache found, fetching from Firecrawl...\n')
    }
  } else {
    console.log('🔄 --force flag set, ignoring cache...\n')
  }

  try {
    let mapResult: any

    if (!force) {
      const cached = await readMapCache()
      if (cached) {
        mapResult = cached
      } else {
        mapResult = await callFirecrawl(
          () => app.map(baseUrl, {
            search: '', // Search all pages
            sitemap: 'include', // Include sitemap URLs
            includeSubdomains: false,
            limit: 1000, // Maximum URLs to discover
            ignoreQueryParameters: true,
          }),
          { name: 'Firecrawl Map' }
        )
        // Save to cache
        await writeMapCache(mapResult)
        console.log('💾 Saved Map response to cache\n')
      }
    } else {
      mapResult = await callFirecrawl(
        () => app.map(baseUrl, {
          search: '', // Search all pages
          sitemap: 'include', // Include sitemap URLs
          includeSubdomains: false,
          limit: 1000, // Maximum URLs to discover
          ignoreQueryParameters: true,
        }),
        { name: 'Firecrawl Map' }
      )
      // Save to cache
      await writeMapCache(mapResult)
      console.log('💾 Saved Map response to cache\n')
    }

    // Firecrawl map returns an object with links property: { links: [...] }
    // Links may be absolute URLs, relative paths, or objects with url/href fields
    let rawLinks: any[] = []

    if (Array.isArray(mapResult)) {
      rawLinks = mapResult
    } else if (mapResult && typeof mapResult === 'object') {
      // Check common response structures - prioritize 'links' as per user requirement
      if (mapResult.links && Array.isArray(mapResult.links)) {
        rawLinks = mapResult.links
      } else if (Array.isArray(mapResult.data)) {
        rawLinks = mapResult.data
      } else if (Array.isArray(mapResult.urls)) {
        rawLinks = mapResult.urls
      } else {
        // Try to extract links from any array property
        const keys = Object.keys(mapResult)
        for (const key of keys) {
          const value = (mapResult as any)[key]
          if (Array.isArray(value) && value.length > 0) {
            rawLinks = value
            console.log(`   ✅ Found links in property: ${key} (${value.length} links)`)
            break
          }
        }
      }
    }

    if (rawLinks.length === 0) {
      console.warn('⚠️  No links found via Map.')
      return []
    }

    console.log(`✅ Discovered ${rawLinks.length} raw links via Map\n`)

    // Normalize URLs
    const normalizedUrls: string[] = []
    let normalizationFailed = 0

    for (const rawLink of rawLinks) {
      const normalized = normalizeUrl(rawLink, baseUrl)
      if (normalized) {
        normalizedUrls.push(normalized)
      } else {
        normalizationFailed++
      }
    }

    console.log(`   📊 Normalization:`)
    console.log(`      - Total raw links: ${rawLinks.length}`)
    console.log(`      - Normalized: ${normalizedUrls.length}`)
    console.log(`      - Failed normalization: ${normalizationFailed}`)

    // Deduplicate
    const uniqueUrls = Array.from(new Set(normalizedUrls))

    console.log(`   📊 Filtering:`)
    console.log(`      - After deduplication: ${uniqueUrls.length}\n`)

    if (normalizationFailed > 0) {
      const failureRate = Math.round((normalizationFailed / rawLinks.length) * 100)
      if (failureRate === 100) {
        console.warn(`   ⚠️  WARNING: 100% of links failed normalization!`)
        console.warn(`      This suggests the link format is unexpected.`)
        console.warn(`      First few raw links (for debugging):`)
        rawLinks.slice(0, 5).forEach((link, i) => {
          console.warn(`        [${i + 1}] ${typeof link === 'object' ? JSON.stringify(link) : String(link)}`)
        })
      } else {
        console.log(`   ⚠️  ${normalizationFailed} links failed normalization (${failureRate}%)\n`)
      }
    }

    return uniqueUrls
  } catch (error) {
    console.error('❌ Error during map discovery:', getErrorMessage(error))
    // Don't throw - return empty array to allow script to continue
    return []
  }
}

/**
 * Use Firecrawl Crawl to discover URLs
 */
async function discoverWithCrawl(
  baseUrl: string,
  maxDepth: number,
  limit: number,
  force: boolean
): Promise<string[]> {
  console.log('🕷️  Using Firecrawl Crawl to discover URLs...\n')

  // Check cache first
  if (!force) {
    const cached = await readCrawlCache()
    if (cached) {
      console.log('📦 Using cached Crawl response\n')
      // Continue with cached data
    } else {
      console.log('💾 No cache found, fetching from Firecrawl...\n')
    }
  } else {
    console.log('🔄 --force flag set, ignoring cache...\n')
  }

  try {
    let status: any

    if (!force) {
      const cached = await readCrawlCache()
      if (cached) {
        status = cached
        console.log(`✅ Using cached crawl results: ${status.completed || 0} pages\n`)
      } else {
        // Build includePaths for relevant routes
        const includePaths = [
          '/our-team/attorneys/',
          '/practice-areas/',
          '/industries/',
          '/blog/',
          '/insights/',
          '/news/',
        ]

        // Start crawl job with rate limit handling
        const crawlJob = await callFirecrawl(
          () => app.startCrawl(baseUrl, {
            limit,
            maxDiscoveryDepth: maxDepth,
            allowExternalLinks: false,
            includePaths,
            scrapeOptions: {
              formats: ['markdown', 'html'],
              onlyMainContent: true,
            },
          }),
          { name: 'Start Firecrawl crawl' }
        )

        console.log(`📋 Crawl job started: ${crawlJob.id}`)
        console.log('⏳ Waiting for crawl to complete...\n')

        // Poll for completion with adaptive backoff
        status = await pollWithBackoff(
          () => app.getCrawlStatus(crawlJob.id),
          {
            maxWait: 15 * 60 * 1000, // 15 minutes
            initialInterval: 2500, // 2.5 seconds
            maxInterval: 15000, // 15 seconds max
          }
        )

        if (status.status !== 'completed') {
          throw new Error(`Crawl failed or timed out. Status: ${status.status}`)
        }

        console.log(`✅ Crawl completed: ${status.completed || 0} pages\n`)

        // Save to cache
        await writeCrawlCache(status)
        console.log('💾 Saved Crawl response to cache\n')
      }
    } else {
      // Build includePaths for relevant routes
      const includePaths = [
        '/our-team/attorneys/',
        '/practice-areas/',
        '/industries/',
        '/blog/',
        '/insights/',
        '/news/',
      ]

      // Start crawl job with rate limit handling
      const crawlJob = await callFirecrawl(
        () => app.startCrawl(baseUrl, {
          limit,
          maxDiscoveryDepth: maxDepth,
          allowExternalLinks: false,
          includePaths,
          scrapeOptions: {
            formats: ['markdown', 'html'],
            onlyMainContent: true,
          },
        }),
        { name: 'Start Firecrawl crawl' }
      )

      console.log(`📋 Crawl job started: ${crawlJob.id}`)
      console.log('⏳ Waiting for crawl to complete...\n')

      // Poll for completion with adaptive backoff
      status = await pollWithBackoff(
        () => app.getCrawlStatus(crawlJob.id),
        {
          maxWait: 15 * 60 * 1000, // 15 minutes
          initialInterval: 2500, // 2.5 seconds
          maxInterval: 15000, // 15 seconds max
        }
      )

      if (status.status !== 'completed') {
        throw new Error(`Crawl failed or timed out. Status: ${status.status}`)
      }

      console.log(`✅ Crawl completed: ${status.completed || 0} pages\n`)

      // Save to cache
      await writeCrawlCache(status)
      console.log('💾 Saved Crawl response to cache\n')
    }

    // Extract URLs
    const urls: string[] = []
    const data = status.data || status.results || []

    if (!Array.isArray(data)) {
      console.warn('⚠️  Crawl data is not an array:', typeof data)
      return []
    }

    for (const doc of data) {
      // Handle different document structures
      const url = doc.metadata?.sourceURL || doc.url || doc.sourceURL || ''
      if (url) {
        const normalized = normalizeUrl(url, baseUrl)
        if (normalized) {
          urls.push(normalized)
        }
      }
    }

    // Deduplicate
    return Array.from(new Set(urls))
  } catch (error) {
    console.error('❌ Error during crawl discovery:', getErrorMessage(error))
    throw error
  }
}

/**
 * Check if crawl should run based on thresholds
 */
function shouldRunCrawl(categorized: CategorizedUrls, useCrawl: boolean): boolean {
  if (useCrawl) {
    return true
  }

  // Thresholds for key categories
  const thresholds = {
    attorneys: 10,
    practiceAreas: 10,
    industries: 5,
    blogPosts: 10,
  }

  // Only trigger crawl when ALL key categories are suspiciously low
  return (
    categorized.attorneys.length < thresholds.attorneys &&
    categorized.practiceAreas.length < thresholds.practiceAreas &&
    categorized.industries.length < thresholds.industries &&
    categorized.blogPosts.length < thresholds.blogPosts
  )
}

/**
 * Main discovery function
 */
async function main() {
  const args = parseArgs()

  // Ensure output directory exists
  const outputPath = path.resolve(args.out)
  const outputDir = path.dirname(outputPath)
  await fs.mkdir(outputDir, { recursive: true })

  console.log('🚀 Starting site discovery\n')
  console.log(`   Base URL: ${args.baseUrl}`)
  console.log(`   Output: ${args.out}`)
  console.log(`   Use Crawl: ${args.useCrawl}`)
  console.log(`   Require Crawl: ${args.requireCrawl}`)
  console.log(`   Force (ignore cache): ${args.force}`)
  console.log('=' .repeat(60) + '\n')

  try {
    // Step 1: Run Firecrawl Map and normalize URLs
    let mapUrls: string[] = []
    try {
      mapUrls = await discoverWithMap(args.baseUrl, args.force)
    } catch (mapError) {
      console.warn('⚠️  Map discovery failed:', getErrorMessage(mapError))
      // Continue - we'll try crawl if needed
    }

    if (mapUrls.length === 0) {
      console.warn('⚠️  No URLs discovered via Map. Will attempt crawl if enabled.\n')
    } else {
      console.log(`✅ Map discovery complete: ${mapUrls.length} URLs\n`)
    }

    // Step 2: Categorize URLs using regex rules
    const categorized = categorizeUrls(mapUrls)

    console.log('📊 Map Discovery Results:')
    console.log(`   - Attorneys: ${categorized.attorneys.length}`)
    console.log(`   - Practice Areas: ${categorized.practiceAreas.length}`)
    console.log(`   - Industries: ${categorized.industries.length}`)
    console.log(`   - Blog Posts: ${categorized.blogPosts.length}`)
    console.log(`   - Misc: ${categorized.misc.length}`)
    console.log(`   - Total: ${mapUrls.length}\n`)

    // Add blogRoutesDetected log when blogPosts is 0
    if (categorized.blogPosts.length === 0) {
      const blogCandidates = mapUrls.filter(url => {
        const pathname = new URL(url).pathname.toLowerCase()
        return /\/(blog|insights|news|article|posts|category\/blog|category\/blog-post|tag)(\/|$)/.test(pathname)
      }).slice(0, 10)
      console.log('🔍 blogRoutesDetected: Top 10 candidate blog URLs (blogPosts count is 0):')
      blogCandidates.forEach((url, i) => console.log(`   [${i + 1}] ${url}`))
      console.log('')
    }

    // Step 2.5: Write initial site-map.json after Map categorization
    const initialSiteMap: SiteMap = {
      baseUrl: args.baseUrl,
      generatedAt: new Date().toISOString(),
      counts: {
        total: mapUrls.length,
        attorneys: categorized.attorneys.length,
        practiceAreas: categorized.practiceAreas.length,
        industries: categorized.industries.length,
        blogPosts: categorized.blogPosts.length,
        misc: categorized.misc.length,
      },
      attorneys: categorized.attorneys.sort(),
      practiceAreas: categorized.practiceAreas.sort(),
      industries: categorized.industries.sort(),
      blogPosts: categorized.blogPosts.sort(),
      misc: categorized.misc.sort(),
    }

    await fs.writeFile(outputPath, JSON.stringify(initialSiteMap, null, 2), 'utf8')
    console.log(`💾 Initial site-map.json written after Map categorization: ${outputPath}\n`)

    // Step 3: Determine if crawl should run
    const shouldCrawl = shouldRunCrawl(categorized, args.useCrawl)
    let crawlUrls: string[] = []

    if (shouldCrawl) {
      if (args.useCrawl) {
        console.log('🔄 --useCrawl flag set. Running crawl...\n')
      } else {
        console.log('🔄 Map counts below thresholds. Running crawl to supplement...\n')
      }

      try {
        crawlUrls = await discoverWithCrawl(args.baseUrl, args.depth, args.limit, args.force)
        console.log(`✅ Crawl discovery complete: ${crawlUrls.length} URLs\n`)

        // Merge crawl URLs into map set (dedupe)
        const urlSet = new Set(mapUrls)
        for (const url of crawlUrls) {
          urlSet.add(url)
        }
        mapUrls = Array.from(urlSet)

        // Re-categorize with merged URLs
        const mergedCategorized = categorizeUrls(mapUrls)
        Object.assign(categorized, mergedCategorized)

        console.log('📊 After Crawl Merge:')
        console.log(`   - Attorneys: ${categorized.attorneys.length}`)
        console.log(`   - Practice Areas: ${categorized.practiceAreas.length}`)
        console.log(`   - Industries: ${categorized.industries.length}`)
        console.log(`   - Blog Posts: ${categorized.blogPosts.length}`)
        console.log(`   - Misc: ${categorized.misc.length}`)
        console.log(`   - Total: ${mapUrls.length}\n`)

        // Overwrite site-map.json with merged results
        const mergedSiteMap: SiteMap = {
          baseUrl: args.baseUrl,
          generatedAt: new Date().toISOString(),
          counts: {
            total: mapUrls.length,
            attorneys: categorized.attorneys.length,
            practiceAreas: categorized.practiceAreas.length,
            industries: categorized.industries.length,
            blogPosts: categorized.blogPosts.length,
            misc: categorized.misc.length,
          },
          attorneys: categorized.attorneys.sort(),
          practiceAreas: categorized.practiceAreas.sort(),
          industries: categorized.industries.sort(),
          blogPosts: categorized.blogPosts.sort(),
          misc: categorized.misc.sort(),
        }

        await fs.writeFile(outputPath, JSON.stringify(mergedSiteMap, null, 2), 'utf8')
        console.log(`💾 Updated site-map.json with crawl-merged results: ${outputPath}\n`)
      } catch (crawlError: any) {
        const errorMsg = crawlError?.message || String(crawlError)

        // Check if it's a rate limit error
        if (isRateLimitError(crawlError)) {
          console.warn('⚠️  Rate limit hit during crawl (even after retries).')
          console.log('   Continuing with map results only.\n')

          // If --requireCrawl is passed, exit with error
          if (args.requireCrawl) {
            console.error('❌ --requireCrawl flag is set. Failing due to rate limit.')
            process.exit(1)
          }
          // Otherwise, continue gracefully (optional tooling)
        } else {
          console.error('❌ Crawl discovery failed:', errorMsg)

          // If --requireCrawl is passed, exit with error
          if (args.requireCrawl) {
            process.exit(1)
          }
        }

        // Continue with map results only
        console.log('   Using map results only.\n')
      }
    } else {
      console.log('✅ Map discovery found sufficient URLs. Skipping crawl.\n')
    }

    // Step 4: Final write of site-map.json (if no crawl was run, this is the final output)
    const finalSiteMap: SiteMap = {
      baseUrl: args.baseUrl,
      generatedAt: new Date().toISOString(),
      counts: {
        total: mapUrls.length,
        attorneys: categorized.attorneys.length,
        practiceAreas: categorized.practiceAreas.length,
        industries: categorized.industries.length,
        blogPosts: categorized.blogPosts.length,
        misc: categorized.misc.length,
      },
      attorneys: categorized.attorneys.sort(),
      practiceAreas: categorized.practiceAreas.sort(),
      industries: categorized.industries.sort(),
      blogPosts: categorized.blogPosts.sort(),
      misc: categorized.misc.sort(),
    }

    await fs.writeFile(outputPath, JSON.stringify(finalSiteMap, null, 2), 'utf8')

    // Print summary
    console.log('='.repeat(60))
    console.log('✨ Site Discovery Complete!\n')
    console.log(`📊 Total URLs: ${finalSiteMap.counts.total}`)
    console.log(`   - Attorneys: ${finalSiteMap.counts.attorneys}`)
    console.log(`   - Practice Areas: ${finalSiteMap.counts.practiceAreas}`)
    console.log(`   - Industries: ${finalSiteMap.counts.industries}`)
    console.log(`   - Blog Posts: ${finalSiteMap.counts.blogPosts}`)
    console.log(`   - Misc: ${finalSiteMap.counts.misc}`)
    console.log(`\n📁 Results saved to: ${outputPath}`)

  } catch (error) {
    // Only exit nonzero if --requireCrawl is set and it's a rate limit error
    const isRateLimit = isRateLimitError(error)
    const shouldFail = args.requireCrawl && isRateLimit

    if (shouldFail) {
      console.error('\n❌ Discovery failed due to rate limit with --requireCrawl set:', error)
      process.exit(1)
    } else if (!isRateLimit) {
      // Non-rate-limit errors should still fail
      console.error('\n❌ Discovery failed:', error)
      process.exit(1)
    } else {
      // Rate limit error without --requireCrawl: continue gracefully
      console.warn('\n⚠️  Discovery encountered rate limits but continuing...')
    }
  }
}

main().catch((err) => {
  // Optional tooling: exit gracefully
  const isRateLimit = isRateLimitError(err)
  if (isRateLimit) {
    console.warn('⚠️  Fatal rate limit error. Exiting gracefully (optional tooling).')
    process.exit(0)
  } else {
    console.warn('⚠️  Fatal error. Exiting gracefully (optional tooling):', err)
    process.exit(0)
  }
})
