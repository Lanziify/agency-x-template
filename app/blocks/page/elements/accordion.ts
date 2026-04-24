import { Block } from 'payload';

import { Width } from '../config/width';

export const AccordionBlock: Block = {
  slug: 'accordionBlock',
  fields: [
    {
      name: 'collapsible',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'trigger',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'expandedByDefault',
          type: 'checkbox',
          label: 'Expanded by Default',
          admin: {
            description: 'If checked, item will be expanded when the page load.',
          },
        },
      ],
    },
    Width,
  ],
};
