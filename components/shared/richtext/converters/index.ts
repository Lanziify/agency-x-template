import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';
import { headingConverters } from './headings';
import { extendedDefaultConverters } from './default';

type NodeType = DefaultNodeTypes | SerializedBlockNode;

export const converters: JSXConvertersFunction<NodeType> = ({ defaultConverters }) => {
  return { ...defaultConverters, ...extendedDefaultConverters, ...headingConverters };
};
