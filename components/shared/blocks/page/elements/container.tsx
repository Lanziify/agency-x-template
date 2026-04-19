import React from 'react';

import { cn } from '@lib/utils';

import { blockRegistry } from '../../registry';
import { renderBlocks } from '../../renderer';
import { resolveWidth } from '../../renderer/util/resolve-width';
import { PageBlock } from '../types';
import { ButtonBlock } from './button';
import { MediaBlock } from './media';

export const ContainerBlock: React.FC<PageBlock['containerBlock']> = (props) => {
  const { children, isRoot, width, layoutType, contentAlignment } = props;

  return (
    <div
      className={cn('flex h-fit flex-wrap gap-8', { 'container mx-auto px-5 lg:px-20': isRoot })}
      style={{ flexDirection: layoutType, alignItems: contentAlignment!, ...(!isRoot && resolveWidth(width!)) }}>
      {children?.map((block) => renderBlocks(block))}
    </div>
  );
};

blockRegistry.register('mediaBlock', MediaBlock);
blockRegistry.register('buttonBlock', ButtonBlock);
