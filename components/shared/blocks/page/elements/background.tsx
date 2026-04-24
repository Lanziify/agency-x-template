import { WithFallbackImage } from '@components/ui/image';

import { isMedia } from '@lib/media';

import { Media } from '@config/payload.types';

type BackgroundBlockProps = {
  type?: 'image' | 'video' | 'color' | null | undefined;
  image?: number | Media | null | undefined;
  video?: (number | null) | Media;
  color?: string | null;
  overlayOpacity?: number | null;
  position?: ('center' | 'top' | 'bottom') | null;
};

export const BackgroundBlock: React.FC<BackgroundBlockProps> = ({ type, image }) => {
  if (type === 'image') {
    const initialSrc = isMedia(image) ? image.url : '';
    const initialAlt = isMedia(image) ? image.alt : '';

    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <WithFallbackImage src={initialSrc} alt={initialAlt} className="w-full object-cover" />
      </div>
    );
  }

  return null;
};
