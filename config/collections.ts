import { CollectionConfig } from 'payload';

import { Categories } from '@collections/categories';
import { Contact } from '@collections/contact';
import { Media } from '@collections/Media';
import { News } from '@collections/news';
import { Pages } from '@collections/pages';
import { Tags } from '@collections/tags';

export const collections: CollectionConfig[] = [Media, Pages, Categories, Tags, News, Contact];
