import { containerWidth, rootBlock } from './config/presentation';
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
  presentation: [rootBlock, containerWidth],
});
