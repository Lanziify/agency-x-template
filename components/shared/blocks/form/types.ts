import { Form } from '@config/payload.types';

import { PageBlock } from '../page/types';
import { ByBlockType, GetUniqueBlocks } from '../types';

export type PageFormBlock = PageBlock['formBlock'];
export type FormBlockProps = PageFormBlock['form'];
export type UniqueFormBlocks = GetUniqueBlocks<Form>;
export type FormBlock = ByBlockType<UniqueFormBlocks>;
export type AnyFormBlock = FormBlock[keyof FormBlock];
