#!/usr/bin/env node

/**
 * Stock Photo Fetcher
 * Uses Pixabay API to fetch high-quality stock photos
 * Usage: node scripts/fetch-stock.js <query> <count>
 * Example: node scripts/fetch-stock.js "courthouse" 5
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Parse command line arguments
const args = process.argv.slice(2)
const query = args[0]
const count = parseInt(args[1]) || 5

if (!query) {
  console.error('❌ Error: Please provide a search query')
  console.log('\nUsage: npm run get-photos <query> <count>')
  console.log('Example: npm run get-photos "courthouse" 5')
  process.exit(1)
}

// Check for API key
const PIXABAY_KEY = process.env.PIXABAY_KEY
if (!PIXABAY_KEY) {
  console.error('❌ Error: PIXABAY_KEY not found in .env file')
  console.log('\nTo use this script:')
  console.log('1. Get a free API key from https://pixabay.com/api/docs/')
  console.log('2. Add it to your .env file: PIXABAY_KEY=your_key_here')
  process.exit(1)
}

// Ensure the stock images directory exists
const stockDir = path.join(__dirname, '../src/assets/stock')
if (!fs.existsSync(stockDir)) {
  fs.mkdirSync(stockDir, { recursive: true })
}

/**
 * Search for images on Pixabay
 * @param {string} searchQuery - Search term
 * @param {number} perPage - Number of results
 * @returns {Promise<Array>} Array of image objects
 */
async function searchPixabay(searchQuery, perPage) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: PIXABAY_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        min_width: 1920,
        min_height: 1080,
        per_page: perPage,
        safesearch: true,
        order: 'popular'
      }
    })
    
    return response.data.hits
  } catch (error) {
    throw new Error(`Pixabay API error: ${error.message}`)
  }
}

/**
 * Download an image
 * @param {string} url - Image URL
 * @param {string} filepath - Local filepath
 */
async function downloadImage(url, filepath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 30000
    })
    
    const writer = fs.createWriteStream(filepath)
    response.data.pipe(writer)
    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  } catch (error) {
    throw new Error(`Download failed: ${error.message}`)
  }
}

/**
 * Generate a safe filename from query
 * @param {string} query - Search query
 * @param {number} index - Image index
 * @returns {string} Filename
 */
function generateFilename(query, index) {
  const safeName = query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  
  return `${safeName}-${index + 1}.jpg`
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Searching Pixabay...\n')
  console.log(`Query: "${query}"`)
  console.log(`Count: ${count}\n`)
  
  // Search for images
  const images = await searchPixabay(query, count)
  
  if (images.length === 0) {
    console.log('❌ No images found for this query')
    return
  }
  
  console.log(`✅ Found ${images.length} images\n`)
  
  // Download each image
  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    const filename = generateFilename(query, i)
    const filepath = path.join(stockDir, filename)
    
    try {
      console.log(`Downloading ${i + 1}/${images.length}: ${filename}...`)
      await downloadImage(image.largeImageURL, filepath)
      console.log(`  ✅ Saved: ${filepath}`)
      console.log(`  📊 ${image.imageWidth}x${image.imageHeight}`)
      console.log(`  👤 By: ${image.user}`)
      console.log('')
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}\n`)
    }
    
    // Small delay between downloads
    if (i < images.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }
  
  console.log('✨ Download Complete!')
  console.log(`\n📁 Images saved to: ${stockDir}`)
}

main().catch(error => {
  console.error('Fatal error:', error.message)
  process.exit(1)
})
