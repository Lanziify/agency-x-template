import { type CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'News',
          value: 'news',
        },
      ],
      required: true,
    },
    { name: 'description', type: 'textarea' },
  ],
};
