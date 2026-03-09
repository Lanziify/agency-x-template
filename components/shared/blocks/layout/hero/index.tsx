import { Section } from '@components/ui/container';

import { renderBlocks } from '../../renderer';
import { HeroBlockProps } from '../../types';

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const { components } = props;

  return (
    <div className="grid">
      <div className="flex min-h-122.25 items-center bg-black/40">
        <Section className="[grid-area:1/1]">{components && renderBlocks(components)}</Section>
      </div>
    </div>
  );
};
