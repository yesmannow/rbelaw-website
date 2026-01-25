'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface TeamMember {
  id: string
  name: string
  slug: string
  jobType: 'attorney' | 'paralegal' | 'staff'
  role?: string
  title?: string
  email?: string
  phone?: string
  headshot?: {
    url: string
    alt?: string
  }
}

interface TeamFilterProps {
  members: TeamMember[]
}

type FilterType = 'all' | 'attorney' | 'paralegal' | 'staff'

interface FilterButtonProps {
  filter: FilterType
  label: string
  count: number
  activeFilter: FilterType
  onClick: (filter: FilterType) => void
}

const FilterButton = ({ 
  filter, 
  label, 
  count,
  activeFilter,
  onClick
}: FilterButtonProps) => (
  <button
    onClick={() => onClick(filter)}
    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
      activeFilter === filter
        ? 'bg-[#B8860B] text-white shadow-lg'
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
    }`}
  >
    {label} ({count})
  </button>
)

export function TeamFilter({ members }: TeamFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  // Categorize members by jobType
  const attorneys = members.filter(m => m.jobType === 'attorney')
  const paralegals = members.filter(m => m.jobType === 'paralegal')
  const staff = members.filter(m => m.jobType === 'staff')

  // Get filtered members based on active filter
  const getFilteredMembers = () => {
    switch (activeFilter) {
      case 'attorney':
        return attorneys
      case 'paralegal':
        return paralegals
      case 'staff':
        return staff
      default:
        return members
    }
  }

  const filteredMembers = getFilteredMembers()

  const renderMember = (member: TeamMember) => (
    <Link
      key={member.id}
      href={`/attorneys/${member.slug}`}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#B8860B] hover:shadow-xl transition-all group"
    >
      {/* Headshot */}
      {member.headshot?.url && (
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src={member.headshot.url}
            alt={member.headshot.alt || member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#0A2540] mb-1 group-hover:text-[#B8860B] transition-colors break-words">
          {member.name}
        </h3>
        
        {/* Role/Title */}
        {member.jobType === 'attorney' && member.role && (
          <p className="text-[#B8860B] font-medium mb-2 capitalize text-sm">
            {member.role.replace('-', ' ')}
          </p>
        )}
        {member.title && (
          <p className="text-gray-600 text-sm mb-3 break-words">
            {member.title}
          </p>
        )}
        
        {/* Contact */}
        {member.email && (
          <p className="text-gray-600 text-sm mb-1 break-all">
            <a 
              href={`mailto:${member.email}`}
              className="hover:text-[#B8860B] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {member.email}
            </a>
          </p>
        )}
        {member.phone && (
          <p className="text-gray-600 text-sm">
            <a 
              href={`tel:${member.phone.replace(/\D/g, '')}`}
              className="hover:text-[#B8860B] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {member.phone}
            </a>
          </p>
        )}
        
        <div className="mt-4 text-[#B8860B] text-sm font-semibold group-hover:underline">
          View Profile →
        </div>
      </div>
    </Link>
  )

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
        <FilterButton filter="all" label="All Team" count={members.length} activeFilter={activeFilter} onClick={setActiveFilter} />
        <FilterButton filter="attorney" label="Attorneys" count={attorneys.length} activeFilter={activeFilter} onClick={setActiveFilter} />
        <FilterButton filter="paralegal" label="Paralegals" count={paralegals.length} activeFilter={activeFilter} onClick={setActiveFilter} />
        <FilterButton filter="staff" label="Staff" count={staff.length} activeFilter={activeFilter} onClick={setActiveFilter} />
      </div>

      {/* Team Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(renderMember)}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            No team members found in this category.
          </p>
        </div>
      )}
    </div>
  )
}
