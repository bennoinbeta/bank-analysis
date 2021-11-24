import { createStyleSheet } from '@dyst/react';

import { AgileTheme, useAgileTheme } from './theme';

export const styleSheet = createStyleSheet<AgileTheme>({
  theme: useAgileTheme,
});
