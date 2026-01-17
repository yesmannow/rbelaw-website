# Canonicalization System

This document explains the canonicalization system implemented to prevent semantic duplicates across practice areas and industries.

## Overview

The canonicalization system normalizes incoming names using alias maps **before** slugging to ensure that semantic duplicates (like "Business Law", "BusinessLaw", "Corporate Law") are mapped to a single canonical form ("Business & Corporate Law") and therefore share the same slug.

## Components

### 1. Alias Maps

Two JSON files define the canonical mappings:

- **`data/normalize/practice-area-aliases.json`** - Maps practice area variants to canonical names
- **`data/normalize/industry-aliases.json`** - Maps industry variants to canonical names

Example:
```json
{
  "Business Law": "Business & Corporate Law",
  "BusinessLaw": "Business & Corporate Law",
  "Corporate Law": "Business & Corporate Law"
}
```

### 2. Normalization Functions

Located in `scripts/lib/normalize.js`:

- **`normalizePracticeAreaName(name)`** - Returns canonical practice area name
- **`normalizeIndustryName(name)`** - Returns canonical industry name
- **`normalizePracticeAreaExtract(data)`** - Normalizes practice area lists in extracted data
- **`normalizeIndustryExtract(data)`** - Normalizes industry lists in extracted data

### 3. Seeding Integration

The seed scripts apply normalization in this order:

1. Load raw data from JSON files
2. **Normalize the name** using alias maps
3. Generate slug from canonical name
4. Upsert by slug (ensures no duplicates)

Modified scripts:
- `scripts/seed-practice-areas-from-json.mjs`
- `scripts/seed-industries-from-json.mjs`
- `scripts/lib/relations.js` (for lookups)

### 4. QA Report Enhancement

The `npm run db:qa` command now includes a "Near-Duplicates Detection" section that reports:

- Same canonical name with different original names
- Same normalized slug from multiple variants

This helps identify when the alias maps need to be updated.

## Usage

### Running the QA Report

```bash
npm run db:qa
```

This will show any near-duplicates in the database that should be consolidated.

### Testing Canonicalization

```bash
npx tsx scripts/test-canonicalization.mjs
```

This runs a test suite verifying that:
- Aliases are loaded correctly
- Name normalization works
- Slugs are stable for semantic duplicates

### Adding New Aliases

1. Edit `data/normalize/practice-area-aliases.json` or `data/normalize/industry-aliases.json`
2. Add mappings in the format: `"variant": "Canonical Name"`
3. Run tests to verify: `npx tsx scripts/test-canonicalization.mjs`
4. Re-seed data if needed

## Benefits

1. **Prevents Duplicates** - Semantic variants automatically map to the same record
2. **Stable URLs** - Slugs remain consistent regardless of input variations
3. **Quality Assurance** - QA report detects potential issues
4. **No Breaking Changes** - Schema remains unchanged, only seed behavior improved

## Examples

### Practice Areas

Input variants → Canonical form (slug):
- "Business Law", "BusinessLaw", "Corporate Law" → "Business & Corporate Law" (business-corporate-law)
- "Healthcare", "Health Care" → "Health Care Law" (health-care-law)
- "Employment Law", "Labor Law" → "Labor & Employment Law" (labor-employment-law)

### Industries

Input variants → Canonical form (slug):
- "HealthCare", "Healthcare" → "Health Care" (health-care)
- "RealEstate", "Real-Estate" → "Real Estate" (real-estate)
- "Non-Profit", "Nonprofit" → "Non-Profit Organizations" (non-profit-organizations)
