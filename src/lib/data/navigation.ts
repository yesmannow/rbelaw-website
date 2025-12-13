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
        label: 'Bankruptcy',
        href: '/practice-areas/bankruptcy',
        description: 'Debt relief and restructuring',
        icon: 'FileText',
      },
      {
        label: 'Business & Corporate',
        href: '/practice-areas/business-corporate',
        description: 'Strategic business counsel',
        icon: 'Building2',
      },
      {
        label: 'Litigation',
        href: '/practice-areas/litigation-defense',
        description: 'Trial-tested advocacy',
        icon: 'Gavel',
      },
      {
        label: 'Construction',
        href: '/practice-areas/construction',
        description: 'Full-service construction law',
        icon: 'HardHat',
      },
      {
        label: 'Family Law',
        href: '/practice-areas/family-law',
        description: 'Compassionate family guidance',
        icon: 'Heart',
      },
      {
        label: 'Government',
        href: '/practice-areas/government-law',
        description: 'Municipal and public law',
        icon: 'Landmark',
      },
      {
        label: 'Health Care',
        href: '/practice-areas/health-care',
        description: 'Healthcare legal services',
        icon: 'HeartPulse',
      },
      {
        label: 'Insurance',
        href: '/practice-areas/insurance-coverage',
        description: 'Coverage and defense',
        icon: 'ShieldCheck',
      },
      {
        label: 'Intellectual Property',
        href: '/practice-areas/intellectual-property',
        description: 'Protecting your innovations',
        icon: 'Shield',
      },
      {
        label: 'Labor & Employment',
        href: '/practice-areas/labor-employment',
        description: 'Workplace legal solutions',
        icon: 'Users',
      },
      {
        label: 'Real Estate',
        href: '/practice-areas/real-estate',
        description: 'Commercial real estate',
        icon: 'Home',
      },
      {
        label: 'Wills & Trusts',
        href: '/practice-areas/estate-planning',
        description: 'Estate planning services',
        icon: 'FileText',
      },
    ],
  },
  industries: {
    label: 'Industries',
    preview: 'Specialized legal counsel for various industry sectors',
    columns: 2,
    links: [
      {
        label: 'Construction',
        href: '/industries/construction',
        description: 'Building and development',
        icon: 'HardHat',
      },
      {
        label: 'Finance',
        href: '/industries/finance',
        description: 'Financial services',
        icon: 'Landmark',
      },
      {
        label: 'Health Care',
        href: '/industries/health-care',
        description: 'Medical and healthcare',
        icon: 'Stethoscope',
      },
      {
        label: 'Insurance',
        href: '/industries/insurance',
        description: 'Insurance carriers',
        icon: 'Shield',
      },
      {
        label: 'Manufacturing',
        href: '/industries/manufacturing',
        description: 'Industrial operations',
        icon: 'Factory',
      },
      {
        label: 'Retail',
        href: '/industries/wholesale-retail',
        description: 'Retail and wholesale',
        icon: 'ShoppingCart',
      },
      {
        label: 'Transportation',
        href: '/industries/transportation',
        description: 'Logistics and transport',
        icon: 'Truck',
      },
      {
        label: 'Technology',
        href: '/industries/technology',
        description: 'Tech companies',
        icon: 'Laptop',
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
