/**
 * RBE Website Content Scraper
 * Extracts content from old WordPress site and converts to structured data
 * 
 * Usage: node scripts/scrape-old-site.js
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = 'https://rbelaw.com';
const OUTPUT_DIR = path.join(__dirname, '../scraped-content');

// Pages to scrape
const PAGES_TO_SCRAPE = {
  practiceAreas: [
    '/practice-areas/bankruptcy-reorganization/',
    '/practice-areas/business-corporate-law/',
    '/practice-areas/business-litigation/',
    '/practice-areas/commercial-litigation/',
    '/practice-areas/construction/',
    '/practice-areas/family-law/',
    '/practice-areas/government-law/',
    '/practice-areas/health-care/',
    '/practice-areas/insurance/',
    '/practice-areas/intellectual-property-law-litigation/',
    '/practice-areas/labor-employment-law/',
    '/practice-areas/real-estate-land-use-zoning/',
    '/practice-areas/wills-trusts-estates/',
  ],
  attorneys: [
    '/our-team/attorneys/',
  ],
  about: [
    '/about-us/',
    '/about-us/firm-history/',
    '/about-us/in-the-community/',
    '/about-us/careers/',
    '/about-us/fee-arrangements/',
  ],
  industries: [
    '/industries/construction/',
    '/industries/finance/',
    '/industries/food-beverage-service/',
    '/industries/government/',
    '/industries/health-care/',
    '/industries/insurance/',
    '/industries/manufacturing/',
    '/industries/media/',
    '/industries/non-profit-organizations/',
    '/industries/real-estate/',
    '/industries/sports-entertainment/',
    '/industries/technology/',
    '/industries/telecommunications/',
    '/industries/transportation/',
    '/industries/wholesale-retail-service/',
  ],
  newsroom: [
    '/newsroom/',
  ]
};

/**
 * Extract main content from a page
 */
async function scrapePage(page, url) {
  console.log(`Scraping: ${url}`);
  
  try {
    await page.goto(BASE_URL + url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for content to load
    await page.waitForSelector('article, main, .entry-content', { timeout: 10000 });
    
    // Extract content
    const content = await page.evaluate(() => {
      // Helper function to clean text
      const cleanText = (text) => text?.trim().replace(/\s+/g, ' ') || '';
      
      // Get main content area
      const mainContent = document.querySelector('article, main, .entry-content, .post-content');
      
      if (!mainContent) return null;
      
      // Extract title
      const title = cleanText(
        document.querySelector('h1')?.textContent ||
        document.querySelector('.entry-title')?.textContent ||
        document.querySelector('.page-title')?.textContent ||
        document.title
      );
      
      // Extract meta description
      const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
      
      // Extract headings and paragraphs
      const sections = [];
      const headings = mainContent.querySelectorAll('h2, h3, h4');
      
      headings.forEach((heading) => {
        const headingText = cleanText(heading.textContent);
        const content = [];
        
        // Get content until next heading
        let sibling = heading.nextElementSibling;
        while (sibling && !['H2', 'H3', 'H4'].includes(sibling.tagName)) {
          if (sibling.tagName === 'P') {
            const text = cleanText(sibling.textContent);
            if (text.length > 20) {
              content.push(text);
            }
          } else if (sibling.tagName === 'UL' || sibling.tagName === 'OL') {
            const items = Array.from(sibling.querySelectorAll('li'))
              .map(li => cleanText(li.textContent))
              .filter(text => text.length > 10);
            if (items.length > 0) {
              content.push({ type: 'list', items });
            }
          }
          sibling = sibling.nextElementSibling;
        }
        
        if (content.length > 0) {
          sections.push({
            heading: headingText,
            level: heading.tagName.toLowerCase(),
            content
          });
        }
      });
      
      // Extract any paragraphs before first heading
      const introParagraphs = [];
      const firstHeading = mainContent.querySelector('h2, h3');
      if (firstHeading) {
        let sibling = mainContent.firstElementChild;
        while (sibling && sibling !== firstHeading) {
          if (sibling.tagName === 'P') {
            const text = cleanText(sibling.textContent);
            if (text.length > 20) {
              introParagraphs.push(text);
            }
          }
          sibling = sibling.nextElementSibling;
        }
      }
      
      // Extract images
      const images = Array.from(mainContent.querySelectorAll('img'))
        .map(img => ({
          src: img.src,
          alt: img.alt || '',
          title: img.title || ''
        }))
        .filter(img => !img.src.includes('24x24')); // Filter out small icons
      
      return {
        title,
        metaDescription: metaDesc,
        introduction: introParagraphs,
        sections,
        images
      };
    });
    
    return content;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

/**
 * Scrape attorney profiles
 */
async function scrapeAttorneys(page) {
  console.log('Scraping attorney profiles...');
  
  await page.goto(BASE_URL + '/our-team/attorneys/', { waitUntil: 'networkidle' });
  
  // Get all attorney links
  const attorneyLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/our-team/attorneys/"]'));
    return links
      .map(link => link.href)
      .filter(href => href.includes('/our-team/attorneys/') && !href.endsWith('/attorneys/'))
      .filter((href, index, self) => self.indexOf(href) === index); // Unique
  });
  
  console.log(`Found ${attorneyLinks.length} attorney profiles`);
  
  const attorneys = [];
  
  for (const link of attorneyLinks.slice(0, 5)) { // Limit for testing
    try {
      await page.goto(link, { waitUntil: 'networkidle' });
      
      const profile = await page.evaluate(() => {
        const cleanText = (text) => text?.trim().replace(/\s+/g, ' ') || '';
        
        const name = cleanText(document.querySelector('h1')?.textContent || '');
        const title = cleanText(document.querySelector('.attorney-title, .position')?.textContent || '');
        
        // Extract bio sections
        const bioSections = [];
        const content = document.querySelector('article, main, .entry-content');
        
        if (content) {
          const headings = content.querySelectorAll('h2, h3');
          headings.forEach(heading => {
            const headingText = cleanText(heading.textContent);
            const paragraphs = [];
            
            let sibling = heading.nextElementSibling;
            while (sibling && !['H2', 'H3'].includes(sibling.tagName)) {
              if (sibling.tagName === 'P') {
                const text = cleanText(sibling.textContent);
                if (text.length > 20) {
                  paragraphs.push(text);
                }
              }
              sibling = sibling.nextElementSibling;
            }
            
            if (paragraphs.length > 0) {
              bioSections.push({ heading: headingText, content: paragraphs });
            }
          });
        }
        
        // Extract contact info
        const email = document.querySelector('a[href^="mailto:"]')?.href.replace('mailto:', '') || '';
        const phone = cleanText(document.querySelector('a[href^="tel:"]')?.textContent || '');
        
        // Extract practice areas
        const practiceAreas = Array.from(document.querySelectorAll('.practice-area, .practice-areas li'))
          .map(el => cleanText(el.textContent))
          .filter(text => text.length > 0);
        
        return {
          name,
          title,
          email,
          phone,
          practiceAreas,
          bio: bioSections
        };
      });
      
      attorneys.push(profile);
      console.log(`  ✓ Scraped: ${profile.name}`);
      
    } catch (error) {
      console.error(`  ✗ Error scraping ${link}:`, error.message);
    }
  }
  
  return attorneys;
}

/**
 * Main scraping function
 */
async function scrapeWebsite() {
  console.log('🚀 Starting RBE website scraper...\n');
  
  // Create output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  const results = {
    practiceAreas: {},
    attorneys: [],
    about: {},
    industries: {},
    timestamp: new Date().toISOString()
  };
  
  try {
    // Scrape practice areas
    console.log('\n📂 Scraping Practice Areas...');
    for (const url of PAGES_TO_SCRAPE.practiceAreas) {
      const content = await scrapePage(page, url);
      if (content) {
        const slug = url.split('/').filter(Boolean).pop();
        results.practiceAreas[slug] = content;
      }
      await page.waitForTimeout(1000); // Be polite
    }
    
    // Scrape attorneys
    console.log('\n👥 Scraping Attorneys...');
    results.attorneys = await scrapeAttorneys(page);
    
    // Scrape about pages
    console.log('\n📄 Scraping About Pages...');
    for (const url of PAGES_TO_SCRAPE.about) {
      const content = await scrapePage(page, url);
      if (content) {
        const slug = url.split('/').filter(Boolean).pop() || 'about';
        results.about[slug] = content;
      }
      await page.waitForTimeout(1000);
    }
    
    // Scrape industries
    console.log('\n🏭 Scraping Industries...');
    for (const url of PAGES_TO_SCRAPE.industries) {
      const content = await scrapePage(page, url);
      if (content) {
        const slug = url.split('/').filter(Boolean).pop();
        results.industries[slug] = content;
      }
      await page.waitForTimeout(1000);
    }
    
    // Save results
    const outputFile = path.join(OUTPUT_DIR, 'scraped-content.json');
    await fs.writeFile(outputFile, JSON.stringify(results, null, 2));
    
    console.log('\n✅ Scraping complete!');
    console.log(`📁 Results saved to: ${outputFile}`);
    console.log(`\nStatistics:`);
    console.log(`  - Practice Areas: ${Object.keys(results.practiceAreas).length}`);
    console.log(`  - Attorneys: ${results.attorneys.length}`);
    console.log(`  - About Pages: ${Object.keys(results.about).length}`);
    console.log(`  - Industries: ${Object.keys(results.industries).length}`);
    
  } catch (error) {
    console.error('❌ Scraping failed:', error);
  } finally {
    await browser.close();
  }
}

// Run scraper
scrapeWebsite().catch(console.error);
