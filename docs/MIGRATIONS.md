# Database Migrations Guide

## Overview

This project uses Payload CMS with a Neon PostgreSQL database. Migrations are handled by Payload's built-in migration system.

## Environment Variables

### Required for Migrations

- **DIRECT_DATABASE_URL** (preferred): Direct connection string for migrations and DDL operations
  - Use this for running `payload migrate` locally
  - Neon provides this as the "Connection string" (direct connection)" in your dashboard

- **DATABASE_URL**: Pooled connection string for runtime
  - Used by the application at runtime
  - Neon provides this as the "Connection pooling" string

### Fallback Chain

The `payload.config.ts` uses the following priority:
1. `DIRECT_DATABASE_URL` (preferred for migrations)
2. `DATABASE_URL` (pooled, Vercel standard)
3. `DATABASE_URI` (legacy fallback)

## Neon Database Setup

### Getting Connection Strings from Neon

1. Log into your [Neon Console](https://console.neon.tech)
2. Select your project
3. Navigate to the **Connection Details** section
4. Copy the connection strings:

   **For DIRECT_DATABASE_URL** (migrations):
   ```
   postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
   ```
   This is the "Connection string" (direct connection) - use this for migrations.

   **For DATABASE_URL** (runtime):
   ```
   postgresql://user:password@ep-xxx-xxx-pooler.us-east-2.aws.neon.tech/dbname?sslmode=require
   ```
   This is the "Connection pooling" string - use this for runtime.

### Important Notes

- **Direct connection** (`DIRECT_DATABASE_URL`) is required for migrations because:
  - Migrations need to create/modify tables and schema
  - Pooled connections may have restrictions on DDL operations
  - Direct connections provide full database access

- **Pooled connection** (`DATABASE_URL`) is used at runtime because:
  - Better for serverless environments (Vercel)
  - Handles connection pooling automatically
  - More efficient for high-traffic applications

## Running Migrations Locally

### Prerequisites

1. Ensure `.env.local` contains:
   ```env
   DIRECT_DATABASE_URL=postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
   DATABASE_URL=postgresql://user:password@ep-xxx-xxx-pooler.us-east-2.aws.neon.tech/dbname?sslmode=require
   PAYLOAD_SECRET=your-secret-here
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Migrations

```bash
npx payload migrate
```

This command will:
- Connect to the database using `DIRECT_DATABASE_URL` (or fallback to `DATABASE_URL`)
- Create the `payload_migrations` table if it doesn't exist
- Run any pending migrations
- Update the schema to match your Payload collections

### Verifying Migrations

After running migrations, verify the schema:

```bash
# Check that required tables exist
npm run health:ci
```

Or manually check in your Neon console:
- `payload_migrations` - tracks migration history
- `attorneys` - attorney collection
- `practice_areas` - practice areas collection
- `users` - admin users
- Other collection tables as defined in `payload.config.ts`

## Production Migrations (Vercel)

Migrations run automatically during deployment if your build command includes:

```json
"deploy": "payload migrate && next build"
```

**Important**: Ensure both `DIRECT_DATABASE_URL` and `DATABASE_URL` are set in Vercel environment variables:
- Go to Vercel → Project → Settings → Environment Variables
- Add both connection strings
- Redeploy to run migrations

## Troubleshooting

### Migration Fails with "relation does not exist"

- Ensure `DIRECT_DATABASE_URL` is set (not just `DATABASE_URL`)
- Verify the connection string is correct and accessible
- Check that you have the correct database permissions

### Migration Hangs or Times Out

- Verify your `DIRECT_DATABASE_URL` is using the direct connection (not pooled)
- Check Neon dashboard for connection limits
- Ensure your IP is not blocked by Neon firewall rules

### Schema Out of Sync

If your schema is out of sync:
1. Run `npx payload migrate` locally with `DIRECT_DATABASE_URL`
2. Verify migrations completed successfully
3. Redeploy to production

## Additional Resources

- [Payload Migrations Documentation](https://payloadcms.com/docs/database/migrations)
- [Neon Connection Strings Guide](https://neon.tech/docs/connect/connection-string)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
