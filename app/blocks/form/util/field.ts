import { Block, Field } from 'payload';

import { toSentenceCase } from '@lib/string';

import { baseFields } from '../base';

import pluralize from 'pluralize';

export const createFieldBlock = (slug: string, extraFields: Field[] = [], labels?: { singular: string; plural: string }): Block => {
  return {
    slug,
    fields: [...baseFields, ...extraFields],
    labels: labels || {
      singular: toSentenceCase(slug),
      plural: toSentenceCase(pluralize.plural(slug)),
    },
  };
};
