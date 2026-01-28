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

  if (!post) {
    return notFound();
  }

  return (
    <article className="mx-auto max-w-3xl py-10">
      <h1 className="mb-6 text-4xl font-bold">{post.title}</h1>
      <div className="prose lg:prose-xl">
        <RichText data={post.content} />
      </div>
    </article>
  );
}
