/**
 * About Sidebar Navigation Component
 * Provides navigation for About sub-pages with active state styling
 * Matches the practice areas sidebar design
 */

import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { History, Heart, Briefcase, DollarSign } from 'lucide-react'

const aboutPages = [
  {
    slug: 'history',
    name: 'Firm History',
    icon: History,
    path: '/about/history'
  },
  {
    slug: 'community',
    name: 'Community Engagement',
    icon: Heart,
    path: '/about/community'
  },
  {
    slug: 'careers',
    name: 'Careers',
    icon: Briefcase,
    path: '/about/careers'
  },
  {
    slug: 'fees',
    name: 'Fee Arrangements',
    icon: DollarSign,
    path: '/about/fees'
  }
]

export function AboutSidebar() {
  const location = useLocation()

  return (
    <aside className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
        <h3 className="text-xl font-serif font-bold text-primary-navy mb-4">
          About
        </h3>
        <nav className="space-y-2">
          {aboutPages.map((page) => {
            const isActive = location.pathname === page.path
            const Icon = page.icon
            
            return (
              <Link
                key={page.slug}
                to={page.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary-navy text-white font-semibold'
                    : 'text-gray-700 hover:bg-neutral-100 hover:text-primary-navy'
                )}
              >
                <Icon className={cn(
                  'w-5 h-5 flex-shrink-0',
                  isActive ? 'text-accent-gold' : 'text-gray-500'
                )} />
                <span className="text-sm">{page.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
