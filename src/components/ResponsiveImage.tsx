import React, { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: string; // e.g. "aspect-[4/3]", "aspect-[16/10]", "aspect-square"
  priority?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain';
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectRatio = 'aspect-[4/3]',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate responsive WebP srcSet from unsplash or generic image url
  const cleanUrl = src.split('?')[0];
  const srcSet = `${cleanUrl}?auto=format&fit=crop&fm=webp&w=480&q=80 480w, ${cleanUrl}?auto=format&fit=crop&fm=webp&w=800&q=80 800w, ${cleanUrl}?auto=format&fit=crop&fm=webp&w=1200&q=80 1200w`;
  const defaultSrc = `${cleanUrl}?auto=format&fit=crop&fm=webp&w=800&q=80`;

  return (
    <div className={`relative overflow-hidden bg-oatSurface/40 ${aspectRatio} ${className}`}>
      {/* Shimmer skeleton until image loads */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 shimmer-gradient z-0 pointer-events-none"
        />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-oatSurface text-textLightMuted text-center">
          <div className="w-10 h-10 rounded-full bg-stoneIvory flex items-center justify-center text-terracotta mb-2 shadow-xs">
            ☕
          </div>
          <span className="text-xs font-serif font-bold text-espressoDeep">{alt}</span>
          <span className="text-[10px] uppercase tracking-wider text-terracotta mt-0.5">ATELIER Kaffeerösterei</span>
        </div>
      ) : (
        <picture className="w-full h-full block">
          <source type="image/webp" srcSet={srcSet} sizes={sizes} />
          <img
            src={defaultSrc}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'low'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full transition-all duration-700 ease-out ${
              objectFit === 'cover' ? 'object-cover' : 'object-contain'
            } ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'} ${imgClassName}`}
          />
        </picture>
      )}
    </div>
  );
};
