import { Email, Text, TextArea } from '@components/shared/blocks/fields';

import { Form } from '@config/payload.types';

export type FormField = NonNullable<Form['fields']>[number];
export type FieldBlockType = FormField['blockType'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldWithDefault = Extract<FormField, { defaultValue?: any }>;
export type FieldBlockValueType = FieldWithDefault['defaultValue'];
export type FieldType<T extends FormField['blockType']> = Extract<FormField, { blockType: T }>;

export const fields = {
  text: Text,
  email: Email,
  textarea: TextArea,
} as const;
