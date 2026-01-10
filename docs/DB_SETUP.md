# Database Setup Guide

This guide covers setting up and managing the database for the Riley Bennett Egloff website, which uses Payload CMS with a Neon PostgreSQL database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Running Migrations](#running-migrations)
- [Seeding Data](#seeding-data)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

1. **Node.js 20+** installed
2. **Neon PostgreSQL database** set up
3. **Environment variables** configured (see below)

## Environment Variables

### Required Variables

Create a `.env.local` file in the project root with:

```env
# Database Connections
DIRECT_DATABASE_URL=postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
DATABASE_URL=postgresql://user:password@ep-xxx-xxx-pooler.us-east-2.aws.neon.tech/dbname?sslmode=require

# Payload CMS
PAYLOAD_SECRET=your-secret-here

# Optional: Vercel Blob Storage (for media uploads)
BLOB_READ_WRITE_TOKEN=your-token-here
```

### Getting Connection Strings from Neon

1. Log into your [Neon Console](https://console.neon.tech)
2. Select your project
3. Navigate to **Connection Details**
4. Copy the connection strings:
   - **DIRECT_DATABASE_URL**: Use the "Connection string" (direct connection) - required for migrations
   - **DATABASE_URL**: Use the "Connection pooling" string - used at runtime

### Why Two Connection Strings?

- **DIRECT_DATABASE_URL**: Required for migrations (DDL operations like creating tables)
- **DATABASE_URL**: Used at runtime (better for serverless/Vercel environments)

## Running Migrations

Migrations create and update your database schema to match your Payload collections.

### Local Development

```bash
npx payload migrate
```

This will:
- Connect to your database using `DIRECT_DATABASE_URL`
- Create the `payload_migrations` table if needed
- Run any pending migrations
- Update schema to match your Payload collections

### Production (Vercel)

Migrations run automatically during deployment via the build command:

```bash
payload migrate && next build
```

**Important**: Ensure both `DIRECT_DATABASE_URL` and `DATABASE_URL` are set in Vercel environment variables.

## Seeding Data

After running migrations, your database schema will be ready, but it will be empty. Use the seed scripts to populate initial content.

### One Command Bootstrap (Recommended)

Run all seed scripts in the correct order with a single command:

```bash
npm run db:seed
```

This runs:
1. Attorneys seed
2. Practice Areas seed
3. Attorney-Practice Area Relations seed
4. Blog Posts seed (optional)

### Individual Seed Scripts

You can also run seed scripts individually:

```bash
# Seed attorneys only
npm run db:seed:attorneys

# Seed practice areas only
npm run db:seed:practice-areas

# Seed attorney-practice area relations
npm run db:seed:relations

# Seed blog posts
npm run db:seed:blog:posts
```

### Seed Script Details

#### 1. Attorneys Seed (`db:seed:attorneys`)

- **Data file**: `scripts/seed-data/attorneys.json`
- **Behavior**: Idempotent - only seeds if attorneys table is empty
- **Creates**: 5 placeholder attorneys with name, email, role, bio
- **Uses**: Payload Local API (hooks, slugs, relations work correctly)

#### 2. Practice Areas Seed (`db:seed:practice-areas`)

- **Data file**: `scripts/seed-data/practice-areas.json`
- **Behavior**: Idempotent - checks by slug, skips existing
- **Creates**: 12 practice areas with title, slug, description, content, icon
- **Uniqueness**: Uses slug for duplicate detection

#### 3. Relations Seed (`db:seed:relations`)

- **Data file**: `scripts/seed-data/attorney-practice-area-map.json`
- **Behavior**: Idempotent - merges existing + new practice area IDs
- **Creates**: Links attorneys to practice areas based on email mapping
- **Safety**: Handles missing attorneys/practice areas gracefully

#### 4. Blog Posts Seed (`db:seed:blog:posts`)

- **Data file**: `scripts/seed-data/blog-posts.json`
- **Behavior**: Idempotent - checks by slug, skips existing
- **Creates**: 8 blog posts with title, content, author, categories
- **Links**: Automatically links to attorneys and practice areas

### Seed Data Locations

All seed data is stored in `scripts/seed-data/`:

```
scripts/seed-data/
├── attorneys.json
├── practice-areas.json
├── attorney-practice-area-map.json
└── blog-posts.json
```

### Idempotent Behavior

All seed scripts are **idempotent** - safe to run multiple times:
- **Attorneys**: Checks if table is empty before seeding
- **Practice Areas**: Checks by slug, skips existing
- **Relations**: Merges existing + new IDs (no duplicates)
- **Blog Posts**: Checks by slug, skips existing

### Customizing Seed Data

Edit the JSON files in `scripts/seed-data/` to customize:

**Attorneys** (`attorneys.json`):
```json
{
  "name": "Attorney Name",
  "email": "attorney@rbelaw.com",
  "role": "partner|associate|of-counsel",
  "jobType": "attorney",
  "bio": "Attorney biography..."
}
```

**Practice Areas** (`practice-areas.json`):
```json
{
  "title": "Practice Area Name",
  "slug": "practice-area-slug",
  "description": "Short description",
  "content": "Full content text",
  "icon": "IconName"
}
```

**Relations** (`attorney-practice-area-map.json`):
```json
{
  "attorneyEmail": "attorney@rbelaw.com",
  "practiceAreas": ["Practice Area 1", "Practice Area 2"]
}
```

## Verification

### Verify in Neon SQL Editor

After running migrations and seeding, verify in your Neon Console → SQL Editor:

#### Check Counts

```sql
-- Attorneys
SELECT count(*) as attorneys_count FROM public.attorneys;

-- Practice Areas
SELECT count(*) as practice_areas_count FROM public.practice_areas;

-- Blog Posts
SELECT count(*) as blog_posts_count FROM public.blog;
```

Expected results after seeding:
```
attorneys_count: 5
practice_areas_count: 12
blog_posts_count: 8
```

#### View Data

```sql
-- Attorneys
SELECT name, slug, email, role, "jobType"
FROM public.attorneys
ORDER BY name;

-- Practice Areas
SELECT title, slug FROM public.practice_areas
ORDER BY title;

-- Blog Posts
SELECT title, slug, status FROM public.blog
ORDER BY "publishedDate" DESC;
```

#### Verify Relations

```sql
-- Check attorney-practice area relations (if using join table)
-- Note: Payload may use a different relation structure
SELECT
  a.name as attorney_name,
  pa.title as practice_area
FROM public.attorneys a
JOIN public.attorneys_practice_areas apa ON a.id = apa.attorneys_id
JOIN public.practice_areas pa ON apa.practice_areas_id = pa.id
ORDER BY a.name;
```

**Alternative**: Verify relations via Payload API:
```javascript
const attorneys = await payload.find({
  collection: 'attorneys',
  depth: 1  // Include relations
})
// Check attorneys[0].practices array
```

#### Check Schema

```sql
-- List all tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see tables like:
- `attorneys`
- `practice_areas`
- `users`
- `media`
- `payload_migrations`
- And other collection tables

### Verify in Payload Admin

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/admin`

3. Log in with your admin credentials

4. Check the **Team** collection - you should see the seeded attorneys

## Troubleshooting

### Migration Fails with "relation does not exist"

- Ensure `DIRECT_DATABASE_URL` is set (not just `DATABASE_URL`)
- Verify the connection string is correct
- Check database permissions in Neon

### Seed Script Fails to Import Config

If you see errors about `@payload-config` or TypeScript imports:

- Ensure you're using Node.js 20+
- The script uses `tsx` to handle TypeScript imports
- Try running: `tsx scripts/seed-attorneys.mjs` directly

### Seed Script Says "Attorneys Already Exist"

This is expected behavior (idempotent seeding). To re-seed:

1. Delete attorneys via Payload Admin UI, OR
2. Run SQL in Neon:
   ```sql
   DELETE FROM public.attorneys;
   ```
3. Then run `npm run db:seed` again

### Connection Timeout Errors

- Verify your `DIRECT_DATABASE_URL` uses the direct connection (not pooled)
- Check Neon dashboard for connection limits
- Ensure your IP isn't blocked by Neon firewall rules

### Schema Out of Sync

If your schema doesn't match your Payload collections:

1. Run `npx payload migrate` locally
2. Verify migrations completed successfully
3. Check the `payload_migrations` table:
   ```sql
   SELECT * FROM payload_migrations ORDER BY created_at DESC;
   ```

## Additional Resources

- [Migrations Guide](./MIGRATIONS.md) - Detailed migration documentation
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Staging API Endpoint (Optional)

For staging environments, you can trigger seeding via HTTP API:

### Setup

Add to `.env.local`:
```env
# Enable seed endpoint (staging only!)
ALLOW_SEED_ENDPOINT=1
SEED_SECRET=your-strong-random-secret-here
```

### Usage

```bash
curl -X POST http://localhost:3000/api/seed \
  -H "x-seed-secret: your-strong-random-secret-here"
```

### Security

- **Disabled by default**: Set `ALLOW_SEED_ENDPOINT=1` to enable
- **Secret required**: Must match `SEED_SECRET` environment variable
- **POST only**: GET requests return 405
- **Timing-safe comparison**: Prevents timing attacks
- **Concurrent protection**: Prevents multiple simultaneous seeds

### ⚠️ WARNING

**NEVER enable in production** unless you explicitly need it. This endpoint can modify your database.

## Quick Reference

```bash
# Run migrations
npx payload migrate

# Seed all data (idempotent)
npm run db:seed

# Individual seed scripts
npm run db:seed:attorneys
npm run db:seed:practice-areas
npm run db:seed:relations
npm run db:seed:blog:posts

# Verify in Neon SQL Editor
SELECT count(*) FROM public.attorneys;
SELECT count(*) FROM public.practice_areas;
SELECT count(*) FROM public.blog;

# View all data
SELECT name, slug, email FROM public.attorneys;
SELECT title, slug FROM public.practice_areas;
SELECT title, slug, status FROM public.blog;
```
