import { AgileTheme } from './types';
import { DeepPartial } from '../types';

export function mergeTheme(
  currentTheme: AgileTheme,
  themeOverride?: DeepPartial<AgileTheme>
): AgileTheme {
  if (themeOverride == null) return currentTheme;

  // TODO MERGE THEMES
  return themeOverride as any;
}
