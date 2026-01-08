import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { AttorneyCard } from '../ui'
import { attorneys } from '../../lib/data/attorney-helpers'
import type { Attorney } from '../../lib/types'

interface ContentPageLayoutProps {
  title: string
  subtitle: string
  heroImage?: string
  children: ReactNode
  relatedAttorneys?: string[] // Array of attorney names
}

export function ContentPageLayout({
  title,
  subtitle,
  heroImage,
  children,
  relatedAttorneys = []
}: ContentPageLayoutProps) {
  // Filter attorneys by name matches
  const filteredAttorneys: Attorney[] = relatedAttorneys
    .map(name => attorneys.find(attorney => attorney.name === name))
    .filter((attorney): attorney is Attorney => attorney !== undefined)

  return (
    <div>
      {/* Hero Section with Parallax Effect */}
      <section 
        className="relative bg-primary-navy text-white py-20 lg:py-28 overflow-hidden"
        style={{
          backgroundImage: heroImage ? `url(${heroImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-primary-navy/80" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-primary text-white mb-4 lg:mb-6">
              {title}
            </h1>
            <p className="text-xl lg:text-2xl text-neutral-200 max-w-3xl">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Main Content */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <article className="prose prose-lg prose-neutral max-w-none
                prose-headings:font-serif prose-headings:text-primary-navy
                prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10
                prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                prose-p:text-neutral-700 prose-p:leading-relaxed
                prose-li:text-neutral-700
                prose-a:text-accent-gold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-neutral-900">
                {children}
              </article>
            </motion.div>

            {/* Right Column - Sticky Sidebar */}
            {filteredAttorneys.length > 0 && (
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="sticky top-24">
                  <h3 className="text-xl font-serif font-semibold text-primary-navy mb-6">
                    Professionals in this Area
                  </h3>
                  <div className="space-y-4">
                    {filteredAttorneys.map((attorney) => (
                      <AttorneyCard 
                        key={attorney.id} 
                        attorney={attorney} 
                        compact 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
