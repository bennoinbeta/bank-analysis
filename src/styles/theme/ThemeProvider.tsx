import React from 'react';
import { Theme } from './types';
import { DEFAULT_THEME } from './default-theme';

const defaultTheme: ThemeContextType = {
  themes: { light: DEFAULT_THEME },
  activeTheme: 'light',
};

const ThemeContext = React.createContext<ThemeContextType>(defaultTheme);

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children } = props;
  const themes = props.themes ?? defaultTheme.themes;

  return (
    <ThemeContext.Provider
      value={{
        themes,
        activeTheme: Object.keys(themes)[0],
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

type ThemeProviderProps<
  T extends Record<string, Theme> = Record<string, Theme>
> = {
  themes?: T;
  themeType?: ThemePaths<T>;
  children: React.ReactNode;
};

type ThemeContextType<T extends Record<string, Theme> = Record<string, Theme>> =
  {
    themes: T;
    activeTheme: ThemePaths<T>;
  };

type ThemePaths<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;
