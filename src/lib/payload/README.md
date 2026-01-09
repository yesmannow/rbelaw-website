# Payload CMS Data Migration

This directory contains the smart seed migration script for importing static data into Payload CMS.

## Overview

The `seed.ts` script migrates data from static TypeScript files (`src/lib/data/`) into the Payload CMS PostgreSQL database while preserving all relationships.

## Migration Architecture

The script follows a **dependency tree approach** to ensure referential integrity:

```
Phase 1: Taxonomies (No dependencies)
├── Industries Collection
└── Tags Collection

Phase 2: Attorneys (Depends on: Industries, Tags)
└── Attorneys Collection

Phase 3: Practice Areas (Depends on: Attorneys, Industries, Tags)
└── Practice Areas Collection

Phase 4: Blog Posts (Depends on: Attorneys, Practice Areas, Tags)
└── Blog Collection
```

## Prerequisites

1. **Database Connection**: Ensure `DATABASE_URI` is set in your environment variables (Vercel or `.env.local`)
2. **Schema Migration**: Run `npx payload migrate` to create database tables
3. **Build**: Ensure `npm run build` completes successfully

## Usage

### Production (Vercel)

```bash
# After deploying to Vercel with DATABASE_URI set
npx payload migrate          # Create tables
npm run seed                 # Run migration
```

### Local Development

```bash
# 1. Add DATABASE_URI to .env.local
# DATABASE_URI=postgresql://user:pass@host:5432/db

# 2. Run migration
npm run seed
```

## What Gets Migrated

### Industries Collection
- Source: `src/lib/data/industries-manual.ts`
- Fields: title, slug, description, icon
- Count: ~8 industries

### Tags Collection
- Source: Extracted from blog posts
- Fields: name, slug
- Auto-generated from blog categories and tags

### Attorneys Collection
- Source: `src/lib/data/attorneys.ts`
- Fields: name, slug, role, email, bio, education, awards, etc.
- Relationships: industries[], tags[]
- Count: ~28 attorneys

### Practice Areas Collection
- Source: `src/lib/data/practiceAreas.ts`
- Fields: title, slug, description, content, icon
- Relationships: featuredAttorneys[] (auto-matched), industries[], tags[]
- Count: ~15 practice areas

### Blog Collection
- Source: `src/lib/data/blog-posts.ts`
- Fields: title, slug, excerpt, content, publishedDate
- Relationships: author (attorney), tags[], relatedPracticeAreas[]
- Count: First 20 posts (configurable)

## Relationship Resolution Logic

### Attorney → Industry Mapping
```typescript
// Fuzzy matching based on attorney.industries field
attorney.industries.map(industryName => {
  // 1. Try exact slug match
  // 2. Try fuzzy match (contains/includes)
  return industryMap.get(matchedSlug)
})
```

### Practice Area → Attorney Mapping
```typescript
// Auto-link attorneys based on practice area overlap
attorneys.filter(attorney => 
  attorney.practiceAreas.some(area => 
    area.includes(practiceArea.name) || 
    practiceArea.name.includes(area)
  )
)
```

### Blog → Author Mapping
```typescript
// Direct slug match
blogPost.authorSlug → attorneyMap.get(authorSlug)
```

## Post-Migration Steps

After running the seed:

1. **Access Admin UI**: Visit `/admin` to verify data
2. **Upload Headshots**: 
   - Go to Media collection
   - Upload attorney photos
   - Link them to attorney profiles via `headshot` field
3. **Add Featured Images**: Upload and link images to practice areas
4. **Refine Relationships**: Review auto-matched relationships and adjust as needed
5. **Add More Tags**: Create additional tags for better content organization

## Customization

### Limit Blog Posts
```typescript
// In seed.ts, line ~340
for (const post of blogPosts.slice(0, 20)) { // Change 20 to desired limit
```

### Add Custom Industries
```typescript
// Before seeding, add to src/lib/data/industries-manual.ts
{
  slug: 'custom-industry',
  name: 'Custom Industry',
  intro: 'Description...',
  services: [],
  attorneys: []
}
```

## Troubleshooting

### "Cannot find module '@payload-config'"
- Run `npm run build` first to generate the config

### "Connection refused" or database errors
- Verify `DATABASE_URI` is correct
- Run `npx payload migrate` to create tables

### "Duplicate key" errors
- Clear existing data: Delete all records from collections in admin UI
- Or add check for existing records in seed script

### Missing relationships
- Check console output for match results
- Relationships are logged during seed: "Practice Area (X attorneys)"

## Development

To modify the seed script:

1. Edit `src/lib/payload/seed.ts`
2. Update relationship mapping logic
3. Test locally with a test database
4. Run `npm run seed` to verify

## Data Flow Diagram

```
Static Files               Resolution Maps              Payload Collections
━━━━━━━━━━━                ━━━━━━━━━━━━━━━              ━━━━━━━━━━━━━━━━━━
industries-manual.ts  →    industryMap    →    Industries Collection
blog-posts.ts         →    tagMap         →    Tags Collection
attorneys.ts          →    attorneyMap    →    Attorneys Collection
practiceAreas.ts      →    practiceAreaMap→    Practice Areas Collection
blog-posts.ts         →                   →    Blog Collection
```

## Notes

- The seed script is **idempotent-safe** with duplicate checks (future enhancement)
- Rich text fields use Lexical format (JSON structure)
- Relationships use UUID references (automatically handled by Payload)
- The script outputs detailed logs for debugging

## Next Phase

After successful seeding:
- **Phase 4**: Convert Vite pages to Next.js App Router
- **Phase 5**: Implement contact form with Zapier webhook
