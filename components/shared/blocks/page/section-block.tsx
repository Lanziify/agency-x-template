import React from 'react';

import { Container, Section } from '@components/ui/container';

import { renderBlocks } from '../renderer';
import { BackgroundBlock } from './elements/background';
import { PageBlock } from './types';

export const SectionBlock: React.FC<PageBlock['sectionBlock']> = (props) => {
  const { blocks } = props;

  return (
    <Section className='relative'>
      <Container>{blocks?.map((block) => renderBlocks(block))}</Container>
      <BackgroundBlock {...props.background} />
    </Section>
  );
};
