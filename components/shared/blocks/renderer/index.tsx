import React from 'react';

import { Email, Text, TextArea } from '../fields';
import { FormBlock } from '../form';
import ContentGridBlock from '../layout/content-grid';
import { CTABlock } from '../layout/cta';
import { HeroBlock } from '../layout/hero';
import { AnyBlock, PageParams } from '../types';

async function renderBlocks(blocks: AnyBlock | AnyBlock[], pageProps: PageParams): Promise<React.ReactNode> {
  if (!blocks) return null;

  if (Array.isArray(blocks)) {
    return await Promise.all(
      blocks.map(async (block, index) => <React.Fragment key={block?.id ?? index}>{await renderBlocks(block, pageProps)}</React.Fragment>)
    );
  }

  switch (blocks.blockType) {
    case 'heroBlock':
      return <HeroBlock key={blocks.id} {...blocks} />;

    case 'contentGridBlock':
      return <ContentGridBlock key={blocks.id} {...blocks} pageProps={pageProps} />;

    case 'ctaBlock':
      return <CTABlock key={blocks.id} {...blocks} />;

    case 'formBlock':
      return <FormBlock key={blocks.id} {...blocks} />;

    case 'text':
      return <Text key={blocks.id} {...blocks} />;

    case 'email':
      return <Email key={blocks.id} {...blocks} />;

    case 'textarea':
      return <TextArea key={blocks.id} {...blocks} />;

    default:
      return null;
  }
}

export { renderBlocks };
