import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, Tag, ArrowRight, Download, Share2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'
import { searchGlossary, getCategories, getRelatedTerms, type GlossaryTerm } from '@/lib/data/legalGlossary'

export function LegalGlossary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null)

  const categories = ['all', ...getCategories()]

  // Search and filter terms
  const filteredTerms = useMemo(() => {
    if (!searchQuery && selectedCategory === 'all') {
      return searchGlossary('', selectedCategory)
    }
    return searchGlossary(searchQuery, selectedCategory === 'all' ? undefined : selectedCategory)
  }, [searchQuery, selectedCategory])

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {}
    filteredTerms.forEach(term => {
      const firstLetter = term.term[0].toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(term)
    })
    return groups
  }, [filteredTerms])

  const handleShare = (term: GlossaryTerm) => {
    if (navigator.share) {
      navigator.share({
        title: term.term,
        text: term.definition,
        url: window.location.href
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-serif font-bold text-primary-navy mb-4">
          Legal Glossary
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          Demystify legal jargon with our comprehensive glossary of legal terms.
          Search by term or browse by category to better understand your legal situation.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search legal terms..."
            className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-lg focus:border-accent-gold focus:outline-none transition-colors text-lg"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-navy text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category === 'all' ? 'All Terms' : category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-sm text-neutral-600">
          Showing {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Terms List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Terms Column */}
        <div className="lg:col-span-2">
          {Object.keys(groupedTerms).length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-200">
              <BookOpen className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600">No terms found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.keys(groupedTerms).sort().map(letter => (
                <div key={letter}>
                  <h2 className="text-2xl font-bold text-primary-navy mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-gold text-white rounded-lg flex items-center justify-center font-serif">
                      {letter}
                    </div>
                    <span>{letter}</span>
                  </h2>
                  <div className="space-y-3">
                    {groupedTerms[letter].map((term, index) => (
                      <motion.div
                        key={term.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card 
                          className="border-2 border-neutral-200 hover:border-accent-gold transition-all duration-300 cursor-pointer group"
                          onClick={() => setSelectedTerm(term)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-primary-navy mb-2 group-hover:text-accent-gold transition-colors">
                                  {term.term}
                                </h3>
                                <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                                  {term.definition}
                                </p>
                                <div className="flex items-center gap-2 mt-3">
                                  <Tag className="h-4 w-4 text-accent-gold" />
                                  <span className="text-xs font-semibold text-accent-gold">
                                    {term.category}
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-accent-gold group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AnimatePresence mode="wait">
              {selectedTerm ? (
                <motion.div
                  key={selectedTerm.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-2 border-accent-gold">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-primary-navy">
                          {selectedTerm.term}
                        </h3>
                        <button
                          onClick={() => handleShare(selectedTerm)}
                          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <Share2 className="h-5 w-5 text-neutral-600" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <Tag className="h-4 w-4 text-accent-gold" />
                        <span className="text-sm font-semibold text-accent-gold">
                          {selectedTerm.category}
                        </span>
                      </div>

                      <p className="text-neutral-700 leading-relaxed mb-6">
                        {selectedTerm.definition}
                      </p>

                      {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-primary-navy mb-3">
                            Related Terms
                          </h4>
                          <div className="space-y-2">
                            {getRelatedTerms(selectedTerm.id).map(relatedTerm => (
                              <button
                                key={relatedTerm.id}
                                onClick={() => setSelectedTerm(relatedTerm)}
                                className="w-full text-left px-3 py-2 bg-neutral-50 hover:bg-accent-gold/10 rounded-lg text-sm text-neutral-700 hover:text-primary-navy transition-colors"
                              >
                                {relatedTerm.term}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-200 p-8 text-center"
                >
                  <BookOpen className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
                  <p className="text-neutral-600 text-sm">
                    Select a term to see its full definition and related terms
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Download CTA */}
      <div className="mt-12 bg-gradient-to-br from-primary-navy to-primary-slate rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">
          Download Full Glossary
        </h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Get the complete legal glossary as a PDF for easy reference.
          Perfect for keeping on hand when reviewing contracts or legal documents.
        </p>
        <button className="bg-accent-gold hover:bg-accent-gold/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2">
          <Download className="h-5 w-5" />
          Download PDF Glossary
        </button>
      </div>
    </div>
  )
}
