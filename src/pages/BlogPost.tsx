/**
 * Blog Post Detail Page
 * Displays individual blog post with full content
 */

import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts } from '@/lib/data';

export function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(() => blogPosts.find((p: any) => p.slug === slug) || null, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-rbe-navy to-rbe-burgundy py-16 text-white">
          <div className="section-container">
            <h1 className="text-4xl font-bold">Article Not Found</h1>
            <p className="mt-4 text-white/90">The article you're looking for doesn't exist</p>
          </div>
        </div>
        <div className="section-container py-12 text-center">
          <p className="mb-6 text-gray-600">
            This article may have been moved or deleted.
          </p>
          <Link
            to="/newsroom"
            className="inline-flex items-center gap-2 rounded-lg bg-rbe-navy px-6 py-3 text-white hover:bg-rbe-navy/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Newsroom
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-rbe-navy to-rbe-burgundy py-16 text-white">
        <div className="section-container">
          <Link
            to="/newsroom"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Newsroom
          </Link>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((category: string) => (
                <span
                  key={category}
                  className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-6 text-4xl font-bold md:text-5xl">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
            {post.date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-white p-8 shadow-sm md:p-12">
            {/* Featured Image */}
            {post.image && (
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                src={post.image}
                alt={post.title}
                className="mb-8 w-full rounded-lg"
              />
            )}

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              {post.content && post.content.map((block: any, index: number) => {
                switch (block.type) {
                  case 'heading': {
                    const HeadingTag = block.level.toLowerCase() as 'h2' | 'h3' | 'h4';
                    return (
                      <HeadingTag key={index} className="font-bold text-gray-900">
                        {block.text}
                      </HeadingTag>
                    );
                  }
                  case 'paragraph': {
                    return (
                      <p key={index} className="text-gray-700">
                        {block.text}
                        {block.links && block.links.length > 0 && (
                          <span className="ml-2">
                            {block.links.map((link: any, i: number) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-rbe-navy underline hover:text-rbe-burgundy"
                              >
                                {link.text}
                              </a>
                            ))}
                          </span>
                        )}
                      </p>
                    );
                  }
                  case 'list': {
                    const ListTag = (block.ordered ? 'ol' : 'ul') as 'ol' | 'ul';
                    return (
                      <ListTag key={index} className="space-y-2">
                        {block.items.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ListTag>
                    );
                  }
                  case 'quote': {
                    return (
                      <blockquote key={index} className="border-l-4 border-rbe-burgundy pl-6 italic text-gray-700">
                        {block.text}
                      </blockquote>
                    );
                  }
                  case 'divider': {
                    return <hr key={index} className="my-8 border-gray-200" />;
                  }
                  default:
                    return null;
                }
              })}
            </article>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 border-t border-gray-200 pt-8">
                <h3 className="mb-4 text-sm font-semibold text-gray-900">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:border-rbe-navy hover:bg-rbe-navy/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-8">
              <Link
                to="/newsroom"
                className="flex items-center gap-2 text-sm font-medium text-rbe-navy hover:text-rbe-burgundy"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Newsroom
              </Link>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-rbe-navy">
                <Share2 className="h-4 w-4" />
                Share Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
