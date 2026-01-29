import { CollectionSlug, getPayload } from 'payload';
import configPromise from '@payload-config';

const payload = await getPayload({
  config: configPromise,
});

const getNewsBySlug = async (slug: CollectionSlug) => {
  const result = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  });

  return result.docs[0];
};

export { getNewsBySlug };
