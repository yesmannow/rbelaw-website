import { Helmet } from 'react-helmet-async'

interface SEOMetaProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
}

const DEFAULT_TITLE = 'Riley Bennett Egloff LLP | Corporate Law Excellence'
const DEFAULT_DESCRIPTION = 'Riley Bennett Egloff LLP provides strategic legal counsel for businesses across Indiana and the Midwest.'
const DEFAULT_IMAGE = '/RBE-Logo-with-®-RGB-jpg.jpg'

export function SEOMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  author,
}: SEOMetaProps) {
  const fullTitle = title ? `${title} | Riley Bennett Egloff LLP` : DEFAULT_TITLE
  const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const fullImage = image.startsWith('http') ? image : `${typeof window !== 'undefined' ? window.location.origin : ''}${image}`

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {author && <meta name="author" content={author} />}

      {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      {url && <meta property="og:url" content={fullUrl} />}
      <meta property="og:site_name" content="Riley Bennett Egloff LLP" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional Meta Tags */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  )
}
