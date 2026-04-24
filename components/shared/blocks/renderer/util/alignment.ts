export const alignmentClasses = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
};

export function getItemAlignment(
  alignment: keyof typeof alignmentClasses,
  overrides?: Partial<Record<keyof typeof alignmentClasses, string>>
) {
  return alignmentClasses[alignment] + (overrides?.[alignment] ?? '');
}
