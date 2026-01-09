/**
 * Dynamic Practice Area Detail Page
 * Uses useParams() to fetch slug and pull data from practiceAreasEnhanced.ts
 * Includes: Dynamic metadata, smart tab logic, view transitions, layout stability
 */

import { useParams, Navigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { MarketTicker } from '@/components/marketing/MarketTicker'
import { PracticeAreaHero } from '@/components/practice-areas/PracticeAreaHero'
import { FeaturedTool } from '@/components/practice-areas/FeaturedTool'
import { InteractiveResource } from '@/components/resources'
import { AttorneyCard } from '@/components/attorneys'
import { getAttorneysByPracticeArea } from '@/lib/data/attorney-helpers'
import { enhancedPracticeAreas } from '@/lib/data/practiceAreasEnhanced'
import { getToolForPracticeArea } from '@/lib/data/toolMappings'

export function PracticeAreaDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [isLoading, setIsLoading] = useState(true)

  // Find the practice area by slug
  const practiceArea = enhancedPracticeAreas.find(pa => pa.slug === slug)

  // Get attorneys for this practice area
  const team = practiceArea ? getAttorneysByPracticeArea(practiceArea.name) : []
  
  // Get featured tool for this practice area (if available)
  const featuredTool = slug ? getToolForPracticeArea(slug) : undefined

  // Dynamic Metadata Injection - SEO Authority Format
  useEffect(() => {
    if (practiceArea) {
      document.title = `${practiceArea.name} | Practice Areas | Riley Bennett Egloff LLP`
    }
  }, [practiceArea])

  // Skeleton loading state
  useEffect(() => {
    const SKELETON_DURATION = 300
    const timer = setTimeout(() => setIsLoading(false), SKELETON_DURATION)
    return () => clearTimeout(timer)
  }, [])

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

      <div className="min-h-screen bg-neutral-50">
        <MarketTicker />

        {/* Hero with View Transition Support & Layout Stability */}
        <div 
          className="relative min-h-[400px]"
          style={{ viewTransitionName: 'service-hero' }}
        >
          {practiceArea.backgroundImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${practiceArea.backgroundImage})`,
                opacity: 0.1
              }}
            >
              <div className="absolute inset-0 bg-primary-navy opacity-50" />
            </div>
          )}
          <div className="relative">
            <PracticeAreaHero
              title={practiceArea.name}
              description={practiceArea.detailedDescription}
              slug={practiceArea.slug}
            />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="section-container py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-navy">Home</Link>
            <span>/</span>
            <Link to="/practice-areas" className="hover:text-primary-navy">Practice Areas</Link>
            <span>/</span>
            <span className="text-primary-navy font-medium">{practiceArea.name}</span>
          </nav>
        </div>

        {/* Content */}
        <div className="section-container py-12">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
              <p>{practiceArea.detailedDescription}</p>

              {/* Key Services - Smart Tab Logic: Only show if not empty */}
              {practiceArea.keyServices && practiceArea.keyServices.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Key Services</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {practiceArea.keyServices.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-2 text-xl font-bold text-gray-900">How Can We Help?</h3>
              <p className="mb-4 text-gray-600">
                Speak with our {practiceArea.name} team to get clear, practical guidance tailored to your goals.
              </p>
              <a 
                href="/contact" 
                className="inline-block rounded-lg bg-rbe-navy px-6 py-3 text-white hover:bg-rbe-navy/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
          
          {/* Featured Tool - Only show if tool is available for this practice area */}
          {featuredTool && (
            <FeaturedTool mapping={featuredTool} />
          )}
        </div>

        {/* Interactive Resource (Insight Center) - New prestige section */}
        {featuredTool && (
          <InteractiveResource mapping={featuredTool} />
        )}

        {/* Professionals Section - Smart Tab Logic: Only show if there are attorneys */}
        {/* Performance: Layout Stability with min-height and loading state */}
        {team.length > 0 && (
          <section className="py-16 lg:py-20 bg-neutral-50 min-h-[400px]">
            <div className="section-container">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-8">
                Professionals in {practiceArea.name}
              </h2>
              {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-64 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {team.map((attorney, index) => (
                    <AttorneyCard
                      key={attorney.id}
                      attorney={attorney}
                      index={index}
                      showContact={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
