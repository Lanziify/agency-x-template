/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FieldType } from '@blocks/form/fields';
import { FieldError, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Width } from './width';

const Text: React.FC<
  FieldType<'text'> & {
    form: UseFormReturn<any & FieldValues>;
  }
> = ({ width, name, label, required, form }) => {
  const error = form.formState.errors[name];

  return (
    <Width width={width}>
      <FieldLabel htmlFor={name} required={!!required}>
        {label}
      </FieldLabel>
      <Input id={name} {...form.register(name, { required: !!required })} />
      <FieldError>{error?.message as string}</FieldError>
    </Width>
  );
};

const Email: React.FC<
  FieldType<'email'> & {
    form: UseFormReturn<any & FieldValues>;
  }
> = ({ width, name, label, required, form }) => {
  const error = form.formState.errors[name];

  return (
    <Width width={width}>
      <FieldLabel htmlFor={name} required={!!required}>
        {label}
      </FieldLabel>
      <Input id={name} {...form.register(name, { required: !!required })} />
      <FieldError>{error?.message as string}</FieldError>
    </Width>
  );
};

const TextArea: React.FC<
  FieldType<'textarea'> & {
    form: UseFormReturn<any & FieldValues>;
  }
> = ({ width, name, label, required, form }) => {
  const error = form.formState.errors[name];

  return (
    <Width width={width}>
      <FieldLabel htmlFor={name} required={!!required}>
        {label}
      </FieldLabel>
      <Textarea id={name} {...form.register(name, { required: !!required })} />
      <FieldError>{error?.message as string}</FieldError>
    </Width>
  );
};

export { Text, Email, TextArea };
