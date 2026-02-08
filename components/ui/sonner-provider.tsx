'use client';

import { Toaster } from 'sonner';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export function SonnerProvider({ position }: { position?: Position }) {
  return <Toaster richColors position={position ?? 'bottom-right'} />;
}
