import React from 'react';
import {
  AgileTheme,
  OverwriteThemeObject,
  ThemeObject,
  ThemePaths,
} from './types';
import { DEFAULT_THEME } from './default-theme';
import { mergeTheme } from './merge-theme';
import { DEFAULT_PRIMITIVE_COLORS } from './default-primitive-colors';

const defaultTheme: ThemeContextType = {
  themes: {
    light: {
      theme: DEFAULT_THEME,
      type: 'light',
      primitiveColors: DEFAULT_PRIMITIVE_COLORS,
    },
  },
  activeTheme: 'light',
};

const ThemeContext = React.createContext<ThemeContextType>(defaultTheme);

export function useAgileTheme(): AgileTheme {
  const themeContext = React.useContext(ThemeContext);

  if (themeContext == null) {
    console.error('No Theme Context found!');
    return DEFAULT_THEME;
  }

  return (
    (themeContext.themes[themeContext.activeTheme] as any) ||
    (themeContext.themes[Object.keys(themeContext.themes)[0]] as any)
  );
}

export const AgileThemeProvider: React.FC<ThemeProviderProps> = <
  T extends Record<string, OverwriteThemeObject>
>(
  props: ThemeProviderProps<T>
) => {
  const { children, activeTheme } = props;
  const themes = props.themes ?? defaultTheme.themes;
  const [mergedThemes, setMergedThemes] = React.useState<
    Record<string, ThemeObject>
  >({});

  // Merge default Theme with provided Themes
  React.useEffect(() => {
    const tempMergedThemes: Record<string, ThemeObject> = {};
    for (const themeKey of Object.keys(themes)) {
      themes[themeKey].theme = mergeTheme(
        DEFAULT_THEME,
        themes[themeKey].theme
      );
      tempMergedThemes[themeKey] = themes[themeKey] as any;
    }
    setMergedThemes(tempMergedThemes);
  }, [themes, setMergedThemes]);

  return (
    <ThemeContext.Provider
      value={{
        themes: mergedThemes,
        activeTheme: activeTheme ?? Object.keys(mergedThemes)[0],
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default AgileThemeProvider;

type ThemeProviderProps<T extends Record<string, OverwriteThemeObject>> = {
  themes: T;
  activeTheme?: ThemePaths<T>;
  children: React.ReactNode;
};

type ThemeContextType<
  T extends Record<string, ThemeObject> = Record<string, ThemeObject>
> = {
  themes: T;
  activeTheme: ThemePaths<T>;
};

// TODO
const test: ThemeProviderProps = {
  themes: {
    light: {},
    dark: {},
  },
  activeTheme: 'light',
  children: null as any,
};
