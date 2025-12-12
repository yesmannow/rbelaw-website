import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui'

// Sample latest articles/news
const latestInsights = [
  {
    id: 1,
    title: 'Rural Hospital Challenges: Navigating Legal and Operational Complexities',
    date: 'December 2024',
    category: 'Health Care Law',
    excerpt: 'Understanding the unique legal challenges facing rural healthcare providers in today\'s regulatory environment.',
    slug: 'rural-hospital-challenges'
  },
  {
    id: 2,
    title: 'Best Law Firms 2024: Riley Bennett Egloff Recognized for Excellence',
    date: 'November 2024',
    category: 'Firm News',
    excerpt: 'Our continued commitment to delivering exceptional legal services earns industry recognition.',
    slug: 'best-law-firms-2024'
  },
  {
    id: 3,
    title: 'Fraud Prevention: Essential Legal Strategies for Modern Businesses',
    date: 'October 2024',
    category: 'Business & Corporate',
    excerpt: 'Proactive legal frameworks to protect your organization from fraud and financial misconduct.',
    slug: 'fraud-prevention-strategies'
  }
]

export function NewsroomSection() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-navy mb-6">
            Latest Insights
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Stay informed with expert analysis, industry updates, and firm news.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {latestInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-corporate transition-all duration-300 group border-neutral-200 hover:border-accent-gold">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{insight.date}</span>
                    <span className="text-accent-gold">•</span>
                    <span className="text-accent-gold font-medium">{insight.category}</span>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-accent-gold transition-colors duration-300">
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-neutral-600 mb-4 leading-relaxed">
                    {insight.excerpt}
                  </CardDescription>
                  <Link 
                    to={`/insights/${insight.slug}`}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            to="/insights" 
            className="inline-flex items-center justify-center bg-primary-navy hover:bg-primary-slate text-white px-8 py-4 rounded-sm font-semibold transition-all duration-300"
          >
            View All Insights
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
