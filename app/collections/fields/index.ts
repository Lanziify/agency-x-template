import { SlugField } from 'payload';

const slugField: SlugField = (args) => ({
  type: 'row',
  admin: {
    readOnly: true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      admin: {
        components: {
          Field: {
            path: '@components/custom-fields/slug-field',
            clientProps: { ...args },
          },
        },
      },
    },
  ],
});

export { slugField };
