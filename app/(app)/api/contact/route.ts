import { formSchema as contactFormSchema } from '@features/contact/schemas/contact';
import { MailDataRequired } from '@sendgrid/mail';
import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler } from '@lib/handleApiError';
import sgMail from '@lib/sg';

export const POST = withApiHandler(async (req: NextRequest) => {
  const body = await req.json();
  const data = contactFormSchema.parse(body);

  const adminMail: MailDataRequired = {
    from: process.env.ADMIN_MAIL!,
    replyTo: data.email,
    to: process.env.REPLY_MAIL!,
    subject: `New message from ${data.name}`,
    text: data.message,
    mailSettings: {
      sandboxMode: { enable: true },
    },
  };

  const clientMail: MailDataRequired = {
    from: process.env.ADMIN_MAIL!,
    replyTo: process.env.REPLY_MAIL!,
    to: data.email,
    subject: 'We received your message!',
    text: `Hi ${data.name},\n\nThanks for reaching out! We've received your message and will get back to you as soon as possible.\n\n— ${process.env.APP_NAME || 'Our Team'}`,
    mailSettings: {
      sandboxMode: { enable: true },
    },
  };

  await Promise.all([sgMail.send(adminMail), sgMail.send(clientMail)]);

  return NextResponse.json(
    {
      status: 'success',
      message: `Thank you, ${data.name}! Your message has been sent. We'll get back to you shortly.`,
    },
    { status: 200 }
  );
});
