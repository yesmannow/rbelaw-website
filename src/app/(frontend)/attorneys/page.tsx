import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { TeamFilter } from '@/components/TeamFilter'

// Enable ISR with 10 minute revalidation
export const revalidate = 600

export default async function AttorneysPage() {
  let members: any[] = []
  let dbConnected = false

  try {
    const payload = await getPayload({ config })
    
    // Fetch all team members
    const result = await payload.find({
      collection: 'attorneys',
      limit: 100,
      sort: 'name',
    })

    members = result.docs
    dbConnected = true
  } catch (error) {
    console.error('Database connection failed:', error)
  }

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#0A2540] to-[#134067] py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4 break-words px-2">
            Our Team
          </h1>
          <p className="text-base sm:text-lg text-gray-300 text-center max-w-3xl mx-auto break-words px-4">
            Meet the dedicated professionals at Riley Bennett Egloff LLP who work together to serve our clients with excellence
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-full">
        {!dbConnected && (
          <div className="text-center bg-yellow-50 border border-yellow-200 rounded-lg p-6 sm:p-8 mb-8 mx-2">
            <p className="text-yellow-800 font-semibold mb-2 text-sm sm:text-base">
              ⚠️ Database Not Connected
            </p>
            <p className="text-yellow-700 text-xs sm:text-sm break-words">
              Run <code className="bg-yellow-100 px-2 py-1 rounded">npx payload migrate</code> to initialize the database
            </p>
          </div>
        )}

        {dbConnected && members.length === 0 && (
          <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-6 sm:p-8 mx-2">
            <p className="text-blue-800 font-semibold mb-2 text-sm sm:text-base">
              No team members found
            </p>
            <p className="text-blue-700 text-xs sm:text-sm">
              Add team members through the <Link href="/admin" className="underline hover:text-blue-900">Admin Panel</Link>
            </p>
          </div>
        )}

        {dbConnected && members.length > 0 && (
          <TeamFilter members={members} />
        )}
      </div>
    </main>
  )
}
