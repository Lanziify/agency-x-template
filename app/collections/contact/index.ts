import { type CollectionConfig } from 'payload';

import { FormBlock } from '@blocks/form';
import { HeroBlock } from '@blocks/layout/hero';

export const Contact: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'title',
  },
  defaultPopulate: {
    form: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'active',
      type: 'checkbox',
      admin: { description: 'Enable this to use this form as your active contact form for receiving messages.' },
      defaultValue: false,
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'blocks',
              name: 'form',
              label: 'Form Template',
              admin: {
                description: 'Select a form template to use in contact page',
              },
              blocks: [HeroBlock ,FormBlock],
              required: true,
            },
            {
              type: 'richText',
              name: 'introduction',
              label: 'Introduction',
              admin: {
                description: 'Introductory text displayed above the contact form',
              },
              required: false,
            },
          ],
        },
      ],
    },
  ],
};
