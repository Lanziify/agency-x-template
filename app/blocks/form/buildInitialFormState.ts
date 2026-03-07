import { Form } from '@config/payload.types';

import { FieldBlockValueType } from './fields';

// Keep the general type for the full form state
export type InitialFormState = Record<string, FieldBlockValueType>;

export const buildInitialFormState = (fields: Form['fields']) => {
  if (!fields) return {};

  return fields.reduce<InitialFormState>((initialSchema, field) => {
    switch (field.blockType) {
      case 'text':
      case 'email':
      case 'textarea':
        initialSchema[field.name] = '';
    }

    return initialSchema;
  }, {});
};
