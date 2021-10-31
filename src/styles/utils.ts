import { CXType } from './hooks/useCss';

export const { mergeClassNames } = (() => {
  const prefix = 'merged';

  /**
   * Merges the specified classes with the provided 'classNames'
   * at the corresponding key.
   *
   * @param classes - Classes key map to merge the specified 'classNames' in.
   * @param classNames - Class names key map to be merged into the specified classes.
   * @param name - Key/Name identifier to be contained in each new merged class name.
   * @param cx - Method to merge the classes with the 'classNames'.
   */
  function _mergeClassNames<T extends Record<string, string>>(
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

  return { mergeClassNames: _mergeClassNames };
})();
