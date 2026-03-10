'use client';

import { default as NextImage, type ImageProps } from 'next/image';
import React from 'react';
import { SVGProps } from 'react';

type WithFallbackImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src?: string | null;
  alt?: string;
};

const FallBackImage = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="dark:fill-accent-foreground h-full w-full fill-black" {...props}>
    <path d="M227.662 277.449C226.282 277.449 225.085 276.942 224.072 275.928C223.059 274.915 222.552 273.719 222.552 272.339V227.661C222.552 226.276 223.059 225.076 224.072 224.059C225.085 223.042 226.282 222.534 227.662 222.534H272.339C273.724 222.534 274.925 223.042 275.941 224.059C276.958 225.076 277.467 226.276 277.467 227.661V272.339C277.467 273.719 276.958 274.915 275.941 275.928C274.925 276.942 273.724 277.449 272.339 277.449H227.662ZM227.662 272.339H272.339V227.661H227.662V272.339ZM234.004 265.386H266.071C266.574 265.386 266.943 265.159 267.176 264.704C267.409 264.248 267.383 263.792 267.097 263.335L258.376 251.635C258.098 251.3 257.755 251.129 257.347 251.123C256.939 251.117 256.599 251.288 256.325 251.635L247.45 263.081L241.519 254.935C241.229 254.588 240.88 254.417 240.472 254.423C240.064 254.429 239.724 254.6 239.45 254.935L233.053 263.335C232.718 263.792 232.667 264.248 232.9 264.704C233.133 265.159 233.501 265.386 234.004 265.386Z" />
  </svg>
);

const WithFallbackImage: React.FC<WithFallbackImageProps> = ({ src, alt = 'Image', ...rest }) => {
  const [error, setError] = React.useState<boolean>(false);

  if (error || !src) return <FallBackImage />;

  return <NextImage src={src} alt={alt} {...rest} onError={() => setError(true)} />;
};

export { FallBackImage, WithFallbackImage };
