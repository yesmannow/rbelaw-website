import { NextRequest, NextResponse } from 'next/server'
import seed from '@/lib/payload/seed'

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
    
    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing secret' },
        { status: 401 }
      )
    }
    
    // Run the seed function
    console.log('🌱 Starting cloud database seed via API...')
    await seed()
    console.log('✅ Database seed completed successfully via API')
    
    return NextResponse.json(
      { message: 'Database seeded successfully' },
      { status: 200 }
    )
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
