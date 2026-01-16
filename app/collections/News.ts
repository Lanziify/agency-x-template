import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UploadFeature,
} from '@payloadcms/richtext-lexical';
import { type CollectionConfig } from 'payload';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { authenticated, authenticatedOrPublished } from '@lib/access';
import { getClientSideURL } from '@lib/getURL';

export const News: CollectionConfig<'news'> = {
  slug: 'news',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  versions: {
    drafts: true,
  },
  labels: {
    singular: 'News',
    plural: 'News Articles',
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'categories', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => getClientSideURL(`news/${data.slug}`),
    },
  },
  fields: [
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      label: 'Slug',
      name: 'slug',
      type: 'text',
      admin: {
        readOnly: true,
        components: {
          Field: '@features/news/components/CustomSlugFieldClient',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({
            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
          UploadFeature(),
        ],
      }),
    },
    {
      label: 'Taxonomies',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'categories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
          admin: {
            description: 'Select news categories',
          },
          filterOptions: {
            type: { equals: 'news' },
          },
        },
        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          admin: {
            description: 'Select relevant tags',
          },
        },
      ],
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        OverviewField({
          titlePath: 'meta.title',
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
    // slugField(),
  ],
};
