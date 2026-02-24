import { UseFormReturn } from 'react-hook-form';
import { FieldError, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { Form } from '@config/payload.types';
import { InitialFormState } from '../buildInitialFormState';
import { Width } from './width';

export type FormField = NonNullable<Form['fields']>[number];

// Generic helper to get a field by blockType
export type FieldType<T extends FormField['blockType']> = Extract<FormField, { blockType: T }>;

type Props = FieldType<'text'> & {
  form: UseFormReturn<InitialFormState>;
};

export const Text: React.FC<Props> = ({ width, name, label, required, form }) => {
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
