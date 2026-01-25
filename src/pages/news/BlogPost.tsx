import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { ArticleSEO } from '@/components/seo/SEO'
import { getBlogPostBySlug } from '@/lib/data/blog-posts'
import { derivePracticeAreaTags } from '@/lib/utils/newsroomTaxonomy'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const article = slug ? getBlogPostBySlug(slug) : undefined

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

  const practiceAreaTags = derivePracticeAreaTags(article, 3)
  const categoryLabel =
    article.categories && article.categories.length > 0 ? article.categories[0] : 'Firm News'

  return (
    <>
      <ArticleSEO
        title={article.title}
        excerpt={article.excerpt}
        slug={article.slug}
        author={article.author}
        date={article.date}
        imageUrl={article.image}
        category={categoryLabel}
      />

      <article>
        <div className="relative overflow-hidden py-16">
          <div className="absolute inset-0" aria-hidden="true">
            <img
              src={article.image || '/images/stock%20images/capitol-820611_1280.jpg'}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/80 via-primary-navy/70 to-primary-slate/85" />
          </div>
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
                <span className="text-accent-gold font-medium">{categoryLabel}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                {article.title}
              </h1>

              <p className="text-xl text-white/90 mb-8">
                {article.excerpt}
              </p>

              {(article.categories?.length > 0 || practiceAreaTags.length > 0) && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {article.categories?.slice(0, 2).map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                    >
                      {c}
                    </span>
                  ))}
                  {practiceAreaTags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-prestige-gold/20 px-3 py-1 text-xs font-semibold text-prestige-gold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

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
              {article.content?.map((block, idx) => {
                if (block.type === 'heading') {
                  const Tag = block.level === 'H2' ? 'h2' : block.level === 'H3' ? 'h3' : 'h4'
                  return <Tag key={idx}>{block.text}</Tag>
                }
                if (block.type === 'paragraph') {
                  return <p key={idx}>{block.text}</p>
                }
                if (block.type === 'quote') {
                  return <blockquote key={idx}>{block.text}</blockquote>
                }
                if (block.type === 'list') {
                  const ListTag = block.ordered ? 'ol' : 'ul'
                  return (
                    <ListTag key={idx}>
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ListTag>
                  )
                }
                if (block.type === 'divider') {
                  return <hr key={idx} />
                }
                return null
              })}
            </motion.div>
          </div>
        </div>
      </article>
    </>
  )
}
