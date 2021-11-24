import React from 'react';

import { AgileThemeContext } from '../AgileThemeProvider';
import { DEFAULT_THEME } from '../default-theme';
import { AgileTheme } from '../types';

export function useAgileTheme(): AgileTheme {
  const themeContext = React.useContext(AgileThemeContext);

  if (themeContext == null) {
    console.error('No Theme Context found!');
    return DEFAULT_THEME;
  }

  return (
    (themeContext.themes[themeContext.activeThemeKey] as any) ||
    (themeContext.themes[Object.keys(themeContext.themes)[0]] as any)
  );
}
