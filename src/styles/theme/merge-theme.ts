import { OverwriteTheme, AgileTheme } from './types';

export function mergeTheme(
  currentTheme: AgileTheme,
  themeOverride?: OverwriteTheme
): AgileTheme {
  if (themeOverride == null) return currentTheme;

  // TODO MERGE THEMES
  return currentTheme;
}
