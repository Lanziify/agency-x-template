import { Field } from 'payload';

export const ItemAlignment: Field = {
  name: 'itemAlignment',
  type: 'select',
  options: [
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
  ],
  defaultValue: 'start',
};