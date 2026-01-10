/**
 * Industries Grid Component
 * 3-column glassmorphism layout for Industries mega menu
 * - Col 1: Core Focus (Healthcare, Construction, Education)
 * - Col 2: Growth Sectors (Government, Manufacturing, Real Estate)
 * - Col 3: Spotlight card (Featured Industry News)
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, HeartPulse, HardHat, GraduationCap, Landmark, Factory, Home, Newspaper } from 'lucide-react'
import { getSpecialistCount } from '@/lib/utils/attorney-logic'

interface IndustryItem {
  name: string
  slug: string
  icon: React.ComponentType<{ className?: string }>
  valueProposition: string
}

const coreFocusIndustries: IndustryItem[] = [
  {
    name: 'Healthcare',
    slug: 'health-care',
    icon: HeartPulse,
    valueProposition: 'Defending the frontlines of Indiana healthcare.'
  },
  {
    name: 'Construction',
    slug: 'construction',
    icon: HardHat,
    valueProposition: 'Building legal foundations for Indiana\'s construction industry.'
  },
  {
    name: 'Education',
    slug: 'education',
    icon: GraduationCap,
    valueProposition: 'Empowering educational institutions with strategic legal counsel.'
  }
]

const growthSectors: IndustryItem[] = [
  {
    name: 'Government',
    slug: 'government',
    icon: Landmark,
    valueProposition: 'Serving public entities with comprehensive legal solutions.'
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    icon: Factory,
    valueProposition: 'Protecting Indiana manufacturers with multi-disciplinary expertise.'
  },
  {
    name: 'Real Estate',
    slug: 'real-estate',
    icon: Home,
    valueProposition: 'Navigating complex real estate transactions and disputes.'
  }
]

export function IndustriesGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Column 1: Core Focus */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
          Core Focus
        </h4>
        {coreFocusIndustries.map((industry, index) => {
          const Icon = industry.icon
          const specialistCount = getSpecialistCount(industry.name, 'industry')

          return (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#B8860B] transition-all"
              >
                {/* Gold Icon */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#B8860B]/20 text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-white mb-1 group-hover:text-[#B8860B] transition-colors">
                    {industry.name}
                  </h5>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {industry.valueProposition}
                  </p>
                  {specialistCount > 0 && (
                    <p className="text-xs text-[#B8860B]/80 mt-2">
                      {specialistCount} specialist{specialistCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 flex-shrink-0 mt-1" />
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Column 2: Growth Sectors */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
          Growth Sectors
        </h4>
        {growthSectors.map((industry, index) => {
          const Icon = industry.icon
          const specialistCount = getSpecialistCount(industry.name, 'industry')

          return (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 3) * 0.1 }}
            >
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#B8860B] transition-all"
              >
                {/* Gold Icon */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#B8860B]/20 text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-white mb-1 group-hover:text-[#B8860B] transition-colors">
                    {industry.name}
                  </h5>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {industry.valueProposition}
                  </p>
                  {specialistCount > 0 && (
                    <p className="text-xs text-[#B8860B]/80 mt-2">
                      {specialistCount} specialist{specialistCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 flex-shrink-0 mt-1" />
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Column 3: Spotlight Card */}
      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="h-full bg-[#0A2540] border-2 border-[#B8860B] rounded-lg p-6 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#B8860B]/20 text-[#B8860B]">
              <Newspaper className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-playfair font-bold text-white">
              Featured Industry News
            </h4>
          </div>

          <p className="text-white/80 text-sm leading-relaxed mb-6 flex-1">
            Stay informed with the latest legal insights, regulatory updates, and industry trends affecting your sector.
          </p>

          <Link
            href="/newsroom?category=industry"
            className="inline-flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#D4A017] text-[#0A2540] px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <span>View Industry News</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
