import { itemLayout } from './config/presentation';
import { IntroFields } from './elements/intro';
import { createBlockWithConfig } from './util';

export const TestimonialsBlock = createBlockWithConfig('testimonialsBlock', {
  content: [
    ...IntroFields,
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: false,
        },
        {
          name: 'company',
          type: 'text',
          required: false,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'rating',
          type: 'number',
          required: false,
          min: 0,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
  ],
  presentation: [itemLayout],
});
