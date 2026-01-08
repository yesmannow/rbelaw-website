/**
 * Scrape attorney bios from rbelaw.com using Firecrawl MCP
 * Run with: tsx scripts/scrape-attorney-bios.ts
 */

const attorneyUrls = [
  'https://rbelaw.com/our-team/attorneys/ryan-l-leitch',
  'https://rbelaw.com/our-team/attorneys/jaclyn-m-flint',
  'https://rbelaw.com/our-team/attorneys/lindsay-a-llewellyn',
  'https://rbelaw.com/our-team/attorneys/patrick-s-mccarney',
  'https://rbelaw.com/our-team/attorneys/kevin-n-tharp',
  'https://rbelaw.com/our-team/attorneys/john-l-egloff',
  'https://rbelaw.com/our-team/attorneys/katie-r-osborne',
  'https://rbelaw.com/our-team/attorneys/travis-r-watson',
  'https://rbelaw.com/our-team/attorneys/courtney-david-mills',
  'https://rbelaw.com/our-team/attorneys/katie-s-riles',
  'https://rbelaw.com/our-team/attorneys/laura-k-binford',
  'https://rbelaw.com/our-team/attorneys/raymond-t-seach',
  'https://rbelaw.com/our-team/attorneys/james-w-riley-jr',
  'https://rbelaw.com/our-team/attorneys/kathleen-hart',
  'https://rbelaw.com/our-team/attorneys/jeffrey-b-fecht',
  'https://rbelaw.com/our-team/attorneys/laura-s-reed',
  'https://rbelaw.com/our-team/attorneys/k-douglas-cook',
  'https://rbelaw.com/our-team/attorneys/beau-browning',
  'https://rbelaw.com/our-team/attorneys/anna-marvin',
  'https://rbelaw.com/our-team/attorneys/blair-r-vandivier',
  'https://rbelaw.com/our-team/attorneys/anthony-r-jost',
  'https://rbelaw.com/our-team/attorneys/megan-s-young',
  'https://rbelaw.com/our-team/attorneys/timothy-h-button',
  'https://rbelaw.com/our-team/attorneys/eric-m-hylton',
  'https://rbelaw.com/our-team/attorneys/justin-o-sorrell',
  'https://rbelaw.com/our-team/attorneys/donald-s-smith',
  'https://rbelaw.com/our-team/attorneys/sarah-macgill-marr',
  'https://rbelaw.com/our-team/attorneys/j-t-wynne',
]

console.log(`Found ${attorneyUrls.length} attorney URLs to scrape`)
console.log('Use Firecrawl MCP tools to scrape these URLs:')
console.log('- mcp0_firecrawl_scrape for individual pages')
console.log('- Or use mcp0_firecrawl_extract with a schema for structured data')
console.log('\nURLs:')
attorneyUrls.forEach((url, i) => console.log(`${i + 1}. ${url}`))
