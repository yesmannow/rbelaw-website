#!/usr/bin/env node

/**
 * Image URL Extraction Script
 *
 * Extracts image URLs from the old rbelaw.com site by analyzing HTML content
 * or by using browser automation.
 *
 * Usage:
 *   node scripts/extract-images.js [options]
 */

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
const { URL } = require('url')

/**
 * Fetch HTML content from a URL
 */
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const protocol = urlObj.protocol === 'https:' ? https : http

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return fetchHTML(response.headers.location).then(resolve).catch(reject)
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`))
        return
      }

      let data = ''
      response.on('data', chunk => { data += chunk })
      response.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

/**
 * Extract image URLs from HTML
 */
function extractImageUrls(html, baseUrl) {
  const urls = new Set()

  // Extract <img> src attributes
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi
  let match
  while ((match = imgRegex.exec(html)) !== null) {
    let url = match[1]
    // Convert relative URLs to absolute
    if (url.startsWith('/')) {
      const base = new URL(baseUrl)
      url = `${base.origin}${url}`
    } else if (!url.startsWith('http')) {
      const base = new URL(baseUrl)
      url = `${base.origin}/${url}`
    }
    if (url.includes('rbelaw.com') || url.includes('wp-content')) {
      urls.add(url)
    }
  }

  // Extract background-image URLs
  const bgRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi
  while ((match = bgRegex.exec(html)) !== null) {
    let url = match[1]
    if (url.startsWith('/')) {
      const base = new URL(baseUrl)
      url = `${base.origin}${url}`
    } else if (!url.startsWith('http')) {
      const base = new URL(baseUrl)
      url = `${base.origin}/${url}`
    }
    if (url.includes('rbelaw.com') || url.includes('wp-content')) {
      urls.add(url)
    }
  }

  // Extract from data attributes
  const dataRegex = /data-[^=]+=["']([^"']+\.(jpg|jpeg|png|gif|webp|svg))["']/gi
  while ((match = dataRegex.exec(html)) !== null) {
    let url = match[1]
    if (url.startsWith('/')) {
      const base = new URL(baseUrl)
      url = `${base.origin}${url}`
    }
    if (url.includes('rbelaw.com') || url.includes('wp-content')) {
      urls.add(url)
    }
  }

  return Array.from(urls)
}

/**
 * Categorize images by type
 */
function categorizeImages(urls) {
  const categories = {
    team: [],
    offices: [],
    practice: [],
    news: [],
    general: []
  }

  urls.forEach(url => {
    const lowerUrl = url.toLowerCase()

    if (lowerUrl.includes('team') || lowerUrl.includes('attorney') ||
        lowerUrl.includes('professional') || lowerUrl.includes('assistant')) {
      categories.team.push(url)
    } else if (lowerUrl.includes('office') || lowerUrl.includes('reception') ||
               lowerUrl.includes('building')) {
      categories.offices.push(url)
    } else if (lowerUrl.includes('practice') || lowerUrl.includes('area')) {
      categories.practice.push(url)
    } else if (lowerUrl.includes('news') || lowerUrl.includes('blog') ||
               lowerUrl.includes('article')) {
      categories.news.push(url)
    } else {
      categories.general.push(url)
    }
  })

  return categories
}

/**
 * Main extraction function
 */
async function extractFromPages(pages) {
  const allUrls = new Set()

  console.log(`\n🔍 Extracting images from ${pages.length} pages...\n`)

  for (const pageUrl of pages) {
    try {
      console.log(`📄 Fetching: ${pageUrl}`)
      const html = await fetchHTML(pageUrl)
      const urls = extractImageUrls(html, pageUrl)

      urls.forEach(url => allUrls.add(url))
      console.log(`   Found ${urls.length} images`)
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`)
    }
  }

  const uniqueUrls = Array.from(allUrls)
  const categorized = categorizeImages(uniqueUrls)

  console.log(`\n📊 Extraction Summary:`)
  console.log(`   Total unique images: ${uniqueUrls.length}`)
  console.log(`   Team images: ${categorized.team.length}`)
  console.log(`   Office images: ${categorized.offices.length}`)
  console.log(`   Practice area images: ${categorized.practice.length}`)
  console.log(`   News images: ${categorized.news.length}`)
  console.log(`   General images: ${categorized.general.length}`)

  return {
    all: uniqueUrls,
    categorized
  }
}

// CLI Interface
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log(`
Image URL Extraction Script

Usage:
  node scripts/extract-images.js <url1> [url2] [url3] ...

Examples:
  node scripts/extract-images.js https://rbelaw.com/ https://rbelaw.com/our-team/
  node scripts/extract-images.js https://rbelaw.com/our-team/legal-assistants/
    `)
  process.exit(1)
}

const pages = args
const outputFile = path.join(process.cwd(), 'image-urls.json')

extractFromPages(pages)
  .then(results => {
    const output = {
      extracted: new Date().toISOString(),
      total: results.all.length,
      urls: results.all,
      categorized: results.categorized
    }

    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2))
    console.log(`\n💾 Results saved to: ${outputFile}`)
    console.log(`\n📥 Next step: Run download script:`)
    console.log(`   node scripts/download-images.js --list ${outputFile}`)
  })
  .catch(console.error)

module.exports = { extractImageUrls, extractFromPages, categorizeImages }

