import { cn } from '@lib/utils';

function TypographyH1(props: React.ComponentProps<'h1'>) {
  const { className, children, ...rest } = props;

  return (
    <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight text-balance', className)} {...rest}>
      {children}
    </h1>
  );
}

function TypographyH2(props: React.ComponentProps<'h2'>) {
  const { className, children, ...rest } = props;

  return (
    <h2 className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)} {...rest}>
      {children}
    </h2>
  );
}

function TypographyH3(props: React.ComponentProps<'h3'>) {
  const { className, children, ...rest } = props;

  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...rest}>
      {children}
    </h3>
  );
}

function TypographyH4(props: React.ComponentProps<'h4'>) {
  const { className, children, ...rest } = props;

  return (
    <h3 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...rest}>
      {children}
    </h3>
  );
}

function TypographyP(props: React.ComponentProps<'p'>) {
  const { className, children, ...rest } = props;

  return (
    <p className={cn('leading-7 not-first:mt-6', className)} {...rest}>
      {children}
    </p>
  );
}

function TypographyBlockquote(props: React.ComponentProps<'blockquote'>) {
  const { className, children, ...rest } = props;

  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...rest}>
      {children}
    </blockquote>
  );
}

function TypographyTable(props: React.ComponentProps<'table'>) {
  const { className, children, ...rest } = props;

  return (
    <div className={cn('my-6 w-full overflow-y-auto', className)} {...rest}>
      <table className="w-ful">{children}</table>
    </div>
  );
}

function TypographyTableTh(props: React.ComponentProps<'th'>) {
  const { className, children, ...rest } = props;

  return (
    <th className={cn('border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right', className)} {...rest}>
      {children}
    </th>
  );
}

function TypographyTableTr(props: React.ComponentProps<'tr'>) {
  const { className, children, ...rest } = props;

  return (
    <tr className={cn('even:bg-muted m-0 border-t p-0', className)} {...rest}>
      {children}
    </tr>
  );
}

function TypographyTableTd(props: React.ComponentProps<'td'>) {
  const { className, children, ...rest } = props;

  return (
    <td className={cn('border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right', className)} {...rest}>
      {children}
    </td>
  );
}

function TypographyList(props: React.ComponentProps<'ul'>) {
  const { className, children, ...rest } = props;

  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...rest}>
      {children}
    </ul>
  );
}

function TypographyInlineCode(props: React.ComponentProps<'code'>) {
  const { className, children, ...rest } = props;

  return (
    <code className={cn('bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)} {...rest}>
      {children}
    </code>
  );
}

function TypographyLead(props: React.ComponentProps<'p'>) {
  const { className, children, ...rest } = props;

  return (
    <p className={cn('text-muted-foreground text-xl', className)} {...rest}>
      {children}
    </p>
  );
}

function TypographyLarge(props: React.ComponentProps<'p'>) {
  const { className, children, ...rest } = props;

  return (
    <p className={cn('text-lg font-semibold', className)} {...rest}>
      {children}
    </p>
  );
}

function TypographySmall(props: React.ComponentProps<'small'>) {
  const { className, children, ...rest } = props;

  return (
    <small className={cn('text-sm leading-none font-medium', className)} {...rest}>
      {children}
    </small>
  );
}

function TypographyMuted(props: React.ComponentProps<'p'>) {
  const { className, children, ...rest } = props;

  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...rest}>
      {children}
    </p>
  );
}

export {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
  TypographyTable,
  TypographyTableTd,
  TypographyTableTh,
  TypographyTableTr,
};
