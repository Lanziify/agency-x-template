import { Plugin } from 'payload';
import { cloudStorage } from '@lib/cloudStorage';
import { seo } from '@lib/seo';

export const plugins: Plugin[] = [seo, cloudStorage];
