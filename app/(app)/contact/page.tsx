import React from 'react';

import RecaptchaProvider from '@components/shared/providers/recaptcha-provider';
import { SonnerProvider } from '@components/ui/sonner-provider';

import { ContactForm } from '@features/contact/components/form';

import { payload } from '@lib/payload';

export default async function ContactPage() {
  const result = await payload.find({
    collection: 'contacts',
    where: {
      active: {
        equals: true,
      },
    },
    depth: 1,
  });

  return (
    <React.Fragment>
      <RecaptchaProvider>
        <ContactForm activeFormCollection={result.docs[0]} />
      </RecaptchaProvider>
      <SonnerProvider position="top-center" />
    </React.Fragment>
  );
}
