import { AgileNumberSize, AgileTheme } from '../types';
import { css } from '@emotion/react';
import { getSizeValue } from './getSizeValue';

export function getFontStyles({
  theme,
  size,
}: {
  theme: AgileTheme;
  size?: AgileNumberSize;
}) {
  return css`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${theme.fontFamily ?? 'sans-serif'};
    font-size: ${size != null
      ? getSizeValue(size, theme.fontSizes) + 'px'
      : undefined};
  `;
}
