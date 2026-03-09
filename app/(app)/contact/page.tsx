export const dynamic = 'force-dynamic';

import React from 'react';

import { BlocksRenderer } from '@components/shared/blocks';
import RecaptchaProvider from '@components/shared/providers/recaptcha-provider';
import { SonnerProvider } from '@components/ui/sonner-provider';

import { payload } from '@lib/payload';

export default async function ContactPage() {
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        like: 'contact',
      },
    },
    depth: 1,
  });

  return (
    <React.Fragment>
      <RecaptchaProvider>
        <BlocksRenderer blocks={result.docs[0].layout} />
      </RecaptchaProvider>
      <SonnerProvider position="top-center" />
    </React.Fragment>
  );
}
