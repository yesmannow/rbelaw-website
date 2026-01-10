
# Enhanced Database Schema Design
Generated: 2026-01-10T16:07:06.861Z

## Overview
This schema design provides expert-level optimizations for the RBE Law website database, based on Firecrawl site discovery and content analysis.

## Key Improvements

### New Fields

#### metadata
- **Type**: jsonb
- **Required**: false
- **Indexed**: true
- **Description**: Flexible JSON storage for page metadata (OG tags, custom fields)
- **Example**: `{"ogImage": "...", "customField": "value"}`


#### searchVector
- **Type**: tsvector
- **Required**: false
- **Indexed**: true
- **Description**: Full-text search vector (computed from title + content)



#### contentHash
- **Type**: text
- **Required**: false
- **Indexed**: true
- **Description**: SHA-256 hash of content for change detection



#### lastScrapedAt
- **Type**: timestamp
- **Required**: false
- **Indexed**: true
- **Description**: Last time content was scraped/updated from source



#### viewCount
- **Type**: integer
- **Required**: false
- **Indexed**: true
- **Description**: Page view counter for analytics



#### seoScore
- **Type**: integer
- **Required**: false
- **Indexed**: true
- **Description**: Calculated SEO score (0-100)



### New Indexes
- GIN index on metadata JSONB column
- GIN index on searchVector for full-text search
- Composite index on (status, publishedDate) for blog queries
- Composite index on (jobType, role) for attorney filtering
- Partial index on published blog posts (WHERE status = "published")
- B-tree index on contentHash for duplicate detection

### New Relationships
- blog -> relatedBlogPosts (self-referential many-to-many)
- attorneys -> relatedAttorneys (peer relationships)
- practice-areas -> relatedPracticeAreas (hierarchical relationships)
- blog -> caseResults (related case studies)

### Performance Optimizations
- Add materialized view for attorney directory (refreshed daily)
- Add materialized view for practice area listings
- Add computed columns for common queries (e.g., attorneyCount)
- Implement connection pooling with PgBouncer
- Add read replicas for heavy read workloads
- Implement Redis caching for frequently accessed content
- Add database-level full-text search with PostgreSQL tsvector
- Normalize repeated data into lookup tables (locations, dates)

## Collection Enhancements


### Blog Posts (blog)

**Description**: Enhanced blog collection with improved search and metadata

#### New Fields
- **metadata**: jsonb - OG tags, custom metadata
- **readingTime**: number - Estimated reading time in minutes (computed)
- **relatedBlogPosts**: relationship - Related blog posts (many-to-many)
- **caseResults**: relationship - Related case results

#### Indexes
- slug (unique)
- publishedDate DESC
- (status, publishedDate)
- searchVector (GIN)
- metadata (GIN)

#### Relationships
- author -> attorneys
- relatedBlogPosts -> blog (many-to-many)
- relatedPracticeAreas -> practice-areas
- caseResults -> case-results

#### Optimizations
- Materialized view for published posts
- Full-text search index
- Cache popular posts


### Attorneys (attorneys)

**Description**: Enhanced attorney collection with better relationships

#### New Fields
- **relatedAttorneys**: relationship - Related attorneys (peer relationships)
- **expertiseLevel**: select - Expertise level (junior, mid, senior, partner)
- **yearsOfExperience**: number - Years of experience (computed from bar admission)
- **caseWinRate**: number - Case win rate percentage (if tracked)

#### Indexes
- slug (unique)
- (jobType, role)
- email (unique)
- searchVector (GIN)

#### Relationships
- practices -> practice-areas (many-to-many)
- relatedAttorneys -> attorneys (many-to-many)
- industries -> industries (many-to-many)

#### Optimizations
- Materialized view for attorney directory
- Computed fields for statistics


### Practice Areas (practice-areas)

**Description**: Enhanced practice area with hierarchical support

#### New Fields
- **parentPracticeArea**: relationship - Parent practice area (for hierarchies)
- **relatedPracticeAreas**: relationship - Related practice areas
- **attorneyCount**: number - Number of attorneys in this practice (computed)
- **caseStudyCount**: number - Number of case studies (computed)

#### Indexes
- slug (unique)
- parentPracticeArea
- searchVector (GIN)

#### Relationships
- parentPracticeArea -> practice-areas (self-referential)
- relatedPracticeAreas -> practice-areas (many-to-many)
- featuredAttorneys -> attorneys

#### Optimizations
- Materialized view for practice area tree
- Computed counts for performance


## Migration Instructions

1. **Review the migration script**: `migration.sql`
2. **Backup your database** before running migrations
3. **Test on staging** first
4. **Run migration**:
   ```bash
   psql $DATABASE_URL -f scripts/output/schema-design/migration.sql
   ```
5. **Update PayloadCMS config** to include new fields
6. **Refresh materialized views**:
   ```sql
   SELECT refresh_materialized_views();
   ```

## Next Steps

1. Review `enhanced-schema.json` for complete schema design
2. Update `src/payload.config.ts` with new fields
3. Run migration script on staging database
4. Test all queries and update application code
5. Deploy to production

## Files Generated

- `enhanced-schema.json`: Complete schema design
- `migration.sql`: SQL migration script
- `SCHEMA_DESIGN.md`: This documentation
