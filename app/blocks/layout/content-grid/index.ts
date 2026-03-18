import { Block } from 'payload';

export const ContentGridBlock: Block = {
  slug: 'contentGridBlock',
  labels: { singular: 'Content Grid Block', plural: 'Content Grid Blocks' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [{ label: 'News Articles', value: 'news' }],
    },
    // {
    //   name: 'items',
    //   type: 'relationship',
    //   relationTo: ['news'],
    //   hasMany: true,
    //   admin: {
    //     condition: (_, siblingData) => !!siblingData.source,
    //   },
    // },
    { name: 'columns', type: 'number', min: 1, max: 6, defaultValue: 3 },
    {
      name: 'gap',
      type: 'select',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      defaultValue: 'medium',
    },
    { name: 'limit', type: 'number', defaultValue: 6 },
    { name: 'pagination', type: 'checkbox', defaultValue: false },
    {
      name: 'sortBy',
      type: 'select',
      options: [
        { label: 'Newest First', value: 'createdAtDesc' },
        { label: 'Oldest First', value: 'createdAtAsc' },
        { label: 'Title A-Z', value: 'titleAsc' },
        { label: 'Title Z-A', value: 'titleDesc' },
      ],
      defaultValue: 'createdAtDesc',
    },
    {
      name: 'cardStyle',
      type: 'select',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Highlight', value: 'highlight' },
        { label: 'Minimal', value: 'minimal' },
      ],
      defaultValue: 'standard',
    },
  ],
};
