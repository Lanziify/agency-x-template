import Link from 'next/link';

import { Button } from '@components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-6 rounded-lg border border-dashed p-8 text-center">
        <h2 className="text-2xl font-semibold">News Post Not Found</h2>

        <p className="text-muted-foreground mt-2 text-sm">The article you are looking for does not exist or may have been removed.</p>

        <Button asChild>
          <Link href="/news">Back to News</Link>
        </Button>
      </div>
    </div>
  );
}
