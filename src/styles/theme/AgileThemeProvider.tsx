import React from 'react';
import {
  AgileOverwriteTheme,
  AgileTheme,
  AgileThemeObject,
  ThemePaths,
} from './types';
import { DEFAULT_THEME, DEFAULT_THEME_OBJECT } from './default-theme';
import { mergeTheme } from './mergeTheme';
import { DEFAULT_PRIMITIVE_COLORS } from './default-primitive-colors';

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
    acc[key] = {
      theme: mergeTheme(DEFAULT_THEME, theme.theme),
      type: key,
      primitiveColors: theme.primitiveColors ?? DEFAULT_PRIMITIVE_COLORS,
    };

    return acc;
  }, {} as Record<string, AgileThemeObject>);

  const activeTheme = mergedThemes[activeThemeKey];

  const children =
    typeof props.children === 'function'
      ? props.children(activeTheme.theme)
      : props.children;

  return (
    <AgileThemeContext.Provider
      value={{
        themes: mergedThemes,
        activeThemeKey,
      }}>
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

type ThemeProviderPropsThemeObject = Record<
  string,
  {
    primitiveColors?: AgileThemeObject['primitiveColors'];
    theme: AgileOverwriteTheme;
  }
>;

type ThemeContextType<
  T extends Record<string, AgileThemeObject> = Record<string, AgileThemeObject>
> = {
  themes: T;
  activeThemeKey: ThemePaths<T>;
};
