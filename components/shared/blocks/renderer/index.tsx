import type { ReactNode } from 'react';

import { FormBlock } from '../form';
import { CTABlock } from '../layout/cta';
import { HeroBlock } from '../layout/hero';
import type { Block } from '../types';

function renderBlocks(blocks: Block | Block[]): ReactNode {
  if (!blocks) return null;

  if (Array.isArray(blocks)) {
    return blocks.map((block) => renderBlocks(block) ?? null);
  }

  switch (blocks.blockType) {
    case 'heroBlock':
      return <HeroBlock {...blocks} />;

    case 'ctaBlock':
      return <CTABlock {...blocks} />;

    case 'formBlock':
      return <FormBlock {...blocks} />;

    default:
      return null;
  }
}

export { renderBlocks };
