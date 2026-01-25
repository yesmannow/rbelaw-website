import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Gavel,
  ShieldCheck,
  Users,
  HeartPulse,
  HardHat,
  Scale,
  Briefcase,
  FileText,
  Home,
  Heart,
  Landmark,
  Stethoscope,
  Shield,
  Factory,
  Laptop,
  Truck,
  ShoppingCart,
  Search,
} from 'lucide-react'

export interface NavigationLink {
  label: string
  href: string
  description?: string
  icon?: string
}

export interface FeaturedCard {
  title: string
  description: string
  href: string
  buttonText: string
}

export interface NavigationAction {
  label: string
  description: string
  action: 'search' | 'custom'
  icon?: string
}

export interface NavigationSection {
  label: string
  links: NavigationLink[]
  featured?: FeaturedCard
  action?: NavigationAction
  columns?: number
  preview?: string // Brief preview description for tooltip
}

export const iconMap: Record<string, LucideIcon> = {
  Building2,
  Gavel,
  ShieldCheck,
  Users,
  HeartPulse,
  HardHat,
  Scale,
  Briefcase,
  FileText,
  Home,
  Heart,
  Landmark,
  Stethoscope,
  Shield,
  Factory,
  Laptop,
  Truck,
  ShoppingCart,
  Search,
}

export const navData: Record<string, NavigationSection> = {
  about: {
    label: 'About',
    preview: 'Learn about our firm\'s history, values, and commitment to excellence',
    links: [
      {
        label: 'Firm History',
        href: '/about/history',
        description: 'Our legacy of legal excellence',
      },
      {
        label: 'Community Engagement',
        href: '/about/community',
        description: 'Making a difference locally',
      },
      {
        label: 'Diversity & Inclusion',
        href: '/about/diversity',
        description: 'Building an inclusive workplace',
      },
      {
        label: 'Careers',
        href: '/about/careers',
        description: 'Join our growing team',
      },
      {
        label: 'Fee Arrangements',
        href: '/about/fees',
        description: 'Transparent pricing options',
      },
    ],
    featured: {
      title: 'Join Our Team',
      description: 'Explore exciting career opportunities at Riley Bennett Egloff',
      href: '/about/careers',
      buttonText: 'View Open Positions',
    },
  },
  team: {
    label: 'Our Team',
    preview: 'Meet our experienced attorneys and dedicated support professionals',
    links: [
      {
        label: 'Attorneys',
        href: '/attorneys',
        description: 'Meet our legal professionals',
        icon: 'Scale',
      },
      {
        label: 'Other Professionals',
        href: '/team/professionals',
        description: 'Support staff and specialists',
        icon: 'Users',
      },
      {
        label: 'Legal Assistants',
        href: '/team/assistants',
        description: 'Our dedicated support team',
        icon: 'Briefcase',
      },
    ],
    action: {
      label: 'Search Directory',
      description: 'Find attorneys and staff quickly',
      action: 'search',
      icon: 'Search',
    },
  },
  practiceAreas: {
    label: 'Practice Areas',
    preview: 'Comprehensive legal services across diverse practice areas',
    columns: 3,
    links: [
      {
        label: 'Business & Corporate',
        href: '/practice-areas/business-law',
        description: 'Strategic business counsel',
        icon: 'Building2',
      },
      {
        label: 'Bankruptcy & Reorganization',
        href: '/practice-areas/bankruptcy-reorganization',
        description: 'Recovery and restructuring',
        icon: 'FileText',
      },
    ],
  },
  newsroom: {
    label: 'Newsroom',
    preview: 'Latest firm news, legal insights, and featured articles',
    links: [
      {
        label: 'Firm News',
        href: '/newsroom/firm-news',
        description: 'Latest firm announcements',
      },
      {
        label: 'Legal Updates',
        href: '/newsroom/legal-updates',
        description: 'Important legal developments',
      },
      {
        label: 'Videos',
        href: '/newsroom/videos',
        description: 'Watch our legal insights',
      },
    ],
  },
}
