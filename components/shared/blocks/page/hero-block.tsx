import { Container } from '@components/ui/container';
import { WithFallbackImage } from '@components/ui/image';

import { isMedia } from '@lib/media';
import { cn } from '@lib/utils';

import { renderBlocks } from '../renderer';
import { BackgroundBlock } from './elements/background';
import { PageBlock } from './types';

export const HeroBlock: React.FC<PageBlock['heroBlock']> = (props) => {
  const { background, blocks } = props;

  // const initialSrc = isMedia(background) ? background.url : '';
  // const initialAlt = isMedia(background) ? background.alt : '';

  return (
    <div className="relative flex min-h-122.25 items-stretch">
      <div
        className={cn('relative z-1 flex flex-1 items-center bg-white/20 backdrop-blur-xs dark:bg-white/20', {
          // 'border-b dark:border-b-white/20': !isMedia(background),
        })}>
        <Container className="relative z-1 space-y-8 dark:bg-transparent">{blocks?.map((block) => renderBlocks(block))}</Container>
      </div>

      <BackgroundBlock {...background} />
    </div>
  );
};
