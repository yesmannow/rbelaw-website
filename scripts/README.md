# Site Analysis & Database Enhancement Scripts

This directory contains scripts for analyzing the rbelaw.com website using Firecrawl and designing enhanced database schemas.

## Prerequisites

1. **Firecrawl API Key** in `.env.local`:
   ```bash
   FIRECRAWL_API_KEY="fc-your-api-key"
   ```

2. **Dependencies installed**:
   ```bash
   npm install
   ```

## Quick Start

Run the complete workflow:

```bash
npx tsx scripts/orchestrate-site-analysis.ts
```

This will:
1. Discover all URLs on rbelaw.com
2. Analyze content structure
3. Generate enhanced database schema design

## Individual Scripts

### 1. Site Discovery

Discovers all URLs on the site using Firecrawl Map and Crawl:

```bash
npx tsx scripts/discover-site-urls.ts
```

**Output:**
- `scripts/output/site-discovery/sitemap.json` - All discovered URLs
- `scripts/output/site-discovery/content-samples.json` - Sample content for analysis
- `scripts/output/site-discovery/DISCOVERY_REPORT.md` - Summary report

### 2. Content Analysis

Analyzes scraped content to identify patterns:

```bash
npx tsx scripts/analyze-content-structure.ts
```

**Output:**
- `scripts/output/content-analysis/analysis-report.json` - Detailed analysis
- `scripts/output/content-analysis/ANALYSIS_REPORT.md` - Summary report

### 3. Schema Design

Generates enhanced database schema design:

```bash
npx tsx scripts/design-enhanced-schema.ts
```

**Output:**
- `scripts/output/schema-design/enhanced-schema.json` - Complete schema design
- `scripts/output/schema-design/migration.sql` - SQL migration script
- `scripts/output/schema-design/SCHEMA_DESIGN.md` - Documentation

## Workflow

```
┌─────────────────────┐
│  Site Discovery    │  →  Discover all URLs
└──────────┬─────────┘
           │
           ▼
┌─────────────────────┐
│ Content Analysis    │  →  Analyze structure
└──────────┬─────────┘
           │
           ▼
┌─────────────────────┐
│  Schema Design      │  →  Generate schema
└─────────────────────┘
```

## Key Features

### Site Discovery
- Uses Firecrawl Map to discover URLs
- Uses Firecrawl Crawl to get content samples
- Categorizes URLs (pages, blog, attorneys, practice areas)
- Generates comprehensive sitemap

### Content Analysis
- Analyzes content structure
- Identifies metadata patterns
- Detects entities (dates, locations)
- Generates schema recommendations

### Schema Design
- Expert-level database optimizations
- Full-text search support
- JSONB metadata storage
- Materialized views for performance
- Enhanced indexes
- Better relationships

## Database Enhancements

The enhanced schema includes:

1. **New Fields**
   - `metadata` (JSONB) - Flexible metadata storage
   - `searchVector` (tsvector) - Full-text search
   - `contentHash` (text) - Change detection
   - `lastScrapedAt` (timestamp) - Scraping tracking
   - `viewCount` (integer) - Analytics

2. **New Indexes**
   - GIN indexes for JSONB columns
   - GIN indexes for full-text search
   - Composite indexes for common queries
   - Partial indexes for filtered queries

3. **New Relationships**
   - Related blog posts (many-to-many)
   - Related attorneys (peer relationships)
   - Hierarchical practice areas

4. **Performance Optimizations**
   - Materialized views
   - Computed columns
   - Full-text search triggers
   - Connection pooling recommendations

## Migration

After reviewing the schema design:

1. **Backup your database**
2. **Review migration script**: `scripts/output/schema-design/migration.sql`
3. **Test on staging** first
4. **Run migration**:
   ```bash
   psql $DATABASE_URL -f scripts/output/schema-design/migration.sql
   ```
5. **Update PayloadCMS config** with new fields
6. **Refresh materialized views**:
   ```sql
   SELECT refresh_materialized_views();
   ```

## Output Structure

```
scripts/output/
├── site-discovery/
│   ├── sitemap.json
│   ├── content-samples.json
│   └── DISCOVERY_REPORT.md
├── content-analysis/
│   ├── analysis-report.json
│   └── ANALYSIS_REPORT.md
└── schema-design/
    ├── enhanced-schema.json
    ├── migration.sql
    └── SCHEMA_DESIGN.md
```

## Notes

- Scripts use rate limiting to respect Firecrawl API limits
- Analysis samples a subset of URLs to avoid excessive API calls
- All outputs are saved as JSON and Markdown for easy review
- Migration scripts are idempotent (safe to run multiple times)

## Troubleshooting

### Firecrawl API Key Not Found
Ensure `.env.local` contains:
```
FIRECRAWL_API_KEY="fc-your-api-key"
```

### Site Discovery Fails
- Check internet connection
- Verify Firecrawl API key is valid
- Check Firecrawl API status

### Analysis Takes Too Long
- Scripts include rate limiting (1 second between requests)
- Analysis samples a subset of URLs
- Consider running scripts individually

## Next Steps

After running the analysis:

1. Review all generated reports
2. Update PayloadCMS config with new fields
3. Run database migration
4. Update application code to use new features
5. Test thoroughly before deploying
