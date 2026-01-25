/**
 * Practice Area Template Component
 * Uniform template for all practice area pages with:
 * - Hero section with image and header
 * - Two-column content with icons
 * - Sidebar with practice areas menu
 * - Accordion for interactive tools
 * - Attorneys section
 * - Related articles section
 */

import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { AttorneyCard } from '@/components/attorneys'
import { BlogCard } from '@/components/blog/BlogCard'
import { getAttorneysByPracticeArea } from '@/lib/utils/attorney-logic'
import { enhancedPracticeAreas } from '@/lib/data/practiceAreasEnhanced'
import { getAllToolsForPracticeArea } from '@/lib/data/toolMappings'
import { getPracticeAreaHeroImage, getPracticeAreaImages } from '@/lib/utils/practiceAreaImages'
import { getBlogPostsByCategory } from '@/lib/data/blog-posts'
import type { BlogPost } from '@/lib/types/content'
import { iconMap } from '@/lib/data/navigation'
import { cn } from '@/lib/utils'
import type { EnhancedPracticeArea } from '@/lib/data/practiceAreasEnhanced'
import { SectionSeparator } from '@/components/ui'
import { InteractiveToolsSection } from './InteractiveToolsSection'

interface PracticeAreaTemplateProps {
  practiceArea: EnhancedPracticeArea
}

export function PracticeAreaTemplate({ practiceArea }: PracticeAreaTemplateProps) {
  const location = useLocation()
  
  // Get attorneys for this practice area
  const attorneys = getAttorneysByPracticeArea(practiceArea.name)
  
  // Get tools for this practice area
  const tools = getAllToolsForPracticeArea(practiceArea.slug)
  
  // Get related articles (by category matching practice area name or keywords)
  // Try multiple category matches for better results
  const categoryMatches = [
    practiceArea.name,
    practiceArea.name.replace(' & ', ' '),
    practiceArea.name.split(' ')[0], // First word
  ]
  
  let relatedArticles: BlogPost[] = []
  for (const category of categoryMatches) {
    const posts = getBlogPostsByCategory(category)
    if (posts.length > 0) {
      relatedArticles = posts.slice(0, 3)
      break
    }
  }
  
  // Get hero images
  const heroImages = getPracticeAreaImages(practiceArea.slug)
  const heroImage = getPracticeAreaHeroImage(practiceArea.slug)
  
  // Get icon component
  const Icon = practiceArea.icon ? iconMap[practiceArea.icon] : null

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] lg:min-h-[600px] overflow-hidden">
        {/* Background Image with Picture element for optimization */}
        {heroImages && (
          <picture className="absolute inset-0">
            <source srcSet={heroImages.avif} type="image/avif" />
            <source srcSet={heroImages.webp} type="image/webp" />
            <img
              src={heroImages.jpg}
              alt={`${practiceArea.name} - Riley Bennett Egloff`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
        )}
        {!heroImages && (
          <img
            src={heroImage}
            alt={`${practiceArea.name} - Riley Bennett Egloff`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/90 via-primary-navy/85 to-primary-navy/80" />
        
        {/* Content */}
        <div className="section-container relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            {Icon && (
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-lg bg-accent-gold/20 text-accent-gold">
                <Icon className="w-8 h-8" />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              {practiceArea.name}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-100 leading-relaxed max-w-3xl">
              {practiceArea.detailedDescription}
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50 to-transparent" />
      </section>

      {/* Breadcrumb */}
      <div className="section-container py-4 bg-white border-b border-neutral-200">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary-navy transition-colors">Home</Link>
          <span>/</span>
          <Link to="/practice-areas" className="hover:text-primary-navy transition-colors">Practice Areas</Link>
          <span>/</span>
          <span className="text-primary-navy font-medium">{practiceArea.name}</span>
        </nav>
      </div>

      <SectionSeparator
        variant="prestigePath"
        prestigeDirection="left-to-right"
        prestigeOffsetY={-50}
      />

      {/* Main Content Area */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Two Columns */}
          <div className="lg:col-span-3 space-y-8">
            {/* Key Services - Two Column Grid with Icons */}
            {practiceArea.keyServices && practiceArea.keyServices.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-serif font-bold text-primary-navy mb-6">
                  Key Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {practiceArea.keyServices.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-6 h-6 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary-navy mb-1">
                          {service}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview Content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-3xl font-serif font-bold text-primary-navy mb-6">
                Overview
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {practiceArea.detailedDescription}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our experienced team provides strategic counsel tailored to your specific needs. 
                  We combine deep legal expertise with practical business insight to deliver results 
                  that protect your interests and advance your objectives.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-primary-navy to-primary-navy/90 rounded-lg shadow-sm p-8 text-white">
              <h3 className="text-2xl font-serif font-bold mb-4">How Can We Help?</h3>
              <p className="text-neutral-100 mb-6 text-lg">
                Speak with our {practiceArea.name} team to get clear, practical guidance tailored to your goals.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Contact Our Team
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Practice Areas Menu */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-serif font-bold text-primary-navy mb-4">
                Practice Areas
              </h3>
              <nav className="space-y-2">
                {enhancedPracticeAreas.map((pa) => {
                  const isActive = location.pathname === `/practice-areas/${pa.slug}`
                  const PaIcon = pa.icon ? iconMap[pa.icon] : null
                  
                  return (
                    <Link
                      key={pa.slug}
                      to={`/practice-areas/${pa.slug}`}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-primary-navy text-white font-semibold'
                          : 'text-gray-700 hover:bg-neutral-100 hover:text-primary-navy'
                      )}
                    >
                      {PaIcon && (
                        <PaIcon className={cn(
                          'w-5 h-5 flex-shrink-0',
                          isActive ? 'text-accent-gold' : 'text-gray-500'
                        )} />
                      )}
                      <span className="text-sm">{pa.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* Interactive Tools Section - Above Attorneys */}
      {tools.length > 0 && (
        <InteractiveToolsSection tools={tools} practiceAreaName={practiceArea.name} />
      )}

      {/* Attorneys Section */}
      {attorneys.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="section-container">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-8">
              Professionals in {practiceArea.name}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {attorneys.map((attorney, index) => (
                <AttorneyCard
                  key={attorney.id}
                  attorney={attorney}
                  index={index}
                  showContact={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="py-16 lg:py-20 bg-neutral-50">
          <div className="section-container">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-navy mb-8">
              Related Articles & Insights
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((article, index) => (
                <BlogCard key={article.id} post={article} index={index} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/newsroom"
                className="inline-flex items-center text-primary-navy hover:text-accent-gold font-semibold transition-colors"
              >
                View All Articles →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
