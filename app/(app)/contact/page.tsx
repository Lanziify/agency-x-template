import React from 'react';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { BlockRenderer } from '@components/shared/blocks';
import RecaptchaProvider from '@components/shared/providers/recaptcha-provider';
import { Button } from '@components/ui/button';
import { SonnerProvider } from '@components/ui/sonner-provider';
import { payload } from '@lib/payload';
import { Contact } from '@config/payload.types';

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

  const blockResult = result.docs[0];

  return (
    <React.Fragment>
      <RecaptchaProvider>
        <div className="space-y-4 w-fit mx-auto py-10">
          {blockResult ? (
            <div className="border p-6 rounded-3xl">
              {blockResult.introduction && <RichText data={blockResult.introduction} className="prose lg:prose-md mb-4" />}
              <BlockRenderer blocks={blockResult.form as Extract<Contact, 'form'>} />
            </div>
          ) : (
            <div className="prose lg:prose-md">
              <div className="border p-4 rounded-md">
                <h1>Contact Us</h1>
                <p>
                  Our contact form is currently being set up. Please check back soon or reach out to us through our available contact
                  channels in the meantime.
                </p>
                <Button asChild>
                  <Link href="/" className="no-underline">
                    Return
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </RecaptchaProvider>
      <SonnerProvider position="top-center" />
    </React.Fragment>
  );
}
