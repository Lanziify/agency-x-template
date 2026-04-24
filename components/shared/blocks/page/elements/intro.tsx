import { TypographyP, TypographySmall } from '@components/ui/typography';

import { cn } from '@lib/utils';

import { resolveWidth } from '../../renderer/util/resolve-width';
import { getTypography } from '../../renderer/util/typography';
import { PageBlock } from '../types';

type IntroBlockType = Omit<PageBlock['introBlock'], 'id' | 'blockType' | 'blockId'>;

const RenderHeading = ({ heading, typography }: { heading: string; typography: Parameters<typeof getTypography>[0] }) => {
  const HeadingTypography = getTypography(typography);

  // eslint-disable-next-line react-hooks/static-components
  return <HeadingTypography className="dark:text-white">{heading}</HeadingTypography>;
};

export const IntroBlockComponent: React.FC<IntroBlockType> = (props) => {
  const { tagline, heading, description, typography, width, itemAlignment } = props;

  return (
    <div className={cn('flex flex-col gap-4')} style={{ alignItems: itemAlignment!, ...(width && resolveWidth(width)) }}>
      {tagline && <TypographySmall>{tagline}</TypographySmall>}
      {heading && <RenderHeading heading={heading} typography={typography ?? 'TypographyH2'} />}

      {description && <TypographyP>{description}</TypographyP>}
    </div>
  );
};
