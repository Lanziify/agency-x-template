import type { Block } from 'payload';

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  fields: [
    {
      type: 'richText',
      name: 'introduction',
      label: 'Introduction',
      admin: {
        description: 'Introductory text displayed above the contact form',
      },
      required: false,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
};
