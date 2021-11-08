import { AgileTheme } from '../types';
import { DeepPartial } from '../../types';
import { isValidObject } from '@agile-ts/utils';

function mergeChildren<
  DataType extends Record<string, any> = Record<string, any>
>(source: DataType, changes: Record<string, any>): DataType {
  const _source: any = {};

  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'object') {
      _source[key] = {
        ...source[key],
        ...changes[key],
      };
    } else {
      _source[key] = changes[key];
    }
  }

  return _source;
}

function mergeDeep<DataType extends Record<string, any>>(
  target: DataType,
  ...changes: any[]
): DataType {
  if (changes == null || changes.length === 0) return target;
  const change = changes.shift();

  if (isValidObject(target) && isValidObject(change)) {
    for (const key in change) {
      if (isValidObject(change[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], change[key]);
      } else {
        Object.assign(target, { [key]: change[key] });
      }
    }
  }

  return mergeDeep(target, ...changes);
}

export function mergeTheme(
  currentTheme: AgileTheme,
  themeOverride?: DeepPartial<AgileTheme>
): AgileTheme {
  if (themeOverride == null) return currentTheme;

  const finalTheme: AgileTheme = {} as any;
  for (const key of Object.keys(currentTheme)) {
    // Merge headings
    if (key === 'headings' && themeOverride.headings) {
      const sizes: AgileTheme['headings']['sizes'] =
        typeof themeOverride.headings.sizes === 'object'
          ? mergeChildren(
              currentTheme.headings.sizes,
              themeOverride.headings.sizes
            )
          : currentTheme.headings.sizes;

      finalTheme['headings'] = {
        ...currentTheme.headings,
        ...themeOverride.headings,
        sizes,
      } as any;
    }

    // Merge colors
    if (key === 'colors' && themeOverride.colors) {
      themeOverride['colors'] =
        typeof themeOverride.colors === 'object'
          ? mergeChildren(currentTheme.colors, themeOverride.colors)
          : currentTheme.colors;
    }

    // Merge rest
    // @ts-ignore
    if (typeof themeOverride[key] === 'object') {
      // @ts-ignore
      finalTheme[key] = { ...currentTheme[key], ...themeOverride[key] };
    } else {
      // @ts-ignore
      finalTheme[key] = themeOverride[key] ?? currentTheme[key];
    }
  }

  console.log('Theme', finalTheme, mergeDeep(currentTheme, themeOverride));

  return mergeDeep(currentTheme, themeOverride);
}
