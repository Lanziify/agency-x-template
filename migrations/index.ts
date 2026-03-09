import * as migration_20260307_111814_news_taxonomies_contact from './20260307_111814_news_taxonomies_contact';

export const migrations = [
  {
    up: migration_20260307_111814_news_taxonomies_contact.up,
    down: migration_20260307_111814_news_taxonomies_contact.down,
    name: '20260307_111814_news_taxonomies_contact',
  },
];
