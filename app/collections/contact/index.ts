import { type CollectionConfig } from 'payload';
import { FormBlock } from '@blocks/form';

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
    { name: 'active', type: 'checkbox', defaultValue: false, required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'blocks',
              name: 'form',
              blocks: [FormBlock],
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
