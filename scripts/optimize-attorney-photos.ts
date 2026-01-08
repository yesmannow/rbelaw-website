/**
 * Optimize Attorney Photos
 * Converts existing attorney photos to WebP and AVIF formats
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const attorneyPhotos = [
  'Anna-Marvin-Attorney-THMB-JPG.jpg',
  'Beau-Browning-Headshot-with-Background-S13_0338-a-jpg.jpg',
  'Blair-Vandivier-Attorney-Indianapolis-Riley-Bennett-Egloff-Business-Law-Mergers-and-Acquisitions-Contracts-Formation.jpg',
  'Courtney-D.-Mills-Indianapolis-Attorney-Riley-Bennett-Egloff-Partner-Medical-Malpractice-Defense-Health-Care-Litigation.jpg',
  'Donald-S.-Smith-attorney-indianapolis-Partner-Riley-Bennett-Egloff-Employment-Law-.jpg',
  'Doug-Cook-Indianapolis-attorney-business-law.jpg',
  'Eric-Hylton-Indiana-Attorney-Education-Law-Thumbnail-1.png',
  'Jaclyn-M-Flint-Attorney-Indiana-IP-Law-Construction-Sports-Entertainment-Commercial-Litigation-thumbnail.png',
  'James-Riley-Jr.-Attorney-Indianapolis-Riley-Bennett-Egloff-Member-American-Arbitration-Association-Business-Litigation.jpg',
  'Jeffrey-Fecht-attorney-indianapolis-commercial-litigation-construction-law-product-liability-toxic-tort.jpg',
  'John-Egloff-Attorney-Headshot-Thumbnail-JPG.jpg',
  'JT-Wynne-Headshot-Indianapolis-Attorney.jpg',
  'Justin-Sorrell-indiana-business-litigation-attorney.png',
  'Kathleen-Hart-Indianapolis-attorney-Riley-Bennett-Egloff-Business-Law-XBE-Commercial-Law-Employment-Law-.jpg',
  'Katie-Osborne-Indiana-Med-Mal-Defense-Attorney-Partner-Riley-Bennett-Egloff-Thumbnail.png',
  'Katie-Riles-Attorney-Riley-Bennett-Egloff-with-bkgrnd-png.png',
  'Kevin-Tharp-Indiana-Attorney-Partner-Riley-Bennett-Egloff-Business-Law-Construction-Law-thumbnail.png',
  'Laura-Binford-Indianapolis-Med-Mal-Attorney-Partner-Riley-Bennett-Egloff-thumbnail-png.png',
  'Lindsay-A-Llewellyn-Thumbnail.png',
  'Megan-Young-Photo-for-Thumbnails-JPG.jpg',
  'Patrick-McCarney-Indiana-Attorney-Business-Law-Insurance-Law-thumbnail.png',
  'Raymond-T.-Seach-attorney-Indianapolis-partner-riley-bennett-egloff.jpg',
  'Ryan-Leitch-Indiana-Attorney-Trust-and-Estate-Law-Thumbnail-1.png',
  'Sarah Macgill Marr.jpg',
  'Timothy-H.-Button-Attorney-Indianapolis-Thumbnail-Image.png',
  'Tony-Jost-2L9A4882.jpg',
  'Travis-Watson-Indiana-Attorney-Construction-Law-Insurance-Law-Business-Corporate-Law-thumbnail.png'
];

async function optimizeAttorneyPhoto(filename: string) {
  const inputPath = path.resolve(__dirname, '../public/images/team/Attorneys', filename);
  const outputDir = path.resolve(__dirname, '../public/images/team/optimized');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get base name without extension
  const baseName = path.basename(filename, path.extname(filename));
  const cleanName = baseName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

  try {
    console.log(`📸 Processing: ${filename}`);

    // Read the image
    const image = sharp(inputPath);
    await image.metadata();

    // Resize to consistent dimensions (400x400 for attorney cards)
    const size = 400;

    // Generate WebP
    await image
      .clone()
      .resize(size, size, { fit: 'cover', position: 'center' })
      .webp({ quality: 90 })
      .toFile(path.join(outputDir, `${cleanName}.webp`));

    // Generate AVIF
    await image
      .clone()
      .resize(size, size, { fit: 'cover', position: 'center' })
      .avif({ quality: 85 })
      .toFile(path.join(outputDir, `${cleanName}.avif`));

    // Generate JPEG fallback
    await image
      .clone()
      .resize(size, size, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 90 })
      .toFile(path.join(outputDir, `${cleanName}.jpg`));

    console.log(`✅ Optimized: ${cleanName}.webp, ${cleanName}.avif, ${cleanName}.jpg`);

    return {
      original: filename,
      optimized: cleanName,
      formats: ['webp', 'avif', 'jpg']
    };
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting attorney photo optimization...\n');

  const results = [];

  for (const photo of attorneyPhotos) {
    const result = await optimizeAttorneyPhoto(photo);
    if (result) {
      results.push(result);
    }
  }

  // Save mapping file
  const mappingPath = path.resolve(__dirname, '../public/images/team/optimized/_mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(results, null, 2));

  console.log(`\n✨ Optimization complete!`);
  console.log(`📝 Mapping saved to: ${mappingPath}`);
  console.log(`📊 Processed ${results.length} of ${attorneyPhotos.length} photos`);
}

main();
