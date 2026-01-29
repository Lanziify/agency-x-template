import Link from 'next/link';
import { redirect } from 'next/navigation';
import { News } from '@collections/news';
import { Item, ItemGroup } from '@components/ui/item';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@components/ui/pagination';
import { NewsItem } from '@features/news/components/NewsItem';
import { buildPaginationUrl } from '@features/news/lib/utils';
import { getNewsList } from '@features/news/queries/getNewsList';
import { getCategoriesByPost } from '@features/taxonomies/queries/getCategoriesByPost';
import { cn } from '@lib/utils';

type PageProps = {
  searchParams?: Promise<Record<keyof SearchParams, string>>;
};

type SearchParams = {
  page?: string;
  category?: string;
};

export const Page = async ({ searchParams }: PageProps) => {
  const categorySlug = (await searchParams)?.category;
  const paginationPage = Number((await searchParams)?.page) || 1;
  const postWhere = categorySlug ? { 'categories.slug': { equals: categorySlug } } : undefined;
  const activeClass = 'bg-gray-800 text-white [a]:hover:bg-gray-700';

  const [categories, news] = await Promise.all([getCategoriesByPost(News), getNewsList({ page: paginationPage, where: postWhere || {} })]);

  if (paginationPage > news.totalPages || paginationPage < 1) {
    const params = new URLSearchParams();
    if (categorySlug) params.set('category', categorySlug);
    params.set('page', '1');
    redirect(`/news?${params.toString()}`);
  }

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
              <Item
                key={category.id}
                variant={categorySlug === category.slug ? 'default' : 'outline'}
                asChild
                size="sm"
                className={cn(categorySlug === category.slug && activeClass)}>
                <Link href={buildPaginationUrl({ page: 1, category: category.slug })} className="text-sm font-medium">
                  {category.title}
                </Link>
              </Item>
            ))}
          </ItemGroup>
        )}
        <ItemGroup className={cn('mb-6', news.totalDocs > 0 && 'grid grid-cols-4 gap-4')}>
          {news.docs.map((post) => (
            <NewsItem post={post} key={post.id} variant="outline" asChild />
          ))}
          {news.totalDocs <= 0 && <p className="text-muted-foreground text-sm">There are no existing article post yet.</p>}
        </ItemGroup>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={buildPaginationUrl({ page: paginationPage - 1, category: categorySlug })}
                className={cn(!news.hasPrevPage && 'pointer-events-none cursor-not-allowed opacity-50')}
                aria-disabled={!news.hasPrevPage}
              />
            </PaginationItem>
            {Array.from({ length: news.totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <Link
                  href={buildPaginationUrl({ page: i + 1, category: categorySlug })}
                  className={cn('rounded-md px-3 py-2', paginationPage === i + 1 && activeClass)}>
                  {i + 1}
                </Link>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={buildPaginationUrl({ page: paginationPage + 1, category: categorySlug })}
                className={cn(!news.hasNextPage && 'pointer-events-none cursor-not-allowed opacity-50')}
                aria-disabled={!news.hasNextPage}
                size={undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Page;
