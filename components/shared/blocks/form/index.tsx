'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { buildInitialFormState } from '@blocks/form/buildInitialFormState';
import { fields } from '@blocks/form/fields';
import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';
import { Form as PayloadForm } from '@config/payload.types';

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Property | Property[] | Value;
}

export type FormBlockProps = {
  form: number | PayloadForm;
  id?: string | null;
  blockName?: string | null;
  blockType: 'formBlock';
};

const isForm = (form: number | PayloadForm): form is PayloadForm => {
  return typeof form !== 'number';
};

export const FormBlock: React.FC<FormBlockProps> = ({ form: formFromProps }) => {
  const form = useForm({
    defaultValues: buildInitialFormState((formFromProps as PayloadForm).fields),
  });

  function onSubmit(data: Data) {
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-3xl mx-auto py-10">
          {isForm(formFromProps) &&
            formFromProps.fields &&
            formFromProps.fields.map((field, index) => {
              if (field.blockType in fields) {
                const Component = fields[field.blockType as keyof typeof fields];

                return <Component key={field.id} {...field} form={form} />;
              }

              return null;
            })}
          <Button>{(formFromProps as PayloadForm).submitButtonLabel}</Button>
        </form>
      </Form>
    </div>
  );
};
