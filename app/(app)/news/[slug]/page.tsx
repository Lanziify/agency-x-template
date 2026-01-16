import { payload } from '@/lib/payload';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { notFound } from 'next/navigation';

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
    <article className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {/* 5. Render the Rich Text content */}
      <div className="prose lg:prose-xl">
        <RichText data={post.content} />
      </div>
    </article>
  );
}
