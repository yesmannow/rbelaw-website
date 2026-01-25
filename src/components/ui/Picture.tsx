/**
 * Picture Component
 * Renders optimized images with multiple formats (AVIF, WebP, JPEG)
 */

interface PictureProps {
  src: string; // Path without extension (e.g., "/images/hero/hero-1")
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
}

export const Picture = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes
}: PictureProps) => {
  return (
    <picture>
      <source srcSet={`${src}.avif`} type="image/avif" sizes={sizes} />
      <source srcSet={`${src}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={className}
      />
    </picture>
  );
};

/**
 * Attorney Photo Component
 * Specialized component for attorney headshots
 */
interface AttorneyPhotoProps {
  slug: string; // e.g., "laura-binford"
  name: string;
  className?: string;
  size?: number;
}

export const AttorneyPhoto = ({
  slug,
  name,
  className = '',
  size = 400
}: AttorneyPhotoProps) => {
  // Map attorney ID to optimized photo filename
  const photoMap: Record<string, string> = {
    'laura-binford': 'laura-binford-indianapolis-med-mal-attorney-partner-riley-bennett-egloff-thumbnail-png',
    'beau-browning': 'beau-browning-headshot-with-background-s13-0338-a-jpg',
    'timothy-button': 'timothy-h-button-attorney-indianapolis-thumbnail-image',
    'douglas-cook': 'doug-cook-indianapolis-attorney-business-law',
    'john-egloff': 'john-egloff-attorney-headshot-thumbnail-jpg',
    'jeffrey-fecht': 'jeffrey-fecht-attorney-indianapolis-commercial-litigation-construction-law-product-liability-toxic-tort',
    'jaclyn-flint': 'jaclyn-m-flint-attorney-indiana-ip-law-construction-sports-entertainment-commercial-litigation-thumbnail',
    // Add more mappings as needed
  };

  const photoFilename = photoMap[slug] || slug;
  const basePath = `/images/team/optimized/${photoFilename}`;

  return (
    <Picture
      src={basePath}
      alt={`${name} - Attorney at Riley Bennett Egloff`}
      width={size}
      height={size}
      className={className}
    />
  );
};
