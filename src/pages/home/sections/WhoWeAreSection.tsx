/**
 * Who We Are / Who We Help / What We Do Section
 * Clean, readable design without gradients
 */

import { motion } from 'framer-motion'
import { Users, Handshake, Scale, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = [
  {
    icon: Users,
    title: 'Who We Are',
    description: "We're lawyers, partners, and advocates working to answer your questions, support your legal needs, and pursue your goals.",
    highlightWords: ['lawyers'],
    bgColor: 'bg-primary-navy',
    iconBg: 'bg-white/10',
    iconColor: 'text-white',
  },
  {
    icon: Handshake,
    title: 'Who We Help',
    description: 'Our clients are professionals, entrepreneurs, organizations, government entities, and individuals.',
    highlightWords: ['clients'],
    bgColor: 'bg-neutral-800',
    iconBg: 'bg-white/10',
    iconColor: 'text-white',
  },
  {
    icon: Scale,
    title: 'What We Do',
    description: 'We support and advocate for our clients in business, insurance, labor and employment, health care, construction, bankruptcy, and government law.',
    highlightWords: ['business', 'insurance', 'labor and employment', 'health care', 'construction', 'bankruptcy', 'government law'],
    bgColor: 'bg-primary-navy',
    iconBg: 'bg-white/10',
    iconColor: 'text-white',
  }
]

export function WhoWeAreSection() {
  const highlightText = (text: string, words: string[]) => {
    // Sort words by length (longest first) to match longer phrases first
    const sortedWords = [...words].sort((a, b) => b.length - a.length)
    const regex = new RegExp(`(${sortedWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => {
      if (!part) return null
      const isHighlighted = sortedWords.some(word => 
        part.toLowerCase() === word.toLowerCase()
      )
      return isHighlighted ? (
        <span key={index} className="text-white font-semibold bg-white/20 px-1 rounded">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    }).filter(Boolean)
  }

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute top-0 right-0 bottom-0 left-[1px] border border-black bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] pointer-events-none"
        aria-hidden="true"
      >
        {/* Soft image wash behind the pattern */}
        <img
          src="/images/stock%20images/justice-6778953_1280.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12] grayscale"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/88 via-white/82 to-white/86" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-navy mb-4">
            Our Foundation
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Built on expertise, driven by results, committed to your success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                {/* Card with solid background */}
                <div className={`relative h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${section.bgColor}`}>
                  {/* Content */}
                  <div className="relative p-8 min-h-[400px] flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`p-4 rounded-xl ${section.iconBg} border-2 border-white/20 inline-flex`}>
                        <IconComponent className={`w-8 h-8 ${section.iconColor}`} strokeWidth={2} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">
                      {section.title}
                    </h3>

                    {/* Description with highlighted words */}
                    <p className="text-lg text-white leading-relaxed flex-1 mb-6">
                      {highlightText(section.description, section.highlightWords)}
                    </p>

                    {/* Decorative bottom accent */}
                    <div className="mt-auto pt-6 border-t border-white/20">
                      <div className="flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <Link
            to="/about"
            className="inline-flex items-center justify-center bg-primary-navy hover:bg-primary-navy/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Learn More
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-white border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Make a Payment
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
