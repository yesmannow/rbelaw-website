/**
 * Newsroom Section
 * Enhanced with visual interest and better layout
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui'
import { getRecentBlogPosts } from '@/lib/data/blog-posts'

export function NewsroomSection() {
  // Get the 3 most recent blog posts
  const latestInsights = getRecentBlogPosts(3)

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 relative overflow-hidden">
      {/* Subtle photographic wash */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/images/stock%20images/justice-2060093_1280.jpg"
          alt=""
          className="absolute right-0 top-0 h-full w-[55%] object-cover opacity-[0.16] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/70 to-white" />
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute inset-0 bg-gradient-to-l from-primary-navy to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl opacity-5" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-6">
            <TrendingUp className="w-5 h-5 text-accent-gold" />
            <span className="text-sm font-semibold text-accent-gold uppercase tracking-wide">
              Latest Insights
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-navy mb-6">
            News & Insights
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Stay informed with expert analysis, industry updates, and firm news.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {latestInsights.map((insight, index) => {
            // Get first category or default
            const category = insight.categories && insight.categories.length > 0
              ? insight.categories[0]
              : 'Firm News'

            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full hover:shadow-corporate transition-all duration-300 border-neutral-200 hover:border-accent-gold relative overflow-hidden">
                  {/* Decorative accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-navy via-accent-gold to-primary-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{insight.date}</span>
                      {category && (
                        <>
                          <span className="text-accent-gold">•</span>
                          <span className="text-accent-gold font-medium">{category}</span>
                        </>
                      )}
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-accent-gold transition-colors duration-300">
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-neutral-600 mb-4 leading-relaxed">
                      {insight.excerpt || 'Read more about this article.'}
                    </CardDescription>
                    <Link
                      to={`/newsroom/${insight.slug}`}
                      className="text-accent-gold text-sm font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform duration-300"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/newsroom"
            className="inline-flex items-center justify-center bg-primary-navy hover:bg-primary-navy/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All News
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
