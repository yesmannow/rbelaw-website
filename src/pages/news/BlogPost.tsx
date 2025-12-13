import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import newsArchive from '@/lib/data/news-archive.json'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  
  const article = newsArchive.find((item) => item.slug === slug)

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-primary-navy mb-4">
            Article Not Found
          </h1>
          <p className="text-neutral-600 mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/newsroom')}
            className="inline-flex items-center text-accent-gold hover:underline font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Newsroom
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOMeta
        title={`${article.title} | Riley Bennett Egloff LLP`}
        description={article.excerpt}
      />

      <article>
        <div className="bg-gradient-to-br from-primary-navy to-primary-slate py-16">
          <div className="section-container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link
                to="/newsroom"
                className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Newsroom
              </Link>
              
              <div className="flex items-center gap-3 text-white/80 mb-6">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span className="text-accent-gold font-medium">{article.category}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                {article.title}
              </h1>

              <p className="text-xl text-white/90 mb-8">
                {article.excerpt}
              </p>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      text: article.excerpt,
                      url: window.location.href,
                    })
                  }
                }}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </motion.div>
          </div>
        </div>

        <div className="bg-white py-16">
          <div className="section-container max-w-4xl">
            {article.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mb-12"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto rounded-lg shadow-corporate"
                  loading="lazy"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="prose prose-lg prose-slate max-w-none"
            >
              <p className="text-neutral-600 leading-relaxed mb-6">
                For the full article, please visit:{' '}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold hover:underline font-semibold"
                >
                  {article.url}
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </article>
    </>
  )
}
