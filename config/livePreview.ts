import { RootLivePreviewConfig } from 'payload';

import { getClientSideURL } from '@lib/getURL';

export const livePreview: RootLivePreviewConfig = {
  url: getClientSideURL(),
  collections: ['pages'],
};
