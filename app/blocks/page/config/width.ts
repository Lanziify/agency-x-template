import { Field } from 'payload';

export const Width: Field = {
  type: 'group',
  label: 'Width',
  fields: [
    {
      name: 'width',
      type: 'select',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: '1/12 (8.3%)', value: '1' },
        { label: '2/12 (16.6%)', value: '2' },
        { label: '3/12 (25%)', value: '3' },
        { label: '4/12 (33.3%)', value: '4' },
        { label: '6/12 (50%)', value: '6' },
        { label: '8/12 (66.6%)', value: '8' },
        { label: '9/12 (75%)', value: '9' },
        { label: '12/12 (100%)', value: '12' },
      ],
      defaultValue: 'auto',
      admin: {
        components: {
          Field: {
            path: '@components/shared/container-width-field',
          },
        },
      },
    },
  ],
};
