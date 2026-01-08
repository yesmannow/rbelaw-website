/**
 * Optimize All Images
 * Recursively finds and optimizes all images in public/images
 * Converts to WebP, AVIF, and optimized JPEG
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface OptimizationResult {
  original: string;
  optimized: string;
  originalSize: number;
  webpSize: number;
  avifSize: number;
  jpegSize: number;
  savings: number;
}

const results: OptimizationResult[] = [];

/**
 * Get all image files recursively
 */
function getAllImageFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip optimized directories
      if (file !== 'optimized' && file !== '_optimized') {
        getAllImageFiles(filePath, fileList);
      }
    } else {
      // Check if it's an image file (but not already optimized)
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext) && !file.includes('_optimized')) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath: string): Promise<OptimizationResult | null> {
  try {
    const originalSize = fs.statSync(inputPath).size;
    const dir = path.dirname(inputPath);
    const ext = path.extname(inputPath);
    const basename = path.basename(inputPath, ext);
    
    // Clean up filename
    const cleanName = basename
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    console.log(`📸 Processing: ${path.relative(process.cwd(), inputPath)}`);

    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Determine optimal dimensions
    let width = metadata.width;
    let height = metadata.height;

    // For practice area images (1024x284), keep aspect ratio
    // For other images, optimize based on size
    if (width && width > 2400) {
      width = 2400;
      height = undefined; // Maintain aspect ratio
    }

    // Generate WebP
    const webpPath = path.join(dir, `${cleanName}.webp`);
    await image
      .clone()
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;

    // Generate AVIF
    const avifPath = path.join(dir, `${cleanName}.avif`);
    await image
      .clone()
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .avif({ quality: 80 })
      .toFile(avifPath);
    const avifSize = fs.statSync(avifPath).size;

    // Generate optimized JPEG (if original wasn't already JPEG with clean name)
    const jpegPath = path.join(dir, `${cleanName}.jpg`);
    let jpegSize = originalSize;
    
    if (inputPath !== jpegPath) {
      await image
        .clone()
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toFile(jpegPath);
      jpegSize = fs.statSync(jpegPath).size;
    }

    const savings = ((originalSize - Math.min(webpSize, avifSize)) / originalSize) * 100;

    console.log(`✅ Optimized: ${cleanName}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
    console.log(`   WebP: ${(webpSize / 1024).toFixed(1)} KB (${((webpSize / originalSize) * 100).toFixed(0)}%)`);
    console.log(`   AVIF: ${(avifSize / 1024).toFixed(1)} KB (${((avifSize / originalSize) * 100).toFixed(0)}%)`);
    console.log(`   Savings: ${savings.toFixed(0)}%\n`);

    return {
      original: path.relative(process.cwd(), inputPath),
      optimized: cleanName,
      originalSize,
      webpSize,
      avifSize,
      jpegSize,
      savings
    };
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting comprehensive image optimization...\n');

  const imagesDir = path.resolve(__dirname, '../public/images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found:', imagesDir);
    return;
  }

  // Get all image files
  const imageFiles = getAllImageFiles(imagesDir);
  console.log(`📊 Found ${imageFiles.length} images to optimize\n`);

  // Process each image
  for (const imagePath of imageFiles) {
    const result = await optimizeImage(imagePath);
    if (result) {
      results.push(result);
    }
  }

  // Generate summary report
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60) + '\n');

  const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalWebpSize = results.reduce((sum, r) => sum + r.webpSize, 0);
  const totalAvifSize = results.reduce((sum, r) => sum + r.avifSize, 0);
  const totalSavings = ((totalOriginalSize - totalAvifSize) / totalOriginalSize) * 100;

  console.log(`✅ Images processed: ${results.length}`);
  console.log(`📦 Original total size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 WebP total size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 AVIF total size: ${(totalAvifSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💰 Total savings: ${totalSavings.toFixed(0)}% (${((totalOriginalSize - totalAvifSize) / 1024 / 1024).toFixed(2)} MB)`);

  // Save detailed report
  const reportPath = path.resolve(__dirname, '../public/images/_optimization-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    date: new Date().toISOString(),
    summary: {
      imagesProcessed: results.length,
      originalTotalSize: totalOriginalSize,
      webpTotalSize: totalWebpSize,
      avifTotalSize: totalAvifSize,
      totalSavings: totalSavings,
      savedBytes: totalOriginalSize - totalAvifSize
    },
    results
  }, null, 2));

  console.log(`\n📝 Detailed report saved to: ${reportPath}`);
  console.log('\n✨ Optimization complete!\n');
}

main();
