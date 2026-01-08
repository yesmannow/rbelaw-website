/**
 * Content Type Definitions
 * TypeScript interfaces for all scraped content
 */

// ============================================================================
// ATTORNEY TYPES
// ============================================================================

export interface Attorney {
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string;
  imageOriginal?: string;
  slug: string;
  bio: BiographySection[];
  practiceAreas: string[];
  education: string[];
  barAdmissions: string[];
  professionalAffiliations?: string[];
  honors?: string[];
  publications?: string[];
}

export interface BiographySection {
  heading: string;
  level?: 'h2' | 'h3' | 'h4' | 'H2' | 'H3' | 'H4';
  content: BiographyContentItem[];
}

// Allow biography content to include plain strings and simple list blocks
export type BiographyContentItem = string | BiographyListBlock;

export interface BiographyListBlock {
  type: 'list';
  items: string[];
}

// ============================================================================
// PRACTICE AREA TYPES
// ============================================================================

export interface PracticeArea {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color?: string;
  image?: string;
  content: BiographySection[];
  relatedAttorneys: string[];
  relatedIndustries: string[];
  featured?: boolean;
}

// ============================================================================
// INDUSTRY TYPES
// ============================================================================

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  color?: string;
  content: ContentBlock[];
  relatedPracticeAreas: string[];
  relatedAttorneys: string[];
  featured?: boolean;
}

// ============================================================================
// BLOG POST TYPES
// ============================================================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  url: string;
  date: string;
  author: string;
  authorSlug?: string;
  categories: string[];
  tags: string[];
  image: string;
  excerpt: string;
  content: BlogContentBlock[];
  featured?: boolean;
  readTime?: number;
}

export type BlogContentBlock = 
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | DividerBlock;

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
  links?: ContentLink[];
}

export interface HeadingBlock {
  type: 'heading';
  level: 'H2' | 'H3' | 'H4';
  text: string;
}

export interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: string[];
}

export interface QuoteBlock {
  type: 'quote';
  text: string;
}

export interface DividerBlock {
  type: 'divider';
}

export interface ContentLink {
  text: string;
  url: string;
}

// ============================================================================
// ABOUT PAGE TYPES
// ============================================================================

export interface AboutPage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: ContentBlock[];
  image?: string;
}

// ============================================================================
// SHARED CONTENT TYPES
// ============================================================================

export type ContentBlock = 
  | TextBlock
  | ImageBlock
  | VideoBlock
  | CalloutBlock
  | AccordionBlock;

export interface TextBlock {
  type: 'text';
  content: string;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface VideoBlock {
  type: 'video';
  src: string;
  poster?: string;
  caption?: string;
}

export interface CalloutBlock {
  type: 'callout';
  title: string;
  content: string;
  variant?: 'info' | 'warning' | 'success';
}

export interface AccordionBlock {
  type: 'accordion';
  items: AccordionItem[];
}

export interface AccordionItem {
  title: string;
  content: string;
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export interface NavigationItem {
  label: string;
  href?: string;
  icon?: string;
  description?: string;
  featured?: boolean;
  children?: NavigationItem[];
  megaMenu?: MegaMenuConfig;
}

export interface MegaMenuConfig {
  type: 'grid' | 'cards' | 'list';
  columns?: number;
  featured?: FeaturedItem[];
  sections?: MegaMenuSection[];
}

export interface MegaMenuSection {
  title: string;
  items: NavigationItem[];
}

export interface FeaturedItem {
  title: string;
  description: string;
  image?: string;
  href: string;
  icon?: string;
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

export interface FilterOptions {
  categories?: string[];
  tags?: string[];
  practiceAreas?: string[];
  industries?: string[];
  authors?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SearchResult {
  type: 'attorney' | 'blog' | 'practice-area' | 'industry' | 'page';
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  relevance: number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface Breadcrumb {
  label: string;
  href: string;
}
