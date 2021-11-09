import { AgileOverwriteTheme } from '../../../../styles/theme';
import { primitiveColors } from './colors';

// TODO add white theme
const theme: AgileOverwriteTheme = {
  primitiveColors,
  colors: {
    disabled: {
      d1: primitiveColors.gray,
      d2: primitiveColors.gray,
    },
    interactive: {
      primary: {
        pM2: primitiveColors.purple_lighter,
        pM1: primitiveColors.purple_light,
        p0: primitiveColors.purple,
        pP1: primitiveColors.purple_darker,
        pP2: primitiveColors.purple_darkest,
      },
    },
    layout: {
      p: primitiveColors.purple_dark,
      bg: primitiveColors.black,
      lc: primitiveColors.black_light,
      hc: primitiveColors.white,
      rHc: primitiveColors.gray2,
      rHc2: primitiveColors.gray3,
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
  type: 'light',
};
