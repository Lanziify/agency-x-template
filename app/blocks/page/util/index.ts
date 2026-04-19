import { Block, Field } from 'payload';

import { baseField } from '../config/base';

export const createBlockWithConfig = (
  slug: string,
  extraFields: {
    content?: Field[];
    presentation?: Field[];
  } = {},
  labels?: { singular: string; plural: string }
): Block => ({
  slug,
  fields: [
    {
      ...baseField,
      tabs: baseField.tabs.map((tab) => {
        if (tab.label === 'Content') {
          return {
            ...tab,
            fields: [...tab.fields, ...(extraFields.content || [])],
          };
        }

        if (tab.label === 'Presentation' && extraFields.presentation && extraFields.presentation.length > 0) {
          return {
            ...tab,
            fields: [...tab.fields, ...(extraFields.presentation || [])],
          };
        }

        return tab;
      }),
    },
  ],
  labels,
});

type NestedBlockOptions = {
  maxDepth?: number;
};

export const createNestedBlock = (
  slug: string,
  extraFields: {
    content?: Block[];
    presentation?: Field[];
  },
  labels?: { singular: string; plural: string },
  options: NestedBlockOptions = { maxDepth: 3 }
): Block => {
  const { maxDepth = 3 } = options;
  const selfNested = maxDepth > 0 ? [createNestedBlock(slug, extraFields, labels, { maxDepth: maxDepth - 1 })] : [];

  return createBlockWithConfig(
    slug,
    {
      content: [
        {
          name: 'children',
          type: 'blocks',
          blocks: [...selfNested, ...(extraFields.content || [])],
        },
      ],
      presentation: [...(extraFields.presentation ?? [])],
    },
    labels
  );
};
