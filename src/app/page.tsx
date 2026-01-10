import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

// Enable Incremental Static Regeneration with 10 minute revalidation
export const revalidate = 600

export default async function HomePage() {
  let practiceAreas: any[] = []
  let attorneys: any[] = []
  let dbConnected = false

  try {
    const payload = await getPayload({ config })
    
    // Fetch data to prove migration success
    const practiceAreasResult = await payload.find({
      collection: 'practice-areas',
      limit: 6,
      select: {
        title: true,
        slug: true,
        description: true,
      },
    })
    practiceAreas = practiceAreasResult.docs

    const attorneysResult = await payload.find({
      collection: 'attorneys',
      limit: 6,
      select: {
        name: true,
        slug: true,
        role: true,
      },
    })
    attorneys = attorneysResult.docs
    dbConnected = true
  } catch (error) {
    console.error('Database connection failed:', error)
    // Continue rendering with empty data
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A2540] to-[#134067] pb-20 md:pb-0 overflow-x-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center text-white max-w-full">
        <div className="mb-6 sm:mb-8 overflow-hidden">
          <svg
            viewBox="0 0 300 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] h-auto"
          >
            <text
              x="150"
              y="35"
              fontFamily="serif"
              fontSize="28"
              fontWeight="700"
              fill="#B8860B"
              textAnchor="middle"
              letterSpacing="2"
            >
              RILEY BENNETT EGLOFF
            </text>
            <text
              x="150"
              y="55"
              fontFamily="sans-serif"
              fontSize="12"
              fontWeight="400"
              fill="#FFFFFF"
              textAnchor="middle"
              letterSpacing="3"
            >
              L L P
            </text>
            <line x1="50" y1="62" x2="250" y2="62" stroke="#B8860B" strokeWidth="1" />
          </svg>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-2">
          Corporate Law Excellence
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-300 px-2 max-w-3xl mx-auto">
          Trusted legal counsel for businesses and professionals across Indiana
        </p>
        
        {/* Status Badge */}
        <div className={`inline-block ${dbConnected ? 'bg-green-500/20 border-green-500' : 'bg-yellow-500/20 border-yellow-500'} border rounded-lg px-4 sm:px-6 py-2 sm:py-3 mb-8 sm:mb-12 mx-2 max-w-full`}>
          <p className={`${dbConnected ? 'text-green-300' : 'text-yellow-300'} font-semibold text-xs sm:text-sm md:text-base break-words`}>
            {dbConnected 
              ? '✅ Payload CMS Integration Active - Data Successfully Loaded' 
              : '⚠️ Database Not Connected - Run npx payload migrate'}
          </p>
        </div>
      </div>

      {/* Practice Areas Section - Proof of CMS Data */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0A2540] mb-8 text-center">
            Practice Areas
            {dbConnected && (
              <span className="ml-3 text-sm font-normal text-green-600">
                (Loaded from Payload CMS)
              </span>
            )}
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
              <p className="text-sm">
                Run <code className="bg-gray-200 px-2 py-1 rounded">npm run seed</code> to populate data after deploying.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Attorneys Section - Proof of CMS Data */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0A2540] mb-8 text-center">
            Our Team
            {dbConnected && (
              <span className="ml-3 text-sm font-normal text-green-600">
                (Loaded from Payload CMS)
              </span>
            )}
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
              <p className="text-sm">
                Run <code className="bg-gray-200 px-2 py-1 rounded">npm run seed</code> to populate data after deploying.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Access */}
      <div className="bg-[#0A2540] py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Admin Panel Access
          </h2>
          <p className="text-gray-300 mb-6">
            Manage content, attorneys, practice areas, and contact requests
          </p>
          <Link
            href="/admin"
            className="inline-block bg-[#B8860B] hover:bg-[#9a710a] text-[#0A2540] font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Access Admin Panel
          </Link>
        </div>
      </div>

      {/* Migration Status Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">✅</div>
              <div className="font-semibold mb-1">Phase 1</div>
              <div className="text-sm text-gray-400">Infrastructure</div>
            </div>
            <div>
              <div className="text-3xl mb-2">✅</div>
              <div className="font-semibold mb-1">Phase 2</div>
              <div className="text-sm text-gray-400">Schema (8 Collections)</div>
            </div>
            <div>
              <div className="text-3xl mb-2">✅</div>
              <div className="font-semibold mb-1">Phase 3</div>
              <div className="text-sm text-gray-400">Data Migration</div>
            </div>
            <div>
              <div className="text-3xl mb-2">✅</div>
              <div className="font-semibold mb-1">Phase 5</div>
              <div className="text-sm text-gray-400">Contact + Zapier</div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Riley Bennett Egloff LLP © 2026 | Powered by Payload CMS</p>
          </div>
        </div>
      </div>
    </main>
  )
}


