/**
 * Newsroom Page - Blog List
 * Displays all blog posts with filtering
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { blogPosts as allBlogPosts } from '@/lib/data';

export function Newsroom() {
  const blogPosts = useMemo(() => allBlogPosts || [], []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Data is statically imported; no effect needed

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    blogPosts.forEach(post => {
      post.categories?.forEach((cat: string) => cats.add(cat));
    });
    return Array.from(cats).sort();
  }, [blogPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        post.categories?.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, blogPosts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Newsroom"
        subtitle="Latest legal insights, firm news, and industry updates"
      />

      <div className="section-container py-12">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-rbe-navy focus:outline-none focus:ring-2 focus:ring-rbe-navy/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-rbe-navy focus:outline-none focus:ring-2 focus:ring-rbe-navy/20"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-lg text-gray-600">
              {blogPosts.length === 0 
                ? 'Blog posts are being loaded. Please run the blog scraper.'
                : 'No articles found matching your criteria.'
              }
            </p>
            {searchQuery || selectedCategory ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="mt-4 text-rbe-navy hover:underline"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
