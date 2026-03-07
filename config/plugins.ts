import { Plugin } from 'payload';
import { cloudStorage } from '@lib/cloudStorage';
import { seo } from '@lib/seo';
import { formBuilder } from '@lib/formBuilder';

export const plugins: Plugin[] = [seo, cloudStorage, formBuilder];
