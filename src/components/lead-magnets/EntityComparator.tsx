'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

// Entity data structure
interface EntityData {
  name: string
  taxation: string
  liability: string
  adminBurden: string
}

const entityData: EntityData[] = [
  {
    name: 'LLC',
    taxation: 'Pass-through taxation',
    liability: 'High liability protection',
    adminBurden: 'Low admin burden'
  },
  {
    name: 'S-Corp',
    taxation: 'Pass-through taxation',
    liability: 'High liability protection',
    adminBurden: 'Medium admin burden'
  },
  {
    name: 'C-Corp',
    taxation: 'Double taxation',
    liability: 'High liability protection',
    adminBurden: 'High admin burden'
  }
]

type FilterType = 'tax' | 'liability' | 'admin'

interface Filter {
  id: FilterType
  label: string
  active: boolean
}

export function EntityComparator() {
  const [filters, setFilters] = useState<Filter[]>([
    { id: 'tax', label: 'Tax Flexibility', active: false },
    { id: 'liability', label: 'Liability Protection', active: false },
    { id: 'admin', label: 'Admin Burden', active: false }
  ])

  const toggleFilter = (filterId: FilterType) => {
    setFilters(filters.map(filter => 
      filter.id === filterId 
        ? { ...filter, active: !filter.active }
        : filter
    ))
  }

  const isRowHighlighted = (rowType: 'taxation' | 'liability' | 'adminBurden') => {
    if (rowType === 'taxation') return filters.find(f => f.id === 'tax')?.active
    if (rowType === 'liability') return filters.find(f => f.id === 'liability')?.active
    if (rowType === 'adminBurden') return filters.find(f => f.id === 'admin')?.active
    return false
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-semibold text-primary-navy mb-3">
          Business Entity Comparison
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Compare different business structures to find the right fit for your startup
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={`
              px-4 py-2 rounded-sm border transition-all duration-200
              ${filter.active 
                ? 'bg-accent-gold text-neutral-900 border-accent-gold shadow-md' 
                : 'bg-white text-neutral-700 border-neutral-300 hover:border-accent-gold'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                filter.active ? 'bg-neutral-900 border-neutral-900' : 'border-neutral-400'
              }`}>
                {filter.active && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              {filter.label}
            </span>
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto mb-8">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-neutral-200 rounded-sm shadow-sm">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-primary-navy">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Feature
                  </th>
                  {entityData.map(entity => (
                    <th key={entity.name} className="px-6 py-4 text-center text-sm font-semibold text-white">
                      {entity.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {/* Taxation Row */}
                <motion.tr
                  animate={{
                    backgroundColor: isRowHighlighted('taxation') ? '#FFF9E6' : '#FFFFFF'
                  }}
                  transition={{ duration: 0.3 }}
                  className={isRowHighlighted('taxation') ? 'border-l-4 border-accent-gold' : ''}
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                    Taxation
                  </td>
                  {entityData.map(entity => (
                    <td key={entity.name} className="px-6 py-4 text-sm text-neutral-600 text-center">
                      {entity.taxation}
                    </td>
                  ))}
                </motion.tr>

                {/* Liability Protection Row */}
                <motion.tr
                  animate={{
                    backgroundColor: isRowHighlighted('liability') ? '#FFF9E6' : '#FFFFFF'
                  }}
                  transition={{ duration: 0.3 }}
                  className={isRowHighlighted('liability') ? 'border-l-4 border-accent-gold' : ''}
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                    Liability Protection
                  </td>
                  {entityData.map(entity => (
                    <td key={entity.name} className="px-6 py-4 text-sm text-neutral-600 text-center">
                      {entity.liability}
                    </td>
                  ))}
                </motion.tr>

                {/* Admin Burden Row */}
                <motion.tr
                  animate={{
                    backgroundColor: isRowHighlighted('adminBurden') ? '#FFF9E6' : '#FFFFFF'
                  }}
                  transition={{ duration: 0.3 }}
                  className={isRowHighlighted('adminBurden') ? 'border-l-4 border-accent-gold' : ''}
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                    Admin Burden
                  </td>
                  {entityData.map(entity => (
                    <td key={entity.name} className="px-6 py-4 text-sm text-neutral-600 text-center">
                      {entity.adminBurden}
                    </td>
                  ))}
                </motion.tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-primary-navy to-primary-slate rounded-sm p-8 text-center shadow-corporate">
        <h3 className="text-2xl font-serif font-semibold text-white mb-3">
          Not sure which is right for your growth plan?
        </h3>
        <p className="text-neutral-100 mb-6 max-w-2xl mx-auto">
          Our experienced business attorneys can help you choose the best structure for your specific needs and goals.
        </p>
        <Button
          variant="primary"
          size="lg"
          className="bg-accent-gold text-neutral-900 hover:bg-accent-gold/90 shadow-md"
        >
          Request a Business Formation Consultation
        </Button>
      </div>
    </div>
  )
}
