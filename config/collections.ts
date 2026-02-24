import { CollectionConfig } from 'payload';
import { Media } from '@collections/Media';
import { Categories } from '@collections/categories';
import { Tags } from '@collections/tags';
import { News } from '@collections/news';
import { Contact } from '@collections/contact';

export const collections: CollectionConfig[] = [Media, Categories, Tags, News, Contact];
