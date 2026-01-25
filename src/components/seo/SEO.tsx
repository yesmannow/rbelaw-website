/**
 * SEO Component
 * Manages meta tags, Open Graph, Twitter Cards, and canonical URLs
 */

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  nofollow?: boolean;
}

const DEFAULT_IMAGE = 'https://rbelaw.com/images/og-default.jpg';
const SITE_NAME = 'Riley Bennett Egloff LLP';
const TWITTER_HANDLE = '@RBELaw';

export const SEO = ({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  article,
  noindex = false,
  nofollow = false
}: SEOProps) => {
  // Construct full title
  const fullTitle = title.includes('Riley Bennett Egloff') 
    ? title 
    : `${title} | Riley Bennett Egloff LLP`;

  // Ensure absolute URL for image
  const absoluteImage = image.startsWith('http') 
    ? image 
    : `https://rbelaw.com${image}`;

  // Construct canonical URL
  const canonicalUrl = canonical 
    ? (canonical.startsWith('http') ? canonical : `https://rbelaw.com${canonical}`)
    : undefined;

  // Robots meta
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="robots" content={robotsContent} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:locale" content="en_US" />

      {/* Article-specific Open Graph */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO */}
      <meta name="author" content={SITE_NAME} />
      <meta name="copyright" content={`© ${new Date().getFullYear()} ${SITE_NAME}`} />
    </Helmet>
  );
};

/**
 * Default SEO for homepage
 */
export const HomePageSEO = () => (
  <SEO
    title="Business & Healthcare Attorneys"
    description="Business and health care attorneys working to answer your questions, support your legal needs, and pursue your business goals. We support and advocate for our clients in business, insurance, labor and employment, health care, construction, bankruptcy, and government law."
    canonical="/"
    image="/images/og-home.jpg"
  />
);

/**
 * SEO for practice area pages
 */
interface PracticeAreaSEOProps {
  name: string;
  slug: string;
  description: string;
}

export const PracticeAreaSEO = ({ name, slug, description }: PracticeAreaSEOProps) => (
  <SEO
    title={`${name} Attorneys`}
    description={description}
    canonical={`/practice-areas/${slug}`}
    image={`/images/practice-areas/${slug}-og.jpg`}
  />
);

/**
 * SEO for attorney profile pages
 */
interface AttorneySEOProps {
  name: string;
  id: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export const AttorneySEO = ({ name, id, title, bio, imageUrl }: AttorneySEOProps) => (
  <SEO
    title={`${name} - ${title}`}
    description={bio.substring(0, 160)}
    canonical={`/attorneys/${id}`}
    image={imageUrl}
    type="profile"
  />
);

/**
 * SEO for blog/news articles
 */
interface ArticleSEOProps {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  date: string;
  imageUrl?: string;
  category: string;
}

export const ArticleSEO = ({ 
  title, 
  excerpt, 
  slug, 
  author, 
  date, 
  imageUrl,
  category 
}: ArticleSEOProps) => (
  <SEO
    title={title}
    description={excerpt}
    canonical={`/newsroom/${slug}`}
    image={imageUrl}
    type="article"
    article={{
      publishedTime: date,
      author,
      section: category,
      tags: [category]
    }}
  />
);

/**
 * SEO for practice areas index page
 */
export const PracticeAreasIndexSEO = () => (
  <SEO
    title="Practice Areas"
    description="Explore our full range of practice areas. Riley Bennett Egloff LLP provides strategic counsel across business, insurance defense, labor & employment, healthcare, construction, bankruptcy, and government law."
    canonical="/practice-areas"
  />
)

/**
 * SEO for newsroom index page
 */
export const NewsroomSEO = () => (
  <SEO
    title="Newsroom"
    description="Read the latest firm news, insights, and legal updates from Riley Bennett Egloff LLP."
    canonical="/newsroom"
  />
)

/**
 * SEO for contact page
 */
export const ContactSEO = () => (
  <SEO
    title="Contact Us"
    description="Contact Riley Bennett Egloff LLP. Call us at 317-636-8000 or fill out our contact form. We have offices in Indianapolis, Indiana and Louisville, Kentucky."
    canonical="/contact"
  />
);

/**
 * SEO for about page
 */
export const AboutSEO = () => (
  <SEO
    title="About Our Firm"
    description="Riley Bennett Egloff LLP is a trusted legal partner providing business, insurance, labor and employment, healthcare, construction, bankruptcy, and government law services. Learn about our history, values, and commitment to clients."
    canonical="/about"
  />
);

/**
 * SEO for attorneys listing page
 */
export const AttorneysListSEO = () => (
  <SEO
    title="Our Attorneys"
    description="Meet the experienced attorneys at Riley Bennett Egloff LLP. Our team of skilled lawyers specializes in business law, insurance defense, healthcare law, construction law, employment law, and more."
    canonical="/attorneys"
  />
);
