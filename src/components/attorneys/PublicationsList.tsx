import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ExternalLink, Download, Calendar, Tag } from 'lucide-react'
import type { Publication } from '@/lib/types'

interface PublicationsListProps {
  publications?: Publication[]
}

export function PublicationsList({ publications = [] }: PublicationsListProps) {
  const [filter, setFilter] = useState<'all' | string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  if (publications.length === 0) {
    return (
      <div className="text-center py-12 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-200">
        <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
        <p className="text-neutral-600">No publications available at this time.</p>
      </div>
    )
  }

  // Get unique categories
  const categories = Array.from(new Set(publications.map(p => p.publication)))

  // Filter and sort publications
  const filteredPublications = publications
    .filter(pub => filter === 'all' || pub.publication === filter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return a.title.localeCompare(b.title)
    })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary-navy text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            All ({publications.length})
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === category
                  ? 'bg-primary-navy text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
          className="px-4 py-2 border-2 border-neutral-200 rounded-lg text-sm font-medium focus:border-accent-gold focus:outline-none"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {/* Publications List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter + sortBy}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {filteredPublications.map((publication, index) => (
            <motion.div
              key={publication.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-lg border-2 border-neutral-200 p-6 hover:border-accent-gold hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-gold/10 rounded-lg text-accent-gold group-hover:scale-110 transition-transform flex-shrink-0">
                  <FileText className="h-6 w-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-primary-navy mb-2 group-hover:text-accent-gold transition-colors">
                    {publication.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      <span className="font-medium">{publication.publication}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(publication.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}</span>
                    </div>
                  </div>

                  {publication.url && (
                    <div className="flex gap-3">
                      <a
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-navy hover:bg-primary-slate text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Read Article
                      </a>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-sm font-semibold transition-colors">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredPublications.length === 0 && (
        <div className="text-center py-12 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-200">
          <p className="text-neutral-600">No publications found for this filter.</p>
        </div>
      )}
    </div>
  )
}
