import { Page } from '@config/payload.types';

type HeroBlockPros = Extract<NonNullable<Page['layout']>[number], { blockType: 'heroBlock' }>;

export const HeroBlock: React.FC<HeroBlockPros> = (props) => {
  return <></>;
};
