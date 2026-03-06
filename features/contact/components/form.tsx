import React from 'react';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { BlockRenderer } from '@components/shared/blocks';
import { Button } from '@components/ui/button';
import { Contact } from '@config/payload.types';

export const ContactForm: React.FC<{ activeFormCollection: Contact }> = ({ activeFormCollection }) => {
  return (
    <div className="space-y-4 w-fit mx-auto py-10">
      {activeFormCollection ? (
        <div className="border p-6 rounded-3xl">
          {activeFormCollection.introduction && <RichText data={activeFormCollection.introduction} className="prose lg:prose-md mb-4" />}
          <BlockRenderer blocks={activeFormCollection.form as Extract<Contact, 'form'>} />
        </div>
      ) : (
        <div className="prose lg:prose-md">
          <div className="border p-4 rounded-md">
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
