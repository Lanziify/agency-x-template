import React from 'react';
import { FormBlock } from './form';

const blockMap = {
  formBlock: FormBlock,
} as const;

type BlockMap = typeof blockMap;
type BlockType = keyof BlockMap;

type BlockProps<T extends BlockType> = React.ComponentProps<BlockMap[T]>;

type BlockRendererProps<T extends BlockType> = {
  blocks: BlockProps<T>[];
};

export const BlockRenderer = <T extends BlockType>({ blocks }: BlockRendererProps<T>) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return (
    <React.Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block;

        const isFormBlock = blockType === 'formBlock';

        if (blockType && blockType in blockMap) {
            const BlockComponent = blockMap[blockType];
            return <BlockComponent key={index} {...block} />;
        }

        return null;
      })}
    </React.Fragment>
  );
};
