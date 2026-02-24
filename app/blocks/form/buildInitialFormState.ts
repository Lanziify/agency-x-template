import { Form } from '@config/payload.types';

export type InitialFormState = Record<string, boolean | string>;

export const buildInitialFormState = (fields: Form['fields']) => {
  if (!fields) return {};

  return fields.reduce<InitialFormState>((initialSchema, field) => {
    switch (field.blockType) {
      case 'checkbox':
        initialSchema[field.name] = false;
      case 'country':
      case 'email':
      case 'text':
      case 'select':
      case 'state':
      case 'textarea':
        initialSchema[field.name] = '';
        break;
    }

    return initialSchema;
  }, {});
};
