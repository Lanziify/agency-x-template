import { WithFallbackImage } from '@components/ui/image';

import { isMedia } from '@lib/media';
import { cn } from '@lib/utils';

import { resolveWidth } from '../../renderer/util/resolve-width';
import { PageBlock } from '../types';

export const MediaBlock: React.FC<PageBlock['mediaBlock']> = (props) => {
  const { media, type, iframeUrl, width } = props;

  const renderMedia = () => {
    if (type === 'iframe') {
      return <iframe src={iframeUrl || undefined} className="h-full w-full" frameBorder="0" allowFullScreen title="Embedded content" />;
    }

    if (type === 'video') {
      const src = isMedia(media) ? media.url : '';
      return (
        <video controls className="h-full w-full object-contain">
          {src && <source src={src} />}
          Your browser does not support the video tag.
        </video>
      );
    }

    // Default to image
    const initialSrc = isMedia(media) ? media.url : '';
    const initialAlt = isMedia(media) ? media.alt : '';

    return <WithFallbackImage src={initialSrc} alt={initialAlt} className="w-full object-contain" />;
  };

  return (
    <div
      className={cn('bg-muted/50 dark:bg-accent-foreground flex w-full items-center justify-center rounded-lg border dark:border-white/20')}
      style={resolveWidth(width!)}>
      {renderMedia()}
    </div>
  );
};
