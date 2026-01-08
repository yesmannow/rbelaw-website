/**
 * Blog Card Component
 * Displays a blog post preview card
 */

import { Link } from 'react-router-dom';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  categories: string[];
  image: string;
  excerpt: string;
  readTime?: number;
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/newsroom/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-xl"
    >
      {/* Image */}
      {post.image && (
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="flex flex-1 flex-col p-6">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map(category => (
              <span
                key={category}
                className="rounded-full bg-rbe-navy/10 px-3 py-1 text-xs font-medium text-rbe-navy"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        
        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-rbe-navy">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600">
          {post.excerpt}
        </p>
        
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
          {post.author && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.author}</span>
            </div>
          )}
          {post.date && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          )}
          {post.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime} min read</span>
            </div>
          )}
        </div>

        {/* Read More */}
        <motion.div 
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-rbe-navy"
          whileHover={{ x: 5 }}
        >
          Read Article
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </div>
    </Link>
  );
}
