'use client';

import React from 'react';

import { SlugFieldClientProps } from 'payload';
import { TextField, useField } from '@payloadcms/ui';

import { format } from '@lib/slug';

export default function SlugFieldClient(props: SlugFieldClientProps) {
  const { path, field, useAsSlug } = props;

  const { value: slugSourceField } = useField<string>({
    path: useAsSlug || 'title',
  });

  const { setValue } = useField<string>({ path });

  const slugify = React.useMemo(() => (slugSourceField ? format(slugSourceField) : ''), [slugSourceField]);

  React.useEffect(() => {
    setValue(slugify);
  }, [setValue, slugify]);

  return <TextField path={path} field={field} readOnly={true} />;
}
