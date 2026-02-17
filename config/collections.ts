import { CollectionConfig } from 'payload';
import { Media } from '@collections/Media';
import { Categories } from '@collections/categories';
import { EmailTemplates } from '@collections/email-templates';
import { News } from '@collections/news';
import { Tags } from '@collections/tags';
import { TemplateBuilder } from '@collections/template-builder';

export const collections: CollectionConfig[] = [Media, EmailTemplates, TemplateBuilder, Categories, Tags, News];
