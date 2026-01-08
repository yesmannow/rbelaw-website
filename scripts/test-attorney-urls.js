/**
 * Test Attorney URL Patterns
 * Quick test to verify attorney URLs are accessible
 * 
 * Usage: node scripts/test-attorney-urls.js
 */

import { chromium } from 'playwright';

const BASE_URL = 'https://rbelaw.com';

const TEST_URLS = [
  '/our-team/attorneys/katie-r-osborne/',
  '/our-team/attorneys/katie-s-riles/',
  '/our-team/attorneys/john-c-egloff/',
  '/our-team/attorneys/james-w-riley-jr/',
  '/our-team/attorneys/laura-j-binford/'
];

async function testUrls() {
  console.log('🔍 Testing attorney URL patterns...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  for (const url of TEST_URLS) {
    try {
      const fullUrl = BASE_URL + url;
      const response = await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
      
      if (response.status() === 200) {
        const title = await page.title();
        console.log(`✓ ${url}`);
        console.log(`  Title: ${title}\n`);
      } else {
        console.log(`✗ ${url} - Status: ${response.status()}\n`);
      }
    } catch (error) {
      console.log(`✗ ${url} - Error: ${error.message}\n`);
    }
  }
  
  await browser.close();
  console.log('✅ URL test complete!');
}

testUrls().catch(console.error);
