import React from 'react'
import Script from 'next/script'

// JSON-LD Structured Data for Legal Service
const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Riley Bennett Egloff LLP',
  alternateName: 'RBE Law',
  url: 'https://rbelaw.com',
  logo: 'https://rbelaw.com/logo.png',
  description:
    'A premier mid-sized law firm specializing in Corporate Law, Insurance Defense, Construction, and Litigation. Trusted legal counsel for businesses and professionals across Indiana.',
  priceRange: '$$$',
  telephone: '+1-317-636-8000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'One Indiana Square, Suite 2400',
    addressLocality: 'Indianapolis',
    addressRegion: 'IN',
    postalCode: '46204',
    addressCountry: 'US',
  },
  areaServed: [
    {
      '@type': 'State',
      name: 'Indiana',
    },
  ],
  openingHours: 'Mo-Fr 09:00-17:00',
  knowsAbout: [
    'Business Law',
    'Corporate Law',
    'Insurance Defense',
    'Construction Law',
    'Commercial Litigation',
    'Labor & Employment Law',
    'Health Care Law',
    'Real Estate Law',
    'Bankruptcy & Reorganization',
  ],
  sameAs: [
    'https://www.linkedin.com/company/riley-bennett-egloff-llp',
  ],
}

// Attorney Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://rbelaw.com/#organization',
  name: 'Riley Bennett Egloff LLP',
  legalName: 'Riley Bennett Egloff LLP',
  url: 'https://rbelaw.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://rbelaw.com/logo.png',
  },
  foundingDate: '1992',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'One Indiana Square, Suite 2400',
    addressLocality: 'Indianapolis',
    addressRegion: 'IN',
    postalCode: '46204',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-317-636-8000',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: 'en',
  },
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <Script
        id="legal-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalServiceSchema),
        }}
        strategy="beforeInteractive"
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
        strategy="beforeInteractive"
      />
      {children}
    </>
  )
}
