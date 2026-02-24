import type { Block } from 'payload';

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
};
