import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

// Generate static params for all practice area slugs (SSG)
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    
    const practiceAreas = await payload.find({
      collection: 'practice-areas',
      limit: 0, // Get all practice areas without limit
      select: {
        slug: true,
      },
    })

    return practiceAreas.docs.map((area) => ({
      slug: area.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Practice Area page component
export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  try {
    const payload = await getPayload({ config })
    
    // Fetch the specific practice area by slug
    const practiceAreasResult = await payload.find({
      collection: 'practice-areas',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    // Handle 404 if practice area not found
    if (!practiceAreasResult.docs || practiceAreasResult.docs.length === 0) {
      notFound()
    }

    const practiceArea = practiceAreasResult.docs[0]

    // Fetch featured attorneys if they exist
    let attorneys: any[] = []
    if (practiceArea.featuredAttorneys && Array.isArray(practiceArea.featuredAttorneys)) {
      const attorneyIds = practiceArea.featuredAttorneys
        .filter((a: any) => typeof a === 'string' || typeof a === 'number')
        .map((a: any) => a)

      if (attorneyIds.length > 0) {
        const attorneysResult = await payload.find({
          collection: 'attorneys',
          where: {
            id: {
              in: attorneyIds,
            },
          },
        })
        attorneys = attorneysResult.docs
      }
    }

    // Fetch industries if they exist
    let industries: any[] = []
    if (practiceArea.industries && Array.isArray(practiceArea.industries)) {
      const industryIds = practiceArea.industries
        .filter((i: any) => typeof i === 'string' || typeof i === 'number')
        .map((i: any) => i)

      if (industryIds.length > 0) {
        const industriesResult = await payload.find({
          collection: 'industries',
          where: {
            id: {
              in: industryIds,
            },
          },
        })
        industries = industriesResult.docs
      }
    }

    // Get featured image URL if available
    const featuredImageUrl =
      practiceArea.featuredImage && typeof practiceArea.featuredImage === 'object'
        ? practiceArea.featuredImage.url
        : null

    // Create Practice Area JSON-LD Schema
    const practiceAreaSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `https://rbelaw.com/practice-areas/${slug}#service`,
      name: practiceArea.title,
      description: practiceArea.description,
      url: `https://rbelaw.com/practice-areas/${slug}`,
      ...(featuredImageUrl && { image: featuredImageUrl }),
      provider: {
        '@type': 'LegalService',
        name: 'Riley Bennett Egloff LLP',
        url: 'https://rbelaw.com',
      },
      serviceType: 'Legal Services',
    }

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
                {practiceArea.title}
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
              alt={practiceArea.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Main Content Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {practiceArea.content && (
                <div className="prose prose-lg max-w-none text-gray-700">
                  {typeof practiceArea.content === 'string' ? (
                    <p>{practiceArea.content}</p>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: convertLexicalToHTML({ data: practiceArea.content }),
                      }}
                    />
                  )}
                </div>
              )}

              {/* Sub Areas */}
              {practiceArea.subAreas && practiceArea.subAreas.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-3xl font-bold text-[#0A2540] mb-6">
                    Our Services Include
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {practiceArea.subAreas.map((subArea: any, index: number) => (
                      <li
                        key={index}
                        className="flex items-start bg-gray-50 p-4 rounded-lg"
                      >
                        <span className="text-[#B8860B] mr-3 text-xl">✓</span>
                        <span className="text-gray-700">{subArea.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Case Studies */}
              {practiceArea.caseStudies && practiceArea.caseStudies.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-3xl font-bold text-[#0A2540] mb-6">
                    Representative Matters
                  </h2>
                  <div className="space-y-6">
                    {practiceArea.caseStudies.map((caseStudy: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                      >
                        <h3 className="text-xl font-bold text-[#0A2540] mb-2">
                          {caseStudy.title}
                        </h3>
                        {caseStudy.year && (
                          <p className="text-sm text-gray-500 mb-3">{caseStudy.year}</p>
                        )}
                        {caseStudy.description && (
                          <p className="text-gray-700 mb-3">{caseStudy.description}</p>
                        )}
                        {caseStudy.outcome && (
                          <p className="text-[#B8860B] font-semibold">
                            Outcome: {caseStudy.outcome}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Attorneys Section */}
        {attorneys.length > 0 && (
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-[#0A2540] mb-8">
                  Our Attorneys
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attorneys.map((attorney: any) => {
                    const headshotUrl =
                      attorney.headshot && typeof attorney.headshot === 'object'
                        ? attorney.headshot.url
                        : null

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
                          <p className="text-[#B8860B] text-sm capitalize">
                            {attorney.role?.replace('-', ' ')}
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
                  {industries.map((industry: any) => (
                    <div
                      key={industry.id}
                      className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700"
                    >
                      {industry.title}
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
  } catch (error) {
    console.error('Error fetching practice area:', error)
    notFound()
  }
}
