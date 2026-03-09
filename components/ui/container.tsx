import { cn } from '@lib/utils';

function Container(props: React.ComponentProps<'div'>) {
  const { className, children, ...rest } = props;

  return (
    <div className={cn('w-full', className)} {...rest}>
      {children}
    </div>
  );
}

function Section(props: React.ComponentProps<'section'>) {
  const { className, children, ...rest } = props;

  return (
    <section className={cn('container mx-auto px-8 lg:px-20', className)} {...rest}>
      {children}
    </section>
  );
}

export { Container, Section };
