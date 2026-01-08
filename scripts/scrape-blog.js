/**
 * RBE Blog Scraper
 * Scrapes blog posts from rbelaw.com
 * 
 * Usage: node scripts/scrape-blog.js
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://rbelaw.com';
const OUTPUT_DIR = path.join(__dirname, '../scraped-content');

/**
 * Get all blog post URLs from the newsroom page
 */
async function getBlogPostUrls(page) {
  console.log('🔍 Finding blog post URLs from newsroom...\n');
  
  const allPosts = [];
  let currentPage = 1;
  let hasMorePages = true;
  
  while (hasMorePages) {
    const url = currentPage === 1 
      ? `${BASE_URL}/newsroom/`
      : `${BASE_URL}/newsroom/page/${currentPage}/`;
    
    console.log(`  Checking page ${currentPage}: ${url}`);
    
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      if (response.status() !== 200) {
        console.log(`  ⚠️  Page ${currentPage} not found, stopping`);
        break;
      }
      
      const posts = await page.evaluate(() => {
        const postLinks = [];
        
        // Look for article/post links
        const selectors = [
          'article .entry-title a',
          'article h2 a',
          '.et_pb_post .entry-title a',
          '.post .entry-title a',
          'article a[href]'
        ];
        
        const links = new Set();
        const baseUrl = window.location.origin;
        
        selectors.forEach(selector => {
          document.querySelectorAll(selector).forEach(link => {
            const href = link.href;
            const title = link.textContent.trim();
            
            // Only include individual posts (WordPress single post format)
            // Exclude: newsroom, page/, category/, tag/, author/, about-us/, practice-areas/, etc.
            if (href.startsWith(baseUrl) && 
                !href.endsWith('/newsroom/') &&
                !href.includes('/newsroom/page/') &&
                !href.includes('/page/') &&
                !href.includes('/category/') &&
                !href.includes('/tag/') &&
                !href.includes('/author/') &&
                !href.includes('/about-us/') &&
                !href.includes('/practice-areas/') &&
                !href.includes('/industries/') &&
                !href.includes('/our-team/') &&
                !href.includes('/contact-us/') &&
                title.length > 10) {
              
              // Check if it's a single post (has slug but not a known page)
              const path = href.replace(baseUrl, '');
              const segments = path.split('/').filter(Boolean);
              
              // Single posts typically have just one segment (the slug)
              if (segments.length === 1 || 
                  (segments.length === 2 && segments[1] === '')) {
                links.add(JSON.stringify({ url: href, title }));
              }
            }
          });
        });
        
        return Array.from(links).map(item => JSON.parse(item));
      });
      
      if (posts.length === 0) {
        console.log(`  ⚠️  No posts found on page ${currentPage}, stopping`);
        hasMorePages = false;
      } else {
        console.log(`  ✓ Found ${posts.length} posts on page ${currentPage}`);
        allPosts.push(...posts);
        currentPage++;
        
        // Limit to reasonable number of pages
        if (currentPage > 20) {
          console.log(`  ⚠️  Reached page limit (20), stopping`);
          hasMorePages = false;
        }
        
        // Wait a bit between pages
        await page.waitForTimeout(1000);
      }
      
    } catch (error) {
      console.log(`  ✗ Error on page ${currentPage}: ${error.message}`);
      hasMorePages = false;
    }
  }
  
  // Remove duplicates by URL
  const uniquePosts = Array.from(
    new Map(allPosts.map(p => [p.url, p])).values()
  );
  
  console.log(`\n  📊 Total unique blog posts found: ${uniquePosts.length}\n`);
  
  return uniquePosts;
}

/**
 * Scrape individual blog post
 */
async function scrapeBlogPost(page, url, title) {
  console.log(`  Scraping: ${title}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    const post = await page.evaluate(() => {
      const cleanText = (text) => text?.trim().replace(/\s+/g, ' ') || '';
      
      // Get title from h1 in header or article
      const titleElement = document.querySelector('.et_pb_fullwidth_header h1, article h1, .entry-title, h1.et_pb_module_header');
      const title = cleanText(titleElement?.textContent || document.title.split('|')[0].split('-')[0]);
      
      // Get author from subhead or byline
      const authorElement = document.querySelector('.et_pb_fullwidth_header_subhead, .author a, .entry-author a, [rel="author"]');
      let author = cleanText(authorElement?.textContent || '');
      // Clean up "By: Name - Attorney" format
      author = author.replace(/^By:\s*/i, '').replace(/\s*-\s*Attorney.*$/i, '').trim();
      
      // Get date from post meta
      const dateElement = document.querySelector('time, .entry-date, .published, .post-meta .published');
      const date = dateElement?.getAttribute('datetime') || 
                   cleanText(dateElement?.textContent) || '';
      
      // Get categories from body class
      const bodyClasses = document.body.className;
      const categories = [];
      const categoryMatches = bodyClasses.match(/category-([a-z0-9-]+)/g);
      if (categoryMatches) {
        categoryMatches.forEach(match => {
          const catName = match.replace('category-', '').replace(/-/g, ' ');
          // Filter out generic categories
          if (!catName.includes('blog') && !catName.includes('post') && catName.length > 2) {
            const formatted = catName.split(' ').map(w => 
              w.charAt(0).toUpperCase() + w.slice(1)
            ).join(' ');
            if (!categories.includes(formatted)) {
              categories.push(formatted);
            }
          }
        });
      }
      
      // Get tags from body class
      const tags = [];
      const tagMatches = bodyClasses.match(/tag-([a-z0-9-]+)/g);
      if (tagMatches) {
        tagMatches.forEach(match => {
          const tagName = match.replace('tag-', '').replace(/-/g, ' ');
          const formatted = tagName.split(' ').map(w => 
            w.charAt(0).toUpperCase() + w.slice(1)
          ).join(' ');
          if (!tags.includes(formatted) && !categories.includes(formatted)) {
            tags.push(formatted);
          }
        });
      }
      
      // Get featured image from header or article
      const featuredImg = document.querySelector('.et_pb_fullwidth_header, article img, .wp-post-image, img[fetchpriority="high"]');
      let image = '';
      if (featuredImg) {
        if (featuredImg.tagName === 'SECTION') {
          // Extract from background-image style
          const bgImage = window.getComputedStyle(featuredImg).backgroundImage;
          const match = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
          if (match) image = match[1];
        } else {
          image = featuredImg.src || '';
        }
      }
      
      // Get excerpt from first paragraph
      const firstPara = document.querySelector('.et_pb_text_inner p, article .entry-content p');
      const excerpt = cleanText(firstPara?.textContent || '').substring(0, 200);
      
      // Get content from .et_pb_text_inner
      const contentArea = document.querySelector('.et_pb_text_inner, article .entry-content');
      
      if (!contentArea) {
        return { title, date, author, categories, tags, image, excerpt, content: [] };
      }
      
      // Extract content paragraphs
      const content = [];
      const elements = contentArea.querySelectorAll('p, h2, h3, h4, ul, ol, blockquote, hr');
      
      elements.forEach(el => {
        const text = cleanText(el.textContent);
        
        if (el.tagName === 'HR') {
          content.push({ type: 'divider' });
        } else if (text.length > 20) {
          if (el.tagName === 'BLOCKQUOTE') {
            content.push({ type: 'quote', text });
          } else if (['H2', 'H3', 'H4'].includes(el.tagName)) {
            content.push({ type: 'heading', level: el.tagName, text });
          } else if (['UL', 'OL'].includes(el.tagName)) {
            const items = Array.from(el.querySelectorAll('li'))
              .map(li => cleanText(li.textContent))
              .filter(t => t.length > 5);
            if (items.length > 0) {
              content.push({ type: 'list', ordered: el.tagName === 'OL', items });
            }
          } else {
            // Check if paragraph contains links (sources/references)
            const links = Array.from(el.querySelectorAll('a')).map(a => ({
              text: cleanText(a.textContent),
              url: a.href
            }));
            
            content.push({ 
              type: 'paragraph', 
              text,
              links: links.length > 0 ? links : undefined
            });
          }
        }
      });
      
      return {
        title,
        date,
        author,
        categories,
        tags,
        image,
        excerpt,
        content
      };
    });
    
    return post;
    
  } catch (error) {
    console.error(`  ✗ Error scraping "${title}": ${error.message}`);
    return null;
  }
}

/**
 * Main scraping function
 */
async function scrapeBlog() {
  console.log('📰 Starting Blog Scraper...\n');
  console.log('═'.repeat(60));
  
  // Create output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  const blogPosts = [];
  
  try {
    // Get all blog post URLs
    const postUrls = await getBlogPostUrls(page);
    
    if (postUrls.length === 0) {
      console.log('⚠️  No blog posts found. The blog may not exist or structure changed.');
      await browser.close();
      return;
    }
    
    console.log('═'.repeat(60));
    console.log('\n📄 Scraping blog posts...\n');
    
    // Scrape each blog post
    for (let i = 0; i < postUrls.length; i++) {
      const { url, title } = postUrls[i];
      const post = await scrapeBlogPost(page, url, title);
      
      if (post && post.title) {
        blogPosts.push({
          ...post,
          url,
          slug: url.split('/').filter(Boolean).pop()
        });
      }
      
      // Progress indicator
      if ((i + 1) % 10 === 0) {
        console.log(`\n  Progress: ${i + 1}/${postUrls.length} posts scraped\n`);
      }
      
      // Be polite - wait between requests
      await page.waitForTimeout(1000);
    }
    
    // Save results
    const outputFile = path.join(OUTPUT_DIR, 'blog-posts.json');
    await fs.writeFile(outputFile, JSON.stringify(blogPosts, null, 2));
    
    console.log('\n═'.repeat(60));
    console.log('\n✅ Blog scraping complete!');
    console.log(`📁 Results saved to: ${outputFile}`);
    console.log(`\n📊 Statistics:`);
    console.log(`  - Total blog posts scraped: ${blogPosts.length}`);
    console.log(`  - With images: ${blogPosts.filter(p => p.image).length}`);
    console.log(`  - With authors: ${blogPosts.filter(p => p.author).length}`);
    console.log(`  - With categories: ${blogPosts.filter(p => p.categories.length > 0).length}`);
    console.log(`  - With tags: ${blogPosts.filter(p => p.tags.length > 0).length}`);
    
    // Get unique categories
    const allCategories = new Set();
    blogPosts.forEach(post => {
      post.categories.forEach(cat => allCategories.add(cat));
    });
    
    if (allCategories.size > 0) {
      console.log(`\n📂 Categories found: ${Array.from(allCategories).join(', ')}`);
    }
    
    // Get date range
    const dates = blogPosts
      .map(p => p.date)
      .filter(d => d)
      .sort();
    
    if (dates.length > 0) {
      console.log(`\n📅 Date range: ${dates[0]} to ${dates[dates.length - 1]}`);
    }
    
    console.log('\n📝 Next steps:');
    console.log('  1. Review blog-posts.json');
    console.log('  2. Convert to TypeScript format');
    console.log('  3. Download blog images');
    console.log('  4. Add to your blog section\n');
    
  } catch (error) {
    console.error('❌ Scraping failed:', error);
  } finally {
    await browser.close();
  }
}

// Run scraper
scrapeBlog().catch(console.error);
