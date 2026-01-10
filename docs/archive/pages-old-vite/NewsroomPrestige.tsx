/**
 * Enhanced Newsroom Page - Prestige Version
 * 70/30 hero split, sticky pill filters, Command-K search, premium animations
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/blog/BlogCard';
import { blogPosts as allBlogPosts } from '@/lib/data';
import { NewsroomSearchFilter } from '@/components/news/NewsroomSearchFilter';
import type { BlogPost } from '@/lib/types/content';

export function NewsroomPrestige() {
  const blogPosts = useMemo(() => allBlogPosts || [], []);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  // Get featured post (most recent, excluding from filtered results)
  const featuredPost = useMemo(() => {
    return blogPosts.length > 0 ? blogPosts[0] : null;
  }, [blogPosts]);

  // Filter out featured post from displayed results
  const displayPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter(post => post.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

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

      {/* Main Content */}
      <div className="section-container py-12">
        {/* Search and Filter Component */}
        <NewsroomSearchFilter
          articles={blogPosts}
          onFilterChange={setFilteredPosts}
        />

        {/* Blog Posts Grid with Staggered Animation */}
        {displayPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-600 mb-2">No articles found</p>
            <p className="text-neutral-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
