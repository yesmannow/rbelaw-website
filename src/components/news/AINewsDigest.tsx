import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Clock, Tag, ExternalLink, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui'
import { getAllPosts } from '@/lib/utils/news'

interface DigestItem {
  id: string
  title: string
  summary: string
  category: string
  date: string
  slug: string
  impact: 'high' | 'medium' | 'low'
  aiInsight: string
}

export function AINewsDigest() {
  const [digestItems, setDigestItems] = useState<DigestItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    // Get recent posts and generate AI summaries
    const posts = getAllPosts().slice(0, 10)
    
    const items: DigestItem[] = posts.map(post => ({
      id: post.id,
      title: post.title,
      summary: generateAISummary(post.excerpt),
      category: post.category,
      date: post.date,
      slug: post.slug,
      impact: determineImpact(post.category),
      aiInsight: generateAIInsight(post.title, post.category)
    }))

    setDigestItems(items)
  }, [])

  // Mock AI summary generation (in production, call actual AI API)
  const generateAISummary = (excerpt: string): string => {
    // Truncate and add AI-style summary
    const words = excerpt.split(' ').slice(0, 30).join(' ')
    return `${words}...`
  }

  // Mock AI insight generation
  const generateAIInsight = (title: string, category: string): string => {
    const insights: Record<string, string[]> = {
      'Firm News': [
        'This recognition reflects RBE\'s continued excellence in legal services.',
        'This development strengthens RBE\'s position in the legal market.',
        'This achievement demonstrates RBE\'s commitment to professional excellence.'
      ],
      'Legal Updates': [
        'This legal change may impact your business operations and compliance requirements.',
        'Businesses should review their policies in light of this development.',
        'This update requires immediate attention from affected organizations.'
      ],
      'Health Care Law': [
        'Healthcare providers should assess how this affects their operations.',
        'This development has significant implications for medical practice management.',
        'Healthcare organizations need to update their compliance procedures.'
      ],
      'Labor & Employment': [
        'Employers should review their employment policies and practices.',
        'This change affects how businesses manage their workforce.',
        'HR departments need to implement new procedures based on this update.'
      ],
      'Business & Corporate': [
        'Business owners should consult with legal counsel about these changes.',
        'This development affects corporate governance and compliance.',
        'Companies need to review their business structures and agreements.'
      ]
    }

    const categoryInsights = insights[category] || insights['Legal Updates']
    return categoryInsights[Math.floor(Math.random() * categoryInsights.length)]
  }

  const determineImpact = (category: string): 'high' | 'medium' | 'low' => {
    if (category === 'Legal Updates' || category === 'Labor & Employment') return 'high'
    if (category === 'Business & Corporate' || category === 'Health Care Law') return 'medium'
    return 'low'
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200'
    }
  }

  const categories = ['all', ...Array.from(new Set(digestItems.map(item => item.category)))]

  const filteredItems = selectedCategory === 'all' 
    ? digestItems 
    : digestItems.filter(item => item.category === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary-navy">
              AI Legal News Digest
            </h1>
            <p className="text-neutral-600">
              AI-powered summaries of the latest legal developments
            </p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
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
            {category === 'all' ? 'All News' : category}
          </button>
        ))}
      </div>

      {/* Digest Items */}
      <div className="space-y-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="border-2 border-neutral-200 hover:border-accent-gold transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getImpactColor(item.impact)}`}>
                            {item.impact.toUpperCase()} IMPACT
                          </span>
                          <div className="flex items-center gap-1 text-sm text-neutral-500">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(item.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                        <Link 
                          to={`/newsroom/${item.slug}`}
                          className="block group-hover:text-accent-gold transition-colors"
                        >
                          <h3 className="text-xl font-bold text-primary-navy mb-2">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="h-4 w-4 text-accent-gold" />
                          <span className="text-sm font-semibold text-accent-gold">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-neutral-600 leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    {/* AI Insight */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-purple-900 mb-1">
                            AI Insight
                          </p>
                          <p className="text-sm text-purple-800">
                            {item.aiInsight}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/newsroom/${item.slug}`}
                        className="inline-flex items-center gap-2 text-primary-navy hover:text-accent-gold font-semibold text-sm transition-colors"
                      >
                        Read Full Article
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-br from-primary-navy to-primary-slate rounded-xl p-8 text-white text-center">
        <Sparkles className="h-12 w-12 text-accent-gold mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-3">
          Stay Informed with Legal Updates
        </h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive AI-powered legal news digests
          and insights directly in your inbox.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-accent-gold hover:bg-accent-gold/90 text-primary-navy px-8 py-4 rounded-lg font-semibold transition-all duration-300"
        >
          Subscribe to Newsletter
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}
