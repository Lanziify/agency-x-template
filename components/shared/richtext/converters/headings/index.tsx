import { TypographyH1, TypographyH2, TypographyH3, TypographyH4 } from '@components/ui/typography';
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical';
import { JSXConverters } from '@payloadcms/richtext-lexical/react';

const headingMap = {
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
} as const;

type SupportedHeadingTag = keyof typeof headingMap;

function isSupportedHeadingTag(tag: SerializedHeadingNode['tag']): tag is SupportedHeadingTag {
  return Object.keys(headingMap).includes(tag as SupportedHeadingTag);
}
export const headingConverters: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    if (isSupportedHeadingTag(node.tag)) {
      const Component = headingMap[node.tag];
      const innerText = nodesToJSX({ nodes: node.children });

      const id = innerText
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      return <Component id={id}>{innerText}</Component>;
    } else {
      const text = nodesToJSX({ nodes: node.children }).join('');
      const Tag = node.tag;
      return <Tag>{text}</Tag>;
    }
  },
};
