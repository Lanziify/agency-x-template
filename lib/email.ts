import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';

export const transporter =
  process.env.NODE_ENV === 'development'
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : nodemailer.createTransport(
        nodemailerSendgrid({
          apiKey: process.env.SENDGRID_API_KEY!,
        })
      );

const email = nodemailerAdapter({
  defaultFromAddress: process.env.ADMIN_FROM_MAIL!,
  defaultFromName: process.env.ADMIN_FROM_NAME!,
  transport: transporter,
});

export default email;