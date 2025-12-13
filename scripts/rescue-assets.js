#!/usr/bin/env node

/**
 * Asset Rescue Script
 * Scrapes images from WordPress Divi theme blog posts
 * and saves them to the local legacy folder
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read the news archive data
const newsArchivePath = path.join(__dirname, '../src/lib/data/news-archive.json')
const newsArchive = JSON.parse(fs.readFileSync(newsArchivePath, 'utf-8'))

// Ensure the legacy images directory exists
const legacyDir = path.join(__dirname, '../public/images/legacy')
if (!fs.existsSync(legacyDir)) {
  fs.mkdirSync(legacyDir, { recursive: true })
}

/**
 * Extract images from Divi theme HTML
 * @param {string} html - The HTML content
 * @returns {string[]} Array of image URLs
 */
function extractDiviImages(html) {
  const images = []
  const regex = /<div class="et_pb_image_container"[^>]*>.*?<img[^>]+src="([^"]+)"[^>]*>.*?<\/div>/gs
  
  let match
  while ((match = regex.exec(html)) !== null) {
    images.push(match[1])
  }
  
  return images
}

/**
 * Download an image from a URL
 * @param {string} url - Image URL
 * @param {string} filepath - Local filepath to save to
 */
async function downloadImage(url, filepath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 10000
    })
    
    const writer = fs.createWriteStream(filepath)
    response.data.pipe(writer)
    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  } catch (error) {
    throw new Error(`Failed to download ${url}: ${error.message}`)
  }
}

/**
 * Process a single news article
 * @param {Object} article - News article object
 */
async function processArticle(article) {
  try {
    console.log(`Processing: ${article.title}...`)
    
    // Fetch the article HTML
    const response = await axios.get(article.url, { timeout: 10000 })
    const html = response.data
    
    // Extract Divi images
    const images = extractDiviImages(html)
    
    if (images.length === 0) {
      console.log(`  ⚠️  No Divi images found in ${article.slug}`)
      return
    }
    
    // Download the first image (featured image)
    const imageUrl = images[0]
    const ext = path.extname(new URL(imageUrl).pathname) || '.jpg'
    const filename = `${article.slug}${ext}`
    const filepath = path.join(legacyDir, filename)
    
    await downloadImage(imageUrl, filepath)
    console.log(`  ✅ Rescued: ${filename}`)
    
  } catch (error) {
    console.log(`  ❌ Error processing ${article.title}: ${error.message}`)
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Asset Rescue...\n')
  console.log(`Found ${newsArchive.length} articles to process\n`)
  
  for (const article of newsArchive) {
    await processArticle(article)
    // Add a small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log('\n✨ Asset Rescue Complete!')
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
