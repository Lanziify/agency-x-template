import { cn } from '@lib/utils';

import { PageBlock } from '../../page/types';

export function resolveWidth(width: NonNullable<PageBlock['containerBlock']['width']>) {
  if (width === 'auto') {
    return { flex: '1 1 0' };
  }

  const percent = (Number(width) / 12) * 100;

  return {
    flex: `0 0 ${percent}%`,
    maxWidth: `${percent}%`,
  };
}
