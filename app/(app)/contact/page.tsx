import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { BlockRenderer } from '@components/shared/blocks';
import RecaptchaProvider from '@components/shared/providers/recaptcha-provider';
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
      <RecaptchaProvider>
        <div className="space-y-6 max-w-3xl mx-auto py-10">
          {blockResult.introduction && <RichText data={blockResult.introduction} className='prose lg:prose-md'/>}
          <BlockRenderer blocks={blockResult.form as Extract<Contact, 'form'>} />
        </div>
      </RecaptchaProvider>
      <SonnerProvider position="top-center" />
    </React.Fragment>
  );
}
