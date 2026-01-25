import { useState, useMemo, useEffect, useRef } from 'react'
import { Search, X, Filter, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getUrlParam, getUrlParams, setUrlParam, setUrlParams } from '@/lib/utils/url-params'
import type { Attorney } from '@/lib/types'

interface AttorneySearchFilterProps {
  attorneys: Attorney[]
  onFilterChange: (filteredAttorneys: Attorney[]) => void
}

interface FilterState {
  searchQuery: string
  practiceAreas: string[]
  attorneyTypes: string[]
  industries: string[]
}

const ATTORNEY_TYPES = [
  { value: 'Partner', label: 'Partner' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Associate Attorney', label: 'Associate Attorney' },
  { value: 'Of Counsel', label: 'Of Counsel' },
]

export function AttorneySearchFilter({ attorneys, onFilterChange }: AttorneySearchFilterProps) {

  // Initialize filters from URL parameters
  const [filters, setFilters] = useState<FilterState>(() => ({
    searchQuery: getUrlParam('search') || '',
    practiceAreas: getUrlParams('practiceArea'),
    attorneyTypes: getUrlParams('type'),
    industries: getUrlParams('industry'),
  }))

  const [isPracticeAreaOpen, setIsPracticeAreaOpen] = useState(false)
  const [isIndustryOpen, setIsIndustryOpen] = useState(false)
  const [isTypeOpen, setIsTypeOpen] = useState(false)

  const practiceAreaRef = useRef<HTMLDivElement>(null)
  const industryRef = useRef<HTMLDivElement>(null)
  const typeRef = useRef<HTMLDivElement>(null)

  // Sync URL parameters when filters change
  useEffect(() => {
    if (filters.searchQuery) {
      setUrlParam('search', filters.searchQuery)
    } else {
      setUrlParam('search', null)
    }
    setUrlParams('practiceArea', filters.practiceAreas)
    setUrlParams('type', filters.attorneyTypes)
    setUrlParams('industry', filters.industries)
  }, [filters])

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setFilters({
        searchQuery: getUrlParam('search') || '',
        practiceAreas: getUrlParams('practiceArea'),
        attorneyTypes: getUrlParams('type'),
        industries: getUrlParams('industry'),
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (practiceAreaRef.current && !practiceAreaRef.current.contains(event.target as Node)) {
        setIsPracticeAreaOpen(false)
      }
      if (industryRef.current && !industryRef.current.contains(event.target as Node)) {
        setIsIndustryOpen(false)
      }
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get unique practice areas from attorneys
  const availablePracticeAreas = useMemo(() => {
    const allAreas = new Set<string>()
    attorneys.forEach(attorney => {
      attorney.practiceAreas?.forEach(area => allAreas.add(area))
    })
    return Array.from(allAreas).sort()
  }, [attorneys])

  // Get unique industries from attorneys
  const availableIndustries = useMemo(() => {
    const allIndustries = new Set<string>()
    attorneys.forEach(attorney => {
      attorney.industries?.forEach(industry => allIndustries.add(industry))
    })
    return Array.from(allIndustries).sort()
  }, [attorneys])

  // Filter attorneys based on all criteria
  const filteredAttorneys = useMemo(() => {
    return attorneys.filter((attorney) => {
      // Search query filter (name, bio)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesName = attorney.name.toLowerCase().includes(query)
        const matchesBio = attorney.bio?.some(bio => bio.toLowerCase().includes(query)) || false
        if (!matchesName && !matchesBio) return false
      }

      // Practice area filter
      if (filters.practiceAreas.length > 0) {
        const hasMatchingPracticeArea = filters.practiceAreas.some(area =>
          attorney.practiceAreas?.some(pa => pa.toLowerCase().includes(area.toLowerCase()))
        )
        if (!hasMatchingPracticeArea) return false
      }

      // Attorney type filter
      if (filters.attorneyTypes.length > 0) {
        if (!filters.attorneyTypes.includes(attorney.title)) return false
      }

      // Industry filter
      if (filters.industries.length > 0) {
        const hasMatchingIndustry = filters.industries.some(industry =>
          attorney.industries?.some(ind => ind.toLowerCase().includes(industry.toLowerCase()))
        )
        if (!hasMatchingIndustry) return false
      }

      return true
    })
  }, [attorneys, filters])

  // Update parent when filtered results change
  useEffect(() => {
    onFilterChange(filteredAttorneys)
  }, [filteredAttorneys, onFilterChange])

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchQuery: value }))
  }

  const togglePracticeArea = (area: string) => {
    setFilters(prev => ({
      ...prev,
      practiceAreas: prev.practiceAreas.includes(area)
        ? prev.practiceAreas.filter(a => a !== area)
        : [...prev.practiceAreas, area],
    }))
  }

  const toggleAttorneyType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      attorneyTypes: prev.attorneyTypes.includes(type)
        ? prev.attorneyTypes.filter(t => t !== type)
        : [...prev.attorneyTypes, type],
    }))
  }

  const toggleIndustry = (industry: string) => {
    setFilters(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry],
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      practiceAreas: [],
      attorneyTypes: [],
      industries: [],
    })
    // Clear URL parameters
    setUrlParam('search', null)
    setUrlParams('practiceArea', [])
    setUrlParams('type', [])
    setUrlParams('industry', [])
  }

  const hasActiveFilters = filters.searchQuery || filters.practiceAreas.length > 0 || filters.attorneyTypes.length > 0 || filters.industries.length > 0

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <Input
          type="text"
          placeholder="Search by name or expertise..."
          value={filters.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-12 pr-4"
        />
        {filters.searchQuery && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Practice Area Filter */}
        <div className="relative" ref={practiceAreaRef}>
          <button
            onClick={() => {
              setIsPracticeAreaOpen(!isPracticeAreaOpen)
              setIsIndustryOpen(false)
              setIsTypeOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              filters.practiceAreas.length > 0
                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                : 'bg-white text-[#0A2540] border-neutral-300 hover:border-[#0A2540]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Practice Area</span>
            {filters.practiceAreas.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {filters.practiceAreas.length}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isPracticeAreaOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isPracticeAreaOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 z-50 max-h-80 overflow-y-auto"
              >
                <div className="p-2">
                  {availablePracticeAreas.length > 0 ? (
                    availablePracticeAreas.map(area => (
                      <label
                        key={area}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-neutral-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.practiceAreas.includes(area)}
                          onChange={() => togglePracticeArea(area)}
                          className="w-4 h-4 text-[#0A2540] border-neutral-300 rounded focus:ring-[#0A2540]"
                        />
                        <span className="text-sm text-neutral-700">{area}</span>
                      </label>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-neutral-500">No practice areas available</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Attorney Type Filter */}
        <div className="relative" ref={typeRef}>
          <button
            onClick={() => {
              setIsTypeOpen(!isTypeOpen)
              setIsPracticeAreaOpen(false)
              setIsIndustryOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              filters.attorneyTypes.length > 0
                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                : 'bg-white text-[#0A2540] border-neutral-300 hover:border-[#0A2540]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Type</span>
            {filters.attorneyTypes.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {filters.attorneyTypes.length}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isTypeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50"
              >
                <div className="p-2">
                  {ATTORNEY_TYPES.map(type => (
                    <label
                      key={type.value}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-neutral-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.attorneyTypes.includes(type.value)}
                        onChange={() => toggleAttorneyType(type.value)}
                        className="w-4 h-4 text-[#0A2540] border-neutral-300 rounded focus:ring-[#0A2540]"
                      />
                      <span className="text-sm text-neutral-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Industry Filter */}
        <div className="relative" ref={industryRef}>
          <button
            onClick={() => {
              setIsIndustryOpen(!isIndustryOpen)
              setIsPracticeAreaOpen(false)
              setIsTypeOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              filters.industries.length > 0
                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                : 'bg-white text-[#0A2540] border-neutral-300 hover:border-[#0A2540]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Industry</span>
            {filters.industries.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {filters.industries.length}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isIndustryOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isIndustryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 z-50 max-h-80 overflow-y-auto"
              >
                <div className="p-2">
                  {availableIndustries.length > 0 ? (
                    availableIndustries.map(industry => (
                      <label
                        key={industry}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-neutral-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.industries.includes(industry)}
                          onChange={() => toggleIndustry(industry)}
                          className="w-4 h-4 text-[#0A2540] border-neutral-300 rounded focus:ring-[#0A2540]"
                        />
                        <span className="text-sm text-neutral-700">{industry}</span>
                      </label>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-neutral-500">No industries available</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="ml-auto"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(filters.practiceAreas.length > 0 || filters.attorneyTypes.length > 0 || filters.industries.length > 0) && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200">
          {filters.practiceAreas.map(area => (
            <span
              key={area}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A2540]/10 text-[#0A2540] rounded-full text-sm"
            >
              {area}
              <button
                onClick={() => togglePracticeArea(area)}
                className="ml-1 hover:text-[#B8860B]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.attorneyTypes.map(type => (
            <span
              key={type}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A2540]/10 text-[#0A2540] rounded-full text-sm"
            >
              {type}
              <button
                onClick={() => toggleAttorneyType(type)}
                className="ml-1 hover:text-[#B8860B]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.industries.map(industry => (
            <span
              key={industry}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A2540]/10 text-[#0A2540] rounded-full text-sm"
            >
              {industry}
              <button
                onClick={() => toggleIndustry(industry)}
                className="ml-1 hover:text-[#B8860B]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <p className="text-sm text-neutral-600">
          Showing <span className="font-semibold text-[#0A2540]">{filteredAttorneys.length}</span> of{' '}
          <span className="font-semibold">{attorneys.length}</span> attorneys
        </p>
      </div>
    </div>
  )
}
