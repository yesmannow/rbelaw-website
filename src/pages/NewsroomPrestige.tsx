/**
 * Enhanced Newsroom Page - Prestige Version
 * 70/30 hero split, sticky pill filters, Command-K search, premium animations
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';
import { blogPosts as allBlogPosts } from '@/lib/data';
import { useAuthorsWithCounts } from '@/lib/utils/linker';

export function NewsroomPrestige() {
  const blogPosts = useMemo(() => allBlogPosts || [], []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [commandKOpen, setCommandKOpen] = useState(false);

  // Get authors with article counts
  const authors = useAuthorsWithCounts(blogPosts);

  // Get featured post (most recent)
  const featuredPost = useMemo(() => {
    return blogPosts.length > 0 ? blogPosts[0] : null;
  }, [blogPosts]);

  // Filter posts (excluding featured from grid)
  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => post.id !== featuredPost?.id) // Exclude featured
      .filter(post => {
        const matchesSearch = searchQuery === '' || 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesAuthor = !selectedAuthor || 
          post.authorId === selectedAuthor ||
          post.authorSlug === selectedAuthor;
        
        return matchesSearch && matchesAuthor;
      });
  }, [searchQuery, selectedAuthor, blogPosts, featuredPost]);

  // Command-K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandKOpen(true);
      }
      if (e.key === 'Escape') {
        setCommandKOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - 70/30 Split */}
      {featuredPost && (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-navy via-primary-navy/95 to-primary-slate">
          <div className="section-container py-16 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-10">
              {/* Left: Featured Content (70%) */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-prestige-gold/20 px-4 py-1.5 text-sm font-semibold text-prestige-gold">
                      Featured Insight
                    </span>
                  </div>
                  
                  <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                    {featuredPost.title}
                  </h1>
                  
                  <p className="mb-8 text-lg text-gray-300 lg:text-xl">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                    <span>By {featuredPost.author}</span>
                    <span>•</span>
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    {featuredPost.readTime && (
                      <>
                        <span>•</span>
                        <span>{featuredPost.readTime} min read</span>
                      </>
                    )}
                  </div>
                  
                  <a
                    href={`/newsroom/${featuredPost.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-prestige-gold px-8 py-3 font-semibold text-white transition-all hover:bg-prestige-gold/90 hover:shadow-xl"
                  >
                    Read Full Article
                    <span>→</span>
                  </a>
                </motion.div>
              </div>

              {/* Right: Featured Image with Glassmorphism (30%) */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative h-full min-h-[300px] overflow-hidden rounded-2xl"
                >
                  {featuredPost.image && (
                    <>
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 glass-overlay" />
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent" />
        </section>
      )}

      {/* Sticky Pill Filter Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="section-container py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search with Command-K hint */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setCommandKOpen(true)}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-20 focus:border-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                ⌘K
              </kbd>
            </div>

            {/* Author Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedAuthor(null)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedAuthor === null
                    ? 'bg-primary-navy text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Authors
              </button>
              {authors.slice(0, 5).map(author => (
                <button
                  key={author.id}
                  onClick={() => setSelectedAuthor(author.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedAuthor === author.id
                      ? 'bg-primary-navy text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {author.name} ({author.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-container py-12">
        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </p>
          
          {(searchQuery || selectedAuthor) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedAuthor(null);
              }}
              className="flex items-center gap-2 text-sm text-primary-navy hover:underline"
            >
              <X className="h-4 w-4" />
              Clear filters
            </button>
          )}
        </div>

        {/* Blog Posts Grid with Staggered Animation */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-lg text-gray-600">
              No articles found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Command-K Search Modal */}
      <AnimatePresence>
        {commandKOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setCommandKOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed left-1/2 top-20 z-50 w-full max-w-2xl -translate-x-1/2 rounded-xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Search</h3>
                <p className="text-sm text-gray-600">Search all articles by title, author, or content</p>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
                />
              </div>
              
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Press ESC to close</span>
                <span>Press ENTER to search</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
