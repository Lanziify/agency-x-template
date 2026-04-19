import { CollectionConfig } from 'payload';

import { slugField } from '@collections/fields';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'CMS',
    useAsTitle: 'title',
    defaultColumns: ['title', 'postType', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Fields',
          fields: [],
        },
      ],
    },
  ],
};
