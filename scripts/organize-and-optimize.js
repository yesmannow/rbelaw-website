/**
 * Organize and Optimize Migration Files
 * 1. Organize scraped files
 * 2. Optimize attorney images to WebP
 * 3. Remove old/duplicate images
 * 4. Generate final data files
 * 
 * Usage: node scripts/organize-and-optimize.js
 */

import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const SCRAPED_DIR = path.join(__dirname, '../scraped-content');
const DOWNLOADED_DIR = path.join(__dirname, '../public/images/team/downloaded');
const TEAM_DIR = path.join(__dirname, '../public/images/team');
const BACKUP_DIR = path.join(__dirname, '../backup-old-images');

/**
 * Step 1: Organize scraped files
 */
async function organizeScrapedFiles() {
  console.log('📂 Step 1: Organizing scraped files...\n');
  
  try {
    // Check what files we have
    const files = await fs.readdir(SCRAPED_DIR);
    console.log('  Found files:');
    files.forEach(file => console.log(`    - ${file}`));
    
    // Create organized structure
    const organized = {
      attorneys: null,
      practiceAreas: null,
      industries: null,
      about: null
    };
    
    // Read attorneys
    if (files.includes('attorneys.json')) {
      organized.attorneys = JSON.parse(
        await fs.readFile(path.join(SCRAPED_DIR, 'attorneys.json'), 'utf-8')
      );
      console.log(`\n  ✓ Loaded ${organized.attorneys.length} attorneys`);
    }
    
    // Read main scraped content
    if (files.includes('scraped-content.json')) {
      const content = JSON.parse(
        await fs.readFile(path.join(SCRAPED_DIR, 'scraped-content.json'), 'utf-8')
      );
      organized.practiceAreas = content.practiceAreas;
      organized.industries = content.industries;
      organized.about = content.about;
      
      console.log(`  ✓ Loaded ${Object.keys(organized.practiceAreas || {}).length} practice areas`);
      console.log(`  ✓ Loaded ${Object.keys(organized.industries || {}).length} industries`);
      console.log(`  ✓ Loaded ${Object.keys(organized.about || {}).length} about pages`);
    }
    
    return organized;
    
  } catch (error) {
    console.error('  ✗ Error organizing files:', error.message);
    return null;
  }
}

/**
 * Step 2: Optimize images to WebP
 */
async function optimizeImages() {
  console.log('\n🎨 Step 2: Optimizing attorney images to WebP...\n');
  
  try {
    // Check if sharp is available
    if (!sharp) {
      console.log('  ⚠️  Sharp not available, skipping optimization');
      console.log('  💡 Install with: npm install sharp');
      return { optimized: 0, skipped: 0, failed: 0 };
    }
    
    // Get all images from downloaded directory
    const files = await fs.readdir(DOWNLOADED_DIR);
    const imageFiles = files.filter(f => 
      /\.(png|jpg|jpeg)$/i.test(f) && f !== 'no-results-found.png'
    );
    
    console.log(`  Found ${imageFiles.length} images to optimize\n`);
    
    const results = { optimized: 0, skipped: 0, failed: 0 };
    
    for (const file of imageFiles) {
      const inputPath = path.join(DOWNLOADED_DIR, file);
      const outputFile = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const outputPath = path.join(TEAM_DIR, outputFile);
      
      try {
        // Check if WebP already exists
        try {
          await fs.access(outputPath);
          console.log(`  ⏭️  Skipped (exists): ${outputFile}`);
          results.skipped++;
          continue;
        } catch {
          // File doesn't exist, proceed
        }
        
        // Optimize and convert to WebP
        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .resize(800, 800, { 
            fit: 'cover',
            position: 'top'
          })
          .toFile(outputPath);
        
        const stats = await fs.stat(outputPath);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
        console.log(`  ✓ Optimized: ${file} → ${outputFile} (${sizeMB}MB)`);
        results.optimized++;
        
      } catch (error) {
        console.error(`  ✗ Failed: ${file} - ${error.message}`);
        results.failed++;
      }
    }
    
    return results;
    
  } catch (error) {
    console.error('  ✗ Error optimizing images:', error.message);
    return { optimized: 0, skipped: 0, failed: 0 };
  }
}

/**
 * Step 3: Backup and remove old images
 */
async function cleanupOldImages() {
  console.log('\n🧹 Step 3: Cleaning up old images...\n');
  
  try {
    // Create backup directory
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    
    // Get all old PNG/JPG files in team directory
    const files = await fs.readdir(TEAM_DIR);
    const oldImages = files.filter(f => 
      /\.(png|jpg|jpeg)$/i.test(f) && 
      !f.includes('placeholder') &&
      !f.includes('default')
    );
    
    console.log(`  Found ${oldImages.length} old images\n`);
    
    const results = { backed: 0, removed: 0, failed: 0 };
    
    for (const file of oldImages) {
      const sourcePath = path.join(TEAM_DIR, file);
      const backupPath = path.join(BACKUP_DIR, file);
      const webpFile = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const webpPath = path.join(TEAM_DIR, webpFile);
      
      try {
        // Check if WebP version exists
        try {
          await fs.access(webpPath);
          // WebP exists, backup and remove old
          await fs.copyFile(sourcePath, backupPath);
          await fs.unlink(sourcePath);
          console.log(`  ✓ Backed up & removed: ${file} (replaced by ${webpFile})`);
          results.backed++;
          results.removed++;
        } catch {
          // WebP doesn't exist, just backup
          await fs.copyFile(sourcePath, backupPath);
          console.log(`  ⚠️  Backed up only: ${file} (no WebP replacement)`);
          results.backed++;
        }
        
      } catch (error) {
        console.error(`  ✗ Failed: ${file} - ${error.message}`);
        results.failed++;
      }
    }
    
    return results;
    
  } catch (error) {
    console.error('  ✗ Error cleaning up images:', error.message);
    return { backed: 0, removed: 0, failed: 0 };
  }
}

/**
 * Step 4: Generate final data files with WebP paths
 */
async function generateFinalDataFiles(organized) {
  console.log('\n📝 Step 4: Generating final data files...\n');
  
  try {
    const outputDir = path.join(__dirname, '../src/lib/data/migration');
    await fs.mkdir(outputDir, { recursive: true });
    
    // Update attorney images to WebP
    if (organized.attorneys) {
      const attorneys = organized.attorneys
        .filter(a => a.name !== 'No Results Found')
        .map(attorney => {
          const slug = attorney.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          
          return {
            ...attorney,
            image: `/images/team/${slug}.webp`,
            imageOriginal: attorney.image
          };
        });
      
      await fs.writeFile(
        path.join(outputDir, 'attorneys-final.json'),
        JSON.stringify(attorneys, null, 2)
      );
      console.log(`  ✓ Created attorneys-final.json (${attorneys.length} attorneys)`);
    }
    
    // Copy practice areas
    if (organized.practiceAreas) {
      await fs.writeFile(
        path.join(outputDir, 'practice-areas-final.json'),
        JSON.stringify(organized.practiceAreas, null, 2)
      );
      console.log(`  ✓ Created practice-areas-final.json`);
    }
    
    // Copy industries
    if (organized.industries) {
      await fs.writeFile(
        path.join(outputDir, 'industries-final.json'),
        JSON.stringify(organized.industries, null, 2)
      );
      console.log(`  ✓ Created industries-final.json`);
    }
    
    // Copy about pages
    if (organized.about) {
      await fs.writeFile(
        path.join(outputDir, 'about-final.json'),
        JSON.stringify(organized.about, null, 2)
      );
      console.log(`  ✓ Created about-final.json`);
    }
    
    console.log(`\n  📁 All files saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('  ✗ Error generating final files:', error.message);
  }
}

/**
 * Step 5: Clean up downloaded directory
 */
async function cleanupDownloadedDir() {
  console.log('\n🗑️  Step 5: Cleaning up downloaded directory...\n');
  
  try {
    const files = await fs.readdir(DOWNLOADED_DIR);
    const imageFiles = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));
    
    let removed = 0;
    for (const file of imageFiles) {
      await fs.unlink(path.join(DOWNLOADED_DIR, file));
      removed++;
    }
    
    console.log(`  ✓ Removed ${removed} original files from downloaded directory`);
    console.log(`  💡 Optimized WebP files are in: public/images/team/`);
    
  } catch (error) {
    console.error('  ✗ Error cleaning up:', error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Organization and Optimization...\n');
  console.log('═'.repeat(60));
  
  // Step 1: Organize
  const organized = await organizeScrapedFiles();
  
  if (!organized) {
    console.error('\n❌ Failed to organize files. Exiting.');
    return;
  }
  
  console.log('\n' + '═'.repeat(60));
  
  // Step 2: Optimize
  const optimizeResults = await optimizeImages();
  
  console.log('\n' + '═'.repeat(60));
  
  // Step 3: Cleanup old images
  const cleanupResults = await cleanupOldImages();
  
  console.log('\n' + '═'.repeat(60));
  
  // Step 4: Generate final files
  await generateFinalDataFiles(organized);
  
  console.log('\n' + '═'.repeat(60));
  
  // Step 5: Clean downloaded directory
  await cleanupDownloadedDir();
  
  // Final summary
  console.log('\n' + '═'.repeat(60));
  console.log('\n✅ Organization and Optimization Complete!\n');
  console.log('📊 Summary:');
  console.log(`  Images optimized: ${optimizeResults.optimized}`);
  console.log(`  Images skipped: ${optimizeResults.skipped}`);
  console.log(`  Old images backed up: ${cleanupResults.backed}`);
  console.log(`  Old images removed: ${cleanupResults.removed}`);
  
  console.log('\n📁 File Structure:');
  console.log('  ├── public/images/team/');
  console.log('  │   └── *.webp (optimized attorney photos)');
  console.log('  ├── src/lib/data/migration/');
  console.log('  │   ├── attorneys-final.json');
  console.log('  │   ├── practice-areas-final.json');
  console.log('  │   ├── industries-final.json');
  console.log('  │   └── about-final.json');
  console.log('  └── backup-old-images/');
  console.log('      └── *.png, *.jpg (backed up originals)');
  
  console.log('\n📝 Next Steps:');
  console.log('  1. Review optimized images in public/images/team/');
  console.log('  2. Review final data files in src/lib/data/migration/');
  console.log('  3. Merge final data into your main data files');
  console.log('  4. Test the website');
  console.log('  5. Delete backup-old-images/ when satisfied\n');
}

// Run
main().catch(console.error);
