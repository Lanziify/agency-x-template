import Image from 'next/image';
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item';
import { Media } from '@/payload-types';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { formatDistance } from 'date-fns';

export const Page = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const posts = await payload.find({
    collection: 'news',
    limit: 50,
    depth: 1,
  });

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <ItemGroup className="grid grid-cols-4 gap-4">
          {posts.docs.map((post) => (
            <Item key={post.id} variant="outline" asChild>
              <a href={`/news/${post.slug}`}>
                <ItemHeader>
                  <Image
                    src={
                      (post.thumbnail as Media)?.url ||
                      'https://placehold.co/128x128.png'
                    }
                    alt={(post.thumbnail as Media)?.alt || ''}
                    width={128}
                    height={128}
                    className="aspect-square w-full rounded-sm object-cover"
                  />
                </ItemHeader>
                <ItemContent>
                  <p className="text-sm text-muted-foreground">
                    {formatDistance(new Date(post.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                  <ItemTitle>{post.title}</ItemTitle>
                  <RichText
                    data={post.content}
                    className="text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance"
                  />
                </ItemContent>
              </a>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </div>
  );
};

export default Page;
