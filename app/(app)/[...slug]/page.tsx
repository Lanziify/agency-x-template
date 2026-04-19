export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';

import { PageParams } from '@components/shared/blocks/page/types';
import { renderBlocks } from '@components/shared/blocks/renderer';
import { hasFormBlock } from '@components/shared/blocks/renderer/util/page-guard';
import RecaptchaProvider from '@components/shared/providers/recaptcha-provider';
import { Wrapper } from '@components/ui/container';
import { SonnerProvider } from '@components/ui/sonner-provider';

import { payload } from '@lib/payload';

import '@components/shared/blocks';

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

  return (
    <Wrapper>
      <RecaptchaProvider hasFormBlock={hasFormBlock(page)}>{renderBlocks(page.layout)}</RecaptchaProvider>
      <SonnerProvider position="top-center" />
    </Wrapper>
  );
}
