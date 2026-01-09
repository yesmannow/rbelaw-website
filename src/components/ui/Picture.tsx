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
  // Use normalized ID-based path in Attorneys/ directory
  // Slug should already be normalized (e.g., "laura-k-binford", "beau-browning")
  const basePath = `/images/team/Attorneys/${slug}`;

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
