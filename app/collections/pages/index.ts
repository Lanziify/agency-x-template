import { type CollectionConfig } from 'payload';
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields';

import { slugField } from '@collections/fields';

import { FormBlock } from '@blocks/form';
import { ContainerBlock } from '@blocks/page/elements/container';
import { FAQBlock } from '@blocks/page/faq-block';
import { FeatureBlock } from '@blocks/page/feature-block';
import { HeroBlock } from '@blocks/page/hero-block';
import { PricingBlock } from '@blocks/page/pricing-block';
import { SectionBlock } from '@blocks/page/section-block';
import { TeamBlock } from '@blocks/page/team-block';
import { TestimonialsBlock } from '@blocks/page/testimonials-block';

import { getClientSideURL } from '@lib/getURL';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    defaultColumns: ['name', 'slug', 'updatedAt'],
    useAsTitle: 'name',
    livePreview: {
      url: ({ data }) => getClientSideURL(data.slug),
    },
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
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
              blocks: [
                HeroBlock,
                FeatureBlock,
                TestimonialsBlock,
                TeamBlock,
                FAQBlock,
                PricingBlock,
                FormBlock,
                SectionBlock,
                ContainerBlock,
              ],
              required: true,
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              label: 'SEO',
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
        },
      ],
    },
  ],
};
