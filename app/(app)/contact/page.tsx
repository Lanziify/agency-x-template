import React from 'react';
import { BlockRenderer } from '@components/shared/blocks';
import { SonnerProvider } from '@components/ui/sonner-provider';
import { payload } from '@lib/payload';
import { Contact } from '@config/payload.types';

export default async function ContactPage() {
  const result = await payload.find({
    collection: 'contacts',
    depth: 1,
  });

  const blockResult = result.docs[0];

  if (!blockResult) return;

  return (
    <React.Fragment>
      <BlockRenderer blocks={blockResult.form as Extract<Contact, 'form'>} />
      <SonnerProvider position="top-center" />
    </React.Fragment>
  );
}
