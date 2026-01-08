/**
 * RBE Image Downloader
 * Downloads all images from scraped content and old site
 * 
 * Usage: node scripts/download-site-images.js
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPED_CONTENT = path.join(__dirname, '../scraped-content/scraped-content.json');
const ATTORNEYS_FILE = path.join(__dirname, '../scraped-content/attorneys.json');
const OUTPUT_DIR = path.join(__dirname, '../public/images/downloaded');

/**
 * Download a single image
 */
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.open(outputPath, 'w');
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const stream = fs.createWriteStream(outputPath);
        response.pipe(stream);
        
        stream.on('finish', () => {
          stream.close();
          resolve(outputPath);
        });
        
        stream.on('error', (err) => {
          fs.unlink(outputPath).catch(() => {});
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
 * Get filename from URL
 */
function getFilenameFromUrl(url) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const filename = path.basename(pathname);
  
  // Clean filename
  return filename.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
}

/**
 * Extract all image URLs from scraped content
 */
function extractImageUrls(data) {
  const imageUrls = new Set();
  
  // Extract from practice areas
  if (data.practiceAreas) {
    Object.values(data.practiceAreas).forEach(area => {
      if (area.images) {
        area.images.forEach(img => {
          if (img.src && img.src.startsWith('http')) {
            imageUrls.add(img.src);
          }
        });
      }
      if (area.image && area.image.startsWith('http')) {
        imageUrls.add(area.image);
      }
    });
  }
  
  // Extract from industries
  if (data.industries) {
    Object.values(data.industries).forEach(industry => {
      if (industry.images) {
        industry.images.forEach(img => {
          if (img.src && img.src.startsWith('http')) {
            imageUrls.add(img.src);
          }
        });
      }
      if (industry.image && industry.image.startsWith('http')) {
        imageUrls.add(industry.image);
      }
    });
  }
  
  // Extract from about pages
  if (data.about) {
    Object.values(data.about).forEach(page => {
      if (page.images) {
        page.images.forEach(img => {
          if (img.src && img.src.startsWith('http')) {
            imageUrls.add(img.src);
          }
        });
      }
    });
  }
  
  return Array.from(imageUrls);
}

/**
 * Extract attorney images
 */
function extractAttorneyImages(attorneys) {
  const imageUrls = new Set();
  
  attorneys.forEach(attorney => {
    if (attorney.image && attorney.image.startsWith('http')) {
      imageUrls.add(attorney.image);
    }
  });
  
  return Array.from(imageUrls);
}

/**
 * Download images with progress
 */
async function downloadImages(imageUrls, category) {
  console.log(`\n📥 Downloading ${category} images...`);
  
  const categoryDir = path.join(OUTPUT_DIR, category);
  await fs.mkdir(categoryDir, { recursive: true });
  
  const results = {
    success: 0,
    failed: 0,
    skipped: 0
  };
  
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const filename = getFilenameFromUrl(url);
    const outputPath = path.join(categoryDir, filename);
    
    try {
      // Check if file already exists
      try {
        await fs.access(outputPath);
        console.log(`  ⏭️  Skipped (exists): ${filename}`);
        results.skipped++;
        continue;
      } catch {
        // File doesn't exist, proceed with download
      }
      
      await downloadImage(url, outputPath);
      console.log(`  ✓ Downloaded [${i + 1}/${imageUrls.length}]: ${filename}`);
      results.success++;
      
      // Be polite - wait between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`  ✗ Failed [${i + 1}/${imageUrls.length}]: ${filename} - ${error.message}`);
      results.failed++;
    }
  }
  
  return results;
}

/**
 * Generate image mapping file
 */
async function generateImageMapping(imageUrls, category) {
  const mapping = {};
  
  imageUrls.forEach(url => {
    const filename = getFilenameFromUrl(url);
    const localPath = `/images/downloaded/${category}/${filename}`;
    mapping[url] = localPath;
  });
  
  const mappingFile = path.join(OUTPUT_DIR, `${category}-mapping.json`);
  await fs.writeFile(mappingFile, JSON.stringify(mapping, null, 2));
  
  console.log(`  📄 Created mapping file: ${category}-mapping.json`);
}

/**
 * Main download function
 */
async function downloadAllImages() {
  console.log('🖼️  Starting Image Downloader...\n');
  
  // Create output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const totalResults = {
    success: 0,
    failed: 0,
    skipped: 0
  };
  
  try {
    // Download practice area images
    console.log('📂 Processing practice areas...');
    const scrapedData = JSON.parse(await fs.readFile(SCRAPED_CONTENT, 'utf-8'));
    const practiceAreaImages = extractImageUrls({ practiceAreas: scrapedData.practiceAreas });
    
    if (practiceAreaImages.length > 0) {
      const results = await downloadImages(practiceAreaImages, 'practice-areas');
      await generateImageMapping(practiceAreaImages, 'practice-areas');
      totalResults.success += results.success;
      totalResults.failed += results.failed;
      totalResults.skipped += results.skipped;
    } else {
      console.log('  No images found in practice areas');
    }
    
    // Download industry images
    console.log('\n🏭 Processing industries...');
    const industryImages = extractImageUrls({ industries: scrapedData.industries });
    
    if (industryImages.length > 0) {
      const results = await downloadImages(industryImages, 'industries');
      await generateImageMapping(industryImages, 'industries');
      totalResults.success += results.success;
      totalResults.failed += results.failed;
      totalResults.skipped += results.skipped;
    } else {
      console.log('  No images found in industries');
    }
    
    // Download about page images
    console.log('\n📄 Processing about pages...');
    const aboutImages = extractImageUrls({ about: scrapedData.about });
    
    if (aboutImages.length > 0) {
      const results = await downloadImages(aboutImages, 'about');
      await generateImageMapping(aboutImages, 'about');
      totalResults.success += results.success;
      totalResults.failed += results.failed;
      totalResults.skipped += results.skipped;
    } else {
      console.log('  No images found in about pages');
    }
    
    // Download attorney images
    try {
      console.log('\n👥 Processing attorneys...');
      const attorneys = JSON.parse(await fs.readFile(ATTORNEYS_FILE, 'utf-8'));
      const attorneyImages = extractAttorneyImages(attorneys);
      
      if (attorneyImages.length > 0) {
        const results = await downloadImages(attorneyImages, 'attorneys');
        await generateImageMapping(attorneyImages, 'attorneys');
        totalResults.success += results.success;
        totalResults.failed += results.failed;
        totalResults.skipped += results.skipped;
      } else {
        console.log('  No images found for attorneys');
      }
    } catch (error) {
      console.log('  ⚠️  Attorney images not available (run scrape-attorneys.js first)');
    }
    
    // Summary
    console.log('\n✅ Image download complete!\n');
    console.log('📊 Summary:');
    console.log(`  ✓ Successfully downloaded: ${totalResults.success}`);
    console.log(`  ⏭️  Skipped (already exist): ${totalResults.skipped}`);
    console.log(`  ✗ Failed: ${totalResults.failed}`);
    console.log(`\n📁 Images saved to: ${OUTPUT_DIR}`);
    console.log('\n📝 Next steps:');
    console.log('  1. Review downloaded images');
    console.log('  2. Optimize images (run npm run optimize-all)');
    console.log('  3. Update image paths in data files');
    console.log('  4. Use mapping files to update URLs\n');
    
  } catch (error) {
    console.error('❌ Download failed:', error);
  }
}

// Run downloader
downloadAllImages().catch(console.error);
