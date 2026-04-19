import * as Typography from '@components/ui/typography';

type AllowedTypography = Pick<typeof Typography, 'TypographyH1' | 'TypographyH2' | 'TypographyH3' | 'TypographyH4'>;

type TypographyKey = keyof AllowedTypography;

export function getTypography<T extends TypographyKey>(typography: T) {
  const Component = Typography[typography];
  if (!Component) {
    throw new Error(`Typography component ${typography} not found`);
  }
  return Component;
}