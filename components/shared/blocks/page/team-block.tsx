import { Container, Section } from '@components/ui/container';
import { WithFallbackImage } from '@components/ui/image';
import { TypographyH3, TypographyP, TypographySmall } from '@components/ui/typography';

import { isMedia } from '@lib/media';

import { socialIcons } from '../renderer/util/icons';
import { IntroBlockComponent } from './elements/intro';
import { PageBlock } from './types';

export const TeamBlock: React.FC<PageBlock['teamBlock']> = (props) => {
  const { tagline, heading, description, members } = props;

  return (
    <Section>
      <Container>
        <IntroBlockComponent {...props} />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members?.map((member) => {
            const initialSrc = isMedia(member.avatar) ? member.avatar.url : '';
            const initialAlt = isMedia(member.avatar) ? member.avatar.alt : '';

            return (
              <div key={member.name} className="relative flex flex-col items-center">
                <div className="bg-muted/50 mb-6 aspect-square w-full max-w-42 overflow-hidden rounded-full">
                  <WithFallbackImage src={initialSrc} alt={initialAlt} className="h-full w-full object-cover" />
                </div>
                <TypographyH3>{member.name}</TypographyH3>
                <TypographySmall>{member.role}</TypographySmall>
                <TypographyP className="text-center">{member.bio}</TypographyP>
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="mt-6 flex items-center gap-4">
                    {member.socialLinks.map(({ platform, url }) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground dark:text-white">
                        <span className="sr-only">{platform}</span>
                        {socialIcons[platform]}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
