import { Where, getPayload } from 'payload';
import configPromise from '@payload-config';

const payload = await getPayload({
  config: configPromise,
});

const getNewsList = async ({ page = 1, where = {} }: { page?: number; where: Where }) => {
  return await payload.find({
    collection: 'news',
    where,
    limit: 1,
    depth: 1,
    page,
  });
};

export { getNewsList };
