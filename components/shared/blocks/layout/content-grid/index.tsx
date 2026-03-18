'use server';

import React from 'react';
import Link from 'next/link';

import { Container, Section } from '@components/ui/container';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination';
import { TypographyH2, TypographyH3, TypographyP } from '@components/ui/typography';

import { buildPaginationUrl } from '@features/news/lib/utils';

import { payload } from '@lib/payload';
import { cn } from '@lib/utils';

import { Config } from '@config/payload.types';

import { CollectionMap, PageBlock, PageParams } from '../../types';

const gapClass = {
  small: 'gap-2',
  medium: 'gap-4',
  large: 'gap-6',
};

// type CollectionConfigMap = Config['collections'];
//  CollectionConfigMap[typeof source];

const parsePage = (value?: string) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

const ContentGridBlock: React.FC<PageBlock['contentGridBlock'] & { pageProps: PageParams }> = async ({
  title,
  description,
  source,
  columns = 3,
  gap = 'medium',
  limit = 6,
  pagination,
  sortBy,
  cardStyle = 'standard',
  pageProps,
}) => {
  const searchParams = await pageProps.searchParams;

  const currentPage = parsePage(searchParams?.page);

  const result = await payload.find({
    collection: source,
    page: currentPage,
  });

  // const hasItems = result.totalDocs > 0;
  // const shouldRedirectToFirstPage = currentPage < 1 || (hasNews && currentPage > news.totalPages);

  // if (shouldRedirectToFirstPage) {
  //   redirect(buildPaginationUrl({ page: 1, category: categorySlug }));
  // }

  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [paginatedItems, setPaginatedItems] = React.useState<PaginatedDocs<CollectionMap[typeof source]> | null>(null);

  // React.useEffect(() => {
  //   async function fetchItems() {
  //     const offset = pagination ? (currentPage - 1) * (limit ?? 6) : 0;
  //     const sortParam = (() => {
  //       switch (sortBy) {
  //         case 'createdAtAsc':
  //           return 'createdAt';
  //         case 'createdAtDesc':
  //           return '-createdAt';
  //         case 'titleAsc':
  //           return 'title';
  //         case 'titleDesc':
  //           return '-title';
  //         default:
  //           return '-createdAt';
  //       }
  //     })();

  //     const res = await fetch(`http://localhost:3000/api/${source}?limit=${limit}&offset=${offset}&sort=${sortParam}`);
  //     const data = await res.json();

  //     console.log(data);

  //     setPaginatedItems(data.docs || []);
  //   }
  //   fetchItems();
  // }, [source, currentPage, limit, sortBy, pagination]);

  return (
    <Section>
      <Container className="my-8">
        {title && <TypographyH2>{title}</TypographyH2>}
        {description && <TypographyP>{description}</TypographyP>}

        <div className={cn('grid', gap ? gapClass[gap] : 'gap-4', `grid-cols-[${columns ?? '3'}]`)}>
          {/* {paginatedItems?.docs?.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col rounded border p-4 ${
                cardStyle === 'highlight' ? 'border-yellow-300 bg-yellow-50' : ''
              } ${cardStyle === 'minimal' ? 'border-none p-2' : ''}`}>
              {item.featuredImage && <img src={item.featuredImage.url} alt={item.title} className="mb-2 h-40 w-full rounded object-cover" />}
              <TypographyH3 className="mb-1 font-semibold">{item.title}</TypographyH3>
              <Link href={`/${source}/${item.slug}`} className="mt-auto text-blue-600">
                View
              </Link>
            </div>
          ))} */}
        </div>

        {/* {paginatedItems && paginatedItems.totalDocs > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={buildPaginationUrl({ page: currentPage - 1 })}
                  className={cn(!news.hasPrevPage && 'pointer-events-none cursor-not-allowed opacity-50')}
                  aria-disabled={!news.hasPrevPage}
                  tabIndex={!news.hasPrevPage ? -1 : undefined}
                />
              </PaginationItem>

              {Array.from({ length: paginatedItems.totalPages }, (_, index) => {
                const page = index + 1;
                const isActive = currentPage === page;

                return (
                  <PaginationItem key={page}>
                    <Link
                      href={buildPaginationUrl({ page })}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm',
                        isActive && ACTIVE_ITEM_CLASS
                      )}
                    >
                      {page}
                    </Link>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href={buildPaginationUrl({ page: currentPage + 1 })}
                  className={cn(!news.hasNextPage && 'pointer-events-none cursor-not-allowed opacity-50')}
                  aria-disabled={!news.hasNextPage}
                  tabIndex={!news.hasNextPage ? -1 : undefined}
                  size={undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )} */}
      </Container>
    </Section>
  );
};

export default ContentGridBlock;
