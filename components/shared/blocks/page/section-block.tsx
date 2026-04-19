import React from 'react';

import { Container, Section } from '@components/ui/container';

import { renderBlocks } from '../renderer';
import { PageBlock } from './types';

export const SectionBlock: React.FC<PageBlock['sectionBlock']> = (props) => {
  const { blocks } = props;

  return (
    <Section>
      <Container>{blocks?.map((block) => renderBlocks(block))}</Container>
    </Section>
  );
};
