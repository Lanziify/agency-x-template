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
      label: 'Page',
      name: 'type',
      type: 'text',
      admin: {
        components: {
          Field: '@features/taxonomies/components/CMSPageSelectField',
        },
      },
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        readOnly: true,
        components: {
          Field: '@components/shared/CustomSlugFieldClient',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description for this category',
      },
    },
  ],
};
