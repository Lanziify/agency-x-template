import { Block } from 'payload';

import { buttonVariants } from '@components/ui/button';

import type { VariantProps } from 'class-variance-authority';

type Variants = NonNullable<VariantProps<typeof buttonVariants>['variant']>;

export const CTABlock: Block = {
  slug: 'ctaBlock',
  labels: {
    singular: 'CTA',
    plural: 'CTA',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
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
          options: ['default', 'destructive', 'ghost', 'link', 'outline', 'secondary'] as Variants[],
          defaultValue: 'default' as Variants,
        },
      ],
    },
  ],
};
