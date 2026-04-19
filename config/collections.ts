import { CollectionConfig } from 'payload';

import { Categories } from '@collections/categories';
import { Media } from '@collections/Media';
import { News } from '@collections/news';
import { Pages } from '@collections/pages';
import { Posts } from '@collections/posts';
import { Tags } from '@collections/tags';

export const collections: CollectionConfig[] = [Media, Pages, Posts, Categories, Tags, News];
