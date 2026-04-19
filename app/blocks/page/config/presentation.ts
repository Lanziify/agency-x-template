import { Field } from 'payload';

export const contentAlignment: Field = {
  name: 'contentAlignment',
  type: 'select',
  options: [
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
  ],
  defaultValue: 'start',
};

export const contentListType: Field = {
  name: 'contentListType',
  type: 'select',
  options: [
    { label: 'Image Icon', value: 'icon' },
    { label: 'Bullet (Unordered)', value: 'unordered' },
    { label: 'Number (Ordered)', value: 'ordered' },
    { label: 'Alphabet (Ordered)', value: 'alphabet' },
  ],
  defaultValue: 'unordered',
};

export const contentDirection: Field = {
  name: 'direction',
  type: 'select',
  options: [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
  ],
  admin: {
    description: 'Choose the layout direction for the content block',
  },
};

export const itemLayout: Field = {
  name: 'itemLayout',
  type: 'select',
  options: [
    { label: 'Grid', value: 'grid' },
    { label: 'List', value: 'list' },
  ],
  defaultValue: 'grid',
};

export const rootBlock: Field = {
  name: 'isRoot',
  type: 'checkbox',
  label: 'Root component',
  defaultValue: false,
  admin: {
    condition: (_, __, { path }) => Boolean(path.length <= 3),
    readOnly: true,
  },
  hooks: {
    beforeValidate: [
      ({ path }) => {
        const isRoot = path.length <= 3;

        return isRoot ? true : false;
      },
    ],
  },
};

export const containerWidth: Field = {
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
};
