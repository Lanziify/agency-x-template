import { Page } from '@config/payload.types';

import { AnyPageBlock } from '../../page/types';

export function findFormBlock(blocks: AnyPageBlock[]): boolean {
  for (const block of blocks) {
    if (block.blockType === 'formBlock') return true;

    // Safely iterate over object keys
    if (typeof block === 'object' && block !== null) {
      for (const key of Object.keys(block) as (keyof typeof block)[]) {
        const value = (block as Record<string, unknown>)[key];
        if (Array.isArray(value)) {
          // Only recurse if it looks like blocks
          if (value.length > 0 && typeof value[0] === 'object') {
            if (findFormBlock(value as AnyPageBlock[])) return true;
          }
        }
      }
    }
  }
  return false;
}

export function hasFormBlock(page: Page): page is Page & { layout: (typeof page.layout)[number] & { blockType: 'formBlock' }[] } {
  return Array.isArray(page.layout) && findFormBlock(page.layout);
}
