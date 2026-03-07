import { seoPlugin } from '@payloadcms/plugin-seo';
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';

import { getServerSideURL } from '@lib/getURL';

const generateTitle: GenerateTitle = ({ doc }) => {
  return doc?.title ? `${doc.title} | ${process.env.APP_NAME!}` : process.env.APP_NAME!;
};

const generateURL: GenerateURL = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const seo = seoPlugin({
  generateTitle,
  generateURL,
});
