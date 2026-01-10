/**
 * Newsroom Mega Menu
 * Showcases featured articles with impressive design
 */

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight, Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getRecentBlogPosts } from '@/lib/data/blog-posts'

export function NewsroomMegaMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)

  // Get 4 most recent articles for showcase
  const featuredArticles = getRecentBlogPosts(4)

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={cn(
          'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors text-white',
          'hover:text-accent-tan focus:outline-none focus:ring-2 focus:ring-white/20 rounded',
          isOpen && 'text-accent-tan'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Newsroom
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Full-Width Glassmorphism Mega Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay with Backdrop Blur - Starts below nav */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 bottom-0 z-40 pointer-events-none"
              style={{
                top: 'var(--nav-height)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(10, 37, 64, 0.85)'
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content - Positioned directly below nav */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 z-[60] backdrop-blur-xl border-t border-white/10"
              style={{
                backgroundColor: 'rgba(10, 37, 64, 0.95)',
                top: 'var(--nav-height)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
            >
              <div className="section-container py-12">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-playfair font-bold text-white mb-2">
                      Latest Insights
                    </h3>
                    <p className="text-white/80 text-lg font-inter">
                      Stay informed with our latest legal insights and firm news
                    </p>
                  </div>
                  <Link
                    href="/newsroom"
                    className="flex items-center gap-2 rounded-lg bg-[#B8860B] hover:bg-[#D4A017] px-6 py-3 text-sm font-semibold text-[#0A2540] transition-all hover:scale-105"
                  >
                    View All Articles
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Featured Articles Grid - 70/30 Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                  {/* Main Featured Article (70% - 7 columns) */}
                  {featuredArticles[0] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="lg:col-span-7"
                    >
                      <Link
                        href={`/newsroom/${featuredArticles[0].slug}`}
                        className="group block h-full relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#B8860B] transition-all"
                      >
                        {/* Article Image */}
                        {featuredArticles[0].image && (
                          <div className="aspect-video overflow-hidden bg-neutral-800">
                            <img
                              src={featuredArticles[0].image}
                              alt={featuredArticles[0].title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.src = '/images/placeholder-news.jpg'
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent" />
                          </div>
                        )}

                        {/* Article Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-white/70 mb-3 font-inter">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{featuredArticles[0].date}</span>
                            </div>
                            {featuredArticles[0].readTime && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{featuredArticles[0].readTime} min read</span>
                                </div>
                              </>
                            )}
                          </div>
                          <h4 className="text-2xl font-playfair font-bold text-white mb-3 group-hover:text-[#B8860B] transition-colors">
                            {featuredArticles[0].title}
                          </h4>
                          <p className="text-white/80 text-base leading-relaxed mb-4 font-inter line-clamp-2">
                            {featuredArticles[0].excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-[#B8860B] font-semibold">
                            <span>Read Article</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )}

                  {/* Sidebar Articles (30% - 3 columns) */}
                  <div className="lg:col-span-3 space-y-4">
                    {featuredArticles.slice(1, 4).map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                      >
                        <Link
                          href={`/newsroom/${article.slug}`}
                          className="group block p-4 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#B8860B] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            {/* Article Image Thumbnail */}
                            {article.image && (
                              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-neutral-800">
                                <img
                                  src={article.image}
                                  alt={article.title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  onError={(e) => {
                                    e.currentTarget.src = '/images/placeholder-news.jpg'
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-white text-sm mb-1 group-hover:text-[#B8860B] transition-colors font-inter line-clamp-2">
                                {article.title}
                              </h5>
                              <div className="flex items-center gap-2 text-xs text-white/60 font-inter">
                                <Calendar className="w-3 h-3" />
                                <span>{article.date}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
