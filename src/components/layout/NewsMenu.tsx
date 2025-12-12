import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Calendar, ArrowRight } from 'lucide-react'
import { getRecentPosts } from '@/lib/utils/news'
import type { NavigationLink } from '@/lib/data/navigation'

interface NewsMenuProps {
  links: NavigationLink[]
}

export function NewsMenu({ links }: NewsMenuProps) {
  const recentPosts = getRecentPosts(3)

  return (
    <div className="p-6">
      <div className="grid grid-cols-[25%_75%] gap-8">
        {/* Left Column - Navigation Links */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-2"
        >
          <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
            Categories
          </h3>
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavigationMenu.Link asChild>
                <Link
                  to={link.href}
                  className="block p-3 rounded-lg hover:bg-primary-burgundy/5 transition-all duration-200 group"
                >
                  <div className="text-sm font-semibold text-primary-navy group-hover:text-primary-burgundy transition-colors">
                    {link.label}
                  </div>
                  {link.description && (
                    <div className="text-xs text-neutral-600 mt-0.5">
                      {link.description}
                    </div>
                  )}
                </Link>
              </NavigationMenu.Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Column - Featured Insights */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Featured Insights
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <NavigationMenu.Link asChild>
                    <Link
                      to={`/insights/${post.slug}`}
                      className="group block bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-primary-burgundy hover:shadow-md transition-all duration-300"
                    >
                      {/* Article Image */}
                      {post.imageUrl && (
                        <div className="aspect-video overflow-hidden bg-neutral-100">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}

                      {/* Article Content */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-primary-navy group-hover:text-primary-burgundy transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-primary-burgundy font-medium">
                          Read more
                          <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </NavigationMenu.Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 pt-4 border-t border-neutral-200"
          >
            <NavigationMenu.Link asChild>
              <Link
                to="/newsroom"
                className="inline-flex items-center text-sm font-semibold text-primary-burgundy hover:text-primary-navy transition-colors group"
              >
                View all insights
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </NavigationMenu.Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
