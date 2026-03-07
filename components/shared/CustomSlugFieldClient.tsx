'use client';

import React from 'react';

import { TextFieldClientComponent } from 'payload';
import { TextField, useField, useFormFields } from '@payloadcms/ui';

import { format } from '@lib/slug';

const CustomSlugFieldClient: TextFieldClientComponent = ({ path, field, ...props }) => {
  const { value, setValue } = useField<string>({ path });

  const title = useFormFields(([{ title }]) => title?.value) as string;

  const slugify = React.useMemo(() => (title ? format(title) : ''), [title]);

  React.useEffect(() => {
    if (value !== slugify) {
      setValue(slugify);
    }
  }, [setValue, slugify, title, value]);

  return <TextField {...props} path={path} field={field} readOnly={field.admin?.readOnly} />;
};

export default CustomSlugFieldClient;
