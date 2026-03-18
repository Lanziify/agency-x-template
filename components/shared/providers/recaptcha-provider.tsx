'use client';

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function RecaptchaProvider({ children, hasFormBlock }: { children: React.ReactNode; hasFormBlock: boolean }) {
  if (!hasFormBlock) return <React.Fragment>{children}</React.Fragment>;

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      container={{
        element: 'contact-recaptcha',
        parameters: {
          badge: 'bottomright',
        },
      }}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
