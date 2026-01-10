# Firecrawl Integration Guide

This guide covers the Firecrawl integration for site discovery and content scraping, including caching strategies and best practices.

## Overview

The Firecrawl integration provides:
- **Site Discovery**: Map and crawl URLs from rbelaw.com (Map-first by default)
- **Content Scraping**: Extract content from individual pages
- **Caching**: File-based caching to avoid redundant API calls and reduce costs
- **Optional Tooling**: Scripts exit gracefully (exit code 0) if API key is missing or rate limits are hit

## Operational Rules

### Map-First Discovery
- **Default behavior**: Use Map discovery only (faster, cheaper)
- **Crawl only when needed**: 
  - Map counts are below thresholds, OR
  - `--useCrawl` flag is explicitly passed
- **Targeted crawl**: When crawling, only include relevant paths:
  - `/our-team/attorneys/`
  - `/practice-areas/`
  - `/industries/`
  - `/blog/`, `/insights/`, `/news/`

### Rate Limiting & Concurrency
- **Scrape concurrency**: Keep low (2-3 concurrent requests)
- **Poll interval**: Don't poll crawl status faster than 2-3 seconds
- **Always cache**: Use cache to minimize API calls

### Optional Tooling Behavior
- **Missing API key**: Scripts exit with code 0 (success) and print informational message
- **Rate limit (429)**: Scripts exit with code 0 (success) unless `--requireCrawl` or `--require` flag is used
- **Other errors**: Scripts exit with code 0 (success) to avoid breaking CI/builds
- **Explicit failure**: Use `--requireCrawl` or `--require` flags when you need scripts to fail on errors

## Why Caching Matters

### Cost Savings
- Firecrawl API calls are billed per request
- Map operations can discover hundreds of URLs in a single call
- Crawl operations are expensive and time-consuming
- Caching prevents unnecessary API calls during development and testing

### Rate Limit Protection
- Firecrawl has rate limits (varies by plan)
- Caching reduces the number of API calls
- Helps avoid hitting rate limits during iterative development

### Development Speed
- Cached responses load instantly
- No waiting for API responses during testing
- Faster iteration on data processing logic

### Reliability
- Cached data is available even if the API is temporarily unavailable
- Reduces dependency on external service availability
- Useful for offline development

## Cache Structure

```
data/cache/
├── firecrawl-map.json      # Raw Map API response
├── firecrawl-crawl.json    # Raw Crawl API response/status
└── scrape/
    ├── <hash1>.json        # Scraped content for URL 1
    ├── <hash2>.json        # Scraped content for URL 2
    └── ...
```

### Cache Keys
- **Map/Crawl**: Single cache file per operation type
- **Scrape**: SHA256 hash (first 16 chars) of the URL used as filename
  - Example: `https://rbelaw.com/practice-areas/employment` → `a3f2b1c4d5e6f7g8.json`

## When to Use `--force`

The `--force` flag bypasses the cache and fetches fresh data from Firecrawl. Use it when:

### ✅ Use `--force` when:
1. **Site content has changed**: You know the site has been updated
2. **Initial discovery**: First time running discovery (no cache exists yet)
3. **Testing changes**: Verifying that your code works with fresh data
4. **Debugging API issues**: Investigating problems with Firecrawl responses
5. **After cache corruption**: If cache files are corrupted or invalid

### ❌ Don't use `--force` when:
1. **Iterative development**: Working on data processing logic
2. **Testing categorization**: Testing URL categorization rules
3. **Cost concerns**: Want to minimize API usage
4. **Rate limit protection**: Already close to rate limits
5. **Quick testing**: Just need to test script logic quickly

## Recommended Run Order

### 1. Initial Discovery (First Time)

```bash
# Run with --force to get fresh data
tsx scripts/discover-site-urls.ts --force

# This will:
# - Fetch Map data from Firecrawl
# - Fetch Crawl data if needed
# - Save both to cache
# - Generate data/site-map.json
```

### 2. Iterative Development

```bash
# Run without --force to use cache
tsx scripts/discover-site-urls.ts

# This will:
# - Use cached Map data (if available)
# - Use cached Crawl data (if available)
# - Skip API calls entirely
# - Regenerate data/site-map.json from cache
```

### 3. Testing with Fresh Data

```bash
# When you need to verify with latest site content
tsx scripts/discover-site-urls.ts --force

# Or just refresh Map (faster):
tsx scripts/discover-site-urls.ts --force --useCrawl false
```

### 4. Scraping Individual Pages

```typescript
import { isScrapeCached, readScrapeCache, writeScrapeCache } from './lib/cache.js'

async function scrapeUrl(url: string, force: boolean = false) {
  // Check cache first
  if (!force) {
    const cached = await readScrapeCache(url)
    if (cached) {
      console.log(`📦 Using cached scrape for ${url}`)
      return cached
    }
  }

  // Fetch from Firecrawl
  const result = await app.scrapeUrl(url, { formats: ['markdown'] })
  
  // Save to cache
  await writeScrapeCache(url, result)
  
  return result
}
```

## Cache Management

### View Cache Status

```bash
# Check if cache exists
ls -la data/cache/

# View Map cache
cat data/cache/firecrawl-map.json | jq '.links | length'

# View Crawl cache
cat data/cache/firecrawl-crawl.json | jq '.status'
```

### Clear Cache

```typescript
import { clearCache } from './lib/cache.js'

// Clear all caches
await clearCache()
```

Or manually:
```bash
rm -rf data/cache/*
```

### Cache Invalidation

Caches are invalidated when:
- `--force` flag is used
- Cache files are manually deleted
- Cache files are corrupted (script will re-fetch)

## Best Practices

### 1. Cache Before Development
```bash
# Run once with --force to populate cache
tsx scripts/discover-site-urls.ts --force

# Then develop without --force
tsx scripts/discover-site-urls.ts
```

### 2. Use Cache for Testing
- Test your categorization logic with cached data
- Test URL normalization with cached data
- Only use `--force` when you need fresh data

### 3. Monitor Cache Size
- Scrape cache can grow large with many URLs
- Periodically clean old cache files if needed
- Consider implementing cache expiration if needed

### 4. Version Control
- **Don't commit cache files** (add to `.gitignore`)
- Cache is environment-specific
- Each developer should generate their own cache

### 5. CI/CD Considerations
- In CI, always use `--force` for reproducible builds
- Or commit cache files if you want consistent test data
- Consider cache expiration for CI environments

## Troubleshooting

### Cache Not Working
- Check that `data/cache/` directory exists
- Verify file permissions
- Check for JSON parse errors in cache files

### Stale Cache
- Use `--force` to refresh
- Or manually delete cache files
- Check cache file modification times

### Cache Corruption
- Delete corrupted cache files
- Run with `--force` to regenerate
- Check for disk space issues

## API Usage Tips

### Minimize API Calls
1. Always check cache first
2. Use `--force` only when necessary
3. Batch operations when possible
4. Use Map instead of Crawl when possible

### Rate Limit Management
- The `scripts/lib/firecrawl.ts` wrapper handles rate limits automatically
- Caching reduces the chance of hitting rate limits
- Use `--requireCrawl` only when crawl is essential

### Cost Optimization
- Cache aggressively during development
- Use Map discovery (cheaper) before Crawl
- Only crawl when Map results are insufficient
- Reuse scrape cache for repeated operations

## Example Workflows

### Daily Development Workflow
```bash
# Morning: Refresh cache if needed
tsx scripts/discover-site-urls.ts --force

# During day: Use cache for fast iteration
tsx scripts/discover-site-urls.ts

# Test changes: Use cache
tsx scripts/discover-site-urls.ts --useCrawl
```

### Production Data Refresh
```bash
# Weekly refresh with fresh data
tsx scripts/discover-site-urls.ts --force --useCrawl

# Generate final site map
cat data/site-map.json | jq '.counts'
```

### Debugging Workflow
```bash
# Clear cache and start fresh
rm -rf data/cache/*

# Run with verbose logging
tsx scripts/discover-site-urls.ts --force

# Check cache contents
cat data/cache/firecrawl-map.json | jq 'keys'
```

## Related Files

- `scripts/discover-site-urls.ts` - Main discovery script
- `scripts/lib/firecrawl.ts` - Firecrawl wrapper with rate limiting
- `scripts/lib/cache.ts` - Cache utilities
- `data/site-map.json` - Generated site map output
- `data/cache/` - Cache directory

## Additional Resources

- [Firecrawl API Documentation](https://docs.firecrawl.dev/)
- [Firecrawl Rate Limits](https://docs.firecrawl.dev/rate-limits)
- [Firecrawl Pricing](https://www.firecrawl.dev/pricing)
