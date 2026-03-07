import { Plugin } from 'payload';

import { cloudStorage } from '@lib/cloudStorage';
import { formBuilder } from '@lib/formBuilder';
import { seo } from '@lib/seo';

export const plugins: Plugin[] = [seo, cloudStorage, formBuilder];
