export const dynamic = 'force-dynamic';

import React from 'react';

import { Page } from '@config/payload.types';

import { FormBlock } from './form';
import { HeroBlock } from './layout/hero';

const BlocksRenderer: React.FC<{ blocks: Page['layout'] }> = ({ blocks }) => {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const key = String(block.id ?? index);

        switch (block.blockType) {
          case 'heroBlock':
            return <HeroBlock key={key} {...block} />;

          case 'formBlock':
            return <FormBlock key={key} {...block} />;

          default:
            return null;
        }
      })}
    </>
  );
};

export { BlocksRenderer };
