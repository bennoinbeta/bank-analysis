import React from 'react';
import { AgileTheme } from '../types';
import { DEFAULT_THEME } from '../default-theme';
import { AgileThemeContext } from '../AgileThemeProvider';

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
