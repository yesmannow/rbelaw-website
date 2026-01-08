# 🔄 Content Migration Strategy - Old Site to New Build

## 📊 Current Situation

**Old Site:** https://rbelaw.com (WordPress/Divi)
**New Site:** React 19 + TypeScript + Vite

**Content to Migrate:**
- ✅ 13 Practice Areas
- ✅ 27+ Attorney Profiles
- ✅ 15 Industry Pages
- ✅ 5 About Pages
- ✅ 50+ Newsroom Articles
- ✅ Images and Assets

---

## 🎯 Recommended Strategy

### **Phase 1: Automated Scraping (Recommended)**

Use the custom Playwright script I created for you:

```bash
# Install dependencies
npm install playwright

# Run the scraper
node scripts/scrape-old-site.js
```

**What it does:**
- ✅ Scrapes all practice area pages
- ✅ Extracts attorney profiles with bios
- ✅ Gets about pages and firm history
- ✅ Captures industry pages
- ✅ Preserves structure and metadata
- ✅ Outputs clean JSON

**Output:** `scraped-content/scraped-content.json`

---

### **Phase 2: Content Conversion**

Convert scraped JSON to TypeScript data files:

```bash
# Run the converter
node scripts/convert-scraped-data.js
```

**What it creates:**
- `src/lib/data/practiceAreas.ts` (updated)
- `src/lib/data/attorneys.ts` (updated)
- `src/lib/data/industries.ts` (updated)
- `src/lib/data/about.ts` (new)

---

### **Phase 3: Manual Review & Enhancement**

1. **Review generated data files**
2. **Add missing information:**
   - Attorney photos (already mapped)
   - Practice area icons
   - Industry icons
   - Representative matters
   - Awards and recognition
3. **Enhance with new features:**
   - Interactive tools
   - AI summaries
   - Timeline visualizations

---

## 🛠️ Alternative Tools (If Needed)

### **Option 1: Firecrawl (API-based)**

Best for: Clean, structured data extraction

```bash
npm install @mendable/firecrawl-js
```

```javascript
import FirecrawlApp from '@mendable/firecrawl-js';

const app = new FirecrawlApp({ apiKey: 'YOUR_API_KEY' });

// Crawl entire site
const result = await app.crawlUrl('https://rbelaw.com', {
  crawlerOptions: {
    includes: ['practice-areas/*', 'our-team/*'],
    limit: 100
  },
  pageOptions: {
    onlyMainContent: true
  }
});
```

**Pros:**
- Clean Markdown output
- Handles JavaScript
- Structured data
- LLM-ready format

**Cons:**
- Requires API key (paid)
- Rate limits

---

### **Option 2: Crawl4AI (Python)**

Best for: LLM-ready Markdown

```python
from crawl4ai import WebCrawler

crawler = WebCrawler()
result = crawler.run(
    url="https://rbelaw.com/practice-areas/construction/",
    word_count_threshold=10,
    extraction_strategy="LLMExtractionStrategy"
)

print(result.markdown)
```

**Pros:**
- Free and open source
- Excellent Markdown output
- AI-optimized extraction

**Cons:**
- Python (not JavaScript)
- Requires setup

---

### **Option 3: BeautifulSoup + Requests (Python)**

Best for: Simple, custom scraping

```python
import requests
from bs4 import BeautifulSoup

url = "https://rbelaw.com/practice-areas/construction/"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Extract content
title = soup.find('h1').text
content = soup.find('article').text
```

**Pros:**
- Simple and reliable
- Full control
- Free

**Cons:**
- Manual parsing required
- Python-based

---

## 📋 Step-by-Step Migration Process

### **Step 1: Run the Scraper**

```bash
# Install Playwright
npm install playwright
npx playwright install chromium

# Run scraper
node scripts/scrape-old-site.js
```

**Expected output:**
```
🚀 Starting RBE website scraper...

📂 Scraping Practice Areas...
Scraping: /practice-areas/construction/
  ✓ Scraped construction
Scraping: /practice-areas/business-corporate-law/
  ✓ Scraped business-corporate-law
...

👥 Scraping Attorneys...
Found 27 attorney profiles
  ✓ Scraped: John Egloff
  ✓ Scraped: James Riley
...

✅ Scraping complete!
📁 Results saved to: scraped-content/scraped-content.json

Statistics:
  - Practice Areas: 13
  - Attorneys: 27
  - About Pages: 5
  - Industries: 15
```

---

### **Step 2: Review Scraped Data**

```bash
# View the scraped content
cat scraped-content/scraped-content.json | jq
```

**Check for:**
- ✅ All pages scraped
- ✅ Content quality
- ✅ Proper structure
- ✅ No missing sections

---

### **Step 3: Convert to TypeScript**

```bash
# Run converter
node scripts/convert-scraped-data.js
```

**This will:**
1. Read `scraped-content.json`
2. Convert to TypeScript interfaces
3. Update data files in `src/lib/data/`
4. Preserve existing structure

---

### **Step 4: Manual Enhancements**

**For Practice Areas:**
- [ ] Add practice area icons
- [ ] Add related tools
- [ ] Add key services list
- [ ] Add FAQ sections
- [ ] Add case results (if applicable)

**For Attorneys:**
- [ ] Verify photo mappings
- [ ] Add representative matters
- [ ] Add awards and recognition
- [ ] Add publications
- [ ] Add education details
- [ ] Add bar admissions

**For Industries:**
- [ ] Add industry icons
- [ ] Add key challenges
- [ ] Add solutions offered
- [ ] Add case studies

---

### **Step 5: Test & Validate**

```bash
# Start dev server
npm run dev

# Check each page:
# - Practice areas: http://localhost:5173/practice-areas/construction
# - Attorneys: http://localhost:5173/attorneys
# - Industries: http://localhost:5173/industries/construction
# - About: http://localhost:5173/about
```

**Validation checklist:**
- [ ] All content displays correctly
- [ ] No broken links
- [ ] Images load properly
- [ ] SEO meta tags present
- [ ] Mobile responsive
- [ ] Accessibility compliant

---

## 🎨 Content Enhancement Opportunities

### **Practice Area Pages:**
1. **Add Interactive Tools**
   - Link to relevant calculators
   - Add assessment quizzes
   - Include timeline generators

2. **Add Visual Elements**
   - Infographics
   - Process diagrams
   - Success metrics

3. **Add Social Proof**
   - Client testimonials
   - Case results
   - Industry recognition

### **Attorney Profiles:**
1. **Enhanced Bios**
   - Timeline visualization
   - Recognition wall
   - Publications list
   - Representative matters

2. **Interactive Elements**
   - Schedule consultation CTA
   - Download vCard
   - Email contact
   - Social links

3. **Credibility Indicators**
   - Years of experience
   - Cases handled
   - Industries served
   - Success rate

### **Industry Pages:**
1. **Industry-Specific Content**
   - Key challenges
   - Regulatory landscape
   - Best practices
   - Case studies

2. **Related Resources**
   - Relevant tools
   - Industry news
   - Whitepapers
   - Webinars

---

## 📊 Content Mapping

### **Old Site → New Site Structure**

```
Old Site                          New Site
├── /practice-areas/              ├── /practice-areas/
│   ├── construction/             │   ├── construction
│   ├── business-corporate-law/   │   ├── business-law
│   └── ...                       │   └── ...
├── /our-team/attorneys/          ├── /attorneys/
│   ├── john-egloff/              │   ├── john-egloff
│   └── ...                       │   └── ...
├── /industries/                  ├── /industries/
│   ├── construction/             │   ├── construction
│   └── ...                       │   └── ...
├── /about-us/                    ├── /about/
│   ├── firm-history/             │   ├── history
│   ├── in-the-community/         │   ├── community
│   └── ...                       │   └── ...
└── /newsroom/                    └── /newsroom/
    └── articles                      └── articles
```

---

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install playwright

# 2. Install browser
npx playwright install chromium

# 3. Run scraper
node scripts/scrape-old-site.js

# 4. Review output
cat scraped-content/scraped-content.json | jq '.practiceAreas | keys'

# 5. Convert to TypeScript (after I create the converter)
node scripts/convert-scraped-data.js

# 6. Test
npm run dev
```

---

## ⚠️ Important Considerations

### **Legal & Compliance:**
- ✅ You own the content (your website)
- ✅ Scraping your own site is legal
- ✅ Respect robots.txt (if any)
- ✅ Be polite (rate limiting built-in)

### **Data Quality:**
- ⚠️ Review all scraped content
- ⚠️ Some formatting may need adjustment
- ⚠️ Images need manual verification
- ⚠️ Links need updating

### **SEO Considerations:**
- ✅ Preserve URL structure (or use redirects)
- ✅ Keep meta descriptions
- ✅ Maintain heading hierarchy
- ✅ Update internal links

---

## 📈 Expected Timeline

**Automated Scraping:** 10-15 minutes
**Content Review:** 2-4 hours
**Manual Enhancements:** 4-8 hours
**Testing & Validation:** 2-3 hours

**Total:** 1-2 days for complete migration

---

## 🎯 Success Metrics

### **Content Completeness:**
- [ ] 100% of practice areas migrated
- [ ] 100% of attorney profiles migrated
- [ ] 100% of industry pages migrated
- [ ] 100% of about pages migrated
- [ ] 90%+ of newsroom articles migrated

### **Quality Checks:**
- [ ] No broken links
- [ ] All images display
- [ ] Proper formatting
- [ ] SEO meta tags present
- [ ] Mobile responsive

### **Enhancements:**
- [ ] Interactive tools integrated
- [ ] Enhanced attorney bios
- [ ] Modern design applied
- [ ] Improved navigation
- [ ] Better CTAs

---

## 🛠️ Tools Comparison

| Tool | Best For | Pros | Cons | Cost |
|------|----------|------|------|------|
| **Custom Playwright** | Full control | Free, customizable, TypeScript | Manual setup | Free |
| **Firecrawl** | Clean data | LLM-ready, structured | API limits | Paid |
| **Crawl4AI** | Markdown | Free, AI-optimized | Python | Free |
| **BeautifulSoup** | Simple scraping | Easy, reliable | Manual parsing | Free |
| **Scrapy** | Large-scale | Powerful, fast | Complex setup | Free |

**Recommendation:** Start with the custom Playwright script I created. It's tailored to your needs and free.

---

## 📞 Next Steps

1. **Run the scraper** (10 mins)
2. **Review scraped data** (30 mins)
3. **Let me know what you find** - I'll create the converter script
4. **Manual enhancements** (4-8 hours)
5. **Test and deploy** (2-3 hours)

---

**Ready to start?** Run:

```bash
npm install playwright
npx playwright install chromium
node scripts/scrape-old-site.js
```

Then share the output and I'll help you convert it to your new site structure! 🚀
