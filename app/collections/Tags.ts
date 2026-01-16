import { type CollectionConfig } from 'payload';

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Tag',
    plural: 'Tags',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      admin: {
        readOnly: true,
        components: {
          Field: '@features/news/components/CustomSlugFieldClient',
        },
      },
    },
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
  ],
};
