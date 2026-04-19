import { contentAlignment, itemLayout } from './config/presentation';
import { IntroFields } from './elements/intro';
import { createBlockWithConfig } from './util';

export const TeamBlock = createBlockWithConfig('teamBlock', {
  content: [
    ...IntroFields,
    {
      name: 'members',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: ['facebook', 'x', 'instagram', 'linkedin', 'github'],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
          maxRows: 5,
        },
      ],
      minRows: 1,
    },
  ],
  presentation: [contentAlignment, itemLayout],
});
