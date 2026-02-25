import React from 'react';
import { Field } from '@components/ui/field';

export const Width: React.FC<{ children: React.ReactNode; width?: number | null }> = ({ children, width }) => {
  return <Field style={{ flex: 1, flexBasis: width ? `calc(${width}% - var(--spacing) * 4)` : '100%' }}>{children}</Field>;
};
