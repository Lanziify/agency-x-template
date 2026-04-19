import { contentAlignment } from './config/presentation';
import { AccordionBlock } from './elements/accordion';
import { ButtonBlock } from './elements/button';
import { IntroBlock } from './elements/intro';
import { createBlockWithConfig } from './util';

export const HeroBlock = createBlockWithConfig('heroBlock', {
  content: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [IntroBlock, AccordionBlock, ButtonBlock],
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  presentation: [contentAlignment],
});
