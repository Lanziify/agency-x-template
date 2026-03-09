import Link from 'next/link';

import { Button } from '@components/ui/button';
import { TypographyH1, TypographySmall } from '@components/ui/typography';
import { RichText } from '@components/shared/richtext';

import { CTABlockProps } from '../types';

export const CTA = (props: CTABlockProps) => {
  const { eyebrow, title, description, actions } = props;
  return (
    <div className="max-w-3xl space-y-6">
      {eyebrow && <TypographySmall className="text-white">{eyebrow}</TypographySmall>}

      <TypographyH1 className="text-white">{title}</TypographyH1>

      {description && <RichText data={description} className="text-white" />}

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
