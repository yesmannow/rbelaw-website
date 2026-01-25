/**
 * Attorney Search Component
 * Search by name, practice area, and title
 * Client-side filtering with instant results
 */

import { useState, useMemo, useEffect, useRef } from 'react'
import { Search, X, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { attorneys } from '@/lib/utils/attorney-logic'
import { practiceAreas } from '@/lib/data'
import { cn } from '@/lib/utils'

interface AttorneySearchProps {
  onFilterChange: (filteredAttorneys: typeof attorneys) => void
}

const titleOptions = [
  { value: 'Partner', label: 'Partner' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Of Counsel', label: 'Of Counsel' }
]

export function AttorneySearch({ onFilterChange }: AttorneySearchProps) {
  const [nameQuery, setNameQuery] = useState('')
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>([])
  const [selectedTitles, setSelectedTitles] = useState<string[]>([])
  const [practiceAreaDropdownOpen, setPracticeAreaDropdownOpen] = useState(false)
  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false)
  const practiceAreaRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  // Prevent page scroll when scrolling inside dropdown panels
  const preventScrollChaining: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    const el = e.currentTarget
    const atTop = el.scrollTop <= 0
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      e.preventDefault()
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (practiceAreaRef.current && !practiceAreaRef.current.contains(event.target as Node)) {
        setPracticeAreaDropdownOpen(false)
      }
      if (titleRef.current && !titleRef.current.contains(event.target as Node)) {
        setTitleDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle hover for practice area dropdown
  const handlePracticeAreaMouseEnter = () => {
    setPracticeAreaDropdownOpen(true)
  }

  const handlePracticeAreaMouseLeave = () => {
    // Only close on mouse leave if not clicking
    setTimeout(() => {
      if (!practiceAreaRef.current?.matches(':hover')) {
        setPracticeAreaDropdownOpen(false)
      }
    }, 200)
  }

  // Handle hover for title dropdown
  const handleTitleMouseEnter = () => {
    setTitleDropdownOpen(true)
  }

  const handleTitleMouseLeave = () => {
    setTimeout(() => {
      if (!titleRef.current?.matches(':hover')) {
        setTitleDropdownOpen(false)
      }
    }, 200)
  }

  // Filter attorneys based on all criteria
  const filteredAttorneys = useMemo(() => {
    let filtered = [...attorneys]

    // Filter by name
    if (nameQuery.trim()) {
      const query = nameQuery.toLowerCase().trim()
      filtered = filtered.filter(attorney =>
        attorney.name.toLowerCase().includes(query)
      )
    }

    // Filter by practice areas
    if (selectedPracticeAreas.length > 0) {
      filtered = filtered.filter(attorney =>
        selectedPracticeAreas.some(area =>
          attorney.practiceAreas?.some(pa =>
            pa.toLowerCase().includes(area.toLowerCase())
          )
        )
      )
    }

    // Filter by title
    if (selectedTitles.length > 0) {
      filtered = filtered.filter(attorney =>
        selectedTitles.includes(attorney.title || '')
      )
    }

    return filtered
  }, [nameQuery, selectedPracticeAreas, selectedTitles])

  // Notify parent of filtered results
  useMemo(() => {
    onFilterChange(filteredAttorneys)
  }, [filteredAttorneys, onFilterChange])

  const togglePracticeArea = (area: string) => {
    setSelectedPracticeAreas(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    )
  }

  const toggleTitle = (title: string) => {
    setSelectedTitles(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const clearAllFilters = () => {
    setNameQuery('')
    setSelectedPracticeAreas([])
    setSelectedTitles([])
  }

  const hasActiveFilters = nameQuery || selectedPracticeAreas.length > 0 || selectedTitles.length > 0

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-neutral-200/70 shadow-soft p-4 sm:p-6 mb-5 sm:mb-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary-navy">
          Find an Attorney
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-neutral-600 hover:text-accent-gold transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Search by Name */}
        <div className="relative">
          <label className="block text-xs sm:text-sm font-semibold text-primary-navy mb-2">
            Search by Name (first or last)
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              placeholder="Enter name..."
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border-2 border-neutral-200 bg-white text-primary-navy placeholder:text-neutral-400 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
            />
            {nameQuery && (
              <button
                onClick={() => setNameQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-neutral-100 transition-colors"
                aria-label="Clear name search"
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            )}
          </div>
        </div>

        {/* Practice Areas Dropdown */}
        <div
          className="relative"
          ref={practiceAreaRef}
          onMouseEnter={handlePracticeAreaMouseEnter}
          onMouseLeave={handlePracticeAreaMouseLeave}
        >
          <label className="block text-xs sm:text-sm font-semibold text-primary-navy mb-2">
            Search by Practice Area
          </label>
          <div className="relative">
            <button
              onClick={() => setPracticeAreaDropdownOpen(!practiceAreaDropdownOpen)}
              onMouseEnter={handlePracticeAreaMouseEnter}
              className={cn(
                'w-full flex items-center justify-between pl-4 pr-3 py-2.5 sm:py-3 rounded-xl border-2 bg-white text-left transition-all',
                selectedPracticeAreas.length > 0
                  ? 'border-accent-gold text-primary-navy'
                  : 'border-neutral-200 text-neutral-500',
                practiceAreaDropdownOpen && 'border-accent-gold ring-2 ring-accent-gold/20'
              )}
            >
              <span className={selectedPracticeAreas.length > 0 ? 'text-primary-navy' : ''}>
                {selectedPracticeAreas.length === 0
                  ? 'Select One...'
                  : selectedPracticeAreas.length === 1
                  ? selectedPracticeAreas[0]
                  : `${selectedPracticeAreas.length} selected`}
              </span>
              <div className={cn(
                'p-1.5 rounded bg-neutral-100 hover:bg-accent-gold hover:text-white transition-colors',
                selectedPracticeAreas.length > 0 && 'bg-accent-gold text-white'
              )}>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    practiceAreaDropdownOpen && 'rotate-180'
                  )}
                />
              </div>
            </button>

            <AnimatePresence>
              {practiceAreaDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onMouseEnter={handlePracticeAreaMouseEnter}
                  onMouseLeave={handlePracticeAreaMouseLeave}
                  onWheel={preventScrollChaining}
                  className="absolute z-50 w-full mt-2 bg-white border-2 border-neutral-200 rounded-lg shadow-xl max-h-64 overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-none"
                >
                  {practiceAreas.map((area) => {
                    const isSelected = selectedPracticeAreas.includes(area.name)
                    return (
                      <button
                        key={area.id}
                        onClick={() => togglePracticeArea(area.name)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50 transition-colors',
                          isSelected && 'bg-accent-gold/10'
                        )}
                      >
                        <div className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                          isSelected
                            ? 'border-accent-gold bg-accent-gold'
                            : 'border-neutral-300'
                        )}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={cn(
                          'text-sm',
                          isSelected ? 'text-primary-navy font-semibold' : 'text-neutral-700'
                        )}>
                          {area.name}
                        </span>
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Title Dropdown */}
        <div
          className="relative"
          ref={titleRef}
          onMouseEnter={handleTitleMouseEnter}
          onMouseLeave={handleTitleMouseLeave}
        >
          <label className="block text-xs sm:text-sm font-semibold text-primary-navy mb-2">
            Position
          </label>
          <div className="relative">
            <button
              onClick={() => setTitleDropdownOpen(!titleDropdownOpen)}
              onMouseEnter={handleTitleMouseEnter}
              className={cn(
                'w-full flex items-center justify-between pl-4 pr-3 py-2.5 sm:py-3 rounded-xl border-2 bg-white text-left transition-all',
                selectedTitles.length > 0
                  ? 'border-accent-gold text-primary-navy'
                  : 'border-neutral-200 text-neutral-500',
                titleDropdownOpen && 'border-accent-gold ring-2 ring-accent-gold/20'
              )}
            >
              <span className={selectedTitles.length > 0 ? 'text-primary-navy' : ''}>
                {selectedTitles.length === 0
                  ? 'Select One...'
                  : selectedTitles.length === 1
                  ? selectedTitles[0]
                  : `${selectedTitles.length} selected`}
              </span>
              <div className={cn(
                'p-1.5 rounded bg-neutral-100 hover:bg-accent-gold hover:text-white transition-colors',
                selectedTitles.length > 0 && 'bg-accent-gold text-white'
              )}>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    titleDropdownOpen && 'rotate-180'
                  )}
                />
              </div>
            </button>

            <AnimatePresence>
              {titleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onMouseEnter={handleTitleMouseEnter}
                  onMouseLeave={handleTitleMouseLeave}
                  onWheel={preventScrollChaining}
                  className="absolute z-50 w-full mt-2 bg-white border-2 border-neutral-200 rounded-lg shadow-xl max-h-64 overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-none"
                >
                  {titleOptions.map((option) => {
                    const isSelected = selectedTitles.includes(option.value)
                    return (
                      <button
                        key={option.value}
                        onClick={() => toggleTitle(option.value)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50 transition-colors',
                          isSelected && 'bg-accent-gold/10'
                        )}
                      >
                        <div className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                          isSelected
                            ? 'border-accent-gold bg-accent-gold'
                            : 'border-neutral-300'
                        )}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={cn(
                          'text-sm',
                          isSelected ? 'text-primary-navy font-semibold' : 'text-neutral-700'
                        )}>
                          {option.label}
                        </span>
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t border-neutral-200/80"
        >
          <p className="text-sm text-neutral-600">
            Showing <span className="font-semibold text-primary-navy">{filteredAttorneys.length}</span> of {attorneys.length} attorneys
          </p>
        </motion.div>
      )}
    </div>
  )
}
