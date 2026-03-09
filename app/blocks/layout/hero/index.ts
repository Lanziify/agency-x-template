import { Block } from 'payload';

import { CTABlock } from '../cta';

export const HeroBlock: Block = {
  slug: 'heroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Hero',
  },
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
