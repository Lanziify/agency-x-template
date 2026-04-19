'use client';

import React from 'react';

import { Data, OptionObject, SelectFieldClientProps } from 'payload';
import { SelectField, useField, useForm } from '@payloadcms/ui';

function getByPath(obj: Data, path: string[]) {
  return path.reduce((acc, key) => acc?.[key], obj);
}

function ContainerWidthField({ path, field, ...rest }: SelectFieldClientProps) {
  const { value, setValue } = useField({ path });
  const { getData } = useForm();
  const doc = getData();

  const filteredField = React.useMemo(() => {
    if (!doc) return field;

    const pathSegments = path.split('.');
    if (pathSegments.length <= 3) return field;

    const parent = getByPath(doc, pathSegments.slice(0, -3));
    const parentWidth = parent?.width;

    if (!parentWidth || parentWidth === 'auto') return field;

    const parentNum = parseInt(parentWidth);

    const options = field.options.filter((option) => {
      const val = (option as OptionObject).value;

      if (val === 'auto') return true;

      return parseInt(val) <= parentNum;
    });

    return {
      ...field,
      options,
    };
  }, [doc, field, path]);

  React.useEffect(() => {
    if (value === 'auto') return;

    const exists = filteredField.options.some((opt) => (opt as OptionObject).value === value);

    if (!exists) {
      const numericOptions = filteredField.options?.filter((option) => (option as OptionObject).value !== 'auto');
      const max = numericOptions?.[filteredField.options.length - 1] as OptionObject;
      setValue(max.value);
    }
  }, [filteredField.options, value, setValue]);

  return <SelectField path={path} field={filteredField} {...rest} />;
}

export default ContainerWidthField;
