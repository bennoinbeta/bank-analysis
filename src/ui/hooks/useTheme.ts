import React from 'react';
import ThemeContext from '../../context/ThemeContext';

export function useTheme() {
  return React.useContext(ThemeContext);
}
