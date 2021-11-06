import { AgileTheme } from '../../../styles/theme';

export type ToastEventType = 'error' | 'success' | 'warn';

export type ToastEventPayload = {
  type: ToastEventType;
  message: string;
};

export type PrimitiveColorsType = {
  black: string;
  black_light: string;

  gray: string;
  gray2: string;

  white: string;

  purple: string;
  purple_lighter: string;
  purple_light: string;
  purple_dark: string;
  purple_darker: string;
  purple_darkest: string;

  red: string;
  red_dark: string;

  green: string;
  green_dark: string;
};

// https://nyxo.app/tips-for-using-typescript-with-styled-components
// Declare Theme type for 'styled-components'
declare module '@emotion/react' {
  export interface Theme extends AgileTheme {}
}
