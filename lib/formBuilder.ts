import axios from 'axios';
import { APIError, Field } from 'payload';
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
import { Email, Text, TextArea } from '@blocks/fields';
import { FormSubmission } from '@config/payload.types';
import { safeCatch } from './safeCatch';

const reCAPTCHAErrorMap = {
  'missing-input-secret': 'The secret parameter is missing.',
  'invalid-input-secret': 'The secret parameter is invalid or malformed.',
  'missing-input-response': 'The response parameter is missing.',
  'invalid-input-response': 'The response parameter is invalid or malformed.',
  'bad-request': 'The request is invalid or malformed.',
  'timeout-or-duplicate': 'The response is no longer valid: either is too old or has been used previously.',
} as const;

type ReCaptchaErrorCode = keyof typeof reCAPTCHAErrorMap;

type ReCaptchaVerifySuccessResponse = {
  success: true;
  score: number;
  action?: string;
  hostname: string;
  challenge_ts: string;
};

type ReCaptchaVerifyErrorResponse = {
  success: false;
  'error-codes': ReCaptchaErrorCode[];
};

type ReCaptchaVerifyResponse = ReCaptchaVerifySuccessResponse | ReCaptchaVerifyErrorResponse;

const isRecaptchaResponseSuccess = (response: ReCaptchaVerifyResponse): response is ReCaptchaVerifySuccessResponse => {
  return response.success === true;
};

export const formBuilder = formBuilderPlugin({
  fields: {
    text: Text,
    email: Email,
    textarea: TextArea,
    checkbox: false,
    date: false,
    number: false,
    select: false,
    radio: false,
    file: false,
    country: false,
    message: false,
    payment: false,
    state: false,
  },
  formOverrides: {
    fields: ({ defaultFields }) => {
      const recaptcha: Field = {
        type: 'checkbox',
        name: 'recaptcha',
        label: 'Enable reCAPTCHA',
        admin: {
          description: 'Protect form submissions from spam with Google reCAPTCHA v3',
        },
        required: true,
      };

      return [...defaultFields, recaptcha];
    },
  },
  formSubmissionOverrides: {
    hooks: {
      beforeChange: [
        async ({ data }) => {
          const token = (data as FormSubmission & { recaptchaToken: string | null })['recaptchaToken'];

          if (!token) return data

          const { data: recaptchaVerificationData, error } = await safeCatch(async () => {
            const response = await axios.post<ReCaptchaVerifyResponse>(
              `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
            );

            if (!isRecaptchaResponseSuccess(response.data)) {
              throw new APIError(
                "Something wen't wrong while trying to verify your request",
                400,
                {
                  errorCodes: response.data['error-codes'].map((code) => ({ code, message: reCAPTCHAErrorMap[code] })),
                },
                true
              );
            }

            return response.data;
          });

          if (error) throw error;

          if (!recaptchaVerificationData) {
            throw new APIError('Failed to verify reCAPTCHA', 400, undefined, true);
          }

          if (recaptchaVerificationData.score <= 0.4) {
            throw new APIError('Suspicious activity detected', 400, undefined, true);
          }

          return data;
        },
      ],
    },
  },
});
