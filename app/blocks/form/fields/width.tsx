import React from 'react';
import { Field } from '@components/ui/field';

export const Width: React.FC<{ children: React.ReactNode; width?: number | null }> = ({ children, width }) => {
  return <Field style={{ width: width ? `${width}%` : undefined }}>{children}</Field>;
};
