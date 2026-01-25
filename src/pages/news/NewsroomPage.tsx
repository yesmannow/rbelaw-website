import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import newsArchive from '@/lib/data/news-archive.json'
import { PageHeader } from '@/components/layout/PageHeader'

export function NewsroomPage() {
  return (
    <>
      <SEOMeta
        title="Newsroom | Riley Bennett Egloff LLP"
        description="Stay informed with the latest news, insights, and legal updates from Riley Bennett Egloff LLP."
      />

      <PageHeader
        title="Newsroom"
        subtitle="Expert insights, firm news, and legal updates from our team."
        backgroundImage="/images/stock%20images/justice-2060093_1280.jpg"
      />

      <section className="py-16 bg-neutral-50">
        <div className="section-container">
          {newsArchive.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArchive.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-corporate transition-all duration-300 group border-neutral-200 hover:border-accent-gold">
                    {article.image && (
                      <div className="overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <span className="text-accent-gold">•</span>
                        <span className="text-accent-gold font-medium">{article.category}</span>
                      </div>
                      <CardTitle className="text-xl leading-tight group-hover:text-accent-gold transition-colors duration-300">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-neutral-600 mb-4 leading-relaxed">
                        {article.excerpt}
                      </CardDescription>
                      <Link
                        to={`/newsroom/${article.slug}`}
                        className="text-accent-gold text-sm font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform duration-300"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                No Articles Found
              </h2>
              <p className="text-neutral-600 mb-8">
                Check back soon for the latest news and insights from our firm.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-primary-navy hover:bg-primary-slate text-white px-8 py-4 rounded-sm font-semibold transition-all duration-300"
              >
                Return to Homepage
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
