import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';

import { extendedDefaultConverters } from './default';
import { headingConverters } from './headings';

type NodeType = DefaultNodeTypes | SerializedBlockNode;

export const converters: JSXConvertersFunction<NodeType> = ({ defaultConverters }) => {
  return { ...defaultConverters, ...extendedDefaultConverters, ...headingConverters };
};
