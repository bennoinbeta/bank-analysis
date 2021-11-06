import { AgileTheme } from '../../../styles/theme';

export type ToastEventType = 'error' | 'success' | 'warn';

export type ToastEventPayload = {
  type: ToastEventType;
  message: string;
};

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
  purple_darker: string;

  red: string;
  red_light: string;

  green: string;
  green_light: string;
};

// https://nyxo.app/tips-for-using-typescript-with-styled-components
// Declare Theme type for 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme extends AgileTheme {}
}
