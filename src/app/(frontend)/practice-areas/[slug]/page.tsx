import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import type { Metadata } from 'next'
import { PracticeAreaContent } from '@/components/practice-areas/PracticeAreaContent'
import { practiceAreas as allPracticeAreas } from '@/lib/data/practiceAreas'
import { industriesManual } from '@/lib/data/industries-manual'
import { createPracticeAreaSchema, findAttorneysForPracticeArea } from '@/lib/utils/practice-area-page-utils'

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  
  const practiceArea = allPracticeAreas.find((pa) => pa.slug === slug)

  if (!practiceArea) {
    return {
      title: 'Practice Area Not Found',
      description: 'The requested practice area could not be found.',
    }
  }

  const title = `Riley Bennett Egloff LLP - ${practiceArea.name}`
  const description = practiceArea.description || `Legal services for ${practiceArea.name}`
  const url = `https://rbelaw.com/practice-areas/${slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

// Generate static params for all practice area slugs (SSG)
export async function generateStaticParams() {
  return allPracticeAreas.map((area) => ({
    slug: area.slug,
  }))
}

// Practice Area page component
export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // Find practice area by slug
  const practiceArea = allPracticeAreas.find((pa) => pa.slug === slug)
  
  if (!practiceArea) {
    notFound()
  }

  // Find attorneys who practice in this area
  const attorneys = findAttorneysForPracticeArea(practiceArea.slug, practiceArea.name)

  // Find related industries (this would need to be mapped from practice area data)
  // For now, we'll leave industries empty or try to match from attorney industries
  const industries: typeof industriesManual = []

  // Get featured image URL if available
  const featuredImageUrl = practiceArea.imageUrl || null

  // Create Practice Area JSON-LD Schema
  const practiceAreaSchema = createPracticeAreaSchema(practiceArea, slug)

  return (
    <main className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Practice Area JSON-LD Schema */}
      <Script
        id="practice-area-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(practiceAreaSchema),
        }}
        strategy="beforeInteractive"
      />

      {/* Practice Area Header Section */}
      <div className="bg-gradient-to-b from-[#0A2540] to-[#134067] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {practiceArea.name}
            </h1>
            {practiceArea.description && (
              <p className="text-xl text-gray-300 leading-relaxed">
                {practiceArea.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {featuredImageUrl && (
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={featuredImageUrl}
            alt={practiceArea.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Main Content Section - Editorial Magazine Layout */}
      <PracticeAreaContent 
        content={practiceArea.detailedDescription || ''}
        leadMagnetType={undefined}
        subAreas={practiceArea.subAreas ?? undefined}
        caseStudies={practiceArea.caseStudies ?? undefined}
      />

      {/* Featured Attorneys Section */}
      {attorneys.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0A2540] mb-8">
                Our Attorneys
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attorneys.map((attorney) => {
                  const headshotUrl = attorney.image || null

                  return (
                    <Link
                      key={attorney.id}
                      href={`/attorneys/${attorney.slug}`}
                      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#B8860B] hover:shadow-lg transition-all"
                    >
                      {headshotUrl ? (
                        <div className="relative w-full h-64">
                          <Image
                            src={headshotUrl}
                            alt={attorney.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                          <div className="text-4xl text-gray-400">
                            {attorney.name
                              .split(' ')
                              .map((n: string) => n[0])
                              .join('')}
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-[#0A2540] mb-1">
                          {attorney.name}
                        </h3>
                        <p className="text-[#B8860B] text-sm">
                          {attorney.title}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Industries Section */}
      {industries.length > 0 && (
        <div className="bg-white py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0A2540] mb-6">
                Related Industries
              </h2>
              <div className="flex flex-wrap gap-3">
                {industries.map((industry) => (
                  <div
                    key={industry.slug}
                    className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700"
                  >
                    {industry.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Practice Areas Link */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center">
          <Link
            href="/"
            className="text-[#B8860B] hover:text-[#9a710a] font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
