import React from 'react';

import { AnyPageBlock } from '../page/types';
import { blockRegistry } from '../registry';

function renderBlocks(blocks: AnyPageBlock | AnyPageBlock[]): React.ReactNode {
  if (Array.isArray(blocks)) {
    return blocks.map((block, index) => <React.Fragment key={block?.id ?? index}>{renderBlocks(block)}</React.Fragment>);
  }

  const Renderer = blockRegistry.get(blocks.blockType);

  if (!Renderer) {
    console.warn(`No renderer registered for block type: ${blocks.blockType}`);
    return null;
  }

  return <Renderer key={blocks.id} {...blocks} />;
}

export { renderBlocks };
