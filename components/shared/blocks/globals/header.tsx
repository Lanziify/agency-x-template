'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@components/ui/button';
import { Container } from '@components/ui/container';

import { Header as HeaderProps } from '@config/payload.types';

export function Header({ siteName, menu, actions }: Omit<HeaderProps, 'id'>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur dark:border-b-white/20 dark:bg-black/20">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-poppins text-xl font-bold dark:text-white">{siteName}</span>
            </Link>

            {/* Mobile menu button */}
            <button className="flex size-10 items-center justify-center rounded-md md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <svg className="size-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-6 md:flex">
              {menu?.map(({ items }) =>
                typeof items !== 'number' ? (
                  <Link
                    key={items.id}
                    href={`/${items.slug}`}
                    className="text-muted-foreground text-sm font-medium transition-colors hover:opacity-70 dark:text-white">
                    {items.name}
                  </Link>
                ) : null
              )}

              {actions?.map((action, index) => (
                <Button key={index} asChild variant={action.variant} size="sm">
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ))}
            </nav>
          </div>
        </Container>
      </header>

      {/* Mobile sliding menu overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile sliding menu */}
      <div
        className={`bg-background dark:bg-accent-foreground fixed top-0 right-0 z-50 h-full w-64 border-l shadow-lg transition-transform duration-300 md:hidden dark:border-l-white/20 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex items-center justify-between border-b px-4 py-4 dark:border-b-white/20">
          <span className="text-sm font-medium dark:text-white">Menu</span>
          <button className="hover:bg-accent flex size-10 items-center justify-center rounded-md" onClick={() => setIsOpen(false)}>
            <span className="sr-only">Close menu</span>
            <svg className="size-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menu?.map(({ items }) =>
            typeof items !== 'number' ? (
              <Link
                key={items.id}
                href={`/${items.slug}`}
                className="text-muted-foreground hover:text-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors dark:text-white"
                onClick={() => setIsOpen(false)}>
                {items.name}
              </Link>
            ) : null
          )}

          {actions?.map((action, index) => (
            <Button key={index} asChild variant={action.variant} size="sm" className="mt-2">
              <Link href={action.href} onClick={() => setIsOpen(false)}>
                {action.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
}
