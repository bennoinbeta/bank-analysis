import { CXType } from './hooks/useCss';

const prefix = 'merged';

// Merges the specified classes with the provided 'classNames' at the corresponding key
export function mergeClassNames<T extends Record<string, string>>(
  classes: T,
  classNames: Partial<T>,
  name: string,
  cx: CXType
): Record<string, string> {
  const mergedClasses: Record<string, string> = {};
  Object.keys(classes).forEach((classKey: string) => {
    mergedClasses[classKey] = cx(
      classes[classKey],
      classNames != null && classNames[classKey],
      name ? `${prefix}-${name}-${classKey}` : null
    );
  });
  return mergedClasses;
}
