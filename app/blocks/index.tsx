// import {Config} from '@config/payload.types'
import React from 'react';

type BlockRendererProps<T> = {
  blocks: T[];
};

export const BlockRenderer = <T,>({ blocks }: BlockRendererProps<T>) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return <React.Fragment></React.Fragment>;
};
