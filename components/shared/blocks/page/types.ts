import { Page } from '@config/payload.types';

import { ByBlockType, GetUniqueBlocks } from '../types';

export type PageUniqueBlocks = GetUniqueBlocks<Page['layout']>;
export type PageBlock = ByBlockType<PageUniqueBlocks>;
export type AnyPageBlock = PageBlock[keyof PageBlock];

export type PageParams = {
  params: {
    slug?: string[];
  };
};
