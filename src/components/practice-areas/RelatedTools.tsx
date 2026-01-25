import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

interface Tool {
  icon: LucideIcon
  title: string
  description: string
  to: string
  badge?: string
}

interface RelatedToolsProps {
  tools: Tool[]
  title?: string
  description?: string
}

export function RelatedTools({ 
  tools, 
  title = "Interactive Tools & Resources",
  description = "Use our free tools to better understand your legal situation and make informed decisions."
}: RelatedToolsProps) {
  if (tools.length === 0) return null

  return (
    <section className="py-12 bg-gradient-to-br from-neutral-50 to-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-navy mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={tool.to} className="block group h-full">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border-accent-gold hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-4 bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <tool.icon className="h-8 w-8 text-accent-gold" />
                      </div>
                      {tool.badge && (
                        <span className="px-3 py-1 bg-accent-gold/10 text-accent-gold text-xs font-bold rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent-gold transition-colors duration-300">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex items-center text-accent-gold font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>Try It Now</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Tools CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/resources/tools"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-navy hover:bg-primary-slate text-white rounded-lg font-semibold transition-all duration-300 group"
          >
            <span>View All Tools</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
