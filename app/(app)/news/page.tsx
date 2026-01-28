import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Item, ItemGroup } from '@/components/ui/item';
import { NewsItem } from '@/features/news/components/NewsItem';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { redirect } from 'next/navigation';

type PageProps = {
  searchParams?: Promise<Record<keyof SearchParams, string>>;
};

type SearchParams = {
  page?: string;
  category?: string;
};

type BuildPageURL = {
  page?: number;
  category?: string | null;
  includeCategory?: boolean;
};

export const Page = async ({ searchParams }: PageProps) => {
  const categorySlug = (await searchParams)?.category;
  const paginationPage = Number((await searchParams)?.page) || 1;
  const activeClass = 'bg-gray-800 text-white [a]:hover:bg-gray-700';

  const payload = await getPayload({
    config: configPromise,
  });

  const categories = await payload.find({
    collection: 'categories',
    where: {
      type: {
        equals: 'news',
      },
    },
    limit: 0,
  });

  const postWhere = categorySlug ? { 'categories.slug': { equals: categorySlug } } : undefined;

  const posts = await payload.find({
    collection: 'news',
    where: postWhere,
    limit: 20,
    depth: 1,
    page: paginationPage,
  });

  if (paginationPage > posts.totalPages || paginationPage < 1) {
    const params = new URLSearchParams();
    if (categorySlug) params.set('category', categorySlug);
    params.set('page', '1');
    redirect(`/news?${params.toString()}`);
  }

  const buildPaginationUrl = ({ page, includeCategory = true, category = categorySlug }: BuildPageURL) => {
    const searchParams = new URLSearchParams();
    if (includeCategory && category) searchParams.set('category', category);
    if (page) searchParams.set('page', page.toString());
    const query = searchParams.toString();
    return query ? `/news?${query}` : '/news';
  };

  return (
    <div>
      <div className="mx-auto max-w-4xl">
        {categories.totalDocs > 0 && (
          <ItemGroup className="col-span-full mb-6 flex flex-row gap-3">
            <Item variant={!categorySlug ? 'default' : 'outline'} asChild size="sm" className={cn(!categorySlug && activeClass)}>
              <Link href={buildPaginationUrl({ includeCategory: false })} className="text-sm font-medium">
                All
              </Link>
            </Item>
            {categories.docs.map((category) => (
              <Item key={category.id} variant={categorySlug === category.slug ? 'default' : 'outline'} asChild size="sm" className={cn(categorySlug === category.slug && activeClass)}>
                <Link href={buildPaginationUrl({ page: 1, category: category.slug })} className="text-sm font-medium">
                  {category.title}
                </Link>
              </Item>
            ))}
          </ItemGroup>
        )}
        <ItemGroup className={cn('mb-6', posts.totalDocs > 0 && 'grid grid-cols-4 gap-4')}>
          {posts.docs.map((post) => (
            <NewsItem post={post} key={post.id} variant="outline" asChild />
          ))}
          {posts.totalDocs <= 0 && <p className="text-muted-foreground text-sm">There are no existing article post yet.</p>}
        </ItemGroup>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={buildPaginationUrl({ page: paginationPage - 1 })} className={cn(!posts.hasPrevPage && 'pointer-events-none cursor-not-allowed opacity-50')} aria-disabled={!posts.hasPrevPage} />
            </PaginationItem>
            {Array.from({ length: posts.totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <Link href={buildPaginationUrl({ page: i + 1 })} className={cn('rounded-md px-3 py-2', paginationPage === i + 1 && activeClass)}>
                  {i + 1}
                </Link>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href={buildPaginationUrl({ page: paginationPage + 1 })} className={cn(!posts.hasNextPage && 'pointer-events-none cursor-not-allowed opacity-50')} aria-disabled={!posts.hasNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Page;
