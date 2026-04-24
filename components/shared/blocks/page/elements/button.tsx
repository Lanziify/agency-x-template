import Link from 'next/link';

import { Button } from '@components/ui/button';

import { cn } from '@lib/utils';

import { PageBlock } from '../types';

import { DynamicIcon, IconName } from 'lucide-react/dynamic';

export const ButtonBlock: React.FC<PageBlock['buttonBlock']> = (props) => {
  const { href, label, variant, size, iconPosition } = props;

  return (
    <Button className={cn({ 'flex-row-reverse': iconPosition === 'right' })} variant={variant} size={size} asChild>
      <Link href={href}>
        {/* {icon && <DynamicIcon name={icon as IconName} />} */}
        {label}
      </Link>
    </Button>
  );
};
