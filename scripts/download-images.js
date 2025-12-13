#!/usr/bin/env node

/**
 * Image Download Script for rbelaw.com Migration
 *
 * This script downloads images from the old WordPress site and organizes them
 * in the new React project structure.
 *
 * Usage:
 *   node scripts/download-images.js [options]
 *
 * Options:
 *   --url <url>        Specific image URL to download
 *   --list <file>      JSON file with list of image URLs
 *   --output <dir>     Output directory (default: public/images)
 *   --optimize         Optimize images after download (requires sharp)
 */

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
const { URL } = require('url')

// Configuration
const DEFAULT_OUTPUT_DIR = path.join(process.cwd(), 'public', 'images')
const IMAGE_CATEGORIES = {
  team: ['attorney', 'professional', 'assistant', 'staff', 'team'],
  offices: ['office', 'reception', 'building', 'location'],
  practice: ['practice', 'area', 'service'],
  news: ['news', 'blog', 'article', 'post'],
  general: ['logo', 'brand', 'icon']
}

/**
 * Determine image category based on URL or filename
 */
function categorizeImage(url) {
  const lowerUrl = url.toLowerCase()

  for (const [category, keywords] of Object.entries(IMAGE_CATEGORIES)) {
    if (keywords.some(keyword => lowerUrl.includes(keyword))) {
      return category
    }
  }

  return 'general'
}

/**
 * Generate safe filename from URL
 */
function getFilename(url, category) {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const filename = path.basename(pathname)

    // Clean filename
    let cleanName = filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase()

    // Ensure extension
    if (!cleanName.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      cleanName += '.jpg'
    }

    return path.join(category, cleanName)
  } catch (e) {
    // Fallback filename
    const timestamp = Date.now()
    return path.join(category, `image_${timestamp}.jpg`)
  }
}

/**
 * Download a single image
 */
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const protocol = urlObj.protocol === 'https:' ? https : http

    // Ensure directory exists
    const dir = path.dirname(outputPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const file = fs.createWriteStream(outputPath)

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirects
        return downloadImage(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject)
      }

      if (response.statusCode !== 200) {
        file.close()
        fs.unlinkSync(outputPath)
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
        return
      }

      response.pipe(file)

      file.on('finish', () => {
        file.close()
        console.log(`✓ Downloaded: ${outputPath}`)
        resolve(outputPath)
      })
    }).on('error', (err) => {
      file.close()
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath)
      }
      reject(err)
    })
  })
}

/**
 * Process a list of image URLs
 */
async function processImageList(urls, outputDir = DEFAULT_OUTPUT_DIR) {
  console.log(`\n📥 Starting download of ${urls.length} images...\n`)

  const results = {
    successful: [],
    failed: []
  }

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    try {
      const category = categorizeImage(url)
      const filename = getFilename(url, category)
      const outputPath = path.join(outputDir, filename)

      // Skip if already exists
      if (fs.existsSync(outputPath)) {
        console.log(`⊘ Skipped (exists): ${filename}`)
        results.successful.push({ url, path: outputPath, skipped: true })
        continue
      }

      await downloadImage(url, outputPath)
      results.successful.push({ url, path: outputPath })

      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.error(`✗ Failed: ${url}`)
      console.error(`  Error: ${error.message}`)
      results.failed.push({ url, error: error.message })
    }
  }

  // Summary
  console.log(`\n📊 Download Summary:`)
  console.log(`   Successful: ${results.successful.length}`)
  console.log(`   Failed: ${results.failed.length}`)

  if (results.failed.length > 0) {
    console.log(`\n❌ Failed Downloads:`)
    results.failed.forEach(({ url, error }) => {
      console.log(`   ${url}`)
      console.log(`   ${error}`)
    })
  }

  // Save results to JSON
  const resultsPath = path.join(outputDir, 'download-results.json')
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2))
  console.log(`\n💾 Results saved to: ${resultsPath}`)

  return results
}

/**
 * Extract image URLs from HTML content
 */
function extractImageUrls(html) {
  const imageRegex = /<img[^>]+src=["']([^"']+)["']/gi
  const bgImageRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi
  const urls = new Set()

  let match
  while ((match = imageRegex.exec(html)) !== null) {
    urls.add(match[1])
  }

  while ((match = bgImageRegex.exec(html)) !== null) {
    urls.add(match[1])
  }

  return Array.from(urls).filter(url =>
    url.includes('rbelaw.com') || url.includes('wp-content')
  )
}

// CLI Interface
const args = process.argv.slice(2)
const urlIndex = args.indexOf('--url')
const listIndex = args.indexOf('--list')
const outputIndex = args.indexOf('--output')
const optimizeIndex = args.indexOf('--optimize')

const outputDir = outputIndex >= 0
  ? path.resolve(args[outputIndex + 1])
  : DEFAULT_OUTPUT_DIR

// Main execution
async function main() {
  let imageUrls = []

  if (urlIndex >= 0) {
    // Single URL
    imageUrls = [args[urlIndex + 1]]
  } else if (listIndex >= 0) {
    // Load from JSON file
    const listFile = args[listIndex + 1]
    const listContent = fs.readFileSync(listFile, 'utf-8')
    const listData = JSON.parse(listContent)
    imageUrls = Array.isArray(listData) ? listData : listData.images || []
  } else {
    // Show usage
    console.log(`
Image Download Script for rbelaw.com Migration

Usage:
  node scripts/download-images.js [options]

Options:
  --url <url>        Download a specific image URL
  --list <file>     JSON file with list of image URLs
  --output <dir>     Output directory (default: public/images)
  --optimize         Optimize images after download

Examples:
  node scripts/download-images.js --url "https://rbelaw.com/wp-content/uploads/2023/10/image.jpg"
  node scripts/download-images.js --list image-urls.json --output public/images
    `)
    process.exit(1)
  }

  await processImageList(imageUrls, outputDir)
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { downloadImage, processImageList, extractImageUrls, categorizeImage }

