'use server'

import { unstable_cache } from 'next/cache'

// CourtListener API types
interface CourtListenerResult {
  caseName: string
  dateFiled: string
  absolute_url: string
}

interface CourtListenerResponse {
  results: CourtListenerResult[]
}

// Regulations.gov API types
interface RegulationDocument {
  title: string
  postedDate: string
  commentEndDate: string | null
  documentId: string
}

interface RegulationsGovResponse {
  data: RegulationDocument[]
}

/**
 * Fetch Indiana Supreme Court and Court of Appeals opinions from CourtListener
 * Returns the 5 most recent precedential opinions
 * Cached for 12 hours to respect rate limits
 */
export const getIndianaOpinions = unstable_cache(
  async () => {
    try {
      const apiKey = process.env.COURTLISTENER_KEY
      
      if (!apiKey) {
        console.warn('COURTLISTENER_KEY not configured')
        return []
      }

      const url = 'https://www.courtlistener.com/api/rest/v3/search/?court=ind,indctapp&order_by=dateFiled%20desc&type=o'
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${apiKey}`,
        },
      })

      if (!response.ok) {
        console.error('CourtListener API error:', response.status)
        return []
      }

      const data: CourtListenerResponse = await response.json()
      
      // Return only the 5 most recent
      return data.results.slice(0, 5).map(result => ({
        caseName: result.caseName,
        dateFiled: result.dateFiled,
        url: `https://www.courtlistener.com${result.absolute_url}`,
      }))
    } catch (error) {
      console.error('Error fetching Indiana opinions:', error)
      return []
    }
  },
  ['indiana-opinions'],
  { revalidate: 43200 } // 12 hours
)

/**
 * Fetch healthcare compliance alerts from Regulations.gov
 * Returns proposed rules from CMS (Centers for Medicare & Medicaid Services)
 * Cached for 12 hours to respect rate limits
 */
export const getHealthcareComplianceAlerts = unstable_cache(
  async () => {
    try {
      const apiKey = process.env.REGULATIONS_GOV_KEY
      
      if (!apiKey) {
        console.warn('REGULATIONS_GOV_KEY not configured')
        return []
      }

      // Query for CMS proposed rules
      const url = new URL('https://api.regulations.gov/v4/documents')
      url.searchParams.set('filter[agencyId]', 'CMS')
      url.searchParams.set('filter[documentType]', 'Proposed Rule')
      url.searchParams.set('sort', '-postedDate')
      url.searchParams.set('page[size]', '10')
      
      const response = await fetch(url.toString(), {
        headers: {
          'X-Api-Key': apiKey,
        },
      })

      if (!response.ok) {
        console.error('Regulations.gov API error:', response.status)
        return []
      }

      const data: RegulationsGovResponse = await response.json()
      
      return data.data.map(doc => ({
        title: doc.title,
        postedDate: doc.postedDate,
        commentEndDate: doc.commentEndDate,
        documentId: doc.documentId,
        url: `https://www.regulations.gov/document/${doc.documentId}`,
      }))
    } catch (error) {
      console.error('Error fetching healthcare compliance alerts:', error)
      return []
    }
  },
  ['healthcare-compliance-alerts'],
  { revalidate: 43200 } // 12 hours
)
