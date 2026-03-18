import Link from 'next/link';

import { Button } from '@components/ui/button';
import { TypographyH1, TypographyLead, TypographyP } from '@components/ui/typography';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center dark:bg-black">
      <TypographyH1 className="mb-4 text-6xl md:text-7xl">404</TypographyH1>
      <TypographyLead className="mb-2">Oops! We can’t find the page you’re looking for.</TypographyLead>
      <TypographyP className="mb-6 max-w-md">
        The page might have been removed, had its name changed, or is temporarily unavailable.
      </TypographyP>
      <Link href="/">
        <Button variant="default">Go back home</Button>
      </Link>
    </div>
  );
}
