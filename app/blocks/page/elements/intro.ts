import { Field } from 'payload';

import { ItemAlignment } from '../config/alignment';
import { Width } from '../config/width';
import { createBlockWithConfig } from '../util';
import { HeadingField } from './heading';

export const IntroFields: Field[] = [
  {
    name: 'tagline',
    type: 'text',
  },
  HeadingField,
  {
    name: 'description',
    type: 'textarea',
  },
];

export const IntroBlock = createBlockWithConfig('introBlock', {
  content: [...IntroFields],
  presentation: [Width, ItemAlignment],
});
