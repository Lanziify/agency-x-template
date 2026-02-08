import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  email: z.email(),
  message: z.string(),
  privacy_policy: z.unknown(),
});

export type ContactFormSchema = z.infer<typeof formSchema>;
  