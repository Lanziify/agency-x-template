'use client';

import React from 'react';
import { FieldValues, UseFormReturn, useForm } from 'react-hook-form';
import { buildInitialFormState } from '@blocks/form/buildInitialFormState';
import { FieldType, fields } from '@blocks/form/fields';
import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';
import { safeCatch } from '@lib/safeCatch';
import { Form as PayloadForm } from '@config/payload.types';

export type FormBlockProps = {
  form: PayloadForm;
  id?: string | null;
  blockName?: string | null;
  blockType: 'formBlock';
};

export const FormBlock: React.FC<FormBlockProps> = (props) => {
  const {
    form: formFromProps,
    form: { id: formID, fields: fieldBlocks },
  } = props;

  const form = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  });

  const onSubmit = async (data: FieldValues) => {
    const transformedData = Object.entries(data).map(([name, value]) => ({
      field: name,
      value,
    }));

    // TODO: handle data submission to backend
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto py-10">
          <div className="flex flex-wrap gap-4">
            {fieldBlocks?.map((field, index) => {
              const FieldBlockComponent = fields[field.blockType] as React.FC<
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                FieldType<typeof field.blockType> & { form: UseFormReturn<any & FieldValues> }
              >;

              if (FieldBlockComponent) {
                return (
                  <React.Fragment key={index}>
                    <FieldBlockComponent {...field} form={form} />
                  </React.Fragment>
                );
              }

              return null;
            })}
          </div>
          <Button>{(formFromProps as PayloadForm).submitButtonLabel}</Button>
        </form>
      </Form>
    </div>
  );
};
