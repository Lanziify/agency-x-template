import { Page } from '@config/payload.types';

type GetUniqueBlock<T> = T extends readonly (infer U)[]
  ? GetUniqueBlock<U>
  : T extends object
    ?
        | (T extends { blockType: string } ? T : never)
        | {
            [K in keyof T]: GetUniqueBlock<T[K]>;
          }[keyof T]
    : never;

export type Block = GetUniqueBlock<Page['layout']>;

export type HeroBlockProps = Extract<Block, { blockType: 'heroBlock' }>;
export type CTABlockProps = Extract<Block, { blockType: 'ctaBlock' }>;

// Fields
export type TextFieldBlockProps = Extract<Block, { blockType: 'text' }>;
export type EmailFieldBlockProps = Extract<Block, { blockType: 'email' }>;
export type TextAreaFieldBlockProps = Extract<Block, { blockType: 'textarea' }>;
