import dark from './theme.dark';
import light from './theme.light';

// Themes
const themes = {
  dark,
  light,
};

export default themes;

export { dark, light };

export type PrimitiveColorsType = {
  black: string;
  black_light: string;
  black_lighter: string;

  gray: string;

  white: string;
  white_dark: string;
  white_darker: string;

  purple: string;
  purple_light: string;
  purple_dark: string;

  red: string;
  red_light: string;

  green: string;
  green_light: string;
};

export type ThemeColorsType = {
  // Primary
  primary: string;
  on_primary: string;

  // Background
  background: string;
  on_background: string;
  on_background_2: string;

  // Surface
  surface: string;
  surface_2: string;
  surface_border: string;
  on_surface: string;
  on_surface_2: string;
  on_surface_3: string;

  // Error
  error: string;
  on_error: string;

  // Success
  success: string;
  on_success: string;
};

export interface ThemeInterface {
  type: string;
  primitiveColors: PrimitiveColorsType;
  colors: ThemeColorsType;
}

type ThemePath<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;

export type ThemePaths = ThemePath<typeof themes>;

// https://nyxo.app/tips-for-using-typescript-with-styled-components
// Declare Theme type for 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
}
