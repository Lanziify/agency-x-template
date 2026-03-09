import { RichText as BaseRichTextConverter } from '@payloadcms/richtext-lexical/react';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { converters } from './converters';

type Props = {
  data: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

export const RichText = (props: Props) => {
  const { className, ...rest } = props;

  return <BaseRichTextConverter {...rest} className={className} converters={converters} />;
};
