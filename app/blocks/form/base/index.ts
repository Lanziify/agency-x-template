import { Field } from 'payload';

export const baseFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Key (unique identifier)',
        required: true,
        admin: { width: '50%' },
      },
      {
        name: 'label',
        type: 'text',
        label: 'Label',
        localized: true,
        admin: { width: '50%' },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'width',
        type: 'number',
        label: 'Field Width (%)',
        admin: { width: '50%' },
      },
      {
        name: 'placeholder',
        type: 'text',
        label: 'Placeholder',
        localized: true,
        admin: { width: '50%' },
      },
    ],
  },
  {
    name: 'required',
    type: 'checkbox',
    label: 'Required',
  },
  {
    name: 'errorMessage',
    type: 'text',
    label: 'Error Message',
    admin: {
      condition: (_, { required }) => Boolean(required),
    },
  },
];
