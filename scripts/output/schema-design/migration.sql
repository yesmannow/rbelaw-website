
-- Enhanced Database Schema Migration
-- Generated: 2026-01-10T16:07:06.858Z

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
