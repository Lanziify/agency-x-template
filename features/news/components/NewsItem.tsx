import React from 'react';
import Image from 'next/image';
import { Item, ItemContent, ItemHeader, ItemTitle } from '@components/ui/item';
import { cn } from '@/lib/utils';
import { Media, News } from '@/config/payload.types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { formatDistance } from 'date-fns';

type ItemBaseProps = React.ComponentProps<typeof Item>;

interface NewsItemProps extends Omit<ItemBaseProps, 'children'> {
	post: News;
}

const NewsItem: React.FC<NewsItemProps> = ({
	className,
	variant = 'default',
	size = 'default',
	asChild = false,
	post,
	...props
}) => {
	return (
		<Item
			{...props}
			asChild={asChild}
			variant={variant}
			size={size}
			className={cn(className)}
		>
			<a href={`/news/${post.slug}`}>
				<ItemHeader>
					<Image
						src={
							(post.thumbnail as Media)?.url ||
							'https://placehold.co/128x128.png'
						}
						alt={(post.thumbnail as Media)?.alt || ''}
						width={128}
						height={128}
						className="aspect-square w-full rounded-sm object-cover"
					/>
				</ItemHeader>
				<ItemContent>
					<p className="text-sm text-muted-foreground">
						{formatDistance(new Date(post.createdAt), new Date(), {
							addSuffix: true,
						})}
					</p>
					<ItemTitle>{post.title}</ItemTitle>
					<RichText
						data={post.content}
						className="text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance"
					/>
				</ItemContent>
			</a>
		</Item>
	);
};

export { NewsItem };
