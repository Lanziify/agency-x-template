'use client';

import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import React from 'react';
import { FieldValues, UseFormReturn, useForm } from 'react-hook-form';
import { buildInitialFormState } from '@blocks/form/buildInitialFormState';
import { FieldType, fields } from '@blocks/form/fields';
import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';
import { safeCatch } from '@lib/safeCatch';
import { FormSubmission, Form as PayloadForm } from '@config/payload.types';

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

  const onSubmit = async (values: FieldValues) => {
    const transformedData = Object.entries(values).map(([name, value]) => ({
      field: name,
      value,
    }));

    toast.promise(
      async () => {
        const { data, error } = await safeCatch<FormSubmission, AxiosError>(async () => {
          return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
            form: formID,
            submissionData: transformedData,
          });
        });

        if (!data && error) throw error;
      },
      {
        loading: 'Submitting...',
        success: () => ({
          message: <strong>Your email has been sent! 🎉</strong>,
        }),
        error: async (error) => {
          if (axios.isAxiosError(error)) {
            return {
              message: 'An error has occurred while trying to send your request.',
              description: error.response?.data?.message ?? error.message,
            };
          }

          return {
            message: "Something wen't wrong.",
            description: error.message,
          };
        },
      }
    );
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
