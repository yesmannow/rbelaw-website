/**
 * Seed All Runner
 * Sequentially runs all seed scripts in the correct order:
 * 1. Attorneys
 * 2. Practice Areas
 * 3. Attorney-Practice Area Relations
 * 4. Blog Posts (optional)
 *
 * Exits with non-zero code if any script fails.
 *
 * Usage: npm run db:seed
 */

import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const scriptsDir = __dirname

// Seed scripts in order
const seedScripts = [
  {
    name: 'Attorneys',
    script: join(scriptsDir, 'seed-attorneys.mjs'),
  },
  {
    name: 'Practice Areas',
    script: join(scriptsDir, 'seed-practice-areas.mjs'),
  },
  {
    name: 'Attorney-Practice Area Relations',
    script: join(scriptsDir, 'seed-attorney-practice-areas.mjs'),
  },
  // Blog posts are optional - uncomment if you want to seed them
  // {
  //   name: 'Blog Posts',
  //   script: join(scriptsDir, 'seed-blog-posts.mjs'),
  // },
]

/**
 * Run a seed script and wait for completion
 */
function runScript(scriptPath, scriptName) {
  return new Promise((resolve, reject) => {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`🌱 Running: ${scriptName}`)
    console.log(`${'='.repeat(60)}\n`)

    // On Windows, we need to handle paths with spaces properly
    // Use shell: true and pass as a single command string to ensure proper escaping
    const isWindows = process.platform === 'win32'
    const command = isWindows
      ? `tsx "${scriptPath}"`
      : `tsx ${scriptPath}`

    const child = spawn(command, {
      stdio: 'inherit',
      shell: true,
    })

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${scriptName} completed successfully\n`)
        resolve()
      } else {
        console.error(`\n❌ ${scriptName} failed with exit code ${code}\n`)
        reject(new Error(`${scriptName} failed with exit code ${code}`))
      }
    })

    child.on('error', (error) => {
      console.error(`\n❌ Failed to start ${scriptName}:`, error.message)
      reject(error)
    })
  })
}

async function seedAll() {
  console.log('🚀 Starting Complete Database Seed Process...\n')
  console.log(`📋 Will run ${seedScripts.length} seed scripts in order:\n`)
  seedScripts.forEach((s, i) => {
    console.log(`   ${i + 1}. ${s.name}`)
  })
  console.log('')

  try {
    for (const { name, script } of seedScripts) {
      await runScript(script, name)
    }

    console.log('\n' + '='.repeat(60))
    console.log('✅ All seed scripts completed successfully!')
    console.log('='.repeat(60))
    console.log('\n📊 Database seeding complete.')
    console.log('\n🔍 Next steps:')
    console.log('   1. Verify data in Payload Admin: /admin')
    console.log('   2. Check counts in Neon SQL Editor:')
    console.log('      SELECT count(*) FROM public.attorneys;')
    console.log('      SELECT count(*) FROM public.practice_areas;')
    console.log('      SELECT count(*) FROM public.blog;')
    console.log('')

    process.exit(0)
  } catch (error) {
    console.error('\n' + '='.repeat(60))
    console.error('❌ Seed process failed!')
    console.error('='.repeat(60))
    console.error(`\nError: ${error.message}`)
    console.error('\n⚠️  Some data may have been seeded. Check the logs above.')
    console.error('')

    process.exit(1)
  }
}

// Run all seeds
seedAll()
