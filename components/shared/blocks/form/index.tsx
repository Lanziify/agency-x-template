'use client';
import React from 'react';
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { buildInitialFormState } from '@blocks/form/util/form';

import { RichText } from '@components/shared/richtext';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Container, Section } from '@components/ui/container';
import { Form } from '@components/ui/form';

import { safeCatch } from '@lib/safeCatch';

import { Form as PayloadForm } from '@config/payload.types';

import { IntroBlockComponent } from '../page/elements/intro';
import { PageBlock } from '../page/types';
import { blockRegistry } from '../registry';
import { renderBlocks } from '../renderer';
import { Email, Text, TextArea } from './fields';
import { isPayloadForm } from './util';

import axios from 'axios';
import { toast } from 'sonner';

export const FormBlock: React.FC<PageBlock['formBlock']> = (props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaToken, setRecaptchaToken] = React.useState<string | null>(null);

  const formFromProps = isPayloadForm(props.form) ? props.form : null;

  const form = useForm({
    defaultValues: buildInitialFormState(formFromProps?.fields ?? []),
  });

  const handleRecaptchaVerify = React.useCallback(async () => {
    if (!executeRecaptcha || !formFromProps) return;

    const token = await executeRecaptcha(`form_${formFromProps.id}`);

    setRecaptchaToken(token);
  }, [executeRecaptcha, formFromProps]);

  const onSubmit = async (values: FieldValues) => {
    if (!formFromProps) return;

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
            form: formFromProps.id,
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
            return {
              message: error.response?.data.errors[0].message,
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
    <FormProvider {...form}>
      <Section>
        <Container>
          <Card className="dark:bg-accent-foreground dark:border-accent-foreground">
            <CardHeader>
              <IntroBlockComponent {...props} />
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-wrap gap-4">{formFromProps?.fields?.map((field) => renderBlocks(field))}</div>
                  {formFromProps?.recaptcha && <GoogleReCaptcha onVerify={handleRecaptchaVerify} />}
                  <Button>{(formFromProps as PayloadForm).submitButtonLabel}</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </FormProvider>
  );
};

blockRegistry.register('email', Email);
blockRegistry.register('text', Text);
blockRegistry.register('textarea', TextArea);
