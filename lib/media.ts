import { Media } from '@config/payload.types';

export function isMedia(media: number | Media | null | undefined): media is Media {
  return Boolean(media && typeof media !== 'number');
}