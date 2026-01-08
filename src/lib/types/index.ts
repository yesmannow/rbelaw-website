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
  representativeMatters?: RepresentativeMatter[]
  associations?: string[]
  community?: string[]
  linkedIn?: string
  twitter?: string
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

export interface RepresentativeMatter {
  title: string
  description: string
  year?: string
  practiceArea?: string
}

// Professional (Other Professionals - non-attorney staff)
export interface Professional {
  id: string
  name: string
  title: string
  email: string
  phone?: string
  bio?: string
  imageUrl?: string
  department?: string
  specialties?: string[]
}

// Legal Assistant
export interface LegalAssistant {
  id: string
  name: string
  title: string
  email: string
  phone?: string
  bio?: string
  imageUrl?: string
  supportingAttorneys?: string[] // Attorney IDs
  specialties?: string[]
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

// News Archive Item (from legacy WordPress)
export interface NewsArchiveItem {
  id: string
  title: string
  slug: string
  date: string
  category: string
  excerpt: string
  image: string
  url: string
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

// Industry
export interface Industry {
  id: string
  name: string
  slug: string
  description: string
  icon: string // Lucide icon name
  detailedDescription?: string
  relatedAttorneys?: string[]
}

// Marketing & Lead Capture
export interface LeadData {
  email: string
  name?: string
  phone?: string
  source: 'contact_form' | 'quiz' | 'newsletter' | 'blog_cta' | 'comp_calculator' | 'lien_calculator' | 'succession_quiz' | 'district_map' | 'flsa_wizard' | 'litigation_timeline' | 'contract_risk_analyzer' | 'business_entity_comparison' | 'osha_calculator' | 'know_your_rights_quiz'
  metadata?: Record<string, unknown>
}

export interface QuizAnswer {
  question: string
  answer: string
}

export interface CaseAssessmentData extends LeadData {
  incidentType?: string
  incidentDate?: string
  hasContract?: string
  answers?: QuizAnswer[]
}

// Case Results
export interface CaseResult {
  id: string
  title: string
  practiceArea: string[]
  industry: string[]
  summary: string
  outcome: string
  amount?: string
  complexity: 'Standard' | 'Complex' | 'Highly Complex'
  attorneys: string[] // Attorney IDs
  date: string
  tags: string[]
  isConfidential?: boolean
}

// Industry-Specific Landing Pages
export interface IndustryPage {
  id: string
  name: string
  slug: string
  title: string
  description: string
  detailedDescription: string
  icon: string
  heroImage?: string
  services: string[]
  relatedPracticeAreas: string[]
  relatedAttorneys: string[]
  caseResults?: string[] // CaseResult IDs
  resources?: Resource[]
  faqs?: FAQ[]
  testimonials?: Testimonial[]
}

// Resources
export interface Resource {
  id: string
  title: string
  description: string
  type: 'guide' | 'checklist' | 'template' | 'whitepaper' | 'ebook' | 'video' | 'webinar'
  category: string
  downloadUrl?: string
  fileSize?: string
  fileType?: string
  thumbnail?: string
  practiceAreas?: string[]
  industries?: string[]
  date: string
  author?: string
  requiresEmail?: boolean
}

// FAQ
export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  practiceArea?: string
  industry?: string
  order?: number
}

// Testimonial
export interface Testimonial {
  id: string
  author: string
  company?: string
  role?: string
  content: string
  rating?: number
  date: string
  practiceArea?: string
  industry?: string
  imageUrl?: string
  isVerified?: boolean
}

// Video Content
export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: string
  category: 'attorney-intro' | 'practice-area' | 'testimonial' | 'webinar' | 'educational'
  practiceArea?: string
  attorney?: string
  date: string
  transcript?: string
}
