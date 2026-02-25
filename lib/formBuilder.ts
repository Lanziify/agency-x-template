import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';

export const formBuilder = formBuilderPlugin({
  fields: {
    text: true,
    email: true,
    textarea: true,
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
