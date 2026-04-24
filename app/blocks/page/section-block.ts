import { Background } from './config/background';
import { RootBlock } from './config/presentation';
import { Width } from './config/width';
import { ButtonBlock } from './elements/button';
import { ContainerBlock } from './elements/container';
import { IntroBlock } from './elements/intro';
import { MediaBlock } from './elements/media';
import { RichTextBlock } from './elements/richtext';
import { createBlockWithConfig } from './util';

export const SectionBlock = createBlockWithConfig('sectionBlock', {
  content: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [ContainerBlock, IntroBlock, MediaBlock, ButtonBlock, RichTextBlock],
    },
  ],
  presentation: [RootBlock, Width, Background],
});
