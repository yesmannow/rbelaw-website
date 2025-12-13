import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft, User } from 'lucide-react'
import { getPostBySlug } from '../../lib/utils/news'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return <Navigate to="/newsroom" replace />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-burgundy text-white py-16 lg:py-20">
        <div className="section-container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/newsroom"
              className="inline-flex items-center text-neutral-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Newsroom
            </Link>
            
            <div className="inline-block px-3 py-1 bg-accent-gold/20 text-accent-gold rounded-sm text-sm font-medium mb-4">
              {post.category}
            </div>

            <h1 className="heading-primary text-white mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-neutral-200">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.imageUrl && (
        <section className="bg-neutral-100">
          <div className="section-container max-w-5xl py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg overflow-hidden shadow-corporate"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                loading="lazy"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 lg:py-20">
        <div className="section-container max-w-3xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-slate prose-lg max-w-none"
          >
            <p className="lead text-xl text-neutral-700 mb-8">
              {post.excerpt}
            </p>

            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div className="space-y-6 text-neutral-700">
                <p>
                  This article is currently being prepared. Please check back soon for the full content.
                </p>
                <p>
                  If you have questions about this topic or need immediate assistance, please{' '}
                  <Link to="/contact" className="text-accent-gold hover:underline">
                    contact our office
                  </Link>.
                </p>
              </div>
            )}
          </motion.article>

          {/* Back to Newsroom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-neutral-200"
          >
            <Link 
              to="/newsroom"
              className="inline-flex items-center text-accent-gold hover:text-primary-burgundy font-semibold transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to All Articles
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
