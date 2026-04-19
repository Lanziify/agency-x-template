import { FieldsConfig } from '@payloadcms/plugin-form-builder/types';

import * as field from '../../fields';

export const formFieldsConfig: FieldsConfig = {
  checkbox: field.Checkbox,
  email: field.Email,
  select: field.Select,
  text: field.Text,
  textarea: field.TextArea,
  message: false,
  date: false,
  number: false,
  country: false,
  state: false,
  payment: false,
};
