import canUseDOM from './canUseDOM';

export const getServerSideURL = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  );
};

export const getClientSideURL = (slug?: string) => {
  let baseURL: string;

  if (canUseDOM) {
    const { protocol, hostname, port } = window.location;
    baseURL = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  } else {
    baseURL = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.NEXT_PUBLIC_SERVER_URL || '';
  }

  return slug ? `${baseURL}/${slug}` : baseURL;
};
