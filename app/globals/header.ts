import { GlobalConfig } from 'payload';

import { CtaButtonVariants } from '@blocks/page/elements/button';

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Sitename',
      required: true,
    },
    {
      name: 'menu',
      type: 'array',
      fields: [
        {
          name: 'items',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          unique: true,
        },
      ],
      maxRows: 6,
    },
    {
      name: 'actions',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          options: ['default', 'destructive', 'ghost', 'link', 'outline', 'secondary'] as CtaButtonVariants[],
          defaultValue: 'default' as CtaButtonVariants,
        },
      ],
    },
  ],
};
