import configPromise from '@payload-config';
import { CollectionConfig, CollectionSlug, getPayload } from 'payload';

const payload = await getPayload({
  config: configPromise,
});

const getCategoriesByPost = async (collection: CollectionConfig) => {
  return await payload.find({
    collection: 'categories',
    where: {
      type: {
        equals: collection['slug'] as CollectionSlug,
      },
    },
    limit: 0,
  });
};

export { getCategoriesByPost };
