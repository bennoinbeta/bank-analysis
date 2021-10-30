export function mergeClassNames<T extends Record<string, string>>(
  cx: (..._classNames: any) => string,
  classes: T,
  classNames: Partial<T>,
  name: string
) {
  return Object.keys(classes).reduce((acc: any, className: string) => {
    acc[className] = cx(
      classes[className],
      classNames != null && classNames[className],
      name ? `ui-${name}-${className}` : null
    );
    return acc;
  }, {}) as T;
}

export function fromEntries(entries: any) {
  const o: any = {};

  Object.keys(entries).forEach((key) => {
    const [k, v] = entries[key];
    o[k] = v;
  });

  return o;
}
