import { type CollectionConfig } from 'payload';
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields';

import { slugField } from '@collections/fields';

import { FormBlock } from '@blocks/form';
import { ContentGridBlock } from '@blocks/layout/content-grid';
import { HeroBlock } from '@blocks/layout/hero';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    defaultColumns: ['name', 'slug', 'updatedAt'],
    useAsTitle: 'name',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ useAsSlug: 'name' }),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [HeroBlock, ContentGridBlock, FormBlock],
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      admin: {
        position: 'sidebar',
      },
      fields: [
        OverviewField({
          titlePath: 'meta.name',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
        MetaTitleField({
          hasGenerateFn: true,
        }),
        MetaImageField({
          relationTo: 'media',
        }),
        MetaDescriptionField({}),
        PreviewField({
          hasGenerateFn: true,
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
  ],
};
