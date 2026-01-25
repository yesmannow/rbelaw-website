# 🚀 Quick Start: Content Migration

## One-Command Migration

```bash
# Install Playwright (one-time setup)
npm install playwright
npx playwright install chromium

# Run complete migration
npm run migrate-content
```

This will:
1. ✅ Scrape all content from rbelaw.com
2. ✅ Convert to TypeScript data files
3. ✅ Generate migration report

---

## Step-by-Step (If You Prefer)

### Step 1: Scrape Old Site
```bash
npm run scrape-site
```

**Output:** `scraped-content/scraped-content.json`

**What it scrapes:**
- 13 Practice Area pages
- 27+ Attorney profiles
- 15 Industry pages
- 5 About pages

**Time:** ~10-15 minutes

---

### Step 2: Convert to TypeScript
```bash
npm run convert-content
```

**Output:**
- `src/lib/data/practiceAreas-scraped.ts`
- `src/lib/data/attorneys-scraped.ts`
- `src/lib/data/industries-scraped.ts`
- `src/lib/data/about-scraped.ts`
- `MIGRATION_REPORT.md`

**Time:** ~30 seconds

---

### Step 3: Review & Merge

1. **Check the migration report:**
   ```bash
   cat MIGRATION_REPORT.md
   ```

2. **Review generated files:**
   ```bash
   # View practice areas
   cat src/lib/data/practiceAreas-scraped.ts
   
   # View attorneys
   cat src/lib/data/attorneys-scraped.ts
   ```

3. **Merge with existing data:**
   - Copy content from `-scraped.ts` files
   - Paste into your main data files
   - Update icons, images, and metadata

---

## What Gets Scraped

### Practice Areas ✅
- Page title
- Meta description
- Introduction paragraphs
- All sections with headings
- Key services (from lists)
- Images

### Attorneys ✅
- Name and title
- Email and phone
- Practice areas
- Bio sections (overview, education, bar admissions)
- All content paragraphs

### Industries ✅
- Page title and description
- Overview content
- Key challenges
- All sections
- Images

### About Pages ✅
- Firm history
- Community engagement
- Careers information
- Fee arrangements
- All content sections

---

## After Migration

### Manual Updates Needed:

**Practice Areas:**
- [ ] Update icons (currently set to 'Scale')
- [ ] Add related tools
- [ ] Verify key services
- [ ] Add FAQ sections

**Attorneys:**
- [ ] Verify photo paths (use attorneyPhotoMapping.ts)
- [ ] Add representative matters
- [ ] Add awards and recognition
- [ ] Add publications

**Industries:**
- [ ] Update icons (currently set to 'Building2')
- [ ] Add related practice areas
- [ ] Verify key challenges

---

## Testing

```bash
# Start dev server
npm run dev

# Check pages:
# - http://localhost:5173/practice-areas/construction
# - http://localhost:5173/attorneys
# - http://localhost:5173/industries/construction
# - http://localhost:5173/about
```

---

## Troubleshooting

### "Playwright not found"
```bash
npm install playwright
npx playwright install chromium
```

### "scraped-content.json not found"
```bash
# Run scraper first
npm run scrape-site
```

### "Permission denied"
```bash
# On Windows, run as administrator
# Or check file permissions
```

---

## Files Created

```
rbelaw-website/
├── scraped-content/
│   └── scraped-content.json          # Raw scraped data
├── src/lib/data/
│   ├── practiceAreas-scraped.ts      # Converted practice areas
│   ├── attorneys-scraped.ts          # Converted attorneys
│   ├── industries-scraped.ts         # Converted industries
│   └── about-scraped.ts              # Converted about pages
└── MIGRATION_REPORT.md               # Summary report
```

---

## Need Help?

See **CONTENT_MIGRATION_GUIDE.md** for:
- Detailed strategy
- Alternative tools (Firecrawl, Crawl4AI, etc.)
- Manual enhancement tips
- SEO considerations
- Timeline estimates

---

## Quick Commands Reference

```bash
# Full migration (scrape + convert)
npm run migrate-content

# Just scrape
npm run scrape-site

# Just convert
npm run convert-content

# Start dev server
npm run dev

# Build for production
npm run build
```

---

**Ready?** Run: `npm run migrate-content`

Then review `MIGRATION_REPORT.md` for next steps! 🎉
