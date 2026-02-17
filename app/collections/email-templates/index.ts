import { CollectionConfig } from 'payload';

export const EmailTemplates: CollectionConfig = {
  slug: 'email-templates',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
  ],
};
