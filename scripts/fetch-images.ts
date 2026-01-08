/**
 * Image Fetching and Optimization Script
 * Fetches images from Unsplash, Pexels, and Pixabay
 * Optimizes and converts to WebP format
 * 
 * Usage: npm run fetch-images -- --query "law office" --category "hero"
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import process from 'node:process';
import { Buffer } from 'node:buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const UNSPLASH_KEY = process.env.VITE_UNSPLASH_ACCESS_KEY;
const PEXELS_KEY = process.env.VITE_PEXELS_API_KEY;
const PIXABAY_KEY = process.env.VITE_PIXABAY_API_KEY;

interface ImageConfig {
  query: string;
  category: string; // 'hero', 'practice-area', 'industry', 'team', 'office'
  count?: number;
  width?: number;
  height?: number;
}

interface FetchedImage {
  url: string;
  source: string;
  photographer?: string;
  photographerUrl?: string;
}

/**
 * Fetch images from Unsplash
 */
async function fetchFromUnsplash(query: string, count: number = 5): Promise<FetchedImage[]> {
  if (!UNSPLASH_KEY) {
    console.warn('⚠️  Unsplash API key not found');
    return [];
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
  
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'Authorization': `Client-ID ${UNSPLASH_KEY}` }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const images = json.results?.map((img: any) => ({
            url: img.urls.raw + '&w=2400&q=85',
            source: 'unsplash',
            photographer: img.user.name,
            photographerUrl: img.user.links.html
          })) || [];
          resolve(images);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch images from Pexels
 */
async function fetchFromPexels(query: string, count: number = 5): Promise<FetchedImage[]> {
  if (!PEXELS_KEY) {
    console.warn('⚠️  Pexels API key not found');
    return [];
  }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
  
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'Authorization': PEXELS_KEY }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const images = json.photos?.map((img: any) => ({
            url: img.src.original,
            source: 'pexels',
            photographer: img.photographer,
            photographerUrl: img.photographer_url
          })) || [];
          resolve(images);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch images from Pixabay
 */
async function fetchFromPixabay(query: string, count: number = 5): Promise<FetchedImage[]> {
  if (!PIXABAY_KEY) {
    console.warn('⚠️  Pixabay API key not found');
    return [];
  }

  // Pixabay requires per_page between 3 and 200
  const perPage = Math.max(3, Math.min(200, count));
  const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&per_page=${perPage}&image_type=photo&orientation=horizontal`;
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            console.warn(`⚠️  Pixabay API error: ${json.error}`);
            resolve([]);
            return;
          }
          const images = json.hits?.map((img: any) => ({
            url: img.largeImageURL,
            source: 'pixabay',
            photographer: img.user,
            photographerUrl: `https://pixabay.com/users/${img.user}-${img.user_id}/`
          })) || [];
          resolve(images);
        } catch (err) {
          console.warn('⚠️  Pixabay parsing error:', err);
          resolve([]);
        }
      });
    }).on('error', (err) => {
      console.warn('⚠️  Pixabay request error:', err);
      resolve([]);
    });
  });
}

/**
 * Download image from URL
 */
async function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Optimize and convert image to WebP
 */
async function optimizeImage(
  buffer: Buffer,
  outputPath: string,
  width?: number,
  height?: number
): Promise<void> {
  let pipeline = sharp(buffer);

  // Resize if dimensions provided
  if (width || height) {
    pipeline = pipeline.resize(width, height, {
      fit: 'cover',
      position: 'center'
    });
  }

  // Convert to WebP with quality 85
  await pipeline
    .webp({ quality: 85 })
    .toFile(outputPath);

  // Also create AVIF version for better compression
  const avifPath = outputPath.replace('.webp', '.avif');
  await sharp(buffer)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .avif({ quality: 80 })
    .toFile(avifPath);

  // Create fallback JPEG
  const jpegPath = outputPath.replace('.webp', '.jpg');
  await sharp(buffer)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85 })
    .toFile(jpegPath);
}

/**
 * Main function to fetch and optimize images
 */
async function fetchAndOptimizeImages(config: ImageConfig) {
  console.log(`\n🔍 Searching for images: "${config.query}"\n`);

  // Fetch from all sources
  const [unsplashImages, pexelsImages, pixabayImages] = await Promise.all([
    fetchFromUnsplash(config.query, config.count),
    fetchFromPexels(config.query, config.count),
    fetchFromPixabay(config.query, config.count)
  ]);

  const allImages = [...unsplashImages, ...pexelsImages, ...pixabayImages];
  
  if (allImages.length === 0) {
    console.log('❌ No images found');
    return;
  }

  console.log(`✅ Found ${allImages.length} images\n`);

  // Create output directory
  const outputDir = path.resolve(__dirname, '../public/images', config.category);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Download and optimize each image
  const credits: Array<{ filename: string; photographer: string; source: string; url: string }> = [];

  for (let i = 0; i < Math.min(allImages.length, config.count || 5); i++) {
    const image = allImages[i];
    const filename = `${config.category}-${i + 1}`;
    const outputPath = path.join(outputDir, `${filename}.webp`);

    try {
      console.log(`⬇️  Downloading image ${i + 1}/${config.count || 5} from ${image.source}...`);
      const buffer = await downloadImage(image.url);

      console.log(`🔧 Optimizing and converting to WebP/AVIF/JPEG...`);
      await optimizeImage(buffer, outputPath, config.width, config.height);

      console.log(`✅ Saved: ${filename}.webp, ${filename}.avif, ${filename}.jpg\n`);

      // Track credits
      credits.push({
        filename,
        photographer: image.photographer || 'Unknown',
        source: image.source,
        url: image.photographerUrl || ''
      });
    } catch (err) {
      console.error(`❌ Error processing image ${i + 1}:`, err);
    }
  }

  // Save credits file
  const creditsPath = path.join(outputDir, '_credits.json');
  fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 2));
  console.log(`\n📝 Image credits saved to: ${creditsPath}`);
}

/**
 * Predefined image queries for the law firm
 */
const IMAGE_QUERIES = {
  hero: [
    'modern law office interior',
    'professional business meeting',
    'indianapolis skyline',
    'corporate handshake'
  ],
  'practice-areas': [
    'business litigation courtroom',
    'healthcare medical professional',
    'construction site workers',
    'insurance documents',
    'employment office workplace',
    'bankruptcy financial documents'
  ],
  industries: [
    'healthcare hospital modern',
    'construction building site',
    'insurance professional office',
    'business corporate meeting'
  ],
  office: [
    'modern law office lobby',
    'professional conference room',
    'law library books',
    'office building exterior indianapolis'
  ],
  team: [
    'professional business portrait',
    'diverse legal team',
    'attorney professional headshot'
  ]
};

/**
 * CLI Interface
 */
const args = process.argv.slice(2);
const queryIndex = args.indexOf('--query');
const categoryIndex = args.indexOf('--category');
const countIndex = args.indexOf('--count');
const widthIndex = args.indexOf('--width');
const heightIndex = args.indexOf('--height');
const batchIndex = args.indexOf('--batch');

if (batchIndex !== -1) {
  // Batch mode: fetch all predefined images
  console.log('🚀 Starting batch image fetch...\n');
  
  (async () => {
    // Hero images
    for (const query of IMAGE_QUERIES.hero) {
      await fetchAndOptimizeImages({
        query,
        category: 'hero',
        count: 2,
        width: 1920,
        height: 1080
      });
    }

    // Practice area images
    for (const query of IMAGE_QUERIES['practice-areas']) {
      await fetchAndOptimizeImages({
        query,
        category: 'practice-areas',
        count: 1,
        width: 1200,
        height: 800
      });
    }

    // Industry images
    for (const query of IMAGE_QUERIES.industries) {
      await fetchAndOptimizeImages({
        query,
        category: 'industries',
        count: 1,
        width: 1200,
        height: 600
      });
    }

    console.log('\n✨ Batch fetch complete!');
  })();
} else if (queryIndex !== -1 && categoryIndex !== -1) {
  // Single query mode
  const config: ImageConfig = {
    query: args[queryIndex + 1],
    category: args[categoryIndex + 1],
    count: countIndex !== -1 ? parseInt(args[countIndex + 1]) : 5,
    width: widthIndex !== -1 ? parseInt(args[widthIndex + 1]) : undefined,
    height: heightIndex !== -1 ? parseInt(args[heightIndex + 1]) : undefined
  };

  fetchAndOptimizeImages(config);
} else {
  console.log(`
📸 Image Fetching and Optimization Tool

Usage:
  npm run fetch-images -- --query "law office" --category "hero" [options]
  npm run fetch-images -- --batch

Options:
  --query      Search query for images
  --category   Category folder (hero, practice-areas, industries, office, team)
  --count      Number of images to fetch (default: 5)
  --width      Target width in pixels
  --height     Target height in pixels
  --batch      Fetch all predefined images

Examples:
  npm run fetch-images -- --query "modern law office" --category "hero" --count 3 --width 1920 --height 1080
  npm run fetch-images -- --query "healthcare professional" --category "industries" --width 1200
  npm run fetch-images -- --batch

Batch mode will fetch:
  - Hero images (1920x1080)
  - Practice area images (1200x800)
  - Industry images (1200x600)
  - Office images (1200x800)
  `);
}
