'use client';

import { useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';

import { PageBlock } from '../../page/types';

export const Width: React.FC<{ children: React.ReactNode; width?: number | null }> = ({ children, width }) => {
  return <Field style={{ flex: 1, flexBasis: width ? `calc(${width}% - var(--spacing) * 4)` : '100%' }}>{children}</Field>;
};

const Text: React.FC<PageBlock['text']> = ({ width, name, label, required, errorMessage }) => {
  const form = useFormContext();
  const error = form.formState.errors[name];

  return (
    <Width width={width}>
      <FieldLabel htmlFor={name} required={!!required}>
        {label}
      </FieldLabel>
      <Input id={name} {...form.register(name, { required: !!errorMessage && String(errorMessage) })} />
      <FieldError>{error?.message as string}</FieldError>
    </Width>
  );
};

const Email: React.FC<PageBlock['email']> = ({ width, name, label, required, errorMessage }) => {
  const form = useFormContext();
  const error = form.formState.errors[name];

  return (
    <Width width={width}>
      <FieldLabel htmlFor={name} required={!!required}>
        {label}
      </FieldLabel>
      <Input id={name} {...form.register(name, { required: !!errorMessage && String(errorMessage) })} />
      <FieldError>{error?.message as string}</FieldError>
    </Width>
  );
};

const TextArea: React.FC<PageBlock['textarea']> = ({ width, name, label, required, errorMessage }) => {
  const form = useFormContext();
  const error = form.formState.errors[name];

  return (
    <Width width={width}>
      <FieldLabel htmlFor={name} required={!!required}>
        {label}
      </FieldLabel>
      <Textarea id={name} {...form.register(name, { required: !!errorMessage && String(errorMessage) })} />
      <FieldError>{error?.message as string}</FieldError>
    </Width>
  );
};

export { Email, Text, TextArea };
