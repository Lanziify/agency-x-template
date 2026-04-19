import Link from 'next/link';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Container, Section } from '@components/ui/container';
import { TypographyP, TypographySmall } from '@components/ui/typography';

import { cn } from '@lib/utils';

import { IntroBlockComponent } from './elements/intro';
import { PageBlock } from './types';

export const PricingBlock: React.FC<PageBlock['pricingBlock']> = (props) => {
  const { plans } = props;

  return (
    <Section>
      <Container>
        <IntroBlockComponent {...props} />

        {plans && plans.length > 0 && (
          <div
            className={cn('mt-12 grid gap-8', {
              'sm:grid-cols-2 lg:grid-cols-3': plans.length <= 3,
              'sm:grid-cols-2 lg:grid-cols-4': plans.length > 3,
            })}>
            {plans.map((plan, index) => {
              const cta = plan.cta?.[0];
              const isPopular = plan.isPopular ?? false;

              return (
                <div
                  key={plan.id ?? index}
                  className={cn(
                    'relative flex flex-col rounded-xl border p-8',
                    'bg-card text-card-foreground dark:bg-accent-foreground dark:border-white/20',
                    'transition-all hover:shadow-lg',
                    isPopular && 'ring-primary border-primary scale-105 shadow-lg ring-2'
                  )}>
                  {isPopular && (
                    <Badge className="absolute -top-3 right-4 border dark:border-white/20" variant="default">
                      Popular
                    </Badge>
                  )}

                  <div className="mb-6">
                    <TypographyP className="text-muted-foreground text-sm font-medium tracking-wide uppercase">{plan.name}</TypographyP>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold dark:text-white">{plan.price}</span>
                      {plan.interval && <span className="text-muted-foreground dark:text-white">{plan.interval}</span>}
                    </div>

                    {plan.description && <TypographyP className="text-muted-foreground mt-2">{plan.description}</TypographyP>}
                  </div>

                  {plan.features && plan.features.length > 0 && (
                    <ul className="mb-8 flex-1 space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={feature.id ?? featureIndex} className="flex items-center gap-3">
                          <svg
                            className="text-primary mt-0.5 h-5 w-5 shrink-0 dark:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <TypographySmall>{feature.text}</TypographySmall>
                        </li>
                      ))}
                    </ul>
                  )}

                  {cta && (
                    <Button variant={cta.variant} className="w-full" asChild>
                      <Link href={cta.href}>{cta.label}</Link>
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
};
