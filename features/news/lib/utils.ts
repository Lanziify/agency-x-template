type BuildPageURL = {
  page?: number;
  category?: string | null;
  includeCategory?: boolean;
};

export const buildPaginationUrl = ({ page, includeCategory = true, category }: BuildPageURL) => {
  const searchParams = new URLSearchParams();
  if (includeCategory && category) searchParams.set('category', category);
  if (page) searchParams.set('page', page.toString());
  const query = searchParams.toString();
  return query ? `/news?${query}` : '/news';
};