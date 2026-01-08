/**
 * Attorney Image Downloader
 * Downloads attorney photos from scraped data
 * 
 * Usage: node scripts/download-attorney-images.js
 */

import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ATTORNEYS_FILE = path.join(__dirname, '../scraped-content/attorneys.json');
const OUTPUT_DIR = path.join(__dirname, '../public/images/team/downloaded');

/**
 * Download a single image
 */
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const stream = fsSync.createWriteStream(outputPath);
        response.pipe(stream);
        
        stream.on('finish', () => {
          stream.close();
          resolve(outputPath);
        });
        
        stream.on('error', (err) => {
          fsSync.unlink(outputPath, () => {});
          reject(err);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadImage(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

/**
 * Generate slug from attorney name
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Get file extension from URL
 */
function getExtension(url) {
  const match = url.match(/\.(png|jpg|jpeg|webp|gif)(\?.*)?$/i);
  return match ? match[1].toLowerCase() : 'jpg';
}

/**
 * Download all attorney images
 */
async function downloadAttorneyImages() {
  console.log('📸 Starting Attorney Image Downloader...\n');
  
  try {
    // Read attorney data
    console.log('📖 Reading attorney data...');
    const attorneys = JSON.parse(await fs.readFile(ATTORNEYS_FILE, 'utf-8'));
    console.log(`  Found ${attorneys.length} attorneys\n`);
    
    // Create output directory
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    const results = {
      success: 0,
      failed: 0,
      skipped: 0,
      noImage: 0
    };
    
    const mapping = {};
    
    console.log('📥 Downloading attorney photos...\n');
    
    for (let i = 0; i < attorneys.length; i++) {
      const attorney = attorneys[i];
      const slug = generateSlug(attorney.name);
      
      if (!attorney.image) {
        console.log(`  ⚠️  No image [${i + 1}/${attorneys.length}]: ${attorney.name}`);
        results.noImage++;
        continue;
      }
      
      const ext = getExtension(attorney.image);
      const filename = `${slug}.${ext}`;
      const outputPath = path.join(OUTPUT_DIR, filename);
      
      try {
        // Check if file already exists
        try {
          await fs.access(outputPath);
          console.log(`  ⏭️  Skipped (exists) [${i + 1}/${attorneys.length}]: ${attorney.name}`);
          results.skipped++;
          mapping[attorney.image] = `/images/team/downloaded/${filename}`;
          continue;
        } catch {
          // File doesn't exist, proceed with download
        }
        
        await downloadImage(attorney.image, outputPath);
        console.log(`  ✓ Downloaded [${i + 1}/${attorneys.length}]: ${attorney.name} → ${filename}`);
        results.success++;
        mapping[attorney.image] = `/images/team/downloaded/${filename}`;
        
        // Be polite - wait between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`  ✗ Failed [${i + 1}/${attorneys.length}]: ${attorney.name} - ${error.message}`);
        results.failed++;
      }
    }
    
    // Save mapping file
    const mappingFile = path.join(OUTPUT_DIR, 'image-mapping.json');
    await fs.writeFile(mappingFile, JSON.stringify(mapping, null, 2));
    
    // Generate updated attorneys file with local paths
    const updatedAttorneys = attorneys.map(attorney => {
      const slug = generateSlug(attorney.name);
      const ext = attorney.image ? getExtension(attorney.image) : 'jpg';
      return {
        ...attorney,
        image: attorney.image ? `/images/team/downloaded/${slug}.${ext}` : '',
        imageOriginal: attorney.image // Keep original URL for reference
      };
    });
    
    const updatedFile = path.join(__dirname, '../scraped-content/attorneys-with-local-images.json');
    await fs.writeFile(updatedFile, JSON.stringify(updatedAttorneys, null, 2));
    
    // Summary
    console.log('\n✅ Attorney image download complete!\n');
    console.log('📊 Summary:');
    console.log(`  ✓ Successfully downloaded: ${results.success}`);
    console.log(`  ⏭️  Skipped (already exist): ${results.skipped}`);
    console.log(`  ⚠️  No image URL: ${results.noImage}`);
    console.log(`  ✗ Failed: ${results.failed}`);
    console.log(`\n📁 Images saved to: ${OUTPUT_DIR}`);
    console.log(`📄 Mapping file: ${mappingFile}`);
    console.log(`📄 Updated attorney data: ${updatedFile}`);
    console.log('\n📝 Next steps:');
    console.log('  1. Review downloaded images');
    console.log('  2. Optimize images (run npm run optimize-attorneys)');
    console.log('  3. Use attorneys-with-local-images.json for your data files\n');
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ Error: attorneys.json not found!');
      console.error('   Run "npm run scrape-attorneys" first.\n');
    } else {
      console.error('❌ Download failed:', error);
    }
  }
}

// Run downloader
downloadAttorneyImages().catch(console.error);
