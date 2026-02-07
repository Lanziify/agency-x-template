import { collections } from '@config/collections';
import { OptionObject } from 'payload';

export const getCMSCollections = (): OptionObject[] => {
  return Object.values(collections)
    .filter((col) => col.custom?.cms)
    .map((col) => {
      const label = String(col.labels?.singular || col.slug);

      return {
        label: label.charAt(0).toUpperCase() + label.slice(1),
        value: col.slug,
      } as OptionObject;
    });
};