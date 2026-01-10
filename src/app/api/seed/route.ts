import { NextRequest, NextResponse } from 'next/server'
import seed from '@/lib/payload/seed'
import { timingSafeEqual } from 'crypto'

/**
 * Cloud-Based Database Seeder API Route
 * 
 * Bypasses local environment restrictions by seeding the production database via HTTP.
 * Protected by PAYLOAD_SECRET to prevent unauthorized access.
 * 
 * Usage: GET /api/seed?secret=<PAYLOAD_SECRET>
 * 
 * Returns: { message: 'Database seeded successfully' }
 * 
 * Compatible with Next.js 16 + Payload 3.0
 */

// Track if seeding is currently in progress to prevent concurrent executions
let isSeedingInProgress = false

export async function GET(request: NextRequest) {
  try {
    // Get the secret from query parameters
    const searchParams = request.nextUrl.searchParams
    const secret = searchParams.get('secret')
    
    // Validate against PAYLOAD_SECRET
    const expectedSecret = process.env.PAYLOAD_SECRET
    
    if (!expectedSecret) {
      return NextResponse.json(
        { error: 'Server configuration error: PAYLOAD_SECRET not set' },
        { status: 500 }
      )
    }
    
    if (!secret) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing secret parameter' },
        { status: 401 }
      )
    }
    
    // Use timing-safe comparison to prevent timing attacks
    try {
      const secretBuffer = Buffer.from(secret, 'utf-8')
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
    } catch (error) {
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
      // Run the seed function
      console.log('🌱 Starting cloud database seed via API...')
      await seed()
      console.log('✅ Database seed completed successfully via API')
      
      return NextResponse.json(
        { message: 'Database seeded successfully' },
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
