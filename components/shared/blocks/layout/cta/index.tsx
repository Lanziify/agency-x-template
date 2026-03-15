import Link from 'next/link';

import { RichText } from '@components/shared/richtext';
import { Button } from '@components/ui/button';
import { TypographyH1, TypographySmall } from '@components/ui/typography';

import { PageBlock } from '../../types';

export const CTABlock = (props: PageBlock['ctaBlock']) => {
  const { eyebrow, title, description, actions } = props;
  return (
    <div className="max-w-3xl space-y-6">
      {eyebrow && <TypographySmall className="dark:text-white">{eyebrow}</TypographySmall>}

      <TypographyH1 className="dark:text-white">{title}</TypographyH1>

      {description && <RichText data={description} className="dark:text-white" />}

      {Boolean(actions && actions.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {actions?.map((action, index) => (
            <Button key={action.id ?? index} asChild variant={action.variant}>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
