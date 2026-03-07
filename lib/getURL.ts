import canUseDOM from './canUseDOM';

const LOCAL_URL = 'http://localhost:3000';

export const getServerSideURL = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return LOCAL_URL;
};

export const getClientSideURL = (slug?: string) => {
  const baseURL = canUseDOM ? window.location.origin : getServerSideURL();
  const normalizedSlug = slug?.replace(/^\/+/, '');

  return normalizedSlug ? `${baseURL}/${normalizedSlug}` : baseURL;
};
