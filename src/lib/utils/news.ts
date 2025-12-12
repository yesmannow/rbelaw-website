import type { NewsItem } from '../types'

/**
 * Mock news data - In production, this would come from a CMS or API
 */
const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'Rural Hospital Challenges: Navigating Legal and Operational Complexities',
    excerpt: 'Understanding the unique legal challenges facing rural healthcare providers in today\'s regulatory environment.',
    content: '',
    author: 'Healthcare Practice Group',
    date: 'December 2024',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop',
    category: 'Health Care Law',
    slug: 'rural-hospital-challenges',
  },
  {
    id: '2',
    title: 'Best Law Firms 2024: Riley Bennett Egloff Recognized for Excellence',
    excerpt: 'Our continued commitment to delivering exceptional legal services earns industry recognition.',
    content: '',
    author: 'Firm News',
    date: 'November 2024',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop',
    category: 'Firm News',
    slug: 'best-law-firms-2024',
  },
  {
    id: '3',
    title: 'Fraud Prevention: Essential Legal Strategies for Modern Businesses',
    excerpt: 'Proactive legal frameworks to protect your organization from fraud and financial misconduct.',
    content: '',
    author: 'Business & Corporate Group',
    date: 'October 2024',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop',
    category: 'Business & Corporate',
    slug: 'fraud-prevention-strategies',
  },
  {
    id: '4',
    title: 'Construction Law Update: Recent Changes to Mechanic\'s Lien Laws',
    excerpt: 'Key updates contractors and subcontractors need to know about protecting payment rights.',
    content: '',
    author: 'Construction Practice Group',
    date: 'September 2024',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop',
    category: 'Construction Law',
    slug: 'mechanics-lien-update',
  },
  {
    id: '5',
    title: 'Employment Law Alert: New EEOC Guidance on Workplace Discrimination',
    excerpt: 'What employers need to know about the latest regulatory guidance and compliance requirements.',
    content: '',
    author: 'Labor & Employment Group',
    date: 'August 2024',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop',
    category: 'Labor & Employment',
    slug: 'eeoc-guidance-update',
  },
]

/**
 * Get all news posts
 */
export function getAllPosts(): NewsItem[] {
  return newsData
}

/**
 * Get recent posts (top N)
 */
export function getRecentPosts(count: number = 3): NewsItem[] {
  return newsData.slice(0, count)
}

/**
 * Get post by slug
 */
export function getPostBySlug(slug: string): NewsItem | undefined {
  return newsData.find(post => post.slug === slug)
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): NewsItem[] {
  return newsData.filter(post => post.category === category)
}
