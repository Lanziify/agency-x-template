export const dynamic = 'force-dynamic';

import React from 'react';

import { renderBlocks } from '@components/shared/blocks/renderer';
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

  const page = result.docs[0];

  return (
    <React.Fragment>
      {page && <RecaptchaProvider>{renderBlocks(page.layout)}</RecaptchaProvider>}
      <SonnerProvider position="top-center" />
    </React.Fragment>
  );
}
