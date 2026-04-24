import { contentAlignment } from './config/presentation';
import { ButtonBlock } from './elements/button';
import { IntroFields } from './elements/intro';
import { createBlockWithConfig } from './util';

export const PricingBlock = createBlockWithConfig('pricingBlock', {
  content: [
    ...IntroFields,
    {
      name: 'plans',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Plan Name',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Plan Description',
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          label: 'Price',
          admin: {
            description: 'e.g., $29, €49, or "Free"',
          },
        },
        {
          name: 'interval',
          type: 'text',
          label: 'Billing Interval',
          admin: {
            description: 'e.g., /month, /year, /user',
          },
        },
        {
          name: 'features',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
          minRows: 1,
        },
        {
          name: 'cta',
          type: 'blocks',
          blocks: [ButtonBlock],
        },
        {
          name: 'isPopular',
          type: 'checkbox',
          label: 'Mark as Popular',
          admin: {
            description: 'If checked, this plan will be highlighted as the popular choice',
          },
        },
      ],
    },
  ],
  presentation: [],
});
