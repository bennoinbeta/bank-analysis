import { Colors, AgileTheme } from './types';
import { DEFAULT_PRIMITIVE_COLORS } from './default-primitive-colors';

export const DEFAULT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

export const DEFAULT_COLORS: Colors = {
  layout: {
    bg: DEFAULT_PRIMITIVE_COLORS.dark[0],
    p: DEFAULT_PRIMITIVE_COLORS.teal[8],
    lc: DEFAULT_PRIMITIVE_COLORS.dark[1],
    hc: DEFAULT_PRIMITIVE_COLORS.dark[7],
    rHc: DEFAULT_PRIMITIVE_COLORS.dark[6],
  },

  denotive: {
    error: DEFAULT_PRIMITIVE_COLORS.red[7],
    on_error: DEFAULT_PRIMITIVE_COLORS.dark[9],
    success: DEFAULT_PRIMITIVE_COLORS.green[7],
    on_success: DEFAULT_PRIMITIVE_COLORS.dark[9],
  },

  interactive: {
    primary: {
      pM1: DEFAULT_PRIMITIVE_COLORS.grape[5],
      pM2: DEFAULT_PRIMITIVE_COLORS.grape[6],
      p0: DEFAULT_PRIMITIVE_COLORS.grape[7],
      pP1: DEFAULT_PRIMITIVE_COLORS.grape[9],
      pP2: DEFAULT_PRIMITIVE_COLORS.grape[9],
    },
  },

  disabled: {
    d1: DEFAULT_PRIMITIVE_COLORS.dark[3],
    d2: DEFAULT_PRIMITIVE_COLORS.dark[4],
  },
};

export const DEFAULT_THEME: AgileTheme = {
  type: 'light',
  // 'as any' if sb decided to overwrite the AgileTheme,
  // then it is his responsibility to provide valid colors
  // and shouldn't rely on the DEFAULT_THEME
  colors: DEFAULT_COLORS as any,
  primitiveColors: DEFAULT_PRIMITIVE_COLORS as any,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  lineHeight: 1.55,

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },

  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
  },

  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },

  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
    md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
    xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',
  },

  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    fontWeight: 700,
    sizes: {
      h1: { fontSize: 34, lineHeight: 1.3 },
      h2: { fontSize: 26, lineHeight: 1.35 },
      h3: { fontSize: 22, lineHeight: 1.4 },
      h4: { fontSize: 18, lineHeight: 1.45 },
      h5: { fontSize: 16, lineHeight: 1.5 },
      h6: { fontSize: 14, lineHeight: 1.5 },
    },
  },
};

export const DEFAULT_THEME_OBJECT = {
  themes: {
    light: DEFAULT_THEME,
  },
  activeThemeKey: 'light',
};
