import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ExternalLink, Calendar } from 'lucide-react'

interface PublicationsListProps {
  publications?: Array<{ title: string; url?: string; date?: string }>
}

export function PublicationsList({ publications = [] }: PublicationsListProps) {
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  if (publications.length === 0) {
    return (
      <div className="text-center py-12 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-200">
        <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
        <p className="text-neutral-600">No publications available at this time.</p>
      </div>
    )
  }

  // Sort publications
  const sortedPublications = [...publications].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    }
    return a.title.localeCompare(b.title)
  })

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="text-sm text-neutral-600">
          Showing {publications.length} {publications.length === 1 ? 'publication' : 'publications'}
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
          key={sortBy}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {sortedPublications.map((publication, index) => (
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

                  {publication.date && (
                    <div className="flex items-center gap-1 text-sm text-neutral-600 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(publication.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}</span>
                    </div>
                  )}

                  {publication.url && (
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-navy hover:bg-primary-slate text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Read Article
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
