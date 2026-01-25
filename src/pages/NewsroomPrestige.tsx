/**
 * Enhanced Newsroom Page - Prestige Version
 * 70/30 hero split, sticky pill filters, Command-K search, premium animations
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogCard } from '@/components/blog/BlogCard';
import { blogPosts as allBlogPosts } from '@/lib/data';
import { useAuthorsWithCounts } from '@/lib/utils/linker';
import { derivePracticeAreaTags, parsePostDate } from '@/lib/utils/newsroomTaxonomy';

export function NewsroomPrestige() {
  const blogPosts = useMemo(() => allBlogPosts || [], []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string>('');
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [dateFrom, setDateFrom] = useState<string>(''); // yyyy-mm-dd
  const [dateTo, setDateTo] = useState<string>(''); // yyyy-mm-dd
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [authorDropdownOpen, setAuthorDropdownOpen] = useState(false);
  const authorDropdownRef = useRef<HTMLDivElement>(null);

  // Get authors with article counts
  const authors = useAuthorsWithCounts(blogPosts);

  const postsWithPracticeAreas = useMemo(() => {
    return blogPosts.map((p) => ({
      ...p,
      _practiceAreas: derivePracticeAreaTags(p, 3),
      _timestamp: parsePostDate(p),
    }));
  }, [blogPosts]);

  const practiceAreaOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of postsWithPracticeAreas) {
      for (const t of p._practiceAreas) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [postsWithPracticeAreas]);

  const categoryOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of postsWithPracticeAreas) {
      for (const c of p.categories ?? []) set.add(c);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [postsWithPracticeAreas]);

  const yearOptions = useMemo(() => {
    const set = new Set<number>();
    for (const p of postsWithPracticeAreas) {
      const ts = p._timestamp
      if (!ts) continue
      set.add(new Date(ts).getFullYear())
    }
    return Array.from(set).sort((a, b) => b - a)
  }, [postsWithPracticeAreas])

  const sortedPosts = useMemo(() => {
    const arr = [...postsWithPracticeAreas];
    arr.sort((a, b) => {
      const ta = a._timestamp ?? 0;
      const tb = b._timestamp ?? 0;
      return tb - ta;
    });
    return arr;
  }, [postsWithPracticeAreas]);

  // Get featured post (most recent)
  const featuredPost = useMemo(() => {
    return sortedPosts.length > 0 ? sortedPosts[0] : null;
  }, [sortedPosts]);

  // Filter posts (excluding featured from grid)
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const fromTs = dateFrom ? new Date(dateFrom).getTime() : null;
    const toTs = dateTo ? new Date(dateTo).getTime() + 24 * 60 * 60 * 1000 - 1 : null;

    const base = sortedPosts.filter(p => p.id !== featuredPost?.id); // Exclude featured

    const filtered = base.filter((post) => {
      const matchesSearch =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);

      const matchesPracticeArea =
        !selectedPracticeArea || post._practiceAreas.includes(selectedPracticeArea);

      const matchesCategory =
        !selectedCategory || (post.categories ?? []).some(c => c === selectedCategory);

      const matchesAuthors =
        selectedAuthors.length === 0 ||
        selectedAuthors.some(id => post.authorId === id || post.authorSlug === id);

      const ts = post._timestamp;
      const matchesDate =
        (!fromTs || (ts !== null && ts !== undefined && ts >= fromTs)) &&
        (!toTs || (ts !== null && ts !== undefined && ts <= toTs));

      const matchesYear =
        !selectedYear || (ts !== null && ts !== undefined && new Date(ts).getFullYear() === selectedYear)

      return matchesSearch && matchesCategory && matchesPracticeArea && matchesAuthors && matchesDate && matchesYear;
    });

    filtered.sort((a, b) => {
      const ta = a._timestamp ?? 0;
      const tb = b._timestamp ?? 0;
      return sortOrder === 'newest' ? tb - ta : ta - tb;
    });

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    selectedPracticeArea,
    selectedAuthors,
    selectedYear,
    dateFrom,
    dateTo,
    sortOrder,
    sortedPosts,
    featuredPost,
  ]);

  // Close author dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!authorDropdownRef.current) return;
      if (authorDropdownRef.current.contains(e.target as Node)) return;
      setAuthorDropdownOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - 70/30 Split */}
      {featuredPost && (
        <section className="relative overflow-hidden bg-primary-navy">
          {/* Hero background image + consistent overlay */}
          <div className="absolute inset-0" aria-hidden="true">
            <img
              src="/images/stock%20images/justice-2060093_1280.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/80 via-primary-navy/70 to-primary-slate/85" />
          </div>
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
                  
                  <Link
                    to={`/newsroom/${featuredPost.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-prestige-gold px-8 py-3 font-semibold text-white transition-all hover:bg-prestige-gold/90 hover:shadow-xl"
                  >
                    Read Full Article
                    <span>→</span>
                  </Link>
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
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
              {/* Year quick chips */}
              {yearOptions.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                  <button
                    type="button"
                    onClick={() => setSelectedYear(null)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedYear === null
                        ? 'bg-primary-navy text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Years
                  </button>
                  {yearOptions.slice(0, 6).map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setSelectedYear((prev) => (prev === y ? null : y))}
                      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        selectedYear === y
                          ? 'bg-primary-navy text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              )}

              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
              >
                <option value="">All Categories</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {/* Practice Area */}
              <select
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
              >
                <option value="">All Practice Areas</option>
                {practiceAreaOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              {/* Attorneys (multi-select) */}
              <div className="relative" ref={authorDropdownRef}>
                <button
                  type="button"
                  onClick={() => setAuthorDropdownOpen(v => !v)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {selectedAuthors.length === 0 ? 'All Attorneys' : `${selectedAuthors.length} attorney${selectedAuthors.length === 1 ? '' : 's'}`}
                </button>

                {authorDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-3 shadow-xl">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700">Attorneys</span>
                      {selectedAuthors.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedAuthors([])}
                          className="text-xs font-semibold text-primary-navy hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-auto pr-1">
                      {authors.map((author) => {
                        const checked = selectedAuthors.includes(author.id)
                        return (
                          <label key={author.id} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {
                                setSelectedAuthors((prev) => {
                                  if (prev.includes(author.id)) return prev.filter(x => x !== author.id)
                                  return [...prev, author.id]
                                })
                              }}
                            />
                            <span className="text-sm text-gray-700">
                              {author.name} <span className="text-gray-400">({author.count})</span>
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Date range */}
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
                />
                <span className="text-sm text-gray-500">to</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
                />
              </div>

              {/* Sort */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-primary-navy focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
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
          
          {(searchQuery || selectedCategory || selectedPracticeArea || selectedAuthors.length > 0 || selectedYear !== null || dateFrom || dateTo || sortOrder !== 'newest') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setSelectedPracticeArea('');
                setSelectedAuthors([]);
                setSelectedYear(null);
                setDateFrom('');
                setDateTo('');
                setSortOrder('newest');
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

    </div>
  );
}
