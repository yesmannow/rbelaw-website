/**
 * Dynamic Industry Detail Page
 * Uses useParams() to fetch slug and pull data from industries-manual.ts
 * Includes: Dynamic metadata, smart tab logic, view transitions, layout stability
 */

import { useParams, Navigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageHeader } from '@/components/layout/PageHeader'
import { AttorneyCard } from '@/components/attorneys'
import { getAttorneysByName } from '@/lib/data/attorney-helpers'
import { getIndustryBySlugManual } from '@/lib/data/industries-manual'
import { ArrowLeft } from 'lucide-react'

export function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [isLoading, setIsLoading] = useState(true)

  // Find the industry by slug
  const industry = slug ? getIndustryBySlugManual(slug) : null

  // Get attorneys for this industry
  const team = industry ? getAttorneysByName(industry.attorneys) : []

  // Dynamic Metadata Injection using useEffect - SEO Authority Format
  useEffect(() => {
    if (industry) {
      document.title = `${industry.name} | Industries | Riley Bennett Egloff LLP`
    }
    // Simulate loading for skeleton
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [industry])

  // Structural Data Safety: Navigate to 404 if invalid slug
  if (!industry) {
    return <Navigate to="/404" replace />
  }

  // Truncate meta description to 160 characters for SEO
  const metaDescription = industry.intro.length > 160 
    ? industry.intro.substring(0, 157) + '...' 
    : industry.intro

  return (
    <>
      {/* Dynamic Title and OpenGraph Tags - SEO Authority */}
      <Helmet>
        <title>{industry.name} | Industries | Riley Bennett Egloff LLP</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${industry.name} | Industries | Riley Bennett Egloff LLP`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero with View Transition Support & Layout Stability */}
        <div className="min-h-[400px]" style={{ viewTransitionName: 'service-hero' }}>
          <PageHeader
            title={industry.name}
            subtitle={industry.intro}
          />
        </div>

        {/* Breadcrumb */}
        <div className="section-container py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-navy">Home</Link>
            <span>/</span>
            <Link to="/industries" className="hover:text-primary-navy">Industries</Link>
            <span>/</span>
            <span className="text-primary-navy font-medium">{industry.name}</span>
          </nav>
        </div>

        {/* Content */}
        <div className="section-container py-12">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
              <p>{industry.intro}</p>

              {/* Services - Smart Tab Logic: Only show if not empty */}
              {industry.services && industry.services.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Services</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {industry.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-2 text-xl font-bold text-gray-900">How Can We Help?</h3>
              <p className="mb-4 text-gray-600">
                Speak with our {industry.name} team to get clear, practical guidance tailored to your goals.
              </p>
              <a 
                href="/contact" 
                className="inline-block rounded-lg bg-rbe-navy px-6 py-3 text-white hover:bg-rbe-navy/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Professionals Section - Smart Tab Logic: Only show if there are attorneys */}
        {/* Performance: Layout Stability with min-height and loading state */}
        {team.length > 0 && (
          <section className="py-16 lg:py-20 bg-gray-50 min-h-[400px]">
            <div className="section-container">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-8">
                Professionals Serving {industry.name}
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
