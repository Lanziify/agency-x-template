'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Field, FieldDescription, FieldError, FieldLabel } from '@components/ui/field';
import { Form } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { safeCatch } from '@lib/safeCatch';
import { formSchema } from '../schemas/contact';

export default function ContacForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      privacy_policy: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      async () => {
        const { data, error } = await safeCatch(async () => {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          const result = await response.json();

          return await result;
        });

        if (error) {
          throw error;
        }
        return data;
      },
      {
        loading: <strong>Submitting form...</strong>,
        success: (data) => ({
          message: <strong>Your email has been sent! 🎉</strong>,
          description: <div>{data.message}</div>,
        }),
        error: (error) => ({
          message: <strong>An error has occurred</strong>,
          description: <div>Error: {JSON.stringify(error)}</div>,
        }),
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-3xl mx-auto py-10">
        <Field>
          <FieldLabel htmlFor="name" required>
            Name
          </FieldLabel>
          <Input id="name" placeholder="John Doe" {...form.register('name')} />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <Input id="email" placeholder="yourname@example.com" {...form.register('email')} />

          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="message" required>
            message
          </FieldLabel>
          <Textarea id="message" placeholder="Let us know what's on your mind." {...form.register('message')} />

          <FieldError>{form.formState.errors.message?.message}</FieldError>
        </Field>
        <Field className="mb-4 flex flex-row items-start space-x-3 space-y-0 py-4">
          <Controller
            name="privacy_policy"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="privacy_policy"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="flex-0 aspect-square my-1 mx-0"
              />
            )}
          />
          <div className="space-y-1 leading-none">
            <FieldLabel htmlFor="privacy_policy" required>
              I agree to the terms
            </FieldLabel>
            <FieldDescription>
              We respect your privacy. Any information you share with us is used only to improve your experience and is kept safe.
            </FieldDescription>
            <FieldError>{form.formState.errors.privacy_policy?.message}</FieldError>
          </div>
        </Field>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
