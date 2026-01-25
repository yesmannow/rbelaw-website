import React from 'react'
import { TeamFilter } from '@/components/TeamFilter'
import { attorneys } from '@/lib/data'

// Enable ISR with 10 minute revalidation
export const revalidate = 600

export default async function AttorneysPage() {
  // Convert attorneys to the format expected by TeamFilter
  const members = attorneys.map(attorney => ({
    id: attorney.id,
    name: attorney.name,
    slug: attorney.slug,
    title: attorney.title,
    email: attorney.email,
    phone: attorney.phone,
    image: attorney.image,
    imageThumb: attorney.imageThumb,
    practiceAreas: attorney.practiceAreas || [],
    industries: attorney.industries || [],
  })).sort((a, b) => a.name.localeCompare(b.name))

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
        {members.length > 0 ? (
          <TeamFilter members={members} />
        ) : (
          <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-6 sm:p-8 mx-2">
            <p className="text-blue-800 font-semibold mb-2 text-sm sm:text-base">
              No team members found
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
