/**
 * Convert Scraped Content to TypeScript Format
 * Transforms all scraped JSON files into properly typed TypeScript data
 * 
 * Usage: node scripts/convert-to-typescript.js
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPED_DIR = path.join(__dirname, '../scraped-content');
const MIGRATION_DIR = path.join(__dirname, '../src/lib/data/migration');
const OUTPUT_DIR = path.join(__dirname, '../src/lib/data');

/**
 * Generate slug from name
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Calculate read time for blog post
 */
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  let totalWords = 0;
  
  content.forEach(block => {
    if (block.type === 'paragraph' || block.type === 'heading') {
      totalWords += block.text.split(/\s+/).length;
    } else if (block.type === 'list') {
      block.items.forEach(item => {
        totalWords += item.split(/\s+/).length;
      });
    } else if (block.type === 'quote') {
      totalWords += block.text.split(/\s+/).length;
    }
  });
  
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

/**
 * Convert attorneys data
 */
async function convertAttorneys() {
  console.log('📋 Converting attorneys data...');
  
  try {
    const attorneysFile = path.join(MIGRATION_DIR, 'attorneys-final.json');
    const data = JSON.parse(await fs.readFile(attorneysFile, 'utf-8'));
    
    const attorneys = data
      .filter(a => a.name !== 'No Results Found')
      .map(attorney => ({
        name: attorney.name,
        title: attorney.title || 'Attorney',
        email: attorney.email || '',
        phone: attorney.phone || '',
        image: attorney.image || '',
        imageOriginal: attorney.imageOriginal,
        slug: generateSlug(attorney.name),
        bio: attorney.bio || [],
        practiceAreas: attorney.practiceAreas || [],
        education: attorney.education || [],
        barAdmissions: attorney.barAdmissions || [],
        professionalAffiliations: attorney.professionalAffiliations || [],
        honors: attorney.honors || [],
        publications: attorney.publications || []
      }));
    
    console.log(`  ✓ Converted ${attorneys.length} attorneys`);
    return attorneys;
    
  } catch (error) {
    console.error('  ✗ Error converting attorneys:', error.message);
    return [];
  }
}

/**
 * Convert practice areas data
 */
async function convertPracticeAreas() {
  console.log('📋 Converting practice areas data...');
  
  try {
    const practiceAreasFile = path.join(MIGRATION_DIR, 'practice-areas-final.json');
    const data = JSON.parse(await fs.readFile(practiceAreasFile, 'utf-8'));
    
    const practiceAreas = Object.entries(data).map(([slug, content], index) => {
      const name = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return {
        id: `pa-${index + 1}`,
        name,
        slug,
        description: content.description || '',
        icon: content.icon || 'scale',
        color: content.color || '#213469',
        image: content.image || '',
        content: content.sections || [],
        relatedAttorneys: [],
        relatedIndustries: [],
        featured: false
      };
    });
    
    console.log(`  ✓ Converted ${practiceAreas.length} practice areas`);
    return practiceAreas;
    
  } catch (error) {
    console.error('  ✗ Error converting practice areas:', error.message);
    return [];
  }
}

/**
 * Convert industries data
 */
async function convertIndustries() {
  console.log('📋 Converting industries data...');
  
  try {
    const industriesFile = path.join(MIGRATION_DIR, 'industries-final.json');
    const data = JSON.parse(await fs.readFile(industriesFile, 'utf-8'));
    
    const industries = Object.entries(data).map(([slug, content], index) => {
      const name = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return {
        id: `ind-${index + 1}`,
        name,
        slug,
        description: content.description || '',
        icon: content.icon || 'building',
        color: content.color || '#74243C',
        image: content.image || '',
        content: content.sections || [],
        relatedPracticeAreas: [],
        relatedAttorneys: [],
        featured: false
      };
    });
    
    console.log(`  ✓ Converted ${industries.length} industries`);
    return industries;
    
  } catch (error) {
    console.error('  ✗ Error converting industries:', error.message);
    return [];
  }
}

/**
 * Convert blog posts data
 */
async function convertBlogPosts() {
  console.log('📋 Converting blog posts data...');
  
  try {
    const blogFile = path.join(SCRAPED_DIR, 'blog-posts.json');
    const data = JSON.parse(await fs.readFile(blogFile, 'utf-8'));
    
    const blogPosts = data.map((post, index) => ({
      id: `post-${index + 1}`,
      title: post.title,
      slug: post.slug,
      url: post.url,
      date: post.date,
      author: post.author,
      authorSlug: generateSlug(post.author),
      categories: post.categories || [],
      tags: post.tags || [],
      image: post.image || '',
      excerpt: post.excerpt || '',
      content: post.content || [],
      featured: false,
      readTime: calculateReadTime(post.content || [])
    }));
    
    // Sort by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    console.log(`  ✓ Converted ${blogPosts.length} blog posts`);
    return blogPosts;
    
  } catch (error) {
    console.error('  ✗ Error converting blog posts:', error.message);
    return [];
  }
}

/**
 * Convert about pages data
 */
async function convertAboutPages() {
  console.log('📋 Converting about pages data...');
  
  try {
    const aboutFile = path.join(MIGRATION_DIR, 'about-final.json');
    const data = JSON.parse(await fs.readFile(aboutFile, 'utf-8'));
    
    const aboutPages = Object.entries(data).map(([slug, content], index) => {
      const title = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return {
        id: `about-${index + 1}`,
        title,
        slug,
        description: content.description || '',
        content: content.sections || [],
        image: content.image || ''
      };
    });
    
    console.log(`  ✓ Converted ${aboutPages.length} about pages`);
    return aboutPages;
    
  } catch (error) {
    console.error('  ✗ Error converting about pages:', error.message);
    return [];
  }
}

/**
 * Generate TypeScript data files
 */
async function generateTypeScriptFiles(data) {
  console.log('\n📝 Generating TypeScript data files...');
  
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Generate attorneys.ts
  const attorneysContent = `/**
 * Attorney Data
 * Auto-generated from scraped content
 */

import type { Attorney } from '../types/content';

export const attorneys: Attorney[] = ${JSON.stringify(data.attorneys, null, 2)};

export function getAttorneyBySlug(slug: string): Attorney | undefined {
  return attorneys.find(a => a.slug === slug);
}

export function getAttorneysByPracticeArea(practiceArea: string): Attorney[] {
  return attorneys.filter(a => 
    a.practiceAreas.some(pa => 
      pa.toLowerCase().includes(practiceArea.toLowerCase())
    )
  );
}
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'attorneys.ts'), attorneysContent);
  console.log('  ✓ Generated attorneys.ts');
  
  // Generate practice-areas.ts
  const practiceAreasContent = `/**
 * Practice Areas Data
 * Auto-generated from scraped content
 */

import type { PracticeArea } from '../types/content';

export const practiceAreas: PracticeArea[] = ${JSON.stringify(data.practiceAreas, null, 2)};

export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
  return practiceAreas.find(pa => pa.slug === slug);
}

export function getFeaturedPracticeAreas(): PracticeArea[] {
  return practiceAreas.filter(pa => pa.featured);
}
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'practice-areas.ts'), practiceAreasContent);
  console.log('  ✓ Generated practice-areas.ts');
  
  // Generate industries.ts
  const industriesContent = `/**
 * Industries Data
 * Auto-generated from scraped content
 */

import type { Industry } from '../types/content';

export const industries: Industry[] = ${JSON.stringify(data.industries, null, 2)};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug);
}

export function getFeaturedIndustries(): Industry[] {
  return industries.filter(i => i.featured);
}
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'industries.ts'), industriesContent);
  console.log('  ✓ Generated industries.ts');
  
  // Generate blog-posts.ts
  const blogPostsContent = `/**
 * Blog Posts Data
 * Auto-generated from scraped content
 */

import type { BlogPost } from '../types/content';

export const blogPosts: BlogPost[] = ${JSON.stringify(data.blogPosts, null, 2)};

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(p => 
    p.categories.some(c => c.toLowerCase() === category.toLowerCase())
  );
}

export function getBlogPostsByAuthor(author: string): BlogPost[] {
  return blogPosts.filter(p => 
    p.author.toLowerCase().includes(author.toLowerCase())
  );
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter(p => p.featured).slice(0, 3);
}

export function getRecentBlogPosts(limit: number = 10): BlogPost[] {
  return blogPosts.slice(0, limit);
}
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'blog-posts.ts'), blogPostsContent);
  console.log('  ✓ Generated blog-posts.ts');
  
  // Generate about-pages.ts
  const aboutPagesContent = `/**
 * About Pages Data
 * Auto-generated from scraped content
 */

import type { AboutPage } from '../types/content';

export const aboutPages: AboutPage[] = ${JSON.stringify(data.aboutPages, null, 2)};

export function getAboutPageBySlug(slug: string): AboutPage | undefined {
  return aboutPages.find(p => p.slug === slug);
}
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'about-pages.ts'), aboutPagesContent);
  console.log('  ✓ Generated about-pages.ts');
  
  // Generate index.ts
  const indexContent = `/**
 * Data Exports
 * Central export point for all content data
 */

export * from './attorneys';
export * from './practice-areas';
export * from './industries';
export * from './blog-posts';
export * from './about-pages';
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
  console.log('  ✓ Generated index.ts');
}

/**
 * Main conversion function
 */
async function main() {
  console.log('🚀 Starting Content Conversion to TypeScript...\n');
  console.log('═'.repeat(60));
  
  const data = {
    attorneys: await convertAttorneys(),
    practiceAreas: await convertPracticeAreas(),
    industries: await convertIndustries(),
    blogPosts: await convertBlogPosts(),
    aboutPages: await convertAboutPages()
  };
  
  console.log('\n' + '═'.repeat(60));
  
  await generateTypeScriptFiles(data);
  
  console.log('\n' + '═'.repeat(60));
  console.log('\n✅ Content Conversion Complete!\n');
  console.log('📊 Summary:');
  console.log(`  Attorneys: ${data.attorneys.length}`);
  console.log(`  Practice Areas: ${data.practiceAreas.length}`);
  console.log(`  Industries: ${data.industries.length}`);
  console.log(`  Blog Posts: ${data.blogPosts.length}`);
  console.log(`  About Pages: ${data.aboutPages.length}`);
  
  console.log('\n📁 Generated Files:');
  console.log('  ├── src/lib/data/attorneys.ts');
  console.log('  ├── src/lib/data/practice-areas.ts');
  console.log('  ├── src/lib/data/industries.ts');
  console.log('  ├── src/lib/data/blog-posts.ts');
  console.log('  ├── src/lib/data/about-pages.ts');
  console.log('  └── src/lib/data/index.ts');
  
  console.log('\n📝 Next Steps:');
  console.log('  1. Review generated TypeScript files');
  console.log('  2. Update navigation with new mega menus');
  console.log('  3. Create page components for each content type');
  console.log('  4. Update routing');
  console.log('  5. Test the website\n');
}

// Run conversion
main().catch(console.error);
