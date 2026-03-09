import { Block } from 'payload';
import { CTABlock } from '../cta';

export const HeroBlock: Block = {
  slug: 'heroBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'blocks',
      name: 'components',
      blocks: [CTABlock],
    },
  ],
};
