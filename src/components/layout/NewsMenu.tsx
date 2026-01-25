import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Calendar, ArrowRight } from 'lucide-react'
import { getRecentPosts } from '@/lib/utils/news'
import { PLACEHOLDER_IMAGE_URL } from '@/lib/utils/megaMenu'
import type { NavigationLink } from '@/lib/data/navigation'

interface NewsMenuProps {
  links: NavigationLink[]
}

export function NewsMenu({ links }: NewsMenuProps) {
  const recentPosts = getRecentPosts(3)

  return (
    <div className="p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,30%)_1fr] gap-10 lg:gap-12">
        {/* Left Column - Navigation Links */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-2"
        >
            <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mb-6">
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
                  className="block p-4 rounded-lg hover:bg-primary-burgundy/5 transition-all duration-200 group border border-transparent hover:border-primary-burgundy/20 hover:shadow-sm"
                >
                  <div className="text-sm font-semibold text-primary-navy group-hover:text-primary-burgundy transition-colors mb-1">
                    {link.label}
                  </div>
                  {link.description && (
                    <div className="text-xs text-neutral-600 mt-1 group-hover:text-neutral-700">
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
            <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mb-6">
              Featured Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      className="group block bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-primary-burgundy hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Article Image */}
                      {post.imageUrl && (
                        <div className="aspect-video overflow-hidden bg-neutral-100">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = PLACEHOLDER_IMAGE_URL
                            }}
                          />
                        </div>
                      )}

                      {/* Article Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-primary-navy group-hover:text-primary-burgundy transition-colors line-clamp-2 mb-3 leading-snug">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-primary-burgundy font-medium group-hover:font-semibold transition-all">
                          Read more
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1.5" />
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
            className="mt-6 pt-6 border-t border-neutral-200"
          >
            <NavigationMenu.Link asChild>
              <Link
                to="/newsroom"
                className="inline-flex items-center text-sm font-semibold text-primary-burgundy hover:text-primary-navy transition-all group px-4 py-2 rounded-lg hover:bg-primary-burgundy/5"
              >
                View all insights
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
              </Link>
            </NavigationMenu.Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
