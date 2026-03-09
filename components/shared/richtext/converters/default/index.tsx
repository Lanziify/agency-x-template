import { TypographyP } from '@components/ui/typography';
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical';
import { JSXConverters } from '@payloadcms/richtext-lexical/react';

const extendedDefaultConverters: JSXConverters<DefaultNodeTypes> = {
  paragraph: ({ node, nodesToJSX }) => {
    return <TypographyP>{nodesToJSX({ nodes: node.children })}</TypographyP>;
  },
};

export { extendedDefaultConverters };
