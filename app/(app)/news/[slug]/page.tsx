import { notFound } from 'next/navigation';
import { CollectionSlug } from 'payload';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Badge } from '@components/ui/badge';
import { ItemGroup } from '@components/ui/item';
import { NewsItem } from '@features/news/components/NewsItem';
import { getNewsBySlug } from '@features/news/queries/getNewsBySlug';
import { getRelatedNewsPost } from '@features/news/queries/getRelatedNewsPost';
import { Tag } from '@config/payload.types';

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getNewsBySlug(slug as CollectionSlug);

  if (!post) return notFound();

  const relatedPost = await getRelatedNewsPost(post);

  return (
    <article className="mx-auto max-w-3xl py-10">
      <h1 className="mb-6 text-4xl font-bold">{post.title}</h1>
      <div className="prose lg:prose-xl">
        <RichText data={post.content} />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {(post.tags as Tag[]).map((tag) => (
          <Badge key={tag.id} className="rounded-sm">
            {tag.title}
          </Badge>
        ))}
      </div>
      {relatedPost.totalDocs > 0 && (
        <div>
          <h3 className="mb-6 text-2xl font-bold">You may also like</h3>
          <ItemGroup className="grid grid-cols-4 gap-2">
            {relatedPost.docs.map((post) => (
              <NewsItem key={post.id} post={post} variant="outline" asChild />
            ))}
          </ItemGroup>
        </div>
      )}
    </article>
  );
}
