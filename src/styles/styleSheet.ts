import { createStyleSheet } from 'dynamic-styles';

import { AgileTheme, useAgileTheme } from './theme';

export const styleSheet = createStyleSheet<AgileTheme>({
  theme: useAgileTheme,
});
