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
    <article className="mx-auto max-w-4xl py-10">
      <header className="mb-6">
        <h1 className="mb-4 text-3xl leading-tight font-semibold">{post.title}</h1>

        {post.tags && post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {(post.tags as Tag[]).map((tag) => (
              <Badge key={tag.id} className="rounded-sm">
                {tag.title}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div className="prose max-w-none">
        <RichText data={post.content} />
      </div>

      {relatedPost.totalDocs > 0 && (
        <section className="mt-10 border-t pt-8">
          <h2 className="mb-6 text-xl font-semibold">Related Articles</h2>

          <ItemGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {relatedPost.docs.map((post) => (
              <NewsItem key={post.id} post={post} variant="outline" asChild />
            ))}
          </ItemGroup>
        </section>
      )}
    </article>
  );
}
