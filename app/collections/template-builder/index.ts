import { CollectionConfig } from 'payload';

export const TemplateBuilder: CollectionConfig = {
  slug: 'template-builder',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', 'updatedAt']
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'builder',
      type: 'textarea',
      admin: {
        components: {
          Field: '@features/template-builder/components/TemplateBuilder',
        },
      },
    },
  ],
};
