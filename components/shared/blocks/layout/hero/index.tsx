import { Container } from '@components/ui/container';
import { WithFallbackImage } from '@components/ui/image';

import { cn } from '@lib/utils';

import { Media } from '@config/payload.types';

import { renderBlocks } from '../../renderer';
import { PageBlock } from '../../types';

function isMedia(media: number | Media | null | undefined): media is Media {
  return Boolean(media && typeof media !== 'number');
}

export const HeroBlock: React.FC<PageBlock['heroBlock']> = ({ media, components }) => {
  const initialSrc = isMedia(media) ? media.url : '';
  const initialAlt = isMedia(media) ? media.alt : '';

  return (
    <div className="relative flex min-h-122.25 items-stretch">
      <div
        className={cn('relative z-10 flex flex-1 items-center bg-white/20 backdrop-blur-xs dark:bg-white/20', {
          'border-b dark:border-b-white/20': !isMedia(media),
        })}>
        <Container className="relative z-10 dark:bg-transparent">{components ? renderBlocks(components) : null}</Container>
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <WithFallbackImage src={initialSrc} alt={initialAlt} className="w-full object-cover" />
      </div>
    </div>
  );
};
