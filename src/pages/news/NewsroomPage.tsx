import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui'
import { getAllPosts } from '../../lib/utils/news'

export function NewsroomPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-burgundy text-white py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-primary text-white mb-4">
              Newsroom
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl">
              Stay informed with expert analysis, industry updates, and firm news from Riley Bennett Egloff.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-neutral-600">No articles found. Check back soon for updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
import { Calendar, ArrowRight } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import newsArchive from '@/lib/data/news-archive.json'

export function NewsroomPage() {
  return (
    <>
      <SEOMeta
        title="Newsroom | Riley Bennett Egloff LLP"
        description="Stay informed with the latest news, insights, and legal updates from Riley Bennett Egloff LLP."
      />

      <div className="bg-gradient-to-br from-primary-navy to-primary-slate py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Newsroom
            </h1>
            <p className="text-xl text-white/90">
              Expert insights, firm news, and legal updates from our team
            </p>
          </motion.div>
        </div>
      </div>

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
                    {post.imageUrl && (
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                        <span>{post.date}</span>
                        <span className="text-accent-gold">•</span>
                        <span className="text-accent-gold font-medium">{post.category}</span>
                      </div>
                      <CardTitle className="text-xl leading-tight group-hover:text-accent-gold transition-colors duration-300">
                        {post.title}
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
                        {post.excerpt}
                      </CardDescription>
                      <Link 
                        to={`/newsroom/${post.slug}`}
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
          )}
        </div>
      </section>
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
