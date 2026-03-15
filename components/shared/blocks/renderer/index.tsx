import type { ReactNode } from 'react';
import React from 'react';

import { Email, Text, TextArea } from '../fields';
import { FormBlock } from '../form';
import { CTABlock } from '../layout/cta';
import { HeroBlock } from '../layout/hero';
import { AnyBlock } from '../types';

function renderBlocks(blocks: AnyBlock | AnyBlock[]): ReactNode {
  if (!blocks) return null;

  if (Array.isArray(blocks)) {
    return blocks.map((block, index) => <React.Fragment key={block?.id ?? index}>{renderBlocks(block)}</React.Fragment>);
  }

  switch (blocks.blockType) {
    case 'heroBlock':
      return <HeroBlock {...blocks} />;

    case 'ctaBlock':
      return <CTABlock {...blocks} />;

    case 'formBlock':
      return <FormBlock {...blocks} />;

    case 'text':
      return <Text {...blocks} />;

    case 'email':
      return <Email {...blocks} />;

    case 'textarea':
      return <TextArea {...blocks} />;

    default:
      return null;
  }
}

export { renderBlocks };
