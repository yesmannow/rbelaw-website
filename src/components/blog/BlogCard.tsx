/**
 * Blog Card Component - Enhanced Prestige Version
 * Premium card with staggered reveal, hover animations, and gold accents
 */

import { Link } from 'react-router-dom';
import { Clock, Calendar, User } from 'lucide-react';
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
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="h-full"
    >
      <Link
        to={`/newsroom/${post.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      >
        {/* Gold border bottom - expands from center on hover */}
        <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-prestige-gold transition-all duration-500 group-hover:w-full" />
        
        {/* Image with zoom effect */}
        {post.image && (
          <div className="relative aspect-video overflow-hidden bg-gray-100">
            <motion.img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            
            {/* Glassmorphism overlay on hover */}
            <div className="absolute inset-0 glass-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}
        
        <div className="flex flex-1 flex-col p-6">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.categories.slice(0, 2).map(category => (
                <span
                  key={category}
                  className="rounded-full bg-primary-navy/10 px-3 py-1 text-xs font-medium text-primary-navy transition-colors duration-300 group-hover:bg-prestige-gold/10 group-hover:text-prestige-gold"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          
          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary-navy">
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

          {/* Read More - slides in on hover */}
          <motion.div 
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            whileHover={{ x: 5 }}
          >
            Read Article
            <span className="text-prestige-gold" aria-hidden="true">→</span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
