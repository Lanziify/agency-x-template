import { Field, Option } from 'payload';

import * as Typography from '@components/ui/typography';

import { createBlockWithConfig } from '../util';

type Typography = keyof typeof Typography;

const headingMap = {
  H1: 'TypographyH1',
  H2: 'TypographyH2',
  H3: 'TypographyH3',
  H4: 'TypographyH4',
} satisfies Partial<Record<string, Typography>>;

const headingsFieldOptions = (): Option[] => {
  return Object.entries(headingMap).map(([k, v]) => ({ label: k, value: v }));
};

export const HeadingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'typography',
      type: 'select',
      options: headingsFieldOptions(),
      defaultValue: 'TypographyH2',
    },
  ],
};

export const HeadingBlock = createBlockWithConfig('headingBlock', {
  content: [HeadingField],
  presentation: [],
});
