import Link from 'next/link';

import { Container } from '@components/ui/container';

import { Footer as FooterProps } from '@config/payload.types';

import { socialIcons } from '../renderer/util/icons';

export function Footer({ copyright, menu, socialLinks }: Omit<FooterProps, 'id'>) {
  return (
    <footer className="border-border/40 bg-background/95 dark:border-white/20 border-t dark:bg-black">
      <Container>
        <div className="flex flex-col gap-8 py-8 md:flex-row md:items-center md:justify-between">
          <div className="text-muted-foreground text-sm dark:text-white">{copyright}</div>

          <nav className="flex flex-wrap items-center gap-6">
            {menu?.map(({ items }) =>
              typeof items !== 'number' ? (
                <Link
                  key={items.id}
                  href={`/${items.slug}`}
                  className="text-muted-foreground hover:text-foreground text-sm dark:text-white">
                  {items.name}
                </Link>
              ) : null
            )}
          </nav>

          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map(({ platform, url }) => (
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
      </Container>
    </footer>
  );
}
