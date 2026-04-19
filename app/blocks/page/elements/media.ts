import { containerWidth } from '../config/presentation';
import { createBlockWithConfig } from '../util';

export const MediaBlock = createBlockWithConfig('mediaBlock', {
  content: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Iframe', value: 'iframe' },
      ],
      defaultValue: 'image',
      required: true,
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'image' || siblingData?.type === 'video',
      },
    },
    {
      name: 'iframeUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'iframe',
      },
    },
  ],
  presentation: [containerWidth],
});
