import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
import { Email, Text, TextArea } from '@blocks/fields';

export const formBuilder = formBuilderPlugin({
  fields: {
    text: Text,
    email: Email,
    textarea: TextArea,
    checkbox: false,
    date: false,
    number: false,
    select: false,
    radio: false,
    file: false,
    country: false,
    message: false,
    payment: false,
    state: false,
  },
});
