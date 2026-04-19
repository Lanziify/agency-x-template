import { cn } from '@lib/utils';

function Wrapper(props: React.ComponentProps<'div'>) {
  const { className, children, ...rest } = props;

  return (
    <div className={cn('min-h-[calc(100vh-150px)] w-full dark:bg-black', className)} {...rest}>
      {children}
    </div>
  );
}

function Container(props: React.ComponentProps<'div'>) {
  const { className, children, ...rest } = props;

  return (
    <div className={cn('container mx-auto px-5 lg:px-20', className)} {...rest}>
      {children}
    </div>
  );
}

function Section(props: React.ComponentProps<'section'>) {
  const { className, children, ...rest } = props;

  return (
    <section className={cn('p y-10 lg:py-15', className)} {...rest}>
      {children}
    </section>
  );
}

export { Container, Section, Wrapper };
