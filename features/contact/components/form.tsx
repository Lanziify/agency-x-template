import React from 'react';
import Link from 'next/link';

import { RichText } from '@payloadcms/richtext-lexical/react';

import { BlockRenderer } from '@components/shared/blocks';
import { Button } from '@components/ui/button';

import { Contact } from '@config/payload.types';

export const ContactForm: React.FC<{ activeFormCollection: Contact }> = ({ activeFormCollection }) => {
  return (
    <div className="mx-auto w-fit space-y-4 py-10">
      {activeFormCollection ? (
        <div className="rounded-3xl border p-6">
          {activeFormCollection.introduction && <RichText data={activeFormCollection.introduction} className="prose lg:prose-md mb-4" />}
          <BlockRenderer blocks={activeFormCollection.form as Extract<Contact, 'form'>} />
        </div>
      ) : (
        <div className="prose lg:prose-md">
          <div className="rounded-md border p-4">
            <h1>Contact Us</h1>
            <p>
              Our contact form is currently being set up. Please check back soon or reach out to us through our available contact channels
              in the meantime.
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
  );
};
