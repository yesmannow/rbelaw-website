/**
 * Purge Legacy Image Formats
 * Removes .jpg, .png, and .avif files when a .webp version exists
 * Preserves only WebP format for optimal performance
 */

import { readdirSync, existsSync, unlinkSync, statSync } from 'fs'
import { join, extname } from 'path'

const ATT_DIR = './public/images/team/Attorneys'

console.log('🔍 Scanning attorney images directory...')
console.log(`📂 Directory: ${ATT_DIR}`)

try {
  const files = readdirSync(ATT_DIR)
  console.log(`📊 Found ${files.length} total files`)
  
  let purgedCount = 0
  let keptCount = 0
  
  files.forEach(file => {
    const filePath = join(ATT_DIR, file)
    
    // Skip if it's a directory
    if (statSync(filePath).isDirectory()) {
      return
    }
    
    const ext = extname(file).toLowerCase()
    
    // Check if this is a legacy format
    if (['.jpg', '.jpeg', '.png', '.avif'].includes(ext)) {
      // Build the WebP equivalent path
      const webpPath = filePath.replace(new RegExp(`${ext}$`), '.webp')
      
      // Check if WebP version exists
      if (existsSync(webpPath)) {
        console.log(`🗑️  Purging legacy format: ${file}`)
        unlinkSync(filePath)
        purgedCount++
      } else {
        console.log(`⚠️  Keeping (no WebP): ${file}`)
        keptCount++
      }
    } else if (ext === '.webp') {
      console.log(`✅ Keeping WebP: ${file}`)
      keptCount++
    }
  })
  
  console.log('\n' + '='.repeat(60))
  console.log(`✅ Purge complete!`)
  console.log(`🗑️  Removed: ${purgedCount} legacy files`)
  console.log(`✅ Kept: ${keptCount} files (WebP or no WebP equivalent)`)
  console.log('='.repeat(60))
} catch (err) {
  console.error('❌ Error:', err.message)
  process.exit(1)
}
