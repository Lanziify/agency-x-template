import { buttonVariants } from '@components/ui/button';

import { Width } from '../config/width';
import { createBlockWithConfig } from '../util';

import type { VariantProps } from 'class-variance-authority';

export type CtaButtonVariants = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
export type CtaButtonSizes = NonNullable<VariantProps<typeof buttonVariants>['size']>;

export const ButtonBlock = createBlockWithConfig('buttonBlock', {
  content: [
    {
      name: 'label',
      type: 'text',
    },
    { name: 'href', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          options: ['default', 'destructive', 'ghost', 'link', 'outline', 'secondary'] as CtaButtonVariants[],
          defaultValue: 'default' as CtaButtonVariants,
        },
        {
          name: 'size',
          type: 'select',
          options: ['default', 'lg', 'sm', 'xs', 'icon', 'icon-lg', 'icon-sm', 'icon-xs'] as CtaButtonSizes[],
          defaultValue: 'default' as CtaButtonSizes,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            components: {
              Field: {
                path: '@components/custom-fields/drawer-test',
              },
            },
          },
        },
        // {
        //   name: 'icon',
        //   type: 'text',
        //   admin: {
        //     components: {
        //       Field: {
        //         path: '@components/shared/icon-picker-field',
        //       },
        //     },
        //   },
        // },
        {
          name: 'iconPosition',
          type: 'select',
          label: false,
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
          admin: {
            placeholder: 'Select Icon Alignment',
          },
        },
      ],
    },
  ],
  presentation: [Width],
});
