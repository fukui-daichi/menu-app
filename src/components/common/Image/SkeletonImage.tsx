import React, { useState } from 'react';

interface SkeletonImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  skeletonClassName?: string;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  skeletonClassName = 'bg-gray-200'
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-clip ${className}`} style={{ aspectRatio: '3/2' }}>
      {!loaded && (
        <div 
          className={`absolute inset-0 animate-pulse ${skeletonClassName}`}
          style={{ aspectRatio: '3/2' }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${imageClassName} ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ aspectRatio: '3/2' }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
};

export default SkeletonImage;
