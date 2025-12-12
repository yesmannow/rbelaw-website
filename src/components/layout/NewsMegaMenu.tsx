import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Video, FileText, ArrowRight } from 'lucide-react'
import newsArchiveData from '../../lib/data/news-archive.json'
import type { NewsArchiveItem } from '../../lib/types'

const newsArchive = newsArchiveData as NewsArchiveItem[]

interface NewsMegaMenuProps {
  isOpen: boolean
}

export function NewsMegaMenu({ isOpen }: NewsMegaMenuProps) {
  const latestArticle = newsArchive[0]

  const quickLinks = [
    {
      icon: FileText,
      label: 'Firm News',
      href: '/news?category=firm',
      description: 'Latest updates from RBE'
    },
    {
      icon: Calendar,
      label: 'Legal Updates',
      href: '/news?category=legal',
      description: 'Important legal developments'
    },
    {
      icon: Video,
      label: 'Videos',
      href: '/news?category=videos',
      description: 'Watch our expert insights'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute left-0 top-full mt-2 w-full bg-white shadow-corporate rounded-sm border border-neutral-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left Sidebar - Quick Links */}
            <motion.div
              className="lg:col-span-1 space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-4">
                Quick Links
              </h3>
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.15 + index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="flex items-start gap-3 p-3 rounded-sm hover:bg-neutral-50 transition-colors group"
                    >
                      <div className="p-2 bg-primary-navy/5 rounded-sm group-hover:bg-accent-gold/10 transition-colors">
                        <IconComponent className="h-5 w-5 text-accent-gold" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 group-hover:text-primary-navy transition-colors">
                          {link.label}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {link.description}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Right Feature Area - Latest Article */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-4">
                Latest from the Newsroom
              </h3>
              <Link
                to={latestArticle.url}
                className="group block overflow-hidden rounded-sm border border-neutral-200 hover:border-accent-gold transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-1/3 relative overflow-hidden bg-neutral-100">
                    <motion.div
                      className="aspect-[4/3] bg-gradient-to-br from-primary-navy to-primary-slate flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <FileText className="h-16 w-16 text-white/20" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-accent-gold/10 text-accent-gold text-xs font-semibold rounded">
                        {latestArticle.category}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {new Date(latestArticle.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-primary-navy mb-2 group-hover:text-accent-gold transition-colors">
                      {latestArticle.title}
                    </h4>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {latestArticle.excerpt}
                    </p>
                    <span className="inline-flex items-center text-accent-gold font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
