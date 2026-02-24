import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';

export const formBuilder = formBuilderPlugin({
  fields: {
    payment: false,
  },
  formOverrides: {
    fields: undefined,
  },
});
