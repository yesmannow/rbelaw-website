/**
 * RBE Attorney Profile Scraper
 * Specifically designed to scrape attorney profiles from rbelaw.com
 * 
 * Usage: node scripts/scrape-attorneys.js
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
 * Scrape individual attorney profile
 */
async function scrapeAttorneyProfile(page, url, name) {
  console.log(`  Scraping: ${name}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    const profile = await page.evaluate(() => {
      const cleanText = (text) => text?.trim().replace(/\s+/g, ' ') || '';
      
      // Get name from h1 or title
      const name = cleanText(
        document.querySelector('h1')?.textContent ||
        document.querySelector('.attorney-name')?.textContent ||
        document.title.split('|')[0]
      );
      
      // Get title/position
      const titleElement = document.querySelector('.attorney-title, .position, h2');
      const title = cleanText(titleElement?.textContent || 'Attorney');
      
      // Get contact info
      const emailLink = document.querySelector('a[href^="mailto:"]');
      const email = emailLink?.href.replace('mailto:', '') || '';
      
      const phoneLink = document.querySelector('a[href^="tel:"]');
      const phone = cleanText(phoneLink?.textContent || '');
      
      // Get image - prioritize high-quality header images
      let image = '';
      
      // Try to find the main attorney photo (usually the first large image)
      const imgSelectors = [
        'img[fetchpriority="high"]', // High priority images (usually header)
        'img.wp-image-87094, img.wp-image-87093, img.wp-image-87092', // Specific attorney images
        'article img[width="802"]', // Large header images
        'article img[width="800"]',
        '.attorney-photo img',
        '.wp-post-image',
        'article img:first-of-type', // First image in article
        'img[alt*="Attorney"]',
        'img[alt*="Riley Bennett Egloff"]'
      ];
      
      for (const selector of imgSelectors) {
        const img = document.querySelector(selector);
        if (img?.src && img.src.includes('wp-content/uploads')) {
          // Get the highest quality version (not thumbnails)
          const src = img.src;
          // Remove size suffixes like -480x479.png
          image = src.replace(/-\d+x\d+\.(png|jpg|jpeg|webp)$/i, '.$1');
          break;
        }
      }
      
      // Fallback to any image if nothing found
      if (!image) {
        const anyImg = document.querySelector('article img');
        image = anyImg?.src || '';
      }
      
      // Get bio content - look for main content area
      const contentArea = document.querySelector('article, .entry-content, .attorney-bio, main');
      
      if (!contentArea) {
        return { name, title, email, phone, image, bio: [], practiceAreas: [], education: [], barAdmissions: [] };
      }
      
      // Extract all paragraphs and headings
      const bioSections = [];
      const elements = contentArea.querySelectorAll('h2, h3, h4, p, ul, ol');
      
      let currentSection = null;
      
      elements.forEach(el => {
        if (['H2', 'H3', 'H4'].includes(el.tagName)) {
          // Save previous section
          if (currentSection && currentSection.content.length > 0) {
            bioSections.push(currentSection);
          }
          // Start new section
          currentSection = {
            heading: cleanText(el.textContent),
            content: []
          };
        } else if (el.tagName === 'P') {
          const text = cleanText(el.textContent);
          if (text.length > 20 && currentSection) {
            currentSection.content.push(text);
          } else if (text.length > 20 && !currentSection) {
            // Paragraph before any heading - add to intro
            if (!bioSections.find(s => s.heading === 'Overview')) {
              bioSections.push({ heading: 'Overview', content: [text] });
            }
          }
        } else if (['UL', 'OL'].includes(el.tagName)) {
          const items = Array.from(el.querySelectorAll('li'))
            .map(li => cleanText(li.textContent))
            .filter(text => text.length > 5);
          if (items.length > 0 && currentSection) {
            currentSection.content.push({ type: 'list', items });
          }
        }
      });
      
      // Save last section
      if (currentSection && currentSection.content.length > 0) {
        bioSections.push(currentSection);
      }
      
      // Extract practice areas from links or lists
      const practiceAreas = [];
      const practiceLinks = contentArea.querySelectorAll('a[href*="practice-areas"]');
      practiceLinks.forEach(link => {
        const area = cleanText(link.textContent);
        if (area.length > 3 && !practiceAreas.includes(area)) {
          practiceAreas.push(area);
        }
      });
      
      // If no practice areas found in links, look for "Practice Areas" section
      const practiceSection = bioSections.find(s => 
        s.heading.toLowerCase().includes('practice') || 
        s.heading.toLowerCase().includes('areas')
      );
      if (practiceSection && practiceAreas.length === 0) {
        practiceSection.content.forEach(item => {
          if (item.type === 'list') {
            practiceAreas.push(...item.items);
          }
        });
      }
      
      // Extract education
      const educationSection = bioSections.find(s => 
        s.heading.toLowerCase().includes('education')
      );
      const education = [];
      if (educationSection) {
        educationSection.content.forEach(item => {
          if (typeof item === 'string') {
            education.push(item);
          } else if (item.type === 'list') {
            education.push(...item.items);
          }
        });
      }
      
      // Extract bar admissions
      const barSection = bioSections.find(s => 
        s.heading.toLowerCase().includes('admission') ||
        s.heading.toLowerCase().includes('bar') ||
        s.heading.toLowerCase().includes('license')
      );
      const barAdmissions = [];
      if (barSection) {
        barSection.content.forEach(item => {
          if (typeof item === 'string') {
            barAdmissions.push(item);
          } else if (item.type === 'list') {
            barAdmissions.push(...item.items);
          }
        });
      }
      
      return {
        name,
        title,
        email,
        phone,
        image,
        bio: bioSections,
        practiceAreas,
        education,
        barAdmissions
      };
    });
    
    return profile;
  } catch (error) {
    console.error(`  ✗ Error scraping ${name}:`, error.message);
    return null;
  }
}

/**
 * Get all attorney profile URLs
 */
async function getAttorneyUrls(page) {
  console.log('🔍 Finding attorney profile URLs...');
  
  await page.goto(BASE_URL + '/our-team/attorneys/', { waitUntil: 'networkidle' });
  
  const attorneyData = await page.evaluate(() => {
    const attorneys = [];
    
    // Look for attorney cards/links
    const selectors = [
      'a[href*="/our-team/attorneys/"]',
      '.attorney-card a',
      '.team-member a',
      'article a',
      '.et_pb_team_member a'
    ];
    
    const links = new Set();
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(link => {
        const href = link.href;
        const text = link.textContent.trim();
        
        // IMPORTANT: Exclude /category/ URLs (those are blog pages, not bios)
        // Only include /our-team/attorneys/[name]/ URLs
        if (href.includes('/our-team/attorneys/') && 
            !href.includes('/category/') &&
            !href.endsWith('/attorneys/') &&
            !href.includes('#') &&
            text.length > 3) {
          links.add(JSON.stringify({ url: href, name: text }));
        }
      });
    });
    
    return Array.from(links).map(item => JSON.parse(item));
  });
  
  // Remove duplicates by URL
  const uniqueAttorneys = Array.from(
    new Map(attorneyData.map(a => [a.url, a])).values()
  );
  
  console.log(`  Found ${uniqueAttorneys.length} attorney profiles\n`);
  
  return uniqueAttorneys;
}

/**
 * Main scraping function
 */
async function scrapeAttorneys() {
  console.log('👥 Starting Attorney Profile Scraper...\n');
  
  // Create output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  const attorneys = [];
  
  try {
    // Get all attorney URLs
    const attorneyUrls = await getAttorneyUrls(page);
    
    if (attorneyUrls.length === 0) {
      console.log('⚠️  No attorney profiles found. The page structure may have changed.');
      console.log('   Trying alternative method...\n');
      
      // Alternative: Try direct URLs from known attorney names
      // Based on the pattern: /our-team/attorneys/[first-middle-last]/
      const knownAttorneys = [
        'john-c-egloff', 'james-w-riley-jr', 'laura-j-binford', 'katie-r-osborne',
        'courtney-david-mills', 'donald-s-smith', 'kevin-d-tharp', 'jeffrey-a-fecht',
        'eric-m-hylton', 'jaclyn-m-flint', 'patrick-j-mccarney', 'ryan-m-leitch',
        'travis-e-watson', 'katie-s-riles', 'justin-w-sorrell', 'anthony-r-jost',
        'kathleen-a-hart', 'raymond-e-seach', 'blair-a-vandivier', 'douglas-r-cook',
        'lindsay-a-llewellyn', 'sarah-macgill-marr', 'timothy-d-button',
        'beau-d-browning', 'anna-k-marvin', 'megan-s-young', 'j-t-wynne',
        'robert-j-brandt', 'bryce-a-bennett', 'laura-e-reed'
      ];
      
      for (const slug of knownAttorneys) {
        const url = `${BASE_URL}/our-team/attorneys/${slug}/`;
        const profile = await scrapeAttorneyProfile(page, url, slug);
        if (profile && profile.name) {
          attorneys.push(profile);
        }
        await page.waitForTimeout(1000);
      }
    } else {
      // Scrape each attorney profile
      console.log('📄 Scraping attorney profiles...\n');
      
      for (const attorney of attorneyUrls) {
        const profile = await scrapeAttorneyProfile(page, attorney.url, attorney.name);
        if (profile && profile.name) {
          attorneys.push(profile);
        }
        await page.waitForTimeout(1000); // Be polite
      }
    }
    
    // Save results
    const outputFile = path.join(OUTPUT_DIR, 'attorneys.json');
    await fs.writeFile(outputFile, JSON.stringify(attorneys, null, 2));
    
    console.log('\n✅ Attorney scraping complete!');
    console.log(`📁 Results saved to: ${outputFile}`);
    console.log(`\n📊 Statistics:`);
    console.log(`  - Total attorneys scraped: ${attorneys.length}`);
    console.log(`  - With email: ${attorneys.filter(a => a.email).length}`);
    console.log(`  - With phone: ${attorneys.filter(a => a.phone).length}`);
    console.log(`  - With practice areas: ${attorneys.filter(a => a.practiceAreas.length > 0).length}`);
    console.log(`  - With education: ${attorneys.filter(a => a.education.length > 0).length}`);
    
  } catch (error) {
    console.error('❌ Scraping failed:', error);
  } finally {
    await browser.close();
  }
}

// Run scraper
scrapeAttorneys().catch(console.error);
