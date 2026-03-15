import { cn } from '@lib/utils';

function TypographyH1(props: React.ComponentProps<'h1'>) {
  const { className, children, ...rest } = props;

  return (
    <h1
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight text-balance text-gray-900 dark:text-gray-100', className)}
      {...rest}>
      {children}
    </h1>
  );
}

function TypographyH2(props: React.ComponentProps<'h2'>) {
  const { className, children, ...rest } = props;

  return (
    <h2
      className={cn(
        'scroll-m-20 border-b border-gray-200 pb-2 text-3xl font-semibold tracking-tight text-gray-900 first:mt-0 dark:border-gray-700 dark:text-gray-100',
        className
      )}
      {...rest}>
      {children}
    </h2>
  );
}

function TypographyH3(props: React.ComponentProps<'h3'>) {
  const { className, children, ...rest } = props;

  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100', className)} {...rest}>
      {children}
    </h3>
  );
}

function TypographyH4(props: React.ComponentProps<'h4'>) {
  const { className, children, ...rest } = props;

  return (
    <h3 className={cn('scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100', className)} {...rest}>
      {children}
    </h3>
  );
}

function TypographyP(props: React.ComponentProps<'p'>) {
  const { className, children, ...rest } = props;

  return (
    <p className={cn('leading-7 text-gray-700 not-first:mt-6 dark:text-gray-300', className)} {...rest}>
      {children}
    </p>
  );
}

function TypographyBlockquote(props: React.ComponentProps<'blockquote'>) {
  const { className, children, ...rest } = props;

  return (
    <blockquote
      className={cn('mt-6 border-l-2 border-gray-200 pl-6 text-gray-700 italic dark:border-gray-700 dark:text-gray-300', className)}
      {...rest}>
      {children}
    </blockquote>
  );
}

function TypographyTable(props: React.ComponentProps<'table'>) {
  const { className, children, ...rest } = props;

  return (
    <div className={cn('my-6 w-full overflow-y-auto', className)} {...rest}>
      <table className="w-full">{children}</table>
    </div>
  );
}

function TypographyTableTh(props: React.ComponentProps<'th'>) {
  const { className, children, ...rest } = props;

  return (
    <th
      className={cn(
        'border border-gray-200 px-4 py-2 text-left font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100 [[align=center]]:text-center [[align=right]]:text-right',
        className
      )}
      {...rest}>
      {children}
    </th>
  );
}

function TypographyTableTr(props: React.ComponentProps<'tr'>) {
  const { className, children, ...rest } = props;

  return (
    <tr className={cn('even:bg-muted m-0 border-t border-gray-200 p-0 dark:border-gray-700 dark:even:bg-gray-800', className)} {...rest}>
      {children}
    </tr>
  );
}

function TypographyTableTd(props: React.ComponentProps<'td'>) {
  const { className, children, ...rest } = props;

  return (
    <td
      className={cn(
        'border border-gray-200 px-4 py-2 text-left text-gray-700 dark:border-gray-700 dark:text-gray-300 [[align=center]]:text-center [[align=right]]:text-right',
        className
      )}
      {...rest}>
      {children}
    </td>
  );
}

function TypographyList(props: React.ComponentProps<'ul'>) {
  const { className, children, ...rest } = props;

  return (
    <ul className={cn('my-6 ml-6 list-disc text-gray-700 dark:text-gray-300 [&>li]:mt-2', className)} {...rest}>
      {children}
    </ul>
  );
}

function TypographyInlineCode(props: React.ComponentProps<'code'>) {
  const { className, children, ...rest } = props;

  return (
    <code
      className={cn(
        'relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100',
        className
      )}
      {...rest}>
      {children}
    </code>
  );
}

function TypographyLead(props: React.ComponentProps<'p'>) {
  const { className, children, ...rest } = props;

  return (
    <p className={cn('text-xl text-gray-600 dark:text-gray-400', className)} {...rest}>
      {children}
    </p>
  );
}

function TypographyLarge(props: React.ComponentProps<'p'>) {
  const { className, children, ...rest } = props;

  return (
    <p className={cn('text-lg font-semibold text-gray-900 dark:text-gray-100', className)} {...rest}>
      {children}
    </p>
  );
}

function TypographySmall(props: React.ComponentProps<'small'>) {
  const { className, children, ...rest } = props;

  return (
    <small className={cn('text-sm leading-none font-medium text-gray-600 dark:text-gray-400', className)} {...rest}>
      {children}
    </small>
  );
}

function TypographyMuted(props: React.ComponentProps<'p'>) {
  const { className, children, ...rest } = props;

  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...rest}>
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
