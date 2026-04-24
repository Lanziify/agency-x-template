import { PageBlock } from '../../page/types';

export function resolveWidth(width: NonNullable<PageBlock['containerBlock']['width']>) {
  if (width === 'auto') {
    return { flex: '1 1 0' };
  }

  const percent = (Number(width) / 12) * 100;

  return {
    width: '100%',
    maxWidth: `${percent}%`,
    flex: `0 0 ${percent}%`,
  };
}
