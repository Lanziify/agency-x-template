export const alignmentClasses = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
};

export function getContentTextAlignment(
  alignment: keyof typeof alignmentClasses,
  overrides?: Partial<Record<keyof typeof alignmentClasses, string>>
) {
  return alignmentClasses[alignment] + (overrides?.[alignment] ?? '');
}
