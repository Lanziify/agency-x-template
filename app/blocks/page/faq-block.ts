import { AccordionBlock } from './elements/accordion';
import { ButtonBlock } from './elements/button';
import { IntroBlock } from './elements/intro';
import { createBlockWithConfig } from './util';

export const FAQBlock = createBlockWithConfig('faqBlock', {
  content: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [IntroBlock, AccordionBlock, ButtonBlock],
    },
  ],
  presentation: [],
});
