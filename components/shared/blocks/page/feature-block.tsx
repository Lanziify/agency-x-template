import { Container, Section } from '@components/ui/container';
import { WithFallbackImage } from '@components/ui/image';
import { TypographyH3, TypographyP } from '@components/ui/typography';

import { isMedia } from '@lib/media';
import { cn } from '@lib/utils';

import { getItemAlignment } from '../renderer/util/alignment';
import { IntroBlockComponent } from './elements/intro';
import { PageBlock } from './types';

export const FeatureBlock: React.FC<PageBlock['featureBlock']> = (props) => {
  const { features, itemAlignment } = props;

  const alignment = getItemAlignment(itemAlignment ?? 'start', {
    start: 'items-start text-start',
    center: 'items-center text-center',
    end: 'items-end text-end',
  });

  return (
    <Section>
      <Container>
        <IntroBlockComponent {...props} />

        {features && features.length > 0 && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const initialSrc = isMedia(feature.image) ? feature.image.url : '';
              const initialAlt = isMedia(feature.image) ? feature.image.alt : '';

              return (
                <div
                  key={feature.id ?? index}
                  className={cn(
                    'group bg-card dark:bg-accent-foreground relative flex flex-col overflow-hidden rounded-lg border dark:border-white/20',
                    'transition-all hover:shadow-lg',
                    alignment
                  )}>
                  <div className="bg-muted/50 aspect-video w-full overflow-hidden">
                    <WithFallbackImage
                      src={initialSrc}
                      alt={initialAlt}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      width={400}
                      height={225}
                    />
                  </div>
                  <div className="flex-1 space-y-2 p-6">
                    <TypographyH3>{feature.title}</TypographyH3>
                    <TypographyP>{feature.description}</TypographyP>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
};
