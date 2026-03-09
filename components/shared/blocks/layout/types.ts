import { Page } from '@config/payload.types';

export type GetBlockType<T extends any[] | null | undefined, K extends Record<string, string>> = Extract<NonNullable<T>[number], K>;

export type HeroBlockProps = GetBlockType<Page['layout'], { blockType: 'heroBlock' }>;
export type CTABlockProps = GetBlockType<HeroBlockProps['components'], { blockType: 'ctaBlock' }>;
