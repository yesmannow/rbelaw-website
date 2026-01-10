import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

// Generate static params for all attorney slugs (SSG)
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    
    const attorneys = await payload.find({
      collection: 'attorneys',
      limit: 0, // Get all attorneys without limit
      select: {
        slug: true,
      },
    })

    return attorneys.docs.map((attorney) => ({
      slug: attorney.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Attorney page component
export default async function AttorneyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  try {
    const payload = await getPayload({ config })
    
    // Fetch the specific attorney by slug
    const attorneysResult = await payload.find({
      collection: 'attorneys',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    // Handle 404 if attorney not found
    if (!attorneysResult.docs || attorneysResult.docs.length === 0) {
      notFound()
    }

    const attorney = attorneysResult.docs[0]

    // Fetch practice areas if they exist
    let practiceAreas: any[] = []
    if (attorney.practices && Array.isArray(attorney.practices)) {
      const practiceIds = attorney.practices
        .filter((p: any) => typeof p === 'string' || typeof p === 'number')
        .map((p: any) => p)

      if (practiceIds.length > 0) {
        const practiceAreasResult = await payload.find({
          collection: 'practice-areas',
          where: {
            id: {
              in: practiceIds,
            },
          },
        })
        practiceAreas = practiceAreasResult.docs
      }
    }

    // Get headshot URL if available
    const headshotUrl =
      attorney.headshot && typeof attorney.headshot === 'object'
        ? attorney.headshot.url
        : null

    // Create Attorney JSON-LD Schema
    const attorneySchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `https://rbelaw.com/attorneys/${slug}#attorney`,
      name: attorney.name,
      jobTitle: attorney.role?.replace('-', ' ') || 'Attorney',
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
      <main className="min-h-screen bg-gray-50">
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
                <p className="text-xl text-[#B8860B] font-semibold mb-4 capitalize">
                  {attorney.role?.replace('-', ' ')}
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
                      {practiceAreas.map((area: any) => (
                        <Link
                          key={area.id}
                          href={`/practice-areas/${area.slug}`}
                          className="bg-[#B8860B] hover:bg-[#9a710a] text-[#0A2540] px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          {area.title}
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
              {attorney.bio && (
                <div className="prose prose-lg max-w-none text-gray-700">
                  {typeof attorney.bio === 'string' ? (
                    <p>{attorney.bio}</p>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: convertLexicalToHTML({ data: attorney.bio }),
                      }}
                    />
                  )}
                </div>
              )}

              {/* Education */}
              {attorney.education && attorney.education.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                    Education
                  </h3>
                  <ul className="space-y-2">
                    {attorney.education.map((edu: any, index: number) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-semibold">{edu.degree}</span>
                        {edu.institution && ` - ${edu.institution}`}
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
  } catch (error) {
    console.error('Error fetching attorney:', error)
    notFound()
  }
}
