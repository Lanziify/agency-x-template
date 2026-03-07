import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Where } from 'payload';

import { News } from '@collections/news';

import { Item, ItemGroup } from '@components/ui/item';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@components/ui/pagination';

import { NewsItem } from '@features/news/components/NewsItem';
import { buildPaginationUrl } from '@features/news/lib/utils';
import { getNewsList } from '@features/news/queries/getNewsList';
import { getCategoriesByPost } from '@features/taxonomies/queries/getCategoriesByPost';

import { cn } from '@lib/utils';

type SearchParams = {
  page?: string;
  category?: string;
};

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

const ACTIVE_ITEM_CLASS = 'bg-gray-800 text-white [a]:hover:bg-gray-700';

const parsePage = (value?: string) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

export const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const categorySlug = params?.category;
  const currentPage = parsePage(params?.page);

  const where: Where = categorySlug
    ? {
        'categories.slug': {
          equals: categorySlug,
        },
      }
    : {};

  const [categories, news] = await Promise.all([
    getCategoriesByPost(News),
    getNewsList({
      page: currentPage,
      where,
    }),
  ]);

  const hasNews = news.totalDocs > 0;
  const shouldRedirectToFirstPage = currentPage < 1 || (hasNews && currentPage > news.totalPages);

  if (shouldRedirectToFirstPage) {
    redirect(buildPaginationUrl({ page: 1, category: categorySlug }));
  }

  return (
    <div className="mx-auto max-w-4xl">
      {categories.totalDocs > 0 && (
        <ItemGroup className="mb-6 flex flex-wrap gap-3">
          <Item variant={!categorySlug ? 'default' : 'outline'} asChild size="sm" className={cn(!categorySlug && ACTIVE_ITEM_CLASS)}>
            <Link href={buildPaginationUrl({ page: 1, includeCategory: false })} className="text-sm font-medium">
              All
            </Link>
          </Item>

          {categories.docs.map((category) => {
            const isActive = categorySlug === category.slug;

            return (
              <Item
                key={category.id}
                variant={isActive ? 'default' : 'outline'}
                asChild
                size="sm"
                className={cn(isActive && ACTIVE_ITEM_CLASS)}>
                <Link href={buildPaginationUrl({ page: 1, category: category.slug })} className="text-sm font-medium">
                  {category.title}
                </Link>
              </Item>
            );
          })}
        </ItemGroup>
      )}

      {hasNews ? (
        <ItemGroup className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {news.docs.map((post) => (
            <NewsItem key={post.id} post={post} variant="outline" asChild />
          ))}
        </ItemGroup>
      ) : (
        <div className="mb-6 rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground text-sm">No news articles found{categorySlug ? ' in this category' : ''}.</p>

          {categorySlug && (
            <Link
              href={buildPaginationUrl({ page: 1, includeCategory: false })}
              className="mt-3 inline-block text-sm font-medium underline underline-offset-4">
              View all news
            </Link>
          )}
        </div>
      )}

      {hasNews && news.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={buildPaginationUrl({ page: currentPage - 1, category: categorySlug })}
                className={cn(!news.hasPrevPage && 'pointer-events-none cursor-not-allowed opacity-50')}
                aria-disabled={!news.hasPrevPage}
                tabIndex={!news.hasPrevPage ? -1 : undefined}
              />
            </PaginationItem>

            {Array.from({ length: news.totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = currentPage === page;

              return (
                <PaginationItem key={page}>
                  <Link
                    href={buildPaginationUrl({ page, category: categorySlug })}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm',
                      isActive && ACTIVE_ITEM_CLASS
                    )}>
                    {page}
                  </Link>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href={buildPaginationUrl({ page: currentPage + 1, category: categorySlug })}
                className={cn(!news.hasNextPage && 'pointer-events-none cursor-not-allowed opacity-50')}
                aria-disabled={!news.hasNextPage}
                tabIndex={!news.hasNextPage ? -1 : undefined}
                size={undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Page;
