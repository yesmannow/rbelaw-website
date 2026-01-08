/**
 * Prestige Types for RBE Ecosystem
 * Type-safe interfaces for the unified Newsroom and Attorney Bio architecture
 */

// ============================================================================
// NEWS ARTICLE TYPES
// ============================================================================

/**
 * NewsArticle - Enhanced blog post with strict attorney relationship
 * Every article MUST have an authorId that matches an attorney's slug
 */
export interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: ArticleContent[]
  authorId: string // REQUIRED: Must match an Attorney.slug
  authorName: string
  date: string
  imageUrl?: string
  category: string
  tags: string[]
  featured?: boolean
  readTime?: number
  url?: string
}

export type ArticleContent = 
  | ArticleParagraph
  | ArticleHeading
  | ArticleList
  | ArticleQuote
  | ArticleDivider

export interface ArticleParagraph {
  type: 'paragraph'
  text: string
}

export interface ArticleHeading {
  type: 'heading'
  level: 'H2' | 'H3' | 'H4'
  text: string
}

export interface ArticleList {
  type: 'list'
  ordered: boolean
  items: string[]
}

export interface ArticleQuote {
  type: 'quote'
  text: string
}

export interface ArticleDivider {
  type: 'divider'
}

// ============================================================================
// ATTORNEY PROFILE TYPES
// ============================================================================

/**
 * AttorneyProfile - Enhanced attorney data with complete metadata
 */
export interface AttorneyProfile {
  id: string
  slug: string
  name: string
  title: string
  email: string
  phone: string
  imageUrl: string
  bio: string
  practiceAreas: string[]
  education: string[]
  barAdmissions: string[]
  
  // Optional sections - if empty, tab should be hidden
  publications?: string[]
  awards?: string[]
  representativeMatters?: string[]
  professionalAffiliations?: string[]
  community?: string[]
  beyondOffice?: string
  videos?: AttorneyVideo[]
  
  // Assistant info
  assistant?: string
  assistantEmail?: string
  
  // Social links
  linkedIn?: string
  twitter?: string
  
  // vCard reference
  vCardPath?: string
}

export interface AttorneyVideo {
  title: string
  url: string
  date?: string
}

// ============================================================================
// VCARD DATA TYPES
// ============================================================================

/**
 * VCardData - Structured data for vCard generation
 */
export interface VCardData {
  // Required fields
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  organization: string
  
  // Optional fields
  title?: string
  workAddress?: VCardAddress
  photo?: string
  url?: string
  note?: string
  categories?: string[]
  
  // Assistant information
  assistant?: string
  assistantEmail?: string
  
  // Social profiles
  linkedIn?: string
  twitter?: string
}

export interface VCardAddress {
  street: string
  suite?: string
  city: string
  state: string
  zip: string
  country: string
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

/**
 * Filter options for Newsroom
 */
export interface NewsroomFilters {
  searchQuery?: string
  category?: string
  author?: string
  dateRange?: {
    start: string
    end: string
  }
  tags?: string[]
}

/**
 * Filter result with metadata
 */
export interface FilteredNewsResult {
  articles: NewsArticle[]
  totalCount: number
  filteredCount: number
  categories: string[]
  authors: Array<{ id: string; name: string; count: number }>
  tags: Array<{ name: string; count: number }>
}
