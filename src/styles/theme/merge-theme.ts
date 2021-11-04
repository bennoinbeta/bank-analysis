import { OverwriteTheme, Theme } from './types';

export function mergeTheme(
  currentTheme: Theme,
  themeOverride?: OverwriteTheme
): Theme {
  if (themeOverride == null) return currentTheme;

  // TODO MERGE THEMES
  return currentTheme;
}
