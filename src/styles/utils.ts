import { CXType } from './hooks/useCss';

const prefix = 'merged';

export function mergeClassNames(
  cx: CXType,
  classes: Record<string, string>,
  classNames: Partial<Record<string, string>>,
  name: string
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
