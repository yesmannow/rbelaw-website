#!/usr/bin/env node

/**
 * Image Download Script for rbelaw.com Migration (CommonJS)
 *
 * Downloads images listed or from a JSON file and organizes them under public/images.
 *
 * Usage:
 *   node scripts/download-images.cjs --url <url>
 *   node scripts/download-images.cjs --list image-urls.json --output public/images
 *   node scripts/download-images.cjs --output public/images --optimize
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

function categorizeImage(url) {
  const lowerUrl = url.toLowerCase()
  for (const [category, keywords] of Object.entries(IMAGE_CATEGORIES)) {
    if (keywords.some(keyword => lowerUrl.includes(keyword))) {
      return category
    }
  }
  return 'general'
}

function getFilename(url, category) {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const filename = path.basename(pathname)
    let cleanName = filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase()
    if (!cleanName.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      cleanName += '.jpg'
    }
    return path.join(category, cleanName)
  } catch (e) {
    const timestamp = Date.now()
    return path.join(category, `image_${timestamp}.jpg`)
  }
}

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const protocol = urlObj.protocol === 'https:' ? https : http

    const dir = path.dirname(outputPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const file = fs.createWriteStream(outputPath)

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject)
      }

      if (response.statusCode !== 200) {
        file.close()
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath)
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
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath)
      reject(err)
    })
  })
}

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

      if (fs.existsSync(outputPath)) {
        console.log(`⊘ Skipped (exists): ${filename}`)
        results.successful.push({ url, path: outputPath, skipped: true })
        continue
      }

      await downloadImage(url, outputPath)
      results.successful.push({ url, path: outputPath })

      await new Promise(resolve => setTimeout(resolve, 75))
    } catch (error) {
      console.error(`✗ Failed: ${url}`)
      console.error(`  Error: ${error.message}`)
      results.failed.push({ url, error: error.message })
    }
  }

  console.log(`\n📊 Download Summary:`)
  console.log(`   Successful: ${results.successful.length}`)
  console.log(`   Failed: ${results.failed.length}`)

  const resultsPath = path.join(outputDir, 'download-results.json')
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2))
  console.log(`\n💾 Results saved to: ${resultsPath}`)

  return results
}

// CLI
const args = process.argv.slice(2)
const urlIndex = args.indexOf('--url')
const listIndex = args.indexOf('--list')
const outputIndex = args.indexOf('--output')
const outputDir = outputIndex >= 0 ? path.resolve(args[outputIndex + 1]) : DEFAULT_OUTPUT_DIR

async function main() {
  let imageUrls = []
  if (urlIndex >= 0) {
    imageUrls = [args[urlIndex + 1]]
  } else if (listIndex >= 0) {
    const listFile = args[listIndex + 1]
    const listContent = fs.readFileSync(listFile, 'utf-8')
    const listData = JSON.parse(listContent)
    imageUrls = Array.isArray(listData) ? listData : (listData.urls || listData.images || [])
  } else {
    console.log(`
Image Download Script (CommonJS)

Usage:
  node scripts/download-images.cjs --url "https://example.com/image.jpg"
  node scripts/download-images.cjs --list image-urls.json --output public/images
    `)
    process.exit(1)
  }

  await processImageList(imageUrls, outputDir)
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { downloadImage, processImageList }
