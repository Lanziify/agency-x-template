import { GlobalConfig } from 'payload';

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '©  2026 Sitename',
      required: true,
    },
    {
      name: 'menu',
      type: 'array',
      fields: [
        {
          name: 'items',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          unique: true,
        },
      ],
      maxRows: 6,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['facebook', 'x', 'instagram', 'linkedin', 'github', 'youtube'],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 5,
    },
  ],
};