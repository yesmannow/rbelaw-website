/**
 * Structured Data (Schema.org) Components
 * Implements JSON-LD structured data for improved SEO and AI search visibility
 */

import { useMemo } from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

/**
 * Generic structured data component
 */
export const StructuredData = ({ data }: StructuredDataProps) => {
  const jsonLd = useMemo(() => JSON.stringify(data), [data]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
};

/**
 * Organization Schema for the law firm
 */
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": "https://rbelaw.com/#organization",
    "name": "Riley Bennett Egloff LLP",
    "alternateName": "RBE Law",
    "description": "Business and health care attorneys working to answer your questions, support your legal needs, and pursue your business goals. We support and advocate for our clients in business, insurance, labor and employment, health care, construction, bankruptcy, and government law.",
    "url": "https://rbelaw.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://rbelaw.com/images/logo.png",
      "width": 250,
      "height": 60
    },
    "image": "https://rbelaw.com/images/office-exterior.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "111 Monument Circle, Suite 3700",
      "addressLocality": "Indianapolis",
      "addressRegion": "IN",
      "postalCode": "46204",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.7684,
      "longitude": -86.1581
    },
    "telephone": "+1-317-636-8000",
    "email": "info@rbelaw.com",
    "priceRange": "$$$$",
    "areaServed": [
      {
        "@type": "State",
        "name": "Indiana"
      },
      {
        "@type": "State",
        "name": "Kentucky"
      }
    ],
    "knowsAbout": [
      "Business Law",
      "Insurance Defense",
      "Labor and Employment Law",
      "Healthcare Law",
      "Construction Law",
      "Bankruptcy Law",
      "Government Law",
      "Litigation"
    ],
    "slogan": "A Trusted Legal Partner",
    "foundingDate": "1986",
    "sameAs": [
      "https://www.linkedin.com/company/riley-bennett-egloff-llp",
      "https://www.facebook.com/RBELaw"
    ]
  };

  return <StructuredData data={schema} />;
};

interface AttorneySchemaProps {
  attorney: {
    id: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    bio: string;
    imageUrl: string;
    practiceAreas: string[];
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
    barAdmissions: string[];
    awards?: string[];
    linkedIn?: string;
  };
}

/**
 * Attorney/Person Schema
 */
export const AttorneySchema = ({ attorney }: AttorneySchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://rbelaw.com/attorneys/${attorney.id}#person`,
    "name": attorney.name,
    "jobTitle": attorney.title,
    "description": attorney.bio,
    "email": attorney.email,
    "telephone": attorney.phone,
    "image": `https://rbelaw.com${attorney.imageUrl}`,
    "url": `https://rbelaw.com/attorneys/${attorney.id}`,
    "worksFor": {
      "@type": "LegalService",
      "@id": "https://rbelaw.com/#organization",
      "name": "Riley Bennett Egloff LLP"
    },
    "alumniOf": attorney.education.map(edu => ({
      "@type": "EducationalOrganization",
      "name": edu.institution
    })),
    "knowsAbout": attorney.practiceAreas,
    "award": attorney.awards,
    "sameAs": attorney.linkedIn ? [attorney.linkedIn] : undefined
  };

  return <StructuredData data={schema} />;
};

interface PracticeAreaSchemaProps {
  practiceArea: {
    name: string;
    slug: string;
    description: string;
    detailedDescription: string;
  };
}

/**
 * Service Schema for practice areas
 */
export const PracticeAreaSchema = ({ practiceArea }: PracticeAreaSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://rbelaw.com/practice-areas/${practiceArea.slug}#service`,
    "name": practiceArea.name,
    "description": practiceArea.description,
    "serviceType": practiceArea.name,
    "provider": {
      "@type": "LegalService",
      "@id": "https://rbelaw.com/#organization",
      "name": "Riley Bennett Egloff LLP"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Indiana"
      },
      {
        "@type": "State",
        "name": "Kentucky"
      }
    ],
    "url": `https://rbelaw.com/practice-areas/${practiceArea.slug}`
  };

  return <StructuredData data={schema} />;
};

interface ArticleSchemaProps {
  article: {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    imageUrl?: string;
    slug: string;
  };
}

/**
 * Article Schema for blog posts and news
 */
export const ArticleSchema = ({ article }: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://rbelaw.com/news/${article.slug}#article`,
    "headline": article.title,
    "description": article.excerpt,
    "image": article.imageUrl ? `https://rbelaw.com${article.imageUrl}` : undefined,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "LegalService",
      "@id": "https://rbelaw.com/#organization",
      "name": "Riley Bennett Egloff LLP",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rbelaw.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rbelaw.com/news/${article.slug}`
    }
  };

  return <StructuredData data={schema} />;
};

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * FAQ Schema for practice area FAQs
 */
export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <StructuredData data={schema} />;
};

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * Breadcrumb Schema for navigation
 */
export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://rbelaw.com${item.url}`
    }))
  };

  return <StructuredData data={schema} />;
};

interface LocalBusinessSchemaProps {
  office: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
}

/**
 * LocalBusiness Schema for office locations
 */
export const LocalBusinessSchema = ({ office }: LocalBusinessSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `Riley Bennett Egloff LLP - ${office.name}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": office.address,
      "addressLocality": office.city,
      "addressRegion": office.state,
      "postalCode": office.zip,
      "addressCountry": "US"
    },
    "telephone": office.phone,
    "url": "https://rbelaw.com",
    "priceRange": "$$$$"
  };

  return <StructuredData data={schema} />;
};

interface ReviewSchemaProps {
  reviews: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }>;
}

/**
 * Review/Rating Schema for testimonials
 */
export const ReviewSchema = ({ reviews }: ReviewSchemaProps) => {
  const aggregateRating = {
    ratingValue: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": "https://rbelaw.com/#organization",
    "name": "Riley Bennett Egloff LLP",
    "aggregateRating": {
      "@type": "AggregateRating",
      ...aggregateRating
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished
    }))
  };

  return <StructuredData data={schema} />;
};

/**
 * WebSite Schema with search action
 */
export const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://rbelaw.com/#website",
    "name": "Riley Bennett Egloff LLP",
    "url": "https://rbelaw.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://rbelaw.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "LegalService",
      "@id": "https://rbelaw.com/#organization"
    }
  };

  return <StructuredData data={schema} />;
};
