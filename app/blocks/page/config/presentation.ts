import { Field } from 'payload';

export const RootBlock: Field = {
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
