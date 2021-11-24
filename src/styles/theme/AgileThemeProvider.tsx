import React from 'react';

import { DEFAULT_THEME, DEFAULT_THEME_OBJECT } from './default-theme';
import { AgileOverwriteTheme, AgileTheme, ThemePaths } from './types';
import { mergeTheme } from './utils/mergeTheme';

export const AgileThemeContext =
  React.createContext<ThemeContextType>(DEFAULT_THEME_OBJECT);

export const AgileThemeProvider = <T extends ThemeProviderPropsThemeObject>(
  props: ThemeProviderProps<T>
) => {
  const themes = props.themes ?? DEFAULT_THEME_OBJECT.themes;
  const activeThemeKey = props.activeThemeKey ?? Object.keys(themes)[0];

  // Merge specified theme with default Theme
  const mergedThemes = Object.keys(themes).reduce((acc, key) => {
    const theme = themes[key];
    if (theme.type == null) theme.type = key;
    acc[key] = mergeTheme(DEFAULT_THEME, theme);
    return acc;
  }, {} as Record<string, AgileTheme>);

  const activeTheme = mergedThemes[activeThemeKey];

  const children =
    typeof props.children === 'function'
      ? props.children(activeTheme)
      : props.children;

  return (
    <AgileThemeContext.Provider
      value={{
        themes: mergedThemes,
        activeThemeKey,
      }}
    >
      {children}
    </AgileThemeContext.Provider>
  );
};

export default AgileThemeProvider;

type ThemeProviderProps<T extends ThemeProviderPropsThemeObject> = {
  themes: T;
  activeThemeKey?: ThemePaths<T>;
  children: React.ReactNode | ((theme: AgileTheme) => React.ReactNode);
};

type ThemeProviderPropsThemeObject = Record<string, AgileOverwriteTheme>;

type ThemeContextType<
  T extends Record<string, AgileTheme> = Record<string, AgileTheme>
> = {
  themes: T;
  activeThemeKey: ThemePaths<T>;
};
