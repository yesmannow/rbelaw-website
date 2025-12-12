/**
 * Type definitions for Riley Bennett Egloff website
 */

// Attorney Profile
export interface Attorney {
  id: string
  name: string
  title: string // e.g., "Partner", "Associate", "Of Counsel"
  email: string
  phone: string
  bio: string
  imageUrl: string
  practiceAreas: string[] // IDs of practice areas
  education: Education[]
  barAdmissions: string[]
  awards?: string[]
  publications?: Publication[]
  linkedIn?: string
  vCard?: string
}

export interface Education {
  degree: string
  institution: string
  year: string
}

export interface Publication {
  title: string
  publication: string
  date: string
  url?: string
}

// Practice Area
export interface PracticeArea {
  id: string
  name: string
  slug: string
  description: string
  detailedDescription: string
  icon: string // Lucide icon name
  attorneys: string[] // IDs of attorneys who practice in this area
  subAreas?: string[]
  caseStudies?: CaseStudy[]
  imageUrl?: string
}

export interface CaseStudy {
  title: string
  description: string
  outcome: string
  year: string
}

// Navigation
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// Contact Form
export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  practiceArea?: string
  message: string
}

// News/Blog Post
export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  imageUrl?: string
  category: string
  slug: string
}

// Office Location
export interface Office {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  fax?: string
  mapUrl?: string
}
