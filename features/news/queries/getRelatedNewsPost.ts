import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { News, Tag } from '@config/payload.types';

const payload = await getPayload({
  config: configPromise,
});

const getRelatedNewsPost = async (post: News) => {
  const result = await payload.find({
    collection: 'news',
    where: {
      tags: {
        in: (post.tags as Tag[]).map((tag) => tag.id),
      },
      id: {
        not_equals: post.id,
      },
    },
    limit: 5,
  });

  return result;
};

export { getRelatedNewsPost };
