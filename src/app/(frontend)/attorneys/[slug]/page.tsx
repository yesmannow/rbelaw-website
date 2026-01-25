import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { Tabs } from '@/components/ui/Tabs'
import { attorneys as allAttorneys } from '@/lib/data/attorneys'
import { practiceAreas as allPracticeAreas } from '@/lib/data/practiceAreas'
import { caseResults as allCaseResults } from '@/lib/data/caseResults'
import { industriesManual } from '@/lib/data/industries-manual'

// Generate static params for all attorney slugs (SSG)
export async function generateStaticParams() {
  return allAttorneys.map((attorney) => ({
    slug: attorney.slug,
  }))
}

// Attorney page component
export default async function AttorneyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // Find attorney by slug
  const attorney = allAttorneys.find((a) => a.slug === slug)
  
  if (!attorney) {
    notFound()
  }

  // Map practice area names to practice area objects
  const practiceAreas = attorney.practiceAreas
    .map((practiceName) => {
      // Try to find by name match
      return allPracticeAreas.find(
        (pa) => pa.name.toLowerCase() === practiceName.toLowerCase() || 
                pa.slug.toLowerCase() === practiceName.toLowerCase().replace(/\s+/g, '-')
      )
    })
    .filter((pa): pa is typeof allPracticeAreas[0] => pa !== undefined)

  // Map industry names to industry objects
  const industries = attorney.industries
    .map((industryName) => {
      return industriesManual.find(
        (ind) => ind.name.toLowerCase() === industryName.toLowerCase() ||
                 ind.slug.toLowerCase() === industryName.toLowerCase().replace(/\s+/g, '-')
      )
    })
    .filter((ind): ind is typeof industriesManual[0] => ind !== undefined)

  // Find case results for this attorney (match by attorney ID or name)
  const caseResults = allCaseResults
    .filter((result) => {
      // Check if attorney ID matches or if attorney name is in the attorneys array
      return result.attorneys.some((attId) => {
        // Try exact ID match
        if (attId === attorney.id || attId === attorney.slug) return true
        // Try name match (case-insensitive, handle variations)
        const attorneyNameLower = attorney.name.toLowerCase()
        const resultAttName = allAttorneys.find(a => a.id === attId || a.slug === attId)?.name.toLowerCase()
        return resultAttName === attorneyNameLower
      })
    })
    .slice(0, 10)
    .map((result) => ({
      id: result.id,
      title: result.title,
      settlementAmount: result.amount ? parseFloat(result.amount.replace(/[^0-9.]/g, '')) : null,
      description: result.summary,
    }))

  // Get headshot URL
  const headshotUrl = attorney.image || null

    // Create Attorney JSON-LD Schema
    const attorneySchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `https://rbelaw.com/attorneys/${slug}#attorney`,
      name: attorney.name,
      jobTitle: attorney.title || 'Attorney',
      email: attorney.email || '',
      telephone: attorney.phone || '+1-317-636-8000',
      url: `https://rbelaw.com/attorneys/${slug}`,
      ...(headshotUrl && { image: headshotUrl }),
      worksFor: {
        '@type': 'LegalService',
        name: 'Riley Bennett Egloff LLP',
        url: 'https://rbelaw.com',
      },
      ...(attorney.education &&
        attorney.education.length > 0 && {
          alumniOf: attorney.education.map((edu: any) => ({
            '@type': 'EducationalOrganization',
            name: edu.institution,
          })),
        }),
      ...(practiceAreas.length > 0 && {
        knowsAbout: practiceAreas.map((area: any) => area.title),
      }),
    }

    return (
      <main className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        {/* Attorney JSON-LD Schema */}
        <Script
          id="attorney-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(attorneySchema),
          }}
          strategy="beforeInteractive"
        />

        {/* Attorney Profile Section */}
        <div className="bg-gradient-to-b from-[#0A2540] to-[#134067] text-white py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Headshot */}
              <div className="w-full md:w-1/3">
                {headshotUrl ? (
                  <div className="relative w-full aspect-square max-w-sm mx-auto md:mx-0 rounded-lg overflow-hidden border-4 border-[#B8860B]">
                    <Image
                      src={headshotUrl}
                      alt={attorney.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square max-w-sm mx-auto md:mx-0 bg-gray-700 rounded-lg flex items-center justify-center border-4 border-[#B8860B]">
                    <div className="text-6xl text-gray-500">
                      {attorney.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </div>
                  </div>
                )}
              </div>

              {/* Attorney Info */}
              <div className="w-full md:w-2/3">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {attorney.name}
                </h1>
                <p className="text-xl text-[#B8860B] font-semibold mb-4">
                  {attorney.title}
                </p>

                {/* Contact Information */}
                <div className="space-y-2 mb-6">
                  {attorney.email && (
                    <p className="text-gray-300">
                      <span className="font-semibold">Email:</span>{' '}
                      <a
                        href={`mailto:${attorney.email}`}
                        className="text-[#B8860B] hover:underline"
                      >
                        {attorney.email}
                      </a>
                    </p>
                  )}
                  {attorney.phone && (
                    <p className="text-gray-300">
                      <span className="font-semibold">Phone:</span>{' '}
                      <a
                        href={`tel:${attorney.phone}`}
                        className="text-[#B8860B] hover:underline"
                      >
                        {attorney.phone}
                      </a>
                    </p>
                  )}
                </div>

                {/* Practice Areas */}
                {practiceAreas.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3">Practice Areas</h2>
                    <div className="flex flex-wrap gap-2">
                      {practiceAreas.map((area) => (
                        <Link
                          key={area.id}
                          href={`/practice-areas/${area.slug}`}
                          className="bg-[#B8860B] hover:bg-[#9a710a] text-[#0A2540] px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          {area.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0A2540] mb-6">
                Biography
              </h2>
              {attorney.bio && attorney.bio.length > 0 && (
                <div className="prose prose-lg max-w-none text-gray-700">
                  {attorney.bio.map((paragraph, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>
              )}

              {/* Education */}
              {attorney.education && attorney.education.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                    Education
                  </h3>
                  <ul className="space-y-2">
                    {attorney.education.map((edu, index: number) => (
                      <li key={index} className="text-gray-700">
                        {edu.institution}
                        {edu.degree && ` - ${edu.degree}`}
                        {edu.year && ` (${edu.year})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bar Admissions */}
              {attorney.quickFacts?.barAdmissions &&
                attorney.quickFacts.barAdmissions.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                      Bar Admissions
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {attorney.quickFacts.barAdmissions.map(
                        (admission: any, index: number) => (
                          <li key={index} className="text-gray-700">
                            {admission.admission}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Representative Experience and Industry Focus */}
        {(caseResults.length > 0 || industries.length > 0) && (
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-[#0A2540] mb-8">
                  Professional Highlights
                </h2>
                <Tabs
                  tabs={[
                    ...(caseResults.length > 0
                      ? [
                          {
                            id: 'experience',
                            label: 'Representative Experience',
                            content: (
                              <div className="space-y-6">
                                {caseResults.map((caseResult, index: number) => (
                                  <div
                                    key={caseResult.id || index}
                                    className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                                  >
                                    <h3 className="text-xl font-bold text-[#0A2540] mb-2">
                                      {caseResult.title}
                                    </h3>
                                    {caseResult.settlementAmount && (
                                      <p className="text-lg font-semibold text-[#B8860B] mb-3">
                                        ${caseResult.settlementAmount.toLocaleString()}
                                      </p>
                                    )}
                                    {caseResult.description && (
                                      <p className="text-gray-700">
                                        {caseResult.description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ),
                          },
                        ]
                      : []),
                    ...(industries.length > 0
                      ? [
                          {
                            id: 'industries',
                            label: 'Industry Focus',
                            content: (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {industries.map((industry) => (
                                  <div
                                    key={industry.slug}
                                    className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                                  >
                                    <h3 className="text-xl font-bold text-[#0A2540] mb-2">
                                      {industry.name}
                                    </h3>
                                    {industry.intro && (
                                      <p className="text-gray-700">
                                        {industry.intro}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ),
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* Back to Team Link */}
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
