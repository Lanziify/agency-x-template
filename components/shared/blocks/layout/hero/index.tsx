import Link from 'next/link';
import Image from 'next/image';

import { Page } from '@config/payload.types';
import { Button } from '@components/ui/button';
import { TypographyH1, TypographyLead, TypographyMuted, TypographySmall } from '@components/ui/typography';
import { RichText } from '@components/shared/richtext';
import { Container, Section } from '@components/ui/container';
import { HeroBlockProps } from '../types';
import { BlocksRenderer } from '../..';

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const { media, components } = props;

  const mediaUrl = typeof media === 'object' && media?.url ? media.url : null;

  return (
    <div className="grid">
      <div className="flex min-h-122.25 items-center bg-black/40">
        <Section className="[grid-area:1/1]">

          {/* <div className="flex items-center justify-center lg:justify-end">
          <div className="relative flex h-[260px] w-[320px] items-center justify-center rounded-[32px] bg-black/10 md:h-[320px] md:w-[400px] lg:h-[360px] lg:w-[460px]">
            {mediaUrl ? (
              <div className="relative h-full w-full overflow-hidden rounded-[32px]">
                <Image src={mediaUrl} alt={mediaAlt} fill priority className="object-cover opacity-90" />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[32px] bg-black/8">
                <svg
                  viewBox="0 0 24 24"
                  className="h-28 w-28 text-white/20 md:h-36 md:w-36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2.5" />
                  <circle cx="9" cy="9" r="1.75" fill="currentColor" stroke="none" />
                  <path d="M4.5 17l5.5-6 3.5 4 3-3.5L19.5 17" />
                </svg>
              </div>
            )}
          </div>
        </div> */}
        </Section>
      </div>
    </div>
  );
};
