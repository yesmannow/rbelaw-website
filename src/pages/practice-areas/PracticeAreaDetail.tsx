/**
 * Dynamic Practice Area Detail Page
 * Uses the uniform PracticeAreaTemplate for consistent layout across all practice areas
 */

import { useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { MarketTicker } from '@/components/marketing/MarketTicker'
import { PracticeAreaTemplate } from '@/components/practice-areas/PracticeAreaTemplate'
import { enhancedPracticeAreas } from '@/lib/data/practiceAreasEnhanced'

export function PracticeAreaDetail() {
  const { slug } = useParams<{ slug: string }>()

  // Find the practice area by slug
  const practiceArea = enhancedPracticeAreas.find(pa => pa.slug === slug)

  // Dynamic Metadata Injection - SEO Authority Format
  useEffect(() => {
    if (practiceArea) {
      document.title = `${practiceArea.name} | Practice Areas | Riley Bennett Egloff LLP`
    }
  }, [practiceArea])

  // Structural Data Safety: Navigate to 404 if invalid slug
  if (!practiceArea) {
    return <Navigate to="/404" replace />
  }

  // Truncate meta description to 160 characters for SEO
  const metaDescription = practiceArea.detailedDescription.length > 160 
    ? practiceArea.detailedDescription.substring(0, 157) + '...' 
    : practiceArea.detailedDescription

  return (
    <>
      {/* Dynamic Title and OpenGraph Tags - SEO Authority */}
      <Helmet>
        <title>{practiceArea.name} | Practice Areas | Riley Bennett Egloff LLP</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${practiceArea.name} | Practice Areas | Riley Bennett Egloff LLP`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <MarketTicker />
      <PracticeAreaTemplate practiceArea={practiceArea} />
    </>
  )
}
