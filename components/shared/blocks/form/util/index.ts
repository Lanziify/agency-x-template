import { Form as PayloadForm } from '@config/payload.types';

import { FormBlockProps } from '../types';

export function isPayloadForm(form: FormBlockProps): form is PayloadForm {
  return !!form && typeof form !== 'number';
}
