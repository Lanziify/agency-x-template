import { createBlockWithConfig } from '../util';

export const RichTextBlock = createBlockWithConfig('richtextBlock', {
  content: [
    {
      name: 'richtextContent',
      type: 'richText',
    }
  ],
  presentation: [],
});
