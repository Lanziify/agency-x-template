import { Container, Section } from '@components/ui/container';

import { renderBlocks } from '../renderer';
import { PageBlock } from './types';

export const FAQBlock: React.FC<PageBlock['faqBlock']> = (props) => {
  const { blocks } = props;

  return (
    <Section>
      <Container>{blocks?.map((block) => renderBlocks(block))}</Container>
    </Section>
  );
};
