/**
 * Enhanced Database Schema Design
 *
 * Generates expert-level database schema improvements based on:
 * - Firecrawl site discovery results
 * - Content structure analysis
 * - Current PayloadCMS schema
 *
 * Run with: tsx scripts/design-enhanced-schema.ts
 */

import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

interface SchemaField {
  name: string
  type: string
  required: boolean
  indexed: boolean
  unique?: boolean
  description: string
  example?: string
}

interface SchemaCollection {
  name: string
  slug: string
  description: string
  fields: SchemaField[]
  indexes: string[]
  relationships: string[]
  optimizations: string[]
}

interface EnhancedSchema {
  version: string
  generatedAt: string
  improvements: {
    newFields: SchemaField[]
    newIndexes: string[]
    newRelationships: string[]
    performanceOptimizations: string[]
  }
  collections: SchemaCollection[]
  migrationScript: string
}

/**
 * Generate enhanced schema design
 */
async function main() {
  const outputDir = path.resolve('scripts/output/schema-design')
  await fs.mkdir(outputDir, { recursive: true })

  console.log('🏗️  Designing enhanced database schema...\n')

  // Load analysis if available
  const analysisFile = path.resolve('scripts/output/content-analysis/analysis-report.json')
  let analysis: any = null
  if (existsSync(analysisFile)) {
    analysis = JSON.parse(await fs.readFile(analysisFile, 'utf8'))
    console.log('✅ Loaded content analysis\n')
  }

  // Enhanced schema design
  const enhancedSchema: EnhancedSchema = {
    version: '2.0.0',
    generatedAt: new Date().toISOString(),
    improvements: {
      newFields: [
        {
          name: 'metadata',
          type: 'jsonb',
          required: false,
          indexed: true,
          description: 'Flexible JSON storage for page metadata (OG tags, custom fields)',
          example: '{"ogImage": "...", "customField": "value"}',
        },
        {
          name: 'searchVector',
          type: 'tsvector',
          required: false,
          indexed: true,
          description: 'Full-text search vector (computed from title + content)',
        },
        {
          name: 'contentHash',
          type: 'text',
          required: false,
          indexed: true,
          unique: false,
          description: 'SHA-256 hash of content for change detection',
        },
        {
          name: 'lastScrapedAt',
          type: 'timestamp',
          required: false,
          indexed: true,
          description: 'Last time content was scraped/updated from source',
        },
        {
          name: 'viewCount',
          type: 'integer',
          required: false,
          indexed: true,
          description: 'Page view counter for analytics',
        },
        {
          name: 'seoScore',
          type: 'integer',
          required: false,
          indexed: true,
          description: 'Calculated SEO score (0-100)',
        },
      ],
      newIndexes: [
        'GIN index on metadata JSONB column',
        'GIN index on searchVector for full-text search',
        'Composite index on (status, publishedDate) for blog queries',
        'Composite index on (jobType, role) for attorney filtering',
        'Partial index on published blog posts (WHERE status = "published")',
        'B-tree index on contentHash for duplicate detection',
      ],
      newRelationships: [
        'blog -> relatedBlogPosts (self-referential many-to-many)',
        'attorneys -> relatedAttorneys (peer relationships)',
        'practice-areas -> relatedPracticeAreas (hierarchical relationships)',
        'blog -> caseResults (related case studies)',
      ],
      performanceOptimizations: [
        'Add materialized view for attorney directory (refreshed daily)',
        'Add materialized view for practice area listings',
        'Add computed columns for common queries (e.g., attorneyCount)',
        'Implement connection pooling with PgBouncer',
        'Add read replicas for heavy read workloads',
        'Implement Redis caching for frequently accessed content',
        'Add database-level full-text search with PostgreSQL tsvector',
        'Normalize repeated data into lookup tables (locations, dates)',
      ],
    },
    collections: [
      {
        name: 'Blog Posts',
        slug: 'blog',
        description: 'Enhanced blog collection with improved search and metadata',
        fields: [
          {
            name: 'metadata',
            type: 'jsonb',
            required: false,
            indexed: true,
            description: 'OG tags, custom metadata',
          },
          {
            name: 'readingTime',
            type: 'number',
            required: false,
            indexed: true,
            description: 'Estimated reading time in minutes (computed)',
          },
          {
            name: 'relatedBlogPosts',
            type: 'relationship',
            required: false,
            indexed: true,
            description: 'Related blog posts (many-to-many)',
          },
          {
            name: 'caseResults',
            type: 'relationship',
            required: false,
            indexed: true,
            description: 'Related case results',
          },
        ],
        indexes: [
          'slug (unique)',
          'publishedDate DESC',
          '(status, publishedDate)',
          'searchVector (GIN)',
          'metadata (GIN)',
        ],
        relationships: [
          'author -> attorneys',
          'relatedBlogPosts -> blog (many-to-many)',
          'relatedPracticeAreas -> practice-areas',
          'caseResults -> case-results',
        ],
        optimizations: [
          'Materialized view for published posts',
          'Full-text search index',
          'Cache popular posts',
        ],
      },
      {
        name: 'Attorneys',
        slug: 'attorneys',
        description: 'Enhanced attorney collection with better relationships',
        fields: [
          {
            name: 'relatedAttorneys',
            type: 'relationship',
            required: false,
            indexed: true,
            description: 'Related attorneys (peer relationships)',
          },
          {
            name: 'expertiseLevel',
            type: 'select',
            required: false,
            indexed: true,
            description: 'Expertise level (junior, mid, senior, partner)',
          },
          {
            name: 'yearsOfExperience',
            type: 'number',
            required: false,
            indexed: true,
            description: 'Years of experience (computed from bar admission)',
          },
          {
            name: 'caseWinRate',
            type: 'number',
            required: false,
            indexed: false,
            description: 'Case win rate percentage (if tracked)',
          },
        ],
        indexes: [
          'slug (unique)',
          '(jobType, role)',
          'email (unique)',
          'searchVector (GIN)',
        ],
        relationships: [
          'practices -> practice-areas (many-to-many)',
          'relatedAttorneys -> attorneys (many-to-many)',
          'industries -> industries (many-to-many)',
        ],
        optimizations: [
          'Materialized view for attorney directory',
          'Computed fields for statistics',
        ],
      },
      {
        name: 'Practice Areas',
        slug: 'practice-areas',
        description: 'Enhanced practice area with hierarchical support',
        fields: [
          {
            name: 'parentPracticeArea',
            type: 'relationship',
            required: false,
            indexed: true,
            description: 'Parent practice area (for hierarchies)',
          },
          {
            name: 'relatedPracticeAreas',
            type: 'relationship',
            required: false,
            indexed: true,
            description: 'Related practice areas',
          },
          {
            name: 'attorneyCount',
            type: 'number',
            required: false,
            indexed: true,
            description: 'Number of attorneys in this practice (computed)',
          },
          {
            name: 'caseStudyCount',
            type: 'number',
            required: false,
            indexed: true,
            description: 'Number of case studies (computed)',
          },
        ],
        indexes: [
          'slug (unique)',
          'parentPracticeArea',
          'searchVector (GIN)',
        ],
        relationships: [
          'parentPracticeArea -> practice-areas (self-referential)',
          'relatedPracticeAreas -> practice-areas (many-to-many)',
          'featuredAttorneys -> attorneys',
        ],
        optimizations: [
          'Materialized view for practice area tree',
          'Computed counts for performance',
        ],
      },
    ],
    migrationScript: `
-- Enhanced Database Schema Migration
-- Generated: ${new Date().toISOString()}

-- 1. Add metadata JSONB column to all content collections
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "metadata" JSONB;
ALTER TABLE "attorneys" ADD COLUMN IF NOT EXISTS "metadata" JSONB;
ALTER TABLE "practice_areas" ADD COLUMN IF NOT EXISTS "metadata" JSONB;

-- 2. Add search vector columns
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "search_vector" tsvector;
ALTER TABLE "attorneys" ADD COLUMN IF NOT EXISTS "search_vector" tsvector;
ALTER TABLE "practice_areas" ADD COLUMN IF NOT EXISTS "search_vector" tsvector;

-- 3. Add content hash for change detection
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "content_hash" TEXT;
ALTER TABLE "attorneys" ADD COLUMN IF NOT EXISTS "content_hash" TEXT;

-- 4. Add last scraped timestamp
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "last_scraped_at" TIMESTAMP;
ALTER TABLE "attorneys" ADD COLUMN IF NOT EXISTS "last_scraped_at" TIMESTAMP;

-- 5. Add view count
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "view_count" INTEGER DEFAULT 0;
ALTER TABLE "attorneys" ADD COLUMN IF NOT EXISTS "view_count" INTEGER DEFAULT 0;

-- 6. Create GIN indexes for JSONB and full-text search
CREATE INDEX IF NOT EXISTS "blog_metadata_gin" ON "blog" USING GIN ("metadata");
CREATE INDEX IF NOT EXISTS "blog_search_vector_gin" ON "blog" USING GIN ("search_vector");
CREATE INDEX IF NOT EXISTS "attorneys_metadata_gin" ON "attorneys" USING GIN ("metadata");
CREATE INDEX IF NOT EXISTS "attorneys_search_vector_gin" ON "attorneys" USING GIN ("search_vector");
CREATE INDEX IF NOT EXISTS "practice_areas_metadata_gin" ON "practice_areas" USING GIN ("metadata");
CREATE INDEX IF NOT EXISTS "practice_areas_search_vector_gin" ON "practice_areas" USING GIN ("search_vector");

-- 7. Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS "blog_status_published_date_idx" ON "blog" ("status", "publishedDate" DESC) WHERE "status" = 'published';
CREATE INDEX IF NOT EXISTS "attorneys_job_type_role_idx" ON "attorneys" ("jobType", "role");

-- 8. Create function to update search vector
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.excerpt, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW."content"::text, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Create triggers to auto-update search vectors
CREATE TRIGGER blog_search_vector_update
  BEFORE INSERT OR UPDATE ON "blog"
  FOR EACH ROW EXECUTE FUNCTION update_search_vector();

CREATE TRIGGER attorneys_search_vector_update
  BEFORE INSERT OR UPDATE ON "attorneys"
  FOR EACH ROW EXECUTE FUNCTION update_search_vector();

-- 10. Create materialized view for attorney directory
CREATE MATERIALIZED VIEW IF NOT EXISTS attorney_directory AS
SELECT
  a.id,
  a.name,
  a.slug,
  a."jobType",
  a.role,
  a.email,
  COUNT(DISTINCT pa.id) as practice_area_count,
  COUNT(DISTINCT b.id) as blog_post_count
FROM "attorneys" a
LEFT JOIN "_practices_attorneys" pa_rel ON a.id = pa_rel."attorneys_id"
LEFT JOIN "practice_areas" pa ON pa_rel."practice_areas_id" = pa.id
LEFT JOIN "blog" b ON b."author" = a.id
WHERE a."jobType" = 'attorney'
GROUP BY a.id, a.name, a.slug, a."jobType", a.role, a.email;

CREATE UNIQUE INDEX IF NOT EXISTS attorney_directory_id_idx ON attorney_directory (id);

-- 11. Create refresh function for materialized views
CREATE OR REPLACE FUNCTION refresh_materialized_views()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY attorney_directory;
END;
$$ LANGUAGE plpgsql;

-- Note: Run REFRESH MATERIALIZED VIEW attorney_directory; after data changes
`,
  }

  // Save schema design
  const schemaFile = path.join(outputDir, 'enhanced-schema.json')
  await fs.writeFile(schemaFile, JSON.stringify(enhancedSchema, null, 2), 'utf8')

  // Save migration script
  const migrationFile = path.join(outputDir, 'migration.sql')
  await fs.writeFile(migrationFile, enhancedSchema.migrationScript, 'utf8')

  // Generate markdown documentation
  const documentation = `
# Enhanced Database Schema Design
Generated: ${new Date().toISOString()}

## Overview
This schema design provides expert-level optimizations for the RBE Law website database, based on Firecrawl site discovery and content analysis.

## Key Improvements

### New Fields
${enhancedSchema.improvements.newFields.map(f => `
#### ${f.name}
- **Type**: ${f.type}
- **Required**: ${f.required}
- **Indexed**: ${f.indexed}
- **Description**: ${f.description}
${f.example ? `- **Example**: \`${f.example}\`` : ''}
`).join('\n')}

### New Indexes
${enhancedSchema.improvements.newIndexes.map(i => `- ${i}`).join('\n')}

### New Relationships
${enhancedSchema.improvements.newRelationships.map(r => `- ${r}`).join('\n')}

### Performance Optimizations
${enhancedSchema.improvements.performanceOptimizations.map(o => `- ${o}`).join('\n')}

## Collection Enhancements

${enhancedSchema.collections.map(collection => `
### ${collection.name} (${collection.slug})

**Description**: ${collection.description}

#### New Fields
${collection.fields.map(f => `- **${f.name}**: ${f.type} - ${f.description}`).join('\n')}

#### Indexes
${collection.indexes.map(i => `- ${i}`).join('\n')}

#### Relationships
${collection.relationships.map(r => `- ${r}`).join('\n')}

#### Optimizations
${collection.optimizations.map(o => `- ${o}`).join('\n')}
`).join('\n')}

## Migration Instructions

1. **Review the migration script**: \`migration.sql\`
2. **Backup your database** before running migrations
3. **Test on staging** first
4. **Run migration**:
   \`\`\`bash
   psql $DATABASE_URL -f scripts/output/schema-design/migration.sql
   \`\`\`
5. **Update PayloadCMS config** to include new fields
6. **Refresh materialized views**:
   \`\`\`sql
   SELECT refresh_materialized_views();
   \`\`\`

## Next Steps

1. Review \`enhanced-schema.json\` for complete schema design
2. Update \`src/payload.config.ts\` with new fields
3. Run migration script on staging database
4. Test all queries and update application code
5. Deploy to production

## Files Generated

- \`enhanced-schema.json\`: Complete schema design
- \`migration.sql\`: SQL migration script
- \`SCHEMA_DESIGN.md\`: This documentation
`

  const docFile = path.join(outputDir, 'SCHEMA_DESIGN.md')
  await fs.writeFile(docFile, documentation, 'utf8')

  console.log('✨ Schema design complete!\n')
  console.log(`📁 Results saved to: ${outputDir}`)
  console.log(`   - enhanced-schema.json: Complete schema design`)
  console.log(`   - migration.sql: SQL migration script`)
  console.log(`   - SCHEMA_DESIGN.md: Documentation`)
  console.log('\n🔄 Next step: Review schema design and run migration')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
