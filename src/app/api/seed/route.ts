import { NextRequest, NextResponse } from 'next/server'
import seed from '@/lib/payload/seed'

/**
 * Seed API Route
 * 
 * This route allows seeding the database via HTTP request.
 * Protected by a secret query parameter to prevent unauthorized access.
 * 
 * Usage: GET /api/seed?secret=my-super-secret-key-rbelaw-2026
 * 
 * Returns: { message: 'Database seeded successfully' }
 */
export async function GET(request: NextRequest) {
  try {
    // Get the secret from query parameters
    const searchParams = request.nextUrl.searchParams
    const secret = searchParams.get('secret')
    
    // Check if the secret matches
    const expectedSecret = process.env.SEED_SECRET || 'my-super-secret-key-rbelaw-2026'
    
    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing secret' },
        { status: 401 }
      )
    }
    
    // Run the seed function
    console.log('Starting database seed via API...')
    await seed()
    console.log('Database seed completed successfully via API')
    
    return NextResponse.json(
      { message: 'Database seeded successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Seed API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
