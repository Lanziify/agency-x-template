import { createFieldBlock } from '../util/field';

export const Checkbox = createFieldBlock('checkbox', [
  {
    name: 'defaultValue',
    type: 'checkbox',
  },
]);
export const Text = createFieldBlock('text', [
  {
    name: 'defaultValue',
    type: 'text',
    label: 'Default Value',
    localized: true,
  },
]);
export const Select = createFieldBlock('select', [
  {
    name: 'options',
    type: 'array',
    label: 'Options',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
      },
      {
        name: 'value',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    name: 'defaultValue',
    type: 'text',
    label: 'Default Value',
  },
]);
export const Email = createFieldBlock('email');
export const TextArea = createFieldBlock('textarea', [
  {
    name: 'defaultValue',
    type: 'textarea',
    label: 'Default Value',
    localized: true,
  },
]);
