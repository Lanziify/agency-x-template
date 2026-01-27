import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Item, ItemGroup } from '@/components/ui/item';
import { NewsItem } from '@/features/news/components/NewsItem';
import Link from 'next/link';

type PageProps = {
	searchParams?: Record<string, string> | undefined;
};

export const Page = async ({ searchParams }: PageProps) => {
	const categorySlug = (await searchParams)?.category;

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

	const postWhere = categorySlug
		? { 'categories.slug': { equals: categorySlug } }
		: undefined;

	const posts = await payload.find({
		collection: 'news',
		where: postWhere,
		limit: 50,
		depth: 1,
	});

	return (
		<div>
			<div className="max-w-4xl mx-auto">
				<ItemGroup className="col-span-full flex flex-row gap-3 mb-6">
					<Item asChild variant="outline" size="sm">
						<Link href="/news" className="text-sm font-medium">
							All
						</Link>
					</Item>
					{categories.docs.map((category) => (
						<Item key={category.id} asChild variant="outline" size="sm">
							<Link
								href={`/news?category=${category.slug}`}
								className="text-sm font-medium"
							>
								{category.title}
							</Link>
						</Item>
					))}
				</ItemGroup>
				<ItemGroup className="grid grid-cols-4 gap-4">
					{posts.docs.map((post) => (
						<NewsItem post={post} key={post.id} variant="outline" asChild />
					))}
				</ItemGroup>
			</div>
		</div>
	);
};

export default Page;
