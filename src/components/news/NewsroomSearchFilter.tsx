import { useState, useMemo, useEffect, useRef } from 'react'
import { Search, X, Filter, ChevronDown, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getUrlParam, getUrlParams, setUrlParam, setUrlParams } from '@/lib/utils/url-params'
import type { BlogPost } from '@/lib/types/content'

interface NewsroomSearchFilterProps {
  articles: BlogPost[]
  onFilterChange: (filteredArticles: BlogPost[]) => void
}

interface FilterState {
  searchQuery: string
  categories: string[]
  authors: string[]
  tags: string[]
  dateFrom: string
  dateTo: string
}

export function NewsroomSearchFilter({ articles, onFilterChange }: NewsroomSearchFilterProps) {
  // Initialize filters from URL parameters
  const [filters, setFilters] = useState<FilterState>(() => ({
    searchQuery: getUrlParam('search') || '',
    categories: getUrlParams('category'),
    authors: getUrlParams('author'),
    tags: getUrlParams('tag'),
    dateFrom: getUrlParam('dateFrom') || '',
    dateTo: getUrlParam('dateTo') || '',
  }))

  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isAuthorOpen, setIsAuthorOpen] = useState(false)
  const [isTagOpen, setIsTagOpen] = useState(false)
  const [isDateOpen, setIsDateOpen] = useState(false)

  const categoryRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)

  // Sync URL parameters when filters change
  useEffect(() => {
    if (filters.searchQuery) {
      setUrlParam('search', filters.searchQuery)
    } else {
      setUrlParam('search', null)
    }
    setUrlParams('category', filters.categories)
    setUrlParams('author', filters.authors)
    setUrlParams('tag', filters.tags)
    if (filters.dateFrom) {
      setUrlParam('dateFrom', filters.dateFrom)
    } else {
      setUrlParam('dateFrom', null)
    }
    if (filters.dateTo) {
      setUrlParam('dateTo', filters.dateTo)
    } else {
      setUrlParam('dateTo', null)
    }
  }, [filters])

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setFilters({
        searchQuery: getUrlParam('search') || '',
        categories: getUrlParams('category'),
        authors: getUrlParams('author'),
        tags: getUrlParams('tag'),
        dateFrom: getUrlParam('dateFrom') || '',
        dateTo: getUrlParam('dateTo') || '',
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false)
      }
      if (authorRef.current && !authorRef.current.contains(event.target as Node)) {
        setIsAuthorOpen(false)
      }
      if (tagRef.current && !tagRef.current.contains(event.target as Node)) {
        setIsTagOpen(false)
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get unique categories from articles
  const availableCategories = useMemo(() => {
    const allCategories = new Set<string>()
    articles.forEach(article => {
      article.categories?.forEach(cat => allCategories.add(cat))
    })
    return Array.from(allCategories).sort()
  }, [articles])

  // Get unique authors from articles
  const availableAuthors = useMemo(() => {
    const allAuthors = new Set<string>()
    articles.forEach(article => {
      if (article.author) {
        allAuthors.add(article.author)
      }
    })
    return Array.from(allAuthors).sort()
  }, [articles])

  // Get unique tags from articles
  const availableTags = useMemo(() => {
    const allTags = new Set<string>()
    articles.forEach(article => {
      article.tags?.forEach(tag => allTags.add(tag))
    })
    return Array.from(allTags).sort()
  }, [articles])

  // Filter articles based on all criteria
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Search query filter (title, excerpt, author)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesTitle = article.title.toLowerCase().includes(query)
        const matchesExcerpt = article.excerpt?.toLowerCase().includes(query) || false
        const matchesAuthor = article.author?.toLowerCase().includes(query) || false
        if (!matchesTitle && !matchesExcerpt && !matchesAuthor) return false
      }

      // Category filter
      if (filters.categories.length > 0) {
        const hasMatchingCategory = filters.categories.some(cat =>
          article.categories?.some(articleCat =>
            articleCat.toLowerCase().includes(cat.toLowerCase())
          )
        )
        if (!hasMatchingCategory) return false
      }

      // Author filter
      if (filters.authors.length > 0) {
        if (!article.author || !filters.authors.includes(article.author)) return false
      }

      // Tag filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag =>
          article.tags?.some(articleTag =>
            articleTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
        if (!hasMatchingTag) return false
      }

      // Date range filter
      if (filters.dateFrom || filters.dateTo) {
        const articleDate = new Date(article.date)
        if (filters.dateFrom) {
          const fromDate = new Date(filters.dateFrom)
          if (articleDate < fromDate) return false
        }
        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo)
          toDate.setHours(23, 59, 59, 999) // Include entire end date
          if (articleDate > toDate) return false
        }
      }

      return true
    })
  }, [articles, filters])

  // Update parent when filtered results change
  useEffect(() => {
    onFilterChange(filteredArticles)
  }, [filteredArticles, onFilterChange])

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchQuery: value }))
  }

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }))
  }

  const toggleAuthor = (author: string) => {
    setFilters(prev => ({
      ...prev,
      authors: prev.authors.includes(author)
        ? prev.authors.filter(a => a !== author)
        : [...prev.authors, author],
    }))
  }

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      authors: [],
      tags: [],
      dateFrom: '',
      dateTo: '',
    })
    // Clear URL parameters
    setUrlParam('search', null)
    setUrlParams('category', [])
    setUrlParams('author', [])
    setUrlParams('tag', [])
    setUrlParam('dateFrom', null)
    setUrlParam('dateTo', null)
  }

  const hasActiveFilters =
    filters.searchQuery ||
    filters.categories.length > 0 ||
    filters.authors.length > 0 ||
    filters.tags.length > 0 ||
    filters.dateFrom ||
    filters.dateTo

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <Input
          type="text"
          placeholder="Search articles by title, content, or author..."
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
        {/* Category Filter */}
        <div className="relative" ref={categoryRef}>
          <button
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen)
              setIsAuthorOpen(false)
              setIsTagOpen(false)
              setIsDateOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              filters.categories.length > 0
                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                : 'bg-white text-[#0A2540] border-neutral-300 hover:border-[#0A2540]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Category</span>
            {filters.categories.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {filters.categories.length}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 z-50 max-h-80 overflow-y-auto"
              >
                <div className="p-2">
                  {availableCategories.length > 0 ? (
                    availableCategories.map(category => (
                      <label
                        key={category}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-neutral-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-[#0A2540] border-neutral-300 rounded focus:ring-[#0A2540]"
                        />
                        <span className="text-sm text-neutral-700">{category}</span>
                      </label>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-neutral-500">No categories available</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Author Filter */}
        <div className="relative" ref={authorRef}>
          <button
            onClick={() => {
              setIsAuthorOpen(!isAuthorOpen)
              setIsCategoryOpen(false)
              setIsTagOpen(false)
              setIsDateOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              filters.authors.length > 0
                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                : 'bg-white text-[#0A2540] border-neutral-300 hover:border-[#0A2540]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Author</span>
            {filters.authors.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {filters.authors.length}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isAuthorOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isAuthorOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 z-50 max-h-80 overflow-y-auto"
              >
                <div className="p-2">
                  {availableAuthors.length > 0 ? (
                    availableAuthors.map(author => (
                      <label
                        key={author}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-neutral-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.authors.includes(author)}
                          onChange={() => toggleAuthor(author)}
                          className="w-4 h-4 text-[#0A2540] border-neutral-300 rounded focus:ring-[#0A2540]"
                        />
                        <span className="text-sm text-neutral-700">{author}</span>
                      </label>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-neutral-500">No authors available</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tag Filter */}
        <div className="relative" ref={tagRef}>
          <button
            onClick={() => {
              setIsTagOpen(!isTagOpen)
              setIsCategoryOpen(false)
              setIsAuthorOpen(false)
              setIsDateOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              filters.tags.length > 0
                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                : 'bg-white text-[#0A2540] border-neutral-300 hover:border-[#0A2540]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Tags</span>
            {filters.tags.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {filters.tags.length}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isTagOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isTagOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 z-50 max-h-80 overflow-y-auto"
              >
                <div className="p-2">
                  {availableTags.length > 0 ? (
                    availableTags.map(tag => (
                      <label
                        key={tag}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-neutral-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.tags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="w-4 h-4 text-[#0A2540] border-neutral-300 rounded focus:ring-[#0A2540]"
                        />
                        <span className="text-sm text-neutral-700">{tag}</span>
                      </label>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-neutral-500">No tags available</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date Range Filter */}
        <div className="relative" ref={dateRef}>
          <button
            onClick={() => {
              setIsDateOpen(!isDateOpen)
              setIsCategoryOpen(false)
              setIsAuthorOpen(false)
              setIsTagOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              filters.dateFrom || filters.dateTo
                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                : 'bg-white text-[#0A2540] border-neutral-300 hover:border-[#0A2540]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Date Range</span>
            {(filters.dateFrom || filters.dateTo) && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">1</span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isDateOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDateOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 z-50 p-4"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">From Date</label>
                    <Input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">To Date</label>
                    <Input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  {(filters.dateFrom || filters.dateTo) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilters(prev => ({ ...prev, dateFrom: '', dateTo: '' }))}
                      className="w-full"
                    >
                      Clear Date Range
                    </Button>
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
      {(filters.categories.length > 0 || filters.authors.length > 0 || filters.tags.length > 0 || filters.dateFrom || filters.dateTo) && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200">
          {filters.categories.map(category => (
            <span
              key={category}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A2540]/10 text-[#0A2540] rounded-full text-sm"
            >
              {category}
              <button
                onClick={() => toggleCategory(category)}
                className="ml-1 hover:text-[#B8860B]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.authors.map(author => (
            <span
              key={author}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A2540]/10 text-[#0A2540] rounded-full text-sm"
            >
              {author}
              <button
                onClick={() => toggleAuthor(author)}
                className="ml-1 hover:text-[#B8860B]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A2540]/10 text-[#0A2540] rounded-full text-sm"
            >
              {tag}
              <button
                onClick={() => toggleTag(tag)}
                className="ml-1 hover:text-[#B8860B]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.dateFrom && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A2540]/10 text-[#0A2540] rounded-full text-sm">
              From: {new Date(filters.dateFrom).toLocaleDateString()}
              <button
                onClick={() => setFilters(prev => ({ ...prev, dateFrom: '' }))}
                className="ml-1 hover:text-[#B8860B]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.dateTo && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A2540]/10 text-[#0A2540] rounded-full text-sm">
              To: {new Date(filters.dateTo).toLocaleDateString()}
              <button
                onClick={() => setFilters(prev => ({ ...prev, dateTo: '' }))}
                className="ml-1 hover:text-[#B8860B]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <p className="text-sm text-neutral-600">
          Showing <span className="font-semibold text-[#0A2540]">{filteredArticles.length}</span> of{' '}
          <span className="font-semibold">{articles.length}</span> articles
        </p>
      </div>
    </div>
  )
}
