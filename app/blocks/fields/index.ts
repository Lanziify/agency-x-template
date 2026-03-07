import { Block, Field } from 'payload';

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
};

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
};

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
};

const errorMessage: Field = {
  name: 'errorMessage',
  type: 'text',
  label: 'Error Message',
};

const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
};

const Text: Block = {
  slug: 'text',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
          localized: true,
        },
      ],
    },
    required,
    {
      ...errorMessage,
      admin: {
        condition: (_, { required }) => Boolean(required),
      },
      required: true,
    },
  ],
  labels: {
    plural: 'Text Fields',
    singular: 'Text',
  },
};

const Email: Block = {
  slug: 'email',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    width,
    required,
    {
      ...errorMessage,
      admin: {
        condition: (_, { required }) => Boolean(required),
      },
      required: true,
    },
  ],
  labels: {
    plural: 'Email Fields',
    singular: 'Email',
  },
};

const TextArea: Block = {
  slug: 'textarea',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
          localized: true,
        },
      ],
    },
    required,
    {
      ...errorMessage,
      admin: {
        condition: (_, { required }) => Boolean(required),
      },
      required: true,
    },
  ],
  labels: {
    plural: 'Text Area Fields',
    singular: 'Text Area',
  },
};

export { Email, Text, TextArea };
