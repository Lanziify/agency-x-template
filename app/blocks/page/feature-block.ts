import { ItemAlignment } from './config/alignment';
import { IntroFields } from './elements/intro';
import { createBlockWithConfig } from './util';

export const FeatureBlock = createBlockWithConfig('featureBlock', {
  content: [
    ...IntroFields,
    {
      name: 'features',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  presentation: [ItemAlignment],
});
