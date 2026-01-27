import {
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor,
	UploadFeature,
} from '@payloadcms/richtext-lexical';
import { RichTextAdapterProvider } from 'payload';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editor: RichTextAdapterProvider<any, any, any> = lexicalEditor({
	features: ({ defaultFeatures }) => [
		...defaultFeatures,
		HeadingFeature({
			enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
		}),
		FixedToolbarFeature(),
		InlineToolbarFeature(),
		HorizontalRuleFeature(),
		UploadFeature(),
	],
});
