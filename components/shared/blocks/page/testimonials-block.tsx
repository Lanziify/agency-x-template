import { Container, Section } from '@components/ui/container';
import { WithFallbackImage } from '@components/ui/image';
import { TypographyH2, TypographyP, TypographySmall } from '@components/ui/typography';

import { isMedia } from '@lib/media';
import { cn } from '@lib/utils';

import { PageBlock } from './types';

function StarRating({ rating }: { rating?: number | null }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < (rating ?? 0));
  return (
    <div className="flex gap-1">
      {stars.map((filled, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4 text-yellow-500">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export const TestimonialsBlock: React.FC<PageBlock['testimonialsBlock']> = ({
  tagline,
  heading,
  description,
  testimonials,
  viewType: layout = 'grid',
}) => {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          {tagline && <TypographySmall>{tagline}</TypographySmall>}
          {heading && <TypographyH2 className="dark:text-white">{heading}</TypographyH2>}
          {description && <TypographyP>{description}</TypographyP>}
        </div>

        {testimonials && testimonials.length > 0 && (
          <div
            className={cn('mt-12 gap-8', {
              'grid sm:grid-cols-2 lg:grid-cols-3': layout === 'grid',
              'flex flex-col': layout === 'list',
            })}>
            {testimonials.map((testimonial, index) => {
              const initialSrc = isMedia(testimonial.avatar) ? testimonial.avatar.url : '';
              const initialAlt = isMedia(testimonial.avatar) ? testimonial.avatar.alt : '';

              return (
                <div
                  key={testimonial.id ?? index}
                  className={cn(
                    'group bg-card relative flex flex-col overflow-hidden rounded-lg border p-6',
                    'dark:bg-accent-foreground transition-all hover:shadow-lg dark:border-white/20',
                    layout === 'list' ? 'flex-row items-start gap-6' : 'items-stretch'
                  )}>
                  <div className={cn('flex-1 space-y-4 grid grid-rows-[auto_1fr_auto  ]', layout === 'list' ? 'flex-1' : '')}>
                    <StarRating rating={testimonial.rating} />

                    <blockquote>
                      <TypographyP className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</TypographyP>
                    </blockquote>

                    <div className={cn('flex items-center gap-3', layout === 'list' ? '' : 'mt-auto pt-4')}>
                      {initialSrc ? (
                        <div className="h-12 w-12 overflow-hidden rounded-full">
                          <WithFallbackImage
                            src={initialSrc}
                            alt={initialAlt}
                            className="h-full w-full object-cover"
                            width={48}
                            height={48}
                          />
                        </div>
                      ) : (
                        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold">
                          {testimonial.author?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <TypographyP className="font-semibold dark:text-white">{testimonial.author}</TypographyP>
                        {(testimonial.role || testimonial.company) && (
                          <TypographySmall className="text-muted-foreground">
                            {testimonial.role}
                            {testimonial.role && testimonial.company && ' at '}
                            {testimonial.company}
                          </TypographySmall>
                        )}
                      </div>
                    </div>
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
