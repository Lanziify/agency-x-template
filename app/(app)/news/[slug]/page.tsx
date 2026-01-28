import { Badge } from '@/components/ui/badge';
import { ItemGroup } from '@/components/ui/item';
import { Tag } from '@/config/payload.types';
import { NewsItem } from '@/features/news/components/NewsItem';
import { payload } from '@/lib/payload';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { notFound } from 'next/navigation';

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

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

  const post = result.docs[0];

  const relatedPost = await payload.find({
    collection: 'news',
    where: {
      tags: {
        in: (post.tags as Tag[]).map((tag) => tag.id),
      },
      id: {
        not_equals: result.docs[0].id,
      },
    },
    limit: 5,
  });

  if (!post) {
    return notFound();
  }

  return (
    <article className="mx-auto max-w-3xl py-10">
      <h1 className="mb-6 text-4xl font-bold">{post.title}</h1>
      <div className="prose lg:prose-xl">
        <RichText data={post.content} />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {(post.tags as Tag[]).map((tag) => (
          <Badge key={tag.id} className="rounded-sm">{tag.title}</Badge>
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
