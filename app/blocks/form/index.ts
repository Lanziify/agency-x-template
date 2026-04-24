import { ItemAlignment } from '@blocks/page/config/alignment';
import { IntroFields } from '@blocks/page/elements/intro';
import { createBlockWithConfig } from '@blocks/page/util';

export const FormBlock = createBlockWithConfig('formBlock', {
  content: [
    ...IntroFields,
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
  presentation: [ItemAlignment],
});
