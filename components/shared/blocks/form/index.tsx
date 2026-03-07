'use client';

import React from 'react';
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';

import { RichText } from '@payloadcms/richtext-lexical/react';

import { buildInitialFormState } from '@blocks/form/buildInitialFormState';
import { fields, FieldType } from '@blocks/form/fields';

import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';

import { safeCatch } from '@lib/safeCatch';

import { Form as PayloadForm } from '@config/payload.types';

import axios from 'axios';
import { toast } from 'sonner';

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
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaToken, setRecaptchaToken] = React.useState<string | null>(null);

  const form = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  });

  const handleRecaptchaVerify = React.useCallback(async () => {
    if (!executeRecaptcha) return;

    const token = await executeRecaptcha(`form_${formID}`);

    setRecaptchaToken(token);
  }, [executeRecaptcha, formID]);

  const onSubmit = async (values: FieldValues) => {
    if (formFromProps.recaptcha && !executeRecaptcha) {
      toast.error('reCAPTCHA is still loading. Please try again.');
      return;
    }

    const transformedData = Object.entries(values).map(([name, value]) => ({
      field: name,
      value,
    }));

    toast.promise(
      async () => {
        const { data, error } = await safeCatch(async () => {
          return await axios.post('/api/form-submissions', {
            form: formID,
            submissionData: transformedData,
            recaptchaToken,
          });
        });

        if (error) throw error;

        console.log(data);

        return data;
      },
      {
        loading: 'Submitting...',
        success: (data) => ({
          message: <RichText data={data?.data.doc.form.confirmationMessage} />,
        }),
        error: async (error) => {
          if (axios.isAxiosError(error)) {
            // let errorCodes: string[] = [];
            // if (error.response?.data.errors[0].data) {
            //   errorCodes = (error.response?.data.errors[0].data.errorCodes as Array<Record<string, string>>).map((code) => code?.message);
            // }

            return {
              message: error.response?.data.errors[0].message,
              // description: errorCodes.length > 0 ? errorCodes.toString() : '',
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <GoogleReCaptcha onVerify={handleRecaptchaVerify} />
          <Button>{(formFromProps as PayloadForm).submitButtonLabel}</Button>
        </form>
      </Form>
    </div>
  );
};
