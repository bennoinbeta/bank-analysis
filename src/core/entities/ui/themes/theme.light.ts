import { PrimitiveColorsType } from '../ui.types';
import { AgileOverwriteTheme, AgileTheme } from '../../../../styles/theme';

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
  green_light: '#9EFFB9',
};

const theme: AgileOverwriteTheme = {
  colors: {
    disabled: {
      d1: primitiveColors.white_dark,
      d2: primitiveColors.white_darker,
    },
    interactive: {
      primary: {
        pM2: primitiveColors.purple_light,
        pM1: primitiveColors.purple_light,
        p0: primitiveColors.purple,
        pP1: primitiveColors.purple_dark,
        pP2: primitiveColors.purple_darker,
      },
    },
    layout: {
      p: primitiveColors.purple,
      bg: primitiveColors.black_light,
      lc: primitiveColors.white_darker,
      rHc: primitiveColors.white_dark,
      hc: primitiveColors.white,
    },
    denotive: {
      success: primitiveColors.green,
      on_success: primitiveColors.black,
      error: primitiveColors.red,
      on_error: primitiveColors.black,
    },
  },
};

export default {
  theme,
  primitiveColors,
  type: 'light',
};
