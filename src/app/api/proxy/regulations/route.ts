import { NextRequest, NextResponse } from 'next/server'

/**
 * Secure Proxy Route for Regulations.gov API
 *
 * This route handler provides a secure server-side proxy for the Regulations.gov API.
 * All external API calls happen server-side only - no API keys are exposed to the client.
 *
 * Query Parameters:
 * - q (string, optional): Search query, default "healthcare"
 * - days (number, optional): Number of days to look back, default 14
 * - limit (number, optional): Max results, default 10, clamped 1-50
 *
 * Returns a standardized JSON response with caching headers.
 */

interface RegulationsGovDocument {
  id: string
  type: string
  attributes: {
    title: string
    agencyId?: string
    documentType?: string
    postedDate?: string
    summary?: string
    lastModifiedDate?: string
  }
  links?: {
    self?: string
  }
}

interface RegulationsGovResponse {
  data?: RegulationsGovDocument[]
  meta?: {
    totalElements?: number
  }
}

interface ProxyResponse {
  ok: boolean
  source: 'Regulations.gov'
  query: {
    q: string
    days: number
    limit: number
  }
  updatedAt: string
  items: Array<{
    id: string
    title: string
    agency?: string
    type?: string
    postedDate?: string
    url?: string
    summary?: string
  }>
  message?: string
}

// External API configuration
const REGULATIONS_GOV_BASE_URL = 'https://api.regulations.gov/v4/documents'
const REQUEST_TIMEOUT_MS = 7000 // 7 seconds

export async function GET(request: NextRequest) {
  try {
    // Validate API key
    const apiKey = process.env.REGULATIONS_GOV_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          source: 'Regulations.gov',
          query: { q: '', days: 0, limit: 0 },
          updatedAt: new Date().toISOString(),
          items: [],
          message: 'Regulations.gov API key not configured. Set REGULATIONS_GOV_API_KEY environment variable.',
        } as ProxyResponse,
        {
          status: 200, // Return 200 so frontend can handle gracefully
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
          },
        }
      )
    }

    // Parse and validate query parameters
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q') || 'healthcare'
    const daysParam = searchParams.get('days')
    const limitParam = searchParams.get('limit')

    const days = daysParam ? Math.max(1, Math.min(365, parseInt(daysParam, 10) || 14)) : 14
    const limit = limitParam ? Math.max(1, Math.min(50, parseInt(limitParam, 10) || 10)) : 10

    // Calculate date range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Build external API request URL
    const externalUrl = new URL(REGULATIONS_GOV_BASE_URL)
    externalUrl.searchParams.set('filter[agencyId]', 'CMS')
    externalUrl.searchParams.set('filter[documentType]', 'Proposed Rule')
    externalUrl.searchParams.set('filter[postedDate][ge]', startDate.toISOString().split('T')[0])
    externalUrl.searchParams.set('sort', '-postedDate')
    externalUrl.searchParams.set('page[size]', limit.toString())

    // Make external API request with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(externalUrl.toString(), {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'Accept': 'application/json',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        console.error(`Regulations.gov API error: ${response.status} ${response.statusText}`)
        return NextResponse.json(
          {
            ok: false,
            source: 'Regulations.gov',
            query: { q, days, limit },
            updatedAt: new Date().toISOString(),
            items: [],
            message: `Regulations.gov API returned error: ${response.status}`,
          } as ProxyResponse,
          {
            status: 200, // Return 200 so frontend can handle gracefully
            headers: {
              'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
          }
        )
      }

      const data: RegulationsGovResponse = await response.json()

      // Transform external API response to standardized format
      const items = (data.data || []).map((doc) => {
        const attrs = doc.attributes || {}
        const documentId = doc.id || ''

        return {
          id: documentId,
          title: attrs.title || 'Untitled Document',
          agency: attrs.agencyId || 'CMS',
          type: attrs.documentType || 'Proposed Rule',
          postedDate: attrs.postedDate || undefined,
          url: documentId ? `https://www.regulations.gov/document/${documentId}` : undefined,
          summary: attrs.summary || undefined,
        }
      })

      // Return successful response with caching headers
      return NextResponse.json(
        {
          ok: true,
          source: 'Regulations.gov',
          query: { q, days, limit },
          updatedAt: new Date().toISOString(),
          items,
        } as ProxyResponse,
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (fetchError: any) {
      clearTimeout(timeoutId)

      if (fetchError.name === 'AbortError') {
        console.error('Regulations.gov API request timed out')
        return NextResponse.json(
          {
            ok: false,
            source: 'Regulations.gov',
            query: { q, days, limit },
            updatedAt: new Date().toISOString(),
            items: [],
            message: 'Request to Regulations.gov API timed out',
          } as ProxyResponse,
          {
            status: 200,
            headers: {
              'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
          }
        )
      }

      throw fetchError
    }
  } catch (error: any) {
    console.error('Error in regulations proxy:', error)
    return NextResponse.json(
      {
        ok: false,
        source: 'Regulations.gov',
        query: { q: '', days: 0, limit: 0 },
        updatedAt: new Date().toISOString(),
        items: [],
        message: 'Internal server error while fetching regulations data',
      } as ProxyResponse,
      {
        status: 200, // Return 200 so frontend can handle gracefully
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  }
}
