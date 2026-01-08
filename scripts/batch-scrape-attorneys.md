# Batch Scrape Attorney Bios - Instructions

## What We Have

- ✅ 28 attorney URLs discovered via Firecrawl map
- ✅ Firecrawl MCP configured and working
- ✅ Sample data structure from Donald S. Smith and Ryan L. Leitch

## Recommended Approach

Since I cannot loop through 28 MCP calls efficiently (token limits), here are your options:

### Option 1: Manual Scraping via Windsurf Chat (Recommended)

Ask Windsurf to scrape each attorney one at a time using this prompt template:

```
Use mcp0_firecrawl_scrape to scrape https://rbelaw.com/our-team/attorneys/[SLUG] 
with formats=["markdown"] and onlyMainContent=true, 
then save the structured data to scripts/output/attorney-bios/[NAME].json
```

Repeat for each attorney URL from the list below.

### Option 2: Use Firecrawl CLI Directly

If you have Firecrawl CLI installed, you can batch scrape with:

```bash
# Install if needed
npm install -g firecrawl

# Scrape all attorneys
firecrawl scrape https://rbelaw.com/our-team/attorneys/ryan-l-leitch --formats markdown --only-main-content
# ... repeat for each URL
```

### Option 3: Create a Node Script

Create a script that uses the Firecrawl SDK directly:

```typescript
import Firecrawl from '@mendable/firecrawl-js'
import fs from 'fs/promises'

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY })

const urls = [
  'https://rbelaw.com/our-team/attorneys/ryan-l-leitch',
  // ... all 28 URLs
]

for (const url of urls) {
  const result = await app.scrapeUrl(url, { formats: ['markdown'] })
  const slug = url.split('/').pop()
  await fs.writeFile(`scripts/output/attorney-bios/${slug}.json`, JSON.stringify(result, null, 2))
  console.log(`✓ Scraped ${slug}`)
}
```

## All 28 Attorney URLs

1. https://rbelaw.com/our-team/attorneys/ryan-l-leitch
2. https://rbelaw.com/our-team/attorneys/jaclyn-m-flint
3. https://rbelaw.com/our-team/attorneys/lindsay-a-llewellyn
4. https://rbelaw.com/our-team/attorneys/patrick-s-mccarney
5. https://rbelaw.com/our-team/attorneys/kevin-n-tharp
6. https://rbelaw.com/our-team/attorneys/john-l-egloff
7. https://rbelaw.com/our-team/attorneys/katie-r-osborne
8. https://rbelaw.com/our-team/attorneys/travis-r-watson
9. https://rbelaw.com/our-team/attorneys/courtney-david-mills
10. https://rbelaw.com/our-team/attorneys/katie-s-riles
11. https://rbelaw.com/our-team/attorneys/laura-k-binford
12. https://rbelaw.com/our-team/attorneys/raymond-t-seach
13. https://rbelaw.com/our-team/attorneys/james-w-riley-jr
14. https://rbelaw.com/our-team/attorneys/kathleen-hart
15. https://rbelaw.com/our-team/attorneys/jeffrey-b-fecht
16. https://rbelaw.com/our-team/attorneys/laura-s-reed
17. https://rbelaw.com/our-team/attorneys/k-douglas-cook
18. https://rbelaw.com/our-team/attorneys/beau-browning
19. https://rbelaw.com/our-team/attorneys/anna-marvin
20. https://rbelaw.com/our-team/attorneys/blair-r-vandivier
21. https://rbelaw.com/our-team/attorneys/anthony-r-jost
22. https://rbelaw.com/our-team/attorneys/megan-s-young
23. https://rbelaw.com/our-team/attorneys/timothy-h-button
24. https://rbelaw.com/our-team/attorneys/eric-m-hylton
25. https://rbelaw.com/our-team/attorneys/justin-o-sorrell
26. https://rbelaw.com/our-team/attorneys/donald-s-smith ✅ (already scraped)
27. https://rbelaw.com/our-team/attorneys/sarah-macgill-marr
28. https://rbelaw.com/our-team/attorneys/j-t-wynne

## Next Steps After Scraping

Once you have all 28 JSON files:

1. **Transform data** - Parse markdown into structured fields
2. **Update attorney-helpers.ts** - Populate with complete data
3. **Build enhanced bio pages** - Create React components with tabs/accordions
4. **Download headshots** - Optimize and save to public/assets/attorneys/
5. **Cross-link** - Wire practice areas ↔ industries ↔ attorney bios

## Current Progress

- ✅ Donald S. Smith - Complete structured data saved
- ✅ Ryan L. Leitch - Scraped (needs JSON transformation)
- ⏳ 26 remaining attorneys

Would you like me to:
- Create the Node.js batch scraping script (Option 3)?
- Continue scraping one-by-one through chat?
- Provide a different automation approach?
