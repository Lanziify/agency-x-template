import { Field } from 'payload';

export const ViewType: Field = {
  type: 'group',
  label: 'View Type',
  fields: [
    {
      name: 'viewType',
      type: 'select',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'grid',
    },
  ],
};

export const Inset: Field = {
  type: 'group',
  label: 'Inset Section',
  fields: [
    {
      name: 'isInset',
      type: 'checkbox',
      defaultValue: false,
    }
  ]
}