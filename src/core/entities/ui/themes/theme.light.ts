import { PrimitiveColorsType, ThemeColorsType } from '../ui.types';

const primitiveColors: PrimitiveColorsType = {
  black: '#1A181B',
  black_light: '#2C262D',
  black_lighter: '#332D33',

  gray: '#373137',

  white: '#FFEFFC',
  white_dark: '#8F7E8F',
  white_darker: '#635663',

  purple: '#D476D4',
  purple_light: '#D476D4',
  purple_dark: '#926692',
  purple_darker: '#B375B5',

  red: '#FF0000',
  red_light: '#FF9E9E',

  green: '#00FF19',
  green_light: '9EFFB9',
};

const themeColors: ThemeColorsType = {
  // Primary
  primary: primitiveColors.purple,
  on_primary: primitiveColors.black,

  // Background
  background: primitiveColors.white,
  on_background: primitiveColors.black,
  on_background_2: primitiveColors.black_light,

  // Surface
  surface: primitiveColors.black_light,
  surface_2: primitiveColors.gray,
  surface_border: primitiveColors.white_dark,
  surface_border_2: primitiveColors.purple_dark,
  on_surface: primitiveColors.white,
  on_surface_2: primitiveColors.white_dark,
  on_surface_3: primitiveColors.white_darker,

  // Error
  error: primitiveColors.red,
  on_error: primitiveColors.white,

  // Success
  success: primitiveColors.green,
  on_success: primitiveColors.white,
};

export default {
  colors: themeColors,
  primitiveColors,
  type: 'light',
};
