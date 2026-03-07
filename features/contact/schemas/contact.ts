import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  email: z.email(),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(1000, 'Message must be less than 1000 characters.').trim(),
  privacy_policy: z.boolean().refine((v) => v === true, {
    message: 'You must accept the Terms and Conditions.',
  }),
});

export type ContactFormSchema = z.infer<typeof formSchema>;
