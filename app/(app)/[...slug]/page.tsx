export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';

import { renderBlocks } from '@components/shared/blocks/renderer';
import { hasFormBlock } from '@components/shared/blocks/renderer/util/page-guard';
import { PageParams } from '@components/shared/blocks/types';
import RecaptchaProvider from '@components/shared/providers/recaptcha-provider';
import { Wrapper } from '@components/ui/container';
import { SonnerProvider } from '@components/ui/sonner-provider';

import { payload } from '@lib/payload';

async function getPage(path: string) {
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        like: path,
      },
    },
    depth: 1,
  });

  return result.docs[0];
}

export default async function Page(props: PageParams) {
  const pageParams = await props.params;

  const slug = pageParams?.slug;

  if (!slug) return notFound();

  const page = await getPage(slug.join('/'));

  if (!page) return notFound();

  const content = await renderBlocks(page.layout, props);

  return (
    <Wrapper>
      <RecaptchaProvider hasFormBlock={hasFormBlock(page)}>{content}</RecaptchaProvider>
      <SonnerProvider position="top-center" />
    </Wrapper>
  );
}
