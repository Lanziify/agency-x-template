import { Page } from '@config/payload.types';

type GetUniqueBlocks<T> = T extends readonly (infer U)[]
  ? GetUniqueBlocks<U>
  : T extends object
    ? (T extends { blockType: string } ? T : never) | { [K in keyof T]: GetUniqueBlocks<T[K]> }[keyof T]
    : never;

export type PageUniqueBlocks = GetUniqueBlocks<Page['layout']>;

export type ByBlockType<T> = {
  [B in Extract<T, { blockType: PropertyKey }> as B['blockType']]: B;
};

export type PageBlock = ByBlockType<PageUniqueBlocks>;

export type AnyBlock = PageBlock[keyof PageBlock];

export type RenderableBlock = {
  [K in keyof PageBlock]: PageBlock[K];
};

export type PageBlockComponentMap = {
  [K in keyof RenderableBlock]?: React.FC<RenderableBlock[K]>;
};
