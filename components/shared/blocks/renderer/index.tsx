import type { ReactNode } from 'react';

import { FormBlock } from '../form';
import { CTABlock } from '../layout/cta';
import { HeroBlock } from '../layout/hero';
import type { Block } from '../types';
import React from 'react';

function renderBlocks(blocks: Block | Block[]): ReactNode {
  if (!blocks) return null;

  if (Array.isArray(blocks)) {
    return blocks.map((block, index) => <React.Fragment key={block ? block.id : index}>{renderBlocks(block)}</React.Fragment>);
  }

  switch (blocks.blockType) {
    case 'heroBlock':
      return <HeroBlock key={blocks.id} {...blocks} />;

    case 'ctaBlock':
      return <CTABlock key={blocks.id} {...blocks} />;

    case 'formBlock':
      return <FormBlock key={blocks.id} {...blocks} />;

    default:
      return null;
  }
}

export { renderBlocks };
