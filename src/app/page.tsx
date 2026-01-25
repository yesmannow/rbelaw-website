import React from 'react'
import Link from 'next/link'
import { HealthcareRegulatoryAlert } from '@/components/legal/HealthcareRegulatoryAlert'
import { practiceAreas as allPracticeAreas, attorneys as allAttorneys } from '@/lib/data'

// Enable Incremental Static Regeneration with 10 minute revalidation
export const revalidate = 600

export default async function HomePage() {
  // Get first 6 practice areas and attorneys from static data
  const practiceAreas = allPracticeAreas.slice(0, 6).map(area => ({
    id: area.id,
    title: area.name,
    slug: area.slug,
    description: area.description,
  }))

  const attorneys = allAttorneys.slice(0, 6).map(attorney => ({
    id: attorney.id,
    name: attorney.name,
    slug: attorney.slug,
    role: attorney.title,
  }))

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A2540] to-[#134067] pb-20 md:pb-0 overflow-x-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center text-white max-w-full">
        <div className="mb-6 sm:mb-8 w-full px-2 max-w-full overflow-visible">
          <svg
            viewBox="0 0 300 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-full h-auto"
            style={{ maxWidth: '100%' }}
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="150"
              y="35"
              fontFamily="serif"
              fontSize="22"
              fontWeight="700"
              fill="#B8860B"
              textAnchor="middle"
              letterSpacing="0.5"
            >
              RILEY BENNETT EGLOFF
            </text>
            <text
              x="150"
              y="55"
              fontFamily="sans-serif"
              fontSize="10"
              fontWeight="400"
              fill="#FFFFFF"
              textAnchor="middle"
              letterSpacing="2"
            >
              L L P
            </text>
            <line x1="50" y1="62" x2="250" y2="62" stroke="#B8860B" strokeWidth="1" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-2 break-words max-w-full">
          Corporate Law Excellence
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-300 px-2 max-w-3xl mx-auto break-words">
          Trusted legal counsel for businesses and professionals across Indiana
        </p>

      </div>

      {/* Practice Areas Section - Proof of CMS Data */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0A2540] mb-8 text-center">
            Practice Areas
          </h2>

          {practiceAreas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceAreas.map((area: any) => (
                <div
                  key={area.id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-[#B8860B] hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold text-[#0A2540] mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {area.description?.substring(0, 120)}...
                  </p>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="text-[#B8860B] hover:text-[#9a710a] font-semibold text-sm"
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
              <p className="mb-2">No practice areas found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Attorneys Section - Proof of CMS Data */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0A2540] mb-8 text-center">
            Our Team
          </h2>

          {attorneys.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attorneys.map((attorney: any) => (
                <div
                  key={attorney.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#B8860B] hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold text-[#0A2540] mb-1">
                    {attorney.name}
                  </h3>
                  <p className="text-[#B8860B] font-medium mb-4 capitalize">
                    {attorney.role?.replace('-', ' ')}
                  </p>
                  <Link
                    href={`/attorneys/${attorney.slug}`}
                    className="text-[#B8860B] hover:text-[#9a710a] font-semibold text-sm"
                  >
                    View Profile →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8 bg-white rounded-lg">
              <p className="mb-2">No attorneys found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Healthcare Regulatory Alerts Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-8 text-center">
              Healthcare Regulatory Alerts
            </h2>
            <HealthcareRegulatoryAlert query="healthcare" days={14} limit={10} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Riley Bennett Egloff LLP © 2026</p>
          </div>
        </div>
      </div>
    </main>
  )
}


