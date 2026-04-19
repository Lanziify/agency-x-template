import { Field } from 'payload';

import { containerWidth, contentAlignment } from '../config/presentation';
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
  presentation: [containerWidth, contentAlignment],
});
