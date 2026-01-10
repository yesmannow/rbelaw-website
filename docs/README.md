# Documentation

This directory contains historical documentation and scraped content from the RBE Law website migration project.

## Structure

### 📦 archive/
Historical implementation guides, progress logs, and feature documentation from the website development process.

**Contents:**
- **Attorney Features:** `ATTORNEY_*.md` - Attorney bio redesign, data migration, image guides
- **Implementation Guides:** `*_IMPLEMENTATION.md` - Feature implementation summaries
- **Migration Guides:** `MIGRATION_*.md`, `CONTENT_*.md` - Content migration and organization
- **Progress Logs:** `*_COMPLETE.md`, `*_SUMMARY.md` - Project progress and completion status
- **Quick Starts:** `QUICK_START*.md`, `QUICKSTART.md` - Getting started guides
- **Technical Docs:** `COMPONENT_ARCHITECTURE.md`, `FOLDER_STRUCTURE.md` - Architecture documentation

These files are preserved for historical reference but are not actively maintained.

### 🌐 scraped/
Scraped content from the legacy RBE Law website, primarily practice area pages.

**Contents:**
- `rbelaw.com_practice-areas_*.md` - Practice area content extracted from the old site
- `othe rpro page source.txt` - HTML source from legacy pages

This content was used during the migration to the new website and is kept for reference.

## Active Documentation

For current project documentation, see:
- **[../README.md](../README.md)** - Main project README with getting started guide
- **[../ARCHITECTURE.md](../ARCHITECTURE.md)** - Current system architecture and technical decisions

## Scripts

The following scripts reference files in this directory:
- `scripts/convert-practice-areas-md.ts` - Converts scraped practice area markdown files
- `scripts/convert-scraped-data.js` - Generates migration reports in `archive/`
- `scripts/generate-icon-suggestions.js` - Generates icon suggestions in `archive/`
