/**
 * Master Orchestration Script
 *
 * Orchestrates the complete site analysis workflow:
 * 1. Discover all URLs using Firecrawl
 * 2. Analyze content structure
 * 3. Design enhanced database schema
 *
 * Run with: tsx scripts/orchestrate-site-analysis.ts
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'

const execAsync = promisify(exec)

interface Step {
  name: string
  script: string
  description: string
}

const steps: Step[] = [
  {
    name: 'Site Discovery',
    script: 'scripts/discover-site-urls.ts',
    description: 'Discover all URLs on rbelaw.com using Firecrawl Map and Crawl',
  },
  {
    name: 'Content Analysis',
    script: 'scripts/analyze-content-structure.ts',
    description: 'Analyze content structure and identify patterns',
  },
  {
    name: 'Schema Design',
    script: 'scripts/design-enhanced-schema.ts',
    description: 'Generate enhanced database schema design',
  },
]

async function runStep(step: Step, index: number): Promise<void> {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`Step ${index + 1}/${steps.length}: ${step.name}`)
  console.log(`${step.description}`)
  console.log('='.repeat(60) + '\n')

  try {
    const { stdout, stderr } = await execAsync(`npx tsx ${step.script}`, {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    })

    if (stdout) {
      console.log(stdout)
    }
    if (stderr && !stderr.includes('warning')) {
      console.error(stderr)
    }

    console.log(`\n✅ ${step.name} completed successfully`)
  } catch (error: any) {
    console.error(`\n❌ ${step.name} failed:`)
    console.error(error.message)
    if (error.stdout) console.log(error.stdout)
    if (error.stderr) console.error(error.stderr)
    throw error
  }
}

async function generateSummary(): Promise<void> {
  const outputDir = path.resolve('scripts/output')
  const summaryFile = path.join(outputDir, 'ANALYSIS_SUMMARY.md')

  const summary = `
# Site Analysis Summary
Generated: ${new Date().toISOString()}

## Workflow Completed

This analysis workflow has completed the following steps:

1. **Site Discovery** - Discovered all URLs on rbelaw.com
   - Output: \`site-discovery/sitemap.json\`
   - Output: \`site-discovery/content-samples.json\`

2. **Content Analysis** - Analyzed content structure and patterns
   - Output: \`content-analysis/analysis-report.json\`
   - Output: \`content-analysis/ANALYSIS_REPORT.md\`

3. **Schema Design** - Generated enhanced database schema
   - Output: \`schema-design/enhanced-schema.json\`
   - Output: \`schema-design/migration.sql\`
   - Output: \`schema-design/SCHEMA_DESIGN.md\`

## Next Steps

1. **Review Discovery Results**
   - Check \`scripts/output/site-discovery/DISCOVERY_REPORT.md\`
   - Review discovered URLs and content samples

2. **Review Analysis**
   - Check \`scripts/output/content-analysis/ANALYSIS_REPORT.md\`
   - Understand content patterns and recommendations

3. **Review Schema Design**
   - Check \`scripts/output/schema-design/SCHEMA_DESIGN.md\`
   - Review migration script: \`scripts/output/schema-design/migration.sql\`

4. **Update PayloadCMS Config**
   - Add new fields to collections in \`src/payload.config.ts\`
   - See \`scripts/output/schema-design/enhanced-schema.json\` for field definitions

5. **Run Migration**
   - Backup database first!
   - Test on staging
   - Run: \`psql $DATABASE_URL -f scripts/output/schema-design/migration.sql\`

6. **Update Application Code**
   - Update queries to use new indexes
   - Implement full-text search
   - Add caching where recommended

## Files Generated

\`\`\`
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
\`\`\`

## Key Improvements

- **Full-text search** with PostgreSQL tsvector
- **JSONB metadata** for flexible storage
- **Materialized views** for performance
- **Enhanced indexes** for common queries
- **Better relationships** between collections
- **Content change detection** with hashing
- **Analytics support** with view counts

## Questions?

Review the individual report files for detailed information about each step.
`

  await fs.writeFile(summaryFile, summary, 'utf8')
  console.log(`\n📄 Summary saved to: ${summaryFile}`)
}

async function main() {
  console.log('🚀 Starting Site Analysis Workflow\n')
  console.log('This will:')
  steps.forEach((step, i) => {
    console.log(`  ${i + 1}. ${step.name}: ${step.description}`)
  })
  console.log('\n⏳ This may take several minutes...\n')

  try {
    for (let i = 0; i < steps.length; i++) {
      await runStep(steps[i], i)

      // Small delay between steps
      if (i < steps.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }

    await generateSummary()

    console.log('\n' + '='.repeat(60))
    console.log('✨ All steps completed successfully!')
    console.log('='.repeat(60))
    console.log('\n📁 Check scripts/output/ for all generated files')
    console.log('📄 See scripts/output/ANALYSIS_SUMMARY.md for next steps\n')

  } catch (error) {
    console.error('\n❌ Workflow failed:', error)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
