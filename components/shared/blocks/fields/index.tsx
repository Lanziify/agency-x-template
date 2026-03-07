/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FieldType } from '@blocks/form/fields';
import { Field, FieldError, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';

const Width: React.FC<{ children: React.ReactNode; width?: number | null }> = ({ children, width }) => {
  return <Field style={{ flex: 1, flexBasis: width ? `calc(${width}% - var(--spacing) * 4)` : '100%' }}>{children}</Field>;
};

const Text: React.FC<
  FieldType<'text'> & {
    form: UseFormReturn<any & FieldValues>;
  }
> = ({ width, name, label, required, errorMessage, form }) => {
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

const Email: React.FC<
  FieldType<'email'> & {
    form: UseFormReturn<any & FieldValues>;
  }
> = ({ width, name, label, required, errorMessage, form }) => {
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

const TextArea: React.FC<
  FieldType<'textarea'> & {
    form: UseFormReturn<any & FieldValues>;
  }
> = ({ width, name, label, required, errorMessage, form }) => {
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

export { Text, Email, TextArea };
