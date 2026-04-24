import { Field } from 'payload';

export const Background: Field = {
  name: 'background',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Color', value: 'color' },
      ],
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'image',
      },
    },
    {
      name: 'video',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'video',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'color',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'overlayOpacity',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 0,
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Center', value: 'center' },
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ],
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.type != 'color',
      },
    },
  ],
};
