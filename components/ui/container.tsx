import { cn } from '@lib/utils';

function Wrapper(props: React.ComponentProps<'div'>) {
  const { className, children, ...rest } = props;

  return (
    <div className={cn('w-full min-h-screen dark:bg-black', className)} {...rest}>
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
    <section className={cn('py-10 lg:py-15', className)} {...rest}>
      {children}
    </section>
  );
}

export { Wrapper, Container, Section };
