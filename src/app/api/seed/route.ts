import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { spawn } from 'child_process'
import { join } from 'path'

/**
 * Staging-Only Database Seeder API Route
 *
 * SECURITY: This endpoint is disabled by default and requires explicit enablement.
 * Only use in staging environments, NEVER in production unless explicitly enabled.
 *
 * Requirements:
 * - ALLOW_SEED_ENDPOINT=1 (must be set in environment)
 * - SEED_SECRET header must match process.env.SEED_SECRET
 * - POST method only
 *
 * Usage:
 *   POST /api/seed
 *   Headers: { "x-seed-secret": "<SEED_SECRET>" }
 *
 * Returns: { message: 'Database seeded successfully', results: {...} }
 *
 * Compatible with Next.js 16 + Payload 3.0
 */

// Track if seeding is currently in progress to prevent concurrent executions
let isSeedingInProgress = false

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Check if endpoint is enabled
    if (process.env.ALLOW_SEED_ENDPOINT !== '1') {
      return NextResponse.json(
        { error: 'Forbidden: Seed endpoint is disabled. Set ALLOW_SEED_ENDPOINT=1 to enable.' },
        { status: 403 }
      )
    }

    // SECURITY: Require SEED_SECRET environment variable
    const expectedSecret = process.env.SEED_SECRET
    if (!expectedSecret) {
      return NextResponse.json(
        { error: 'Server configuration error: SEED_SECRET not set' },
        { status: 500 }
      )
    }

    // SECURITY: Get secret from header (not query param for POST)
    const providedSecret = request.headers.get('x-seed-secret')

    if (!providedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing x-seed-secret header' },
        { status: 401 }
      )
    }

    // SECURITY: Use timing-safe comparison to prevent timing attacks
    try {
      const secretBuffer = Buffer.from(providedSecret, 'utf-8')
      const expectedBuffer = Buffer.from(expectedSecret, 'utf-8')

      // Ensure buffers are same length for timing-safe comparison
      if (secretBuffer.length !== expectedBuffer.length) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid secret' },
          { status: 401 }
        )
      }

      if (!timingSafeEqual(secretBuffer, expectedBuffer)) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid secret' },
          { status: 401 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid secret' },
        { status: 401 }
      )
    }

    // Prevent concurrent seed operations
    if (isSeedingInProgress) {
      return NextResponse.json(
        { error: 'Seed operation already in progress. Please wait and try again.' },
        { status: 409 }
      )
    }

    // Mark seeding as in progress
    isSeedingInProgress = true

    try {
      // Run the seed-all script
      console.log('🌱 Starting database seed via API...')

      const seedScriptPath = join(process.cwd(), 'scripts', 'seed-all.mjs')
      const result = await runSeedScript(seedScriptPath)

      console.log('✅ Database seed completed successfully via API')

      return NextResponse.json(
        {
          message: 'Database seeded successfully',
          results: result
        },
        { status: 200 }
      )
    } finally {
      // Always reset the flag, even if an error occurs
      isSeedingInProgress = false
    }
  } catch (error) {
    console.error('❌ Seed API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Run the seed-all script and capture output
 */
function runSeedScript(scriptPath: string): Promise<{ success: boolean; output: string }> {
  return new Promise((resolve, reject) => {
    const output: string[] = []

    // On Windows, handle paths with spaces by using a command string
    const isWindows = process.platform === 'win32'
    const command = isWindows
      ? `tsx "${scriptPath}"`
      : `tsx ${scriptPath}`

    const child = spawn(command, {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    })

    child.stdout?.on('data', (data) => {
      output.push(data.toString())
    })

    child.stderr?.on('data', (data) => {
      output.push(data.toString())
    })

    child.on('close', (code) => {
      const outputStr = output.join('\n')
      if (code === 0) {
        resolve({ success: true, output: outputStr })
      } else {
        reject(new Error(`Seed script failed with exit code ${code}\n${outputStr}`))
      }
    })

    child.on('error', (error) => {
      reject(error)
    })
  })
}

// Explicitly disable GET method for security
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST with x-seed-secret header.' },
    { status: 405 }
  )
}
