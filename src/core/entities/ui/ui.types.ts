import { AgileTheme, DefaultAgileTheme } from '../../../styles/theme';
import { primitiveColors } from './themes/colors';

export type ToastEventType = 'error' | 'success' | 'warn';

export type ToastEventPayload = {
  type: ToastEventType;
  message: string;
};

// Expand Agile Theme
declare module '../../../styles/theme' {
  export interface AgileTheme extends DefaultAgileTheme {
    colors: DefaultAgileTheme['colors'] & {
      layout: DefaultAgileTheme['colors']['layout'] & {
        rHc2: string;
      };
    };
    primitiveColors: DefaultAgileTheme['primitiveColors'] &
      typeof primitiveColors;
  }
}

// https://nyxo.app/tips-for-using-typescript-with-styled-components
// Declare Theme type for 'styled-components'
declare module '@emotion/react' {
  export interface Theme extends AgileTheme {}
}
